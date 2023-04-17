import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { BsPauseCircle, BsPlayCircle } from 'react-icons/bs';
import { TbRepeatOnce } from 'react-icons/tb';
import moment from 'moment/moment';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoRepeatOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button/Button';
import { NextIcon, PreviousIcon, RandomIcon } from '~/components/Icon';
import { setCurSongId } from '~/components/redux/Slice/MusicSlice';
import { setCurTimeAudio, setIsRandom, setRepeat } from '~/components/redux/Slice/PlayingBarSlice';
import { albumSelector, musicSelector, playingBarSelector, songSelector } from '~/components/redux/selectors';
import { setIsPlaying } from '../../../redux/Slice/SongSlice';
import styles from './PlayingBar.module.scss';

const cx = classNames.bind(styles);
var interValid;
function ActionBar() {
    const { isPlaying, audio, infoSong } = useSelector(songSelector);
    const { album } = useSelector(albumSelector);
    const { curSongId } = useSelector(musicSelector);

    const { curTimeAudio, allowPrevious, allowNext, isLoading, isRandom, curVolume, repeat } =
        useSelector(playingBarSelector);
    const dispatch = useDispatch();
    const progressBarTimeRef = useRef();
    const progressSliderTimeRef = useRef();

    useEffect(
        () => {
            if (audio === null) {
                return;
            }
            if (isPlaying) {
                if (curVolume === 0) {
                    audio.volume = 0;
                } else {
                    audio.volume = curVolume;
                }
                audio.play();
            } else {
                audio.pause();
            }

            interValid && clearInterval(interValid);
            if (isPlaying) {
                interValid = setInterval(() => {
                    let percent = Math.round((audio.currentTime * 10000) / infoSong.duration) / 100;
                    progressSliderTimeRef.current.style.cssText = `width: ${percent}%`;
                    dispatch(setCurTimeAudio(Math.round(audio.currentTime)));
                }, 100);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isPlaying, audio],
    );

    useEffect(() => {
        const handleEnded = () => {
            if (isRandom) {
                randomSong();
                console.log('random');
            } else if (repeat.type === 'one') {
                audio.play();
            } else {
                nextSong();
            }
        };
        if (audio !== null) {
            audio.addEventListener('ended', () => handleEnded());
            return () => {
                audio.removeEventListener('ended', () => handleEnded());
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audio, isRandom, repeat]);

    //Function change
    const prevSong = () => {
        album.forEach((song, index) => {
            if (curSongId === song.encodeId) {
                dispatch(setCurSongId(album[index - 1].encodeId));
                dispatch(setIsPlaying(true));
            }
        });
    };
    const nextSong = () => {
        if (isRandom) {
            randomSong();
        } else {
            let isSongInAlbum = false;
            album.forEach((song, index) => {
                if (curSongId === song?.encodeId) {
                    isSongInAlbum = true;
                    if (index === album.length - 1) {
                        dispatch(setCurSongId(album[0].encodeId));
                    } else {
                        dispatch(setCurSongId(album[index + 1].encodeId));
                    }
                    dispatch(setIsPlaying(true));
                }
            });
            if (!isSongInAlbum) {
                dispatch(setCurSongId(album[0].encodeId));
            }
        }
        if (repeat.type === 'one') {
            dispatch(setRepeat({ type: 'none', contentTippy: 'Bật phát lại tất cả' }));
        }
    };

    const upgradeCurrentTime = (percent, timeAudio, audio) => {
        audio.currentTime = (percent * timeAudio) / 100;
    };
    const randomSong = () => {
        const index = Math.floor(Math.random() * album.length);
        dispatch(setCurSongId(album[index].encodeId));
        dispatch(setIsPlaying(true));
    };
    //Handle Click
    const handleRandom = () => {
        dispatch(setIsRandom(!isRandom));
    };
    const handlePlay = () => {
        dispatch(setIsPlaying(!isPlaying));
    };

    const handlePrev = () => {
        prevSong();
    };

    const handleNext = () => {
        nextSong();
    };

    const handleRepeat = () => {
        if (repeat.type === 'none') {
            dispatch(setRepeat({ type: 'all', contentTippy: 'Bật phát lại một bài' }));
        } else if (repeat.type === 'all') {
            dispatch(setRepeat({ type: 'one', contentTippy: 'Tắt phát lại' }));
        } else {
            dispatch(setRepeat({ type: 'none', contentTippy: 'Bật phát lại tất cả' }));
        }
    };

    const handleClickProgressBarTime = (e) => {
        const progressBarRect = progressBarTimeRef.current.getBoundingClientRect();
        const percent = Math.round(((e.clientX - progressBarRect.left) * 10000) / progressBarRect.width) / 100;
        upgradeCurrentTime(percent, infoSong.duration, audio);
        if (!isPlaying) {
            progressSliderTimeRef.current.style.cssText = `width: ${percent}%`;
            dispatch(setCurTimeAudio(Math.round(audio.currentTime)));
        }
    };

    return (
        <div className={cx('action-bar')}>
            <div className={cx('actions')}>
                <Tippy
                    content={isRandom ? 'Tắt phát ngẫu nhiên' : 'Bật phát ngẫu nhiên'}
                    placement="top"
                    hideOnClick={false}
                >
                    <Button
                        circle
                        isHover
                        className={cx('actions-button', isRandom && 'active')}
                        onClick={handleRandom}
                    >
                        <RandomIcon className={cx('icon-random')} />
                    </Button>
                </Tippy>
                {allowPrevious ? (
                    <Button circle isHover className={cx('actions-button')} onClick={handlePrev}>
                        <PreviousIcon className={cx('icon-prev')} />
                    </Button>
                ) : (
                    <Button circle isHover disabled className={cx('actions-button')}>
                        <PreviousIcon className={cx('icon-prev')} />
                    </Button>
                )}
                {isPlaying ? (
                    <>
                        {isLoading ? (
                            <Button className={cx('button-loading')}>
                                <AiOutlineLoading3Quarters size={36} className={cx('icon-loading')} />
                            </Button>
                        ) : (
                            <Button className={cx('button-play')} onClick={handlePlay}>
                                <BsPauseCircle size={36} className={cx('icon-pause')} />
                            </Button>
                        )}
                    </>
                ) : (
                    <Button className={cx('button-play')} onClick={handlePlay}>
                        <BsPlayCircle size={36} className={cx('icon-play')} />
                    </Button>
                )}
                {allowNext ? (
                    <Button circle isHover className={cx('actions-button')} onClick={handleNext}>
                        <NextIcon className={cx('icon-next')} />
                    </Button>
                ) : (
                    <Button circle isHover disabled className={cx('actions-button')}>
                        <NextIcon className={cx('icon-next')} />
                    </Button>
                )}
                {repeat.type !== 'one' ? (
                    <Tippy content={repeat.contentTippy} placement="top" hideOnClick={false}>
                        <Button
                            circle
                            isHover
                            className={cx('actions-button', repeat.type !== 'none' && 'active')}
                            onClick={handleRepeat}
                        >
                            <IoRepeatOutline size={24} className={cx('icon-repeat')} />
                        </Button>
                    </Tippy>
                ) : (
                    <Tippy content={repeat.contentTippy} placement="top" hideOnClick={false}>
                        <Button
                            circle
                            isHover
                            className={cx('actions-button', repeat.type !== 'none' && 'active')}
                            onClick={handleRepeat}
                        >
                            <TbRepeatOnce size={24} className={cx('icon-repeat')} />
                        </Button>
                    </Tippy>
                )}
            </div>
            <div className={cx('duration-bar')}>
                <div className={cx('time-left')}>{moment.utc(curTimeAudio * 1000).format('mm:ss')}</div>
                <div ref={progressBarTimeRef} className={cx('progress-bar')} onClick={handleClickProgressBarTime}>
                    <div ref={progressSliderTimeRef} className={cx('progress-slider')}></div>
                </div>
                <div className={cx('time-right')}>{moment.utc(infoSong.duration * 1000).format('mm:ss')}</div>
            </div>
        </div>
    );
}

export default ActionBar;

import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { BsPauseCircle, BsPlayCircle } from 'react-icons/bs';
import { TbRepeatOnce } from 'react-icons/tb';

import { IoRepeatOutline } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';

import Button from '~/components/Button/Button';
import {
    MicIcon,
    MvIcon,
    NextIcon,
    PreviousIcon,
    RandomIcon,
    RestoreIcon,
    VolumeOffIcon,
    VolumeOnIcon,
} from '~/components/Icon';
import Item from '~/components/Item/Item';
import { albumSelector, musicSelector, songSelector } from '~/components/redux/selectors';
import * as songService from '~/services/songService';
import { songSlice } from '../../../redux/Slice/SongSlice';
import styles from './PlayingBar.module.scss';
import { albumSlice } from '~/components/redux/Slice/AlbumSlice';
import { musicSlice } from '~/components/redux/Slice/MusicSlice';

const cx = classNames.bind(styles);
var interValid;

function PlayingBar() {
    const { isPlaying, audio, infoSong } = useSelector(songSelector);
    const { album, allowGetAlbum } = useSelector(albumSelector);
    const { curSongId } = useSelector(musicSelector);
    const [curTimeAudio, setCurTimeAudio] = useState(0);
    const [allowPrevious, setAllowPrevious] = useState(false);
    const [allowNext, setAllowNext] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    const [volumeOn, setVolumeOn] = useState(true);
    const [curVolume, setCurVolume] = useState(1);
    const [repeat, setRepeat] = useState({ type: 'none', contentTippy: 'Bật phát lại tất cả' });
    const dispatch = useDispatch();
    const progressBarTimeRef = useRef();
    const progressSliderTimeRef = useRef();
    const progressBarVolumeRef = useRef();
    const progressSliderVolumeRef = useRef();

    useEffect(() => {
        const resultApi = async () => {
            setIsLoading(true);
            const resInfoSong = await songService.infoSong(curSongId);
            const resAudioSong = await songService.audioSong(curSongId);
            setIsLoading(false);
            dispatch(songSlice.actions.getAudio(new Audio(resAudioSong.data[128])));
            dispatch(songSlice.actions.getInfoSong(resInfoSong.data));
            let resPlayList;
            let flagApi = false;

            try {
                resPlayList = await songService.playList(resInfoSong.data.album.encodeId);
                setAllowNext(true);
                flagApi = true;
            } catch {
                // Dont have album
                setAllowNext(false);
            }
            if (allowGetAlbum && flagApi) {
                try {
                    dispatch(albumSlice.actions.getAlbum(resPlayList.data.sections[0].items));
                } catch {
                    dispatch(albumSlice.actions.getAlbum(resPlayList.data.song.items));
                }
                dispatch(albumSlice.actions.setAllowGetAlbum(false));
            }
        };
        if (repeat.type !== 'one') {
            resultApi();
        }
        if (curSongId === album[0].encodeId) {
            setAllowPrevious(false);
        } else {
            let isSongInAlbum = false;
            album.forEach((song, index) => {
                if (curSongId === song.encodeId && index !== 0) {
                    isSongInAlbum = true;
                    setAllowPrevious(true);
                }
            });
            if (!isSongInAlbum) {
                setAllowPrevious(false);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curSongId]);

    useEffect(
        () => {
            if (audio === null) {
                return;
            }
            if (isPlaying) {
                audio.play();
            } else {
                audio.pause();
            }

            interValid && clearInterval(interValid);
            if (isPlaying) {
                interValid = setInterval(() => {
                    let percent = Math.round((audio.currentTime * 10000) / infoSong.duration) / 100;
                    progressSliderTimeRef.current.style.cssText = `width: ${percent}%`;
                    setCurTimeAudio(Math.round(audio.currentTime));
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
                dispatch(musicSlice.actions.setCurSongId(album[index - 1].encodeId));
                dispatch(songSlice.actions.setIsPlaying(true));
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
                        dispatch(musicSlice.actions.setCurSongId(album[0].encodeId));
                    } else {
                        dispatch(musicSlice.actions.setCurSongId(album[index + 1].encodeId));
                    }
                    dispatch(songSlice.actions.setIsPlaying(true));
                }
            });
            if (!isSongInAlbum) {
                dispatch(musicSlice.actions.setCurSongId(album[0].encodeId));
            }
        }
        if (repeat.type === 'one') {
            setRepeat({ type: 'none', contentTippy: 'Bật phát lại tất cả' });
        }
    };

    const upgradeCurrentTime = (percent, timeAudio, audio) => {
        audio.currentTime = (percent * timeAudio) / 100;
    };
    const randomSong = () => {
        const index = Math.floor(Math.random() * album.length);
        dispatch(musicSlice.actions.setCurSongId(album[index].encodeId));
        dispatch(songSlice.actions.setIsPlaying(true));
    };
    //Handle Click
    const handleRandom = () => {
        setIsRandom(!isRandom);
    };
    const handlePlay = () => {
        dispatch(songSlice.actions.setIsPlaying(!isPlaying));
    };

    const handlePrev = () => {
        prevSong();
    };

    const handleNext = () => {
        nextSong();
    };
    const handleVolume = () => {
        if (volumeOn) {
            setCurVolume(audio.volume);
            audio.volume = 0;
            progressSliderVolumeRef.current.style.cssText = `width: ${0}%`;
        } else {
            audio.volume = curVolume;
            progressSliderVolumeRef.current.style.cssText = `width: ${curVolume * 100}%`;
        }
        setVolumeOn(!volumeOn);
    };

    const handleRepeat = () => {
        if (repeat.type === 'none') {
            setRepeat({ type: 'all', contentTippy: 'Bật phát lại một bài' });
        } else if (repeat.type === 'all') {
            setRepeat({ type: 'one', contentTippy: 'Tắt phát lại' });
        } else {
            setRepeat({ type: 'none', contentTippy: 'Bật phát lại tất cả' });
        }
    };

    const handleClickProgressBarTime = (e) => {
        const progressBarRect = progressBarTimeRef.current.getBoundingClientRect();
        const percent = Math.round(((e.clientX - progressBarRect.left) * 10000) / progressBarRect.width) / 100;
        upgradeCurrentTime(percent, infoSong.duration, audio);
        if (!isPlaying) {
            progressSliderTimeRef.current.style.cssText = `width: ${percent}%`;
            setCurTimeAudio(Math.round(audio.currentTime));
        }
    };
    const handleClickProgressBarVolume = (e) => {
        const progressBarRect = progressBarVolumeRef.current.getBoundingClientRect();
        const percent = Math.round(((e.clientX - progressBarRect.left) * 10000) / progressBarRect.width) / 100;
        audio.volume = percent / 100;
        progressSliderVolumeRef.current.style.cssText = `width: ${percent}%`;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <Item data={infoSong} type="songs" playingBar />
                </div>
                <div className={cx('player-bar')}>
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
                        <div
                            ref={progressBarTimeRef}
                            className={cx('progress-bar')}
                            onClick={handleClickProgressBarTime}
                        >
                            <div ref={progressSliderTimeRef} className={cx('progress-slider')}></div>
                        </div>
                        <div className={cx('time-right')}>{moment.utc(infoSong.duration * 1000).format('mm:ss')}</div>
                    </div>
                </div>
                <div className={cx('right')}>
                    <Button circle isHover disabled className={cx('button-right')}>
                        <MvIcon width="22" height="22" />
                    </Button>
                    <Tippy content="Xem lời bài hát">
                        <Button circle isHover className={cx('button-right')}>
                            <MicIcon width="16" height="16" />
                        </Button>
                    </Tippy>
                    <Tippy content="Chế độ cửa sổ">
                        <Button circle isHover className={cx('button-right')}>
                            <RestoreIcon />
                        </Button>
                    </Tippy>
                    {volumeOn ? (
                        <Button circle isHover className={cx('button-right', 'button-volume')} onClick={handleVolume}>
                            <VolumeOnIcon width="16" height="16" />
                        </Button>
                    ) : (
                        <Button circle isHover className={cx('button-right', 'button-volume')} onClick={handleVolume}>
                            <VolumeOffIcon width="21" height="21" />
                        </Button>
                    )}
                    <div
                        ref={progressBarVolumeRef}
                        className={cx('progress-bar', 'volume')}
                        onClick={handleClickProgressBarVolume}
                    >
                        <div ref={progressSliderVolumeRef} className={cx('progress-slider')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayingBar;

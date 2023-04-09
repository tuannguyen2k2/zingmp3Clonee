import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { BsPauseCircle, BsPlayCircle } from 'react-icons/bs';
import { IoRepeatOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';

import Button from '~/components/Button/Button';
import { NextIcon, PreviousIcon, RandomIcon } from '~/components/Icon';
import Item from '~/components/Item/Item';
import { musicSelector, songSelector } from '~/components/redux/selectors';
import * as songService from '~/services/songService';
import { songSlice } from '../../../redux/Slice/SongSlice';
import styles from './PlayingBar.module.scss';

const cx = classNames.bind(styles);
var interValid;

function PlayingBar() {
    const { isPlaying, audio, infoSong } = useSelector(songSelector);
    const [curTimeAudio, setCurTimeAudio] = useState(0);
    const dispatch = useDispatch();
    const curId = useSelector(musicSelector).curSongId;
    const progressRef = useRef();
    useEffect(
        () => {
            if (audio === null) {
                return;
            }
            isPlaying ? audio.play() : audio.pause();

            audio.addEventListener('ended', () => dispatch(songSlice.actions.setIsPlaying(false)));

            interValid && clearInterval(interValid);

            if (isPlaying) {
                interValid = setInterval(() => {
                    let percent = Math.round((audio.currentTime * 10000) / infoSong.duration) / 100;
                    progressRef.current.style.cssText = `width: ${percent}%`;
                    setCurTimeAudio(Math.round(audio.currentTime));
                }, 100);
            }
            return () => {
                audio.removeEventListener('ended', () => dispatch(songSlice.actions.setIsPlaying(false)));
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isPlaying, audio],
    );

    useEffect(() => {
        const resultApi = async () => {
            const resInfoSong = await songService.infoSong(curId);
            const resAudioSong = await songService.audioSong(curId);
            dispatch(songSlice.actions.setInfoSong(resInfoSong.data));
            dispatch(songSlice.actions.setAudio(new Audio(resAudioSong.data[128])));
        };
        resultApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curId]);

    useEffect(() => {
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audio, isPlaying]);

    const handleButtonPlay = () => {
        dispatch(songSlice.actions.setIsPlaying(!isPlaying));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <Item data={infoSong} type="songs" playingBar />
                </div>
                <div className={cx('player-bar')}>
                    <div className={cx('actions')}>
                        <Tippy content="Bật phát ngẫu nhiên" placement="top">
                            <Button circle isHover className={cx('actions-button')}>
                                <RandomIcon className={cx('icon-random')} />
                            </Button>
                        </Tippy>
                        <Button circle isHover className={cx('actions-button')}>
                            <PreviousIcon className={cx('icon-prev')} />
                        </Button>
                        {isPlaying ? (
                            <Button className={cx('button-play')} onClick={handleButtonPlay}>
                                <BsPauseCircle size={36} className={cx('icon-pause')} />
                            </Button>
                        ) : (
                            <Button className={cx('button-play')} onClick={handleButtonPlay}>
                                <BsPlayCircle size={36} className={cx('icon-play')} />
                            </Button>
                        )}
                        <Button circle isHover className={cx('actions-button')}>
                            <NextIcon className={cx('icon-next')} />
                        </Button>
                        <Tippy content="Bật phát lại tất cả" placement="top">
                            <Button circle isHover className={cx('actions-button')}>
                                <IoRepeatOutline size={24} className={cx('icon-repeat')} />
                            </Button>
                        </Tippy>
                    </div>
                    <div className={cx('duration-bar')}>
                        <div className={cx('time-left')}>{moment.utc(curTimeAudio * 1000).format('mm:ss')}</div>
                        <div className={cx('progress-bar')}>
                            <div ref={progressRef} className={cx('progress-slider')}></div>
                        </div>
                        <div className={cx('time-right')}>{moment.utc(infoSong.duration * 1000).format('mm:ss')}</div>
                    </div>
                </div>
                <div className={cx('right')}>Right</div>
            </div>
        </div>
    );
}

export default PlayingBar;

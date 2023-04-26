import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button/Button';
import { MicIcon, MvIcon, RestoreIcon, VolumeOffIcon, VolumeOnIcon } from '~/components/Icon';
import Item from '~/components/Item/Item';
import { getAlbum, setAllowGetAlbum, setIsAlbumSection } from '~/components/redux/Slice/AlbumSlice';
import {
    setAllowNext,
    setAllowPrevious,
    setCurVolume,
    setIsLoading,
    setVolumeOn,
} from '~/components/redux/Slice/PlayingBarSlice';
import { albumSelector, musicSelector, playingBarSelector, songSelector } from '~/components/redux/selectors';
import * as songService from '~/services/songService';
import { getAudio, getInfoSong, setIsPlaying } from '../../../redux/Slice/SongSlice';
import ActionBar from './ActionBar';
import styles from './PlayingBar.module.scss';
import { setCurSongId } from '~/components/redux/Slice/MusicSlice';
import { onToast } from '~/components/redux/Slice/ToastSlice';

const cx = classNames.bind(styles);

function PlayingBar() {
    const { audio, infoSong } = useSelector(songSelector);
    const { album, allowGetAlbum, isAlbumSection } = useSelector(albumSelector);
    const { curSongId } = useSelector(musicSelector);
    const { volumeOn, curVolume, repeat } = useSelector(playingBarSelector);
    const dispatch = useDispatch();
    const progressBarVolumeRef = useRef();
    const progressSliderVolumeRef = useRef();

    useEffect(() => {
        const resultApi = async () => {
            dispatch(setIsLoading(true));
            if (audio !== null) {
                audio.pause();
            }
            const resInfoSong = await songService.infoSong(curSongId);
            const resAudioSong = await songService.audioSong(curSongId);
            dispatch(setIsLoading(false));
            try {
                dispatch(getAudio(new Audio(resAudioSong?.data[128])));
            } catch {
                dispatch(onToast(resAudioSong.msg));
                album.forEach((song, index) => {
                    if (curSongId === song?.encodeId) {
                        if (index === album.length - 1) {
                            dispatch(setCurSongId(album[0].encodeId));
                        } else {
                            dispatch(setCurSongId(album[index + 1].encodeId));
                        }
                        dispatch(setIsPlaying(true));
                    }
                });
            }
            dispatch(getInfoSong(resInfoSong?.data));
            let resPlayList;
            let flagApi = false;

            try {
                resPlayList = await songService.playList(resInfoSong?.data?.album?.encodeId);
                flagApi = true;
            } catch {
                // Dont have album
                dispatch(setAllowNext(false));
            }
            if (allowGetAlbum && flagApi) {
                try {
                    dispatch(getAlbum(resPlayList?.data?.sections[0]?.items));
                } catch {
                    dispatch(getAlbum(resPlayList?.data?.song?.items));
                }
                dispatch(setAllowGetAlbum(false));
            }
        };
        if (repeat.type !== 'one') {
            resultApi();
        }
        if (curSongId === album[0]?.encodeId) {
            dispatch(setAllowPrevious(false));
        } else {
            let isSongInAlbum = false;
            console.log(album);
            album.forEach((song, index) => {
                if (curSongId === song.encodeId && index !== 0) {
                    isSongInAlbum = true;
                    dispatch(setAllowPrevious(true));
                }
            });
            if (!isSongInAlbum) {
                dispatch(setAllowPrevious(false));
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curSongId]);
    useEffect(() => {
        console.log(album);
        if (isAlbumSection) {
            dispatch(setCurSongId(album[0].encodeId));
            dispatch(setIsPlaying(true));
            dispatch(setIsAlbumSection(false));
        }
        if (album.length > 1) {
            dispatch(setAllowNext(true));
        } else {
            dispatch(setAllowNext(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [album]);

    //Handle Click

    const handleVolume = () => {
        if (volumeOn) {
            dispatch(setCurVolume(audio.volume));
            audio.volume = 0;
            progressSliderVolumeRef.current.style.cssText = `width: ${0}%`;
        } else {
            audio.volume = curVolume;
            progressSliderVolumeRef.current.style.cssText = `width: ${curVolume * 100}%`;
        }
        dispatch(setVolumeOn(!volumeOn));
    };

    const handleClickProgressBarVolume = (e) => {
        const progressBarRect = progressBarVolumeRef.current.getBoundingClientRect();
        const percent = Math.round(((e.clientX - progressBarRect.left) * 10000) / progressBarRect.width) / 100;
        audio.volume = percent / 100;
        progressSliderVolumeRef.current.style.cssText = `width: ${percent}%`;
        dispatch(setCurVolume(audio.volume));
        if (audio.volume !== 0) {
            dispatch(setVolumeOn(true));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <Item data={infoSong} type="songs" playingBar heartAction={true} />
                </div>
                <ActionBar />
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

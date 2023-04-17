import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { BsPlayFill } from 'react-icons/bs';
import 'tippy.js/dist/tippy.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';
import Action from '../Action';
import { setAllowGetAlbum } from '../redux/Slice/AlbumSlice';
import { setCurSongId } from '../redux/Slice/MusicSlice';
import { setIsPlaying } from '../redux/Slice/SongSlice';
import styles from './Item.module.scss';
import * as songService from '~/services/songService';
import { onToast } from '../redux/Slice/ToastSlice';

const cx = classNames.bind(styles);

function Item({ data, type, playingBar, search, isHover,heartAction, ...props }) {
    const [isClickPlay, setIsClickPlay] = useState(false);
    const classesSong = cx('result-item', 'songs', { playingBar, search, isHover });

    useEffect(() => {
        if (isClickPlay) {
            const resultApi = async () => {
                const resAudioSong = await songService.audioSong(data?.encodeId);
                if (resAudioSong.err !== 0 ) {
                    dispatch(onToast(resAudioSong.msg));
                    return;
                } else if (resAudioSong.err === 0) {
                    dispatch(setCurSongId(data?.encodeId));
                    dispatch(setIsPlaying(true));
                    dispatch(setAllowGetAlbum(true));
                }
            };
            resultApi();
            setIsClickPlay(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClickPlay]);
    const dispatch = useDispatch();
    const handleButtonPlay = () => {
        setIsClickPlay(true);
    };
    return (
        <>
            {type === 'artists' && (
                <Button to="/mymusic" className={cx('result-item')}>
                    <div className={cx('item-content-left')}>
                        <div className={cx('item-avatar')}>
                            <img className={cx('item-avatar-img')} src={data?.thumbnail} alt={data?.alias} />
                        </div>
                        <div className={cx('item-right')}>
                            <span className={cx('item-name')}>{data?.title || data?.name}</span>
                            <span className={cx('item-description')}>{data?.artistsNames || data?.alias}</span>
                        </div>
                    </div>
                </Button>
            )}
            {type === 'songs' && (
                <div className={classesSong}>
                    <div className={cx('item-content-left')}>
                        <div className={cx('item-avatar')}>
                            <img className={cx('item-avatar-img')} src={data?.thumbnail} alt={data?.alias} />
                            <Button className={cx('play-btn')} onClick={handleButtonPlay}>
                                <BsPlayFill />
                            </Button>
                        </div>
                        <div className={cx('item-right')}>
                            <Link to="/mymusic" className={cx('item-name')}>
                                {data?.title || data?.name}
                            </Link>
                            <span className={cx('item-description')}>{data?.artistsNames || data?.alias}</span>
                        </div>
                    </div>
                    <div className={cx('item-content-right')}>
                        <Action heartAction={heartAction} menuAction className={cx('action')} />
                    </div>
                </div>
            )}
        </>
    );
}
Item.propTypes = {
    playingBar: PropTypes.bool,
    data: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
};

export default Item;

import classNames from 'classnames/bind';
import { BsPlayFill } from 'react-icons/bs';
import 'tippy.js/dist/tippy.css';
import PropTypes from 'prop-types';

import Button from '~/components/Button';
import Action from '../Action';
import styles from './Item.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { musicSlice } from '../redux/Slice/MusicSlice';
import { songSlice } from '../redux/Slice/SongSlice';

const cx = classNames.bind(styles);

function Item({ data, type, playingBar, search, isHover, ...props }) {
    const classesSong = cx('result-item', 'songs', { playingBar, search, isHover });
    const dispatch = useDispatch();
    const handleButtonPlay = () => {
        dispatch(musicSlice.actions.setCurSongId(data.encodeId));
        dispatch(songSlice.actions.setIsPlaying(true));
    };
    return (
        <>
            {type === 'artists' && (
                <Button to="/mymusic" className={cx('result-item')}>
                    <div className={cx('item-content-left')}>
                        <div className={cx('item-avatar')}>
                            <img className={cx('item-avatar-img')} src={data.thumbnail} alt={data.alias} />
                        </div>
                        <div className={cx('item-right')}>
                            <span className={cx('item-name')}>{data.title || data.name}</span>
                            <span className={cx('item-description')}>{data.artistsNames || data.alias}</span>
                        </div>
                    </div>
                </Button>
            )}
            {type === 'songs' && (
                <div className={classesSong}>
                    <div className={cx('item-content-left')}>
                        <div className={cx('item-avatar')}>
                            <img className={cx('item-avatar-img')} src={data.thumbnail} alt={data.alias} />
                            <Button className={cx('play-btn')} onClick={handleButtonPlay}>
                                <BsPlayFill />
                            </Button>
                        </div>
                        <div className={cx('item-right')}>
                            <Link to="/mymusic" className={cx('item-name')}>
                                {data.title || data.name}
                            </Link>
                            <span className={cx('item-description')}>{data.artistsNames || data.alias}</span>
                        </div>
                    </div>
                    <div className={cx('item-content-right')}>
                        <Action heartAction menuAction className={cx('action')} />
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

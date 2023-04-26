import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsPlayCircle, BsThreeDots } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import { onToast } from '../redux/Slice/ToastSlice';
import styles from './Action.module.scss';
import { getAlbum, setIsAlbumSection } from '../redux/Slice/AlbumSlice';
import * as songService from '~/services/songService';

const cx = classNames.bind(styles);

function Action({ heartAction = false, menuAction = false, playAction = false, isSection = false, data, className }) {
    const [fillIconColor, setFillIconColor] = useState(false);

    const dispatch = useDispatch();

    let ContentTippyAction;

    if (fillIconColor) {
        ContentTippyAction = 'Xóa khỏi thư viện';
    } else {
        ContentTippyAction = 'Thêm vào thư viện';
    }

    const handleFillColor = () => {
        if (fillIconColor) {
            setFillIconColor(false);
            dispatch(onToast('Đã xóa bài hát khỏi thư viện'));
        } else {
            setFillIconColor(true);
            dispatch(onToast('Đã thêm bài hát vào thư viện'));
        }
    };
    const handlePlayButton = () => {
        let resPlayList;
        const resultApi = async () => {
            resPlayList = await songService.playList(data.encodeId);
            console.log(resPlayList)
            dispatch(getAlbum(resPlayList?.data?.song?.items));
            dispatch(setIsAlbumSection(true));
        }
        resultApi();
    }
    return (
        <div className={cx('wrapper', className)}>
            {heartAction && (
                <Tippy content={ContentTippyAction} placement="top">
                    <Button
                        circle
                        isHover
                        onClick={handleFillColor}
                        className={cx('button', isSection && 'heart-section')}
                    >
                        {fillIconColor ? (
                            <AiFillHeart size={16} className={cx('icon-fill')} /> // Fill icon color
                        ) : (
                            <AiOutlineHeart size={16} /> // Not Fill
                        )}
                    </Button>
                </Tippy>
            )}
            {playAction && (
                <Button className={cx('button', isSection && 'play-section')} onClick={handlePlayButton}>
                    <BsPlayCircle />
                </Button>
            )}
            {menuAction && (
                <Tippy content="Khác" placement="top">
                    <Button circle isHover className={cx('button', isSection && 'menu-section')}>
                        <BsThreeDots size={16} />
                    </Button>
                </Tippy>
            )}
        </div>
    );
}

Action.propTypes = {
    heartAction: PropTypes.bool,
    menuAction: PropTypes.bool,
};
export default Action;

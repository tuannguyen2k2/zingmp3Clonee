import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import { onToast } from '../redux/Slice/ToastSlice';
import styles from './Action.module.scss';

const cx = classNames.bind(styles);

function Action({ heartAction = false, menuAction = false, className }) {
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
    return (
        <div className={cx('wrapper', className)}>
            {heartAction && (
                <Tippy content={ContentTippyAction} placement="top">
                    <Button circle isHover onClick={handleFillColor} className={cx('button')}>
                        {fillIconColor ? (
                            <AiFillHeart size={16} className={cx('icon-fill')} /> // Fill icon color
                        ) : (
                            <AiOutlineHeart size={16} /> // Not Fill
                        )}
                    </Button>
                </Tippy>
            )}
            {menuAction && (
                <Tippy content="Khác" placement="top">
                    <Button circle isHover className={cx('button')}>
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

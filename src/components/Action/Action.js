import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import 'tippy.js/dist/tippy.css';
import PropTypes from 'prop-types';

import Button from '~/components/Button';
import styles from './Action.module.scss';
import { ToastContext } from '../Layout/DefaultLayout/DefaultLayout';

const cx = classNames.bind(styles);

function Action({ heartAction = false, menuAction = false }) {
    const [fillIconColor, setFillIconColor] = useState(false);

    const changeContentToast = useContext(ToastContext);

    let ContentTippyAction;

    if (fillIconColor) {
        ContentTippyAction = 'Xóa khỏi thư viện';
    } else {
        ContentTippyAction = 'Thêm vào thư viện';
    }

    const handleFillColor = () => {
        if (fillIconColor) {
            setFillIconColor(false);
            changeContentToast('Đã xóa bài hát khỏi thư viện');
        } else {
            setFillIconColor(true);
            changeContentToast('Đã thêm bài hát vào thư viện');
        }
    };
    return (
        <div className={cx('action-wrapper')}>
            {heartAction && (
                <Tippy content={ContentTippyAction} placement="top">
                    <div>
                        <Button circle onClick={handleFillColor} className={cx('action-btn')}>
                            {fillIconColor ? (
                                <AiFillHeart className={cx('icon-fill')} /> // Fill icon color
                            ) : (
                                <AiOutlineHeart /> // Not Fill
                            )}
                        </Button>
                    </div>
                </Tippy>
            )}
            {menuAction && (
                <Tippy content="Khác" placement="top">
                    <div>
                        <Button circle className={cx('action-btn')}>
                            <BsThreeDots />
                        </Button>
                    </div>
                </Tippy>
            )}
        </div>
    );
}


Action.propTypes = {
    heartAction: PropTypes.bool.isRequired,
    menuAction: PropTypes.bool.isRequired,
};
export default Action;

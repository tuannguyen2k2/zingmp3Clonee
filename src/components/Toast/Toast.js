import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import PropTypes from 'prop-types'

import styles from './Toast.module.scss';

const cx = classNames.bind(styles);

function Toast({ className, content }) {
    const [closeToast, setCloseToast] = useState(true);

    useEffect(() => {
        setCloseToast(true);
    }, [content]);
    if (closeToast === false) {
        return;
    }
    return (
        <div key={content} className={cx('container', className)}>
            <span>{content}</span>
            <button
                className={cx('btn-close')}
                onClick={() => {
                    setCloseToast(false);
                }}
            >
                <GrClose />
            </button>
        </div>
    );
}
Toast.propTypes = {
    className:PropTypes.string,
    content:PropTypes.string,
}

export default Toast;

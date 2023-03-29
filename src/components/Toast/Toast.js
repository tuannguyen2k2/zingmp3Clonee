import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';

import styles from './Toast.module.scss';

const cx = classNames.bind(styles);

function Toast({ className, id, content }) {
    const [closeToast, setCloseToast] = useState(true);

    useEffect(() => {
        setCloseToast(true);
    }, [content]);
    if (closeToast === false) {
        return;
    }
    return (
        <div key={id} className={cx('container', className)}>
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
    id: PropTypes.string,
    className: PropTypes.string,
    content: PropTypes.string,
};

export default Toast;

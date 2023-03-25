import classNames from 'classnames/bind';
import { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types'

import Toast from '~/components/Toast';
import styles from './DefaultLayout.module.scss';
import Header from './Header';
import Sidebar from './Sidebar';

const cx = classNames.bind(styles);

export const ToastContext = createContext();

function DefaultLayout({ children }) {
    const [content, setContent] = useState('');
    const [showToast, setShowToast] = useState(false);

    const changeContentToast = (contentToast) => {
        setContent(contentToast);
    };

    useEffect(() => {
        if(content=== ''){
            return;
        }
        setShowToast(true);
    }, [content]);

    return (
        <ToastContext.Provider value={changeContentToast}>
            <div className={cx('wrapper')}>
                <Sidebar />
                <div className={cx('container')}>
                    <Header />
                    <div className={cx('content')}>{children}</div>
                </div>
                {showToast && <Toast className={cx('toast')} content={content} />}
            </div>
        </ToastContext.Provider>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DefaultLayout;

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { createContext } from 'react';
import { useSelector } from 'react-redux';

import { toastSelector } from '~/components/redux/selectors';
import Toast from '~/components/Toast';
import styles from './DefaultLayout.module.scss';
import Header from './Header';
import Sidebar from './Sidebar';

const cx = classNames.bind(styles);

export const ToastContext = createContext();

function DefaultLayout({ children }) {
    const toast = useSelector(toastSelector);

    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('container')}>
                <Header />
                <div className={cx('content')}>{children}</div>
            </div>
            {toast.showToast && <Toast className={cx('toast')} id={toast.id} content={toast.contentToast} />}
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;

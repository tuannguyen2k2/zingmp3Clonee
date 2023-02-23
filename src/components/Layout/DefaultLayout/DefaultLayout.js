import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Toast from '~/components/Toast';
import styles from './DefaultLayout.module.scss';
import Header from './Header';
import Sidebar from './Sidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [data, setData] = useState('');
    const [showToast, setShowToast] = useState(false);

    const showToastFunc = (childData) => {
        setData(childData);
    };

    useEffect(() => {
        if (data === '') {
            return;
        }
        setShowToast(true);
    }, [data]);

    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('container')}>
                <Header showToastFunc={showToastFunc} />
                <div className={cx('content')}>{children}</div>
            </div>
            {showToast && <Toast className={cx('toast')} data={data} />}
        </div>
    );
}

export default DefaultLayout;

import styles from './Toast.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';

const cx = classNames.bind(styles);

function Toast({ className, data }) {
    const [toastContent, setToastContent] = useState(data);

    const [closeToast,setCloseToast] = useState(true);

    useEffect(() => {
        setCloseToast(true);
        setToastContent(data);
    }, [data]);
    if(closeToast === false){
        return
    }
    return (
        <div key={toastContent} className={cx('container', className)}>
            <span>{toastContent}</span>
            <button className={cx('icon-close')} onClick={() => {setCloseToast(false)}}><GrClose /></button>
        </div>
    );
}

export default Toast;

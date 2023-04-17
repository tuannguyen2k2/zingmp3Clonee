import classNames from "classnames/bind";
import styles from './MyMusic.module.scss';

const cx = classNames.bind(styles);
function MyMusic() {
    return ( <div className={cx('wrapper')}>
        MyMusic
    </div> );
}

export default MyMusic;
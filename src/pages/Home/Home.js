import classNames from "classnames/bind";
import styles from './Home.module.scss';
import Slider from "./Slider";

const cx = classNames.bind(styles);
function Home() {
    return ( <div className={cx('wrapper')}>
    <Slider/>
    <div className={cx('content')}>Content</div>
</div>);
}

export default Home;
import classNames from "classnames/bind";
import styles from './Home.module.scss';
import Slider from "./Slider";
import NewReleaseSection from "./Section/NewReleaseSection";

const cx = classNames.bind(styles);

function Home() {
    return ( <div className={cx('wrapper')}>
    <Slider/>
    <NewReleaseSection/>
</div>);
}

export default Home;
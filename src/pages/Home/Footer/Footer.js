import classNames from "classnames/bind";
import styles from './Footer.module.scss';
import images from "~/assets/images";
const cx = classNames.bind(styles);
function Footer() {
    return ( 
        <div className={cx('wrapper')}>
            <pre className={cx('title-footer')}>C R E A T E   B Y</pre>
            <img src={images.imageFooter} alt="tuannguyennocode" className={cx('image-footer')}/>
        </div>
     );
}

export default Footer;
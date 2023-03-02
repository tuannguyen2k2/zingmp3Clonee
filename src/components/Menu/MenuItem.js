import classNames from 'classnames/bind';
import Menu from './Menu';
import { RiArrowRightSLine } from 'react-icons/ri';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);
function MenuItem({ data }) {
    if (data.children) {
        return (
            <Menu data={data.children} tippyPlacement="left" tippyOffSet={[30, -6]}>
                <button className={cx('menu-item')}>
                    <span className={cx('item-icon')}>{data.icon}</span>
                    <span className={cx('item-text')}>{data.text}</span>
                    <span className={cx('item-arrow')}>
                        <RiArrowRightSLine />
                    </span>
                </button>
            </Menu>
        );
    } else {
        if (data.id === 3) {
            return (
                <button className={cx('menu-item','option') } >
                    <div className={cx('option-btn')}>
                        <span className={cx('option-title')}>{data.title}</span>
                        <span className={cx('option-description')}>{data.description}</span>
                    </div>
                    <span className={cx('option-icon')}>{data.icon}</span>
                </button>
            );
        } else {
            return (
                <button className={cx('menu-item')}>
                    <span className={cx('item-icon')}>{data.icon}</span>
                    <span className={cx('item-text')}>{data.text}</span>
                </button>
            );
        }
    }
}

export default MenuItem;

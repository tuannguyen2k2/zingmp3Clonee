import classNames from 'classnames/bind';
import { RiArrowRightSLine } from 'react-icons/ri';
import PropTypes from 'prop-types'
import Menu from './Menu';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);
function MenuItem({ data }) {
    //Neu data co children
    if (data.children) {
        return (
            <Menu data={data.children} tippyPlacement="left" tippyOffSet={[30, -6]} hideOnClick={false}>
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
        // Children Chat luong nhac
        if (data.type === 'SD' || data.type === 'HD') {
            return (
                <button
                    className={cx('menu-item', 'option')}
                    onClick={() => {
                        data.setChangeOption(data.type);
                    }}
                >
                    <div className={cx('option-btn')}>
                        <span className={cx('option-title')}>{data.title}</span>
                        <span className={cx('option-description')}>{data.description}</span>
                    </div>
                    <span className={cx('option-icon')}>{data.icon}</span>
                </button>
            );
        } else {
            //Neu data khong co children
            return (
                <button className={cx('menu-item',data.lineTop && 'line-top')}>
                    <span className={cx('item-icon')}>{data.icon}</span>
                    <span className={cx('item-text')}>{data.text}</span>
                </button>
            );
        }
    }
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
}

export default MenuItem;

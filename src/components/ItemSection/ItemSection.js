import classNames from 'classnames/bind';
import styles from './ItemSection.module.scss';
import Action from '../Action/Action';

const cx = classNames.bind(styles);
function ItemSection({ data, className, ...props }) {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('item-avatar')}>
                <img className={cx('item-img')} src={data?.thumbnail} alt={data?.alias} />
                <Action heartAction playAction menuAction isSection className={cx('action-button')} data={data} />
            </div>
            <div className={cx('item-description')}>{data?.sortDescription || data?.title}</div>
        </div>
    );
}

export default ItemSection;

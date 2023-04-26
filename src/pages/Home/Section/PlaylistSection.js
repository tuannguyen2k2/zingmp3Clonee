/* eslint-disable array-callback-return */
import classNames from 'classnames/bind';
import styles from './Section.module.scss';
import ItemSection from '~/components/ItemSection/ItemSection';
const cx = classNames.bind(styles);

function PlaylistSection({ title, playList }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-section')}>{title}</div>
            <div className={cx('play-list')}>
                {playList.map((item, index) => {
                    if (index < 5) {
                        return <ItemSection key={item.encodeId} data={item} className={cx('item-section')}/>;
                    }
                })}
            </div>
        </div>
    );
}

export default PlaylistSection;

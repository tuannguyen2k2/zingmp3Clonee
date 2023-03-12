import classNames from 'classnames/bind';
import { MdShowChart } from 'react-icons/md';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function SearchPropose({ proposeList }) {
    return (
        <div className={cx('propose')}>
            <div className={cx('propose-title')}>Đề xuất cho bạn</div>
            {proposeList.map((item,index) => (
                <div key={index} className={cx('propose-item')}>
                    <span className={cx('propose-icon')}>
                        <MdShowChart />
                    </span>
                    <span className={cx('propose-text')}>{item.title}</span>
                </div>
            ))}
        </div>
    );
}

export default SearchPropose;

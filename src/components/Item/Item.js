import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import Button from '~/components/Button';
import styles from './Item.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Item({ showToastFunc, song, singer,data, ...props}) {
    const [fillIconColor, setFillIconColor] = useState(false);

    let ContentTippyAction;

    if (fillIconColor) {
        ContentTippyAction = 'Xóa khỏi thư viện';
    } else {
        ContentTippyAction = 'Thêm vào thư viện';
    }

    const handleFillColor = () => {
        if (fillIconColor) {
            setFillIconColor(false);
            showToastFunc('Đã xóa bài hát khỏi thư viện');
        } else {
            setFillIconColor(true);
            showToastFunc('Đã thêm bài hát vào thư viện');
        }
    };
    const classes = cx('result-item', data.type);
    return (
        <div className={classes}>
            <div className={cx('item-content-left')}>
                <img
                    className={cx('item-avatar')}
                    src={data.src}
                    alt={data.alt}
                />
                <div className={cx('item-right')}>
                    <span className={cx('item-name')}>{data.name}</span>
                    <span className={cx('item-description')}>{data.description}</span>
                </div>
            </div>
            {data.type !== 'singer' ? <div className={cx('item-content-right')}>
                <Tippy content={ContentTippyAction} placement="top">
                    <div>
                        <Button searchResult circle onClick={handleFillColor}>
                            {fillIconColor ? (
                                <AiFillHeart className={cx('icon-fill')} /> // Fill icon color
                            ) : (
                                <AiOutlineHeart /> // Not Fill
                            )}
                        </Button>
                    </div>
                </Tippy>
                <Tippy content="Khác" placement="top">
                    <div>
                        <Button searchResult circle>
                            <BsThreeDots />
                        </Button>
                    </div>
                </Tippy>
            </div>:''}
        </div>
    );
}

export default Item;

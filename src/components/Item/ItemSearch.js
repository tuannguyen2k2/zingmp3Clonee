import classNames from 'classnames/bind';
import { BsPlayFill } from 'react-icons/bs';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import Action from '../Action';
import styles from './Item.module.scss';

const cx = classNames.bind(styles);

function ItemSearch({ showToastFunc, song, singer,data,type, ...props}) {
   
    const classes = cx('result-item', type);
    return (
        <Button to='/mymusic' className={classes}>
            <div className={cx('item-content-left')}>
                <div className={cx('item-avatar')}>
                    <img
                        className={cx('item-avatar-img')}
                        src={data.thumbnail}
                        alt={data.alias}
                    />
                {type === 'song' && <Button className={cx('play-btn')}>
                    <BsPlayFill/>
                </Button>}  
                </div>
                <div className={cx('item-right')}>
                    <span className={cx('item-name')}>{data.title || data.name}</span>
                    <span className={cx('item-description')}>{data.artistsNames || data.alias}</span>
                </div>
            </div>
            {type === 'song' ? <div className={cx('item-content-right')}>
                <Action heartAction menuAction/>
            </div>:''}
        </Button>
    );
}

export default ItemSearch;

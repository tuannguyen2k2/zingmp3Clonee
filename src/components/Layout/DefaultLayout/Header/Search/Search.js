import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';

import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import Button from '~/components/Button';
import { SearchIcon } from '~/components/Icon';
import { Wrapper as PopperWrapper } from '~/components/Wrapper';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search({ showToastFunc }) {
    const [haveSearchResults, setHaveSearchResults] = useState(false);
    const [fillIconColor, setFillIconColor] = useState(false);

    //Set noi dung tippy
    let ContentTippyAction;

    if (fillIconColor) {
        ContentTippyAction = 'Xóa khỏi thư viện';
    } else {
        ContentTippyAction = 'Thêm vào thư viện';
    }

    const handleFillColor = () => {
        if (fillIconColor) {
            console.log(haveSearchResults);
            setFillIconColor(false);
            showToastFunc('Đã xóa bài hát khỏi thư viện');
        } else {
            setFillIconColor(true);
            showToastFunc('Đã thêm bài hát vào thư viện');
        }
    };

    return (
        <HeadlessTippy
            onClickOutside={() => setHaveSearchResults(false)}
            interactive
            placement="bottom-end"
            offset={0}
            visible={haveSearchResults}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <div className={cx('horizontal-line')}></div>
                    <div className={cx('search-title')}>Gợi ý kết quả</div>
                    <div className={cx('result-item', 'singer')}>
                        <div className={cx('item-content-left')}>
                            <img
                                className={cx('item-avatar')}
                                src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/b/f/9/6/bf969389e9de70560cede36559c8ca4a.jpg"
                                alt="HIEUTHUHAI"
                            />
                            <div className={cx('item-right')}>
                                <span className={cx('item-name')}>HIEUTHUHAI</span>
                                <span className={cx('item-description')}>Nghệ sĩ • 55K quan tâm</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('result-item', 'song')}>
                        <div className={cx('item-content-left')}>
                            <img
                                className={cx('item-avatar')}
                                src="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_webp/cover/4/f/2/c/4f2c012fc22a3773d44d6c00936f1210.jpg"
                                alt="ngumotminh"
                            />
                            <div className={cx('item-right')}>
                                <span className={cx('item-name')}>ngủ một mình</span>
                                <span className={cx('item-description')}>HIEUTHUHAI, Nagav, Kewtiie</span>
                            </div>
                        </div>
                        <div className={cx('item-content-right')}>
                            <Tippy content={ContentTippyAction} placement="top">
                                <div>
                                    <Button searchResult circle onClick={handleFillColor}>
                                        {fillIconColor ? (
                                            <AiFillHeart className={cx('icon-fill')} /> //Fill icon color
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
                        </div>
                    </div>
                </div>
            )}
        >
            <div>
                <PopperWrapper>
                    <div className={cx('search', haveSearchResults ? 'collapse' : '')}>
                        <button className={cx('search-btn')}>
                            <SearchIcon className={cx('search-icon')} width="23px" height="23px" />
                        </button>
                        <input
                            onFocus={() => {
                                setHaveSearchResults(true);
                            }}
                            className={cx('search-input')}
                            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                        />
                    </div>
                </PopperWrapper>
            </div>
        </HeadlessTippy>
    );
}

export default Search;

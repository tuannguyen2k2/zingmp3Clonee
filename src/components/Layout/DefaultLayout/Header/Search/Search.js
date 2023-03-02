import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import { GrClose } from 'react-icons/gr';

import { useState } from 'react';
import { SearchIcon } from '~/components/Icon';
import Item from '~/components/Item';
import { Wrapper as PopperWrapper } from '~/components/Wrapper';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search({ showToastFunc }) {
    const [haveSearchResults, setHaveSearchResults] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    //Fake Data
    const dataResult = [
        {
            type: 'singer',
            name: 'HIEUTHUHAI',
            description: 'Nghệ sĩ • 55K quan tâm',
            src: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/b/f/9/6/bf969389e9de70560cede36559c8ca4a.jpg',
            alt: 'HIEUTHUHAI',
        },
        {
            type: 'singer',
            name: 'HIEUTHUHAI',
            description: 'Nghệ sĩ • 55K quan tâm',
            src: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/b/f/9/6/bf969389e9de70560cede36559c8ca4a.jpg',
            alt: 'HIEUTHUHAI',
        },
        {
            type: 'singer',
            name: 'HIEUTHUHAI',
            description: 'Nghệ sĩ • 55K quan tâm',
            src: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/b/f/9/6/bf969389e9de70560cede36559c8ca4a.jpg',
            alt: 'HIEUTHUHAI',
        },
        {
            type: 'song',
            name: 'ngủ một mình (tình rất tình)',
            description: ' HIEUTHUHAI, Negav, Kewtiie',
            src: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_webp/cover/4/f/2/c/4f2c012fc22a3773d44d6c00936f1210.jpg',
            alt: 'HIEUTHUHAI',
        },
        {
            type: 'song',
            name: 'ngủ một mình (tình rất tình)',
            description: ' HIEUTHUHAI, Negav, Kewtiie',
            src: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_webp/cover/4/f/2/c/4f2c012fc22a3773d44d6c00936f1210.jpg',
            alt: 'HIEUTHUHAI',
        },
    ];



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

                    {dataResult.map((data,index) => (
                        <Item key={index} showToastFunc={showToastFunc} data={data} />
                    ))}
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
                            value={searchValue}
                            onFocus={() => {
                                setHaveSearchResults(true);
                            }}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                            className={cx('search-input')}
                            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                        />
                        {searchValue !== '' ? (
                            <button className={cx('btn-close')} onClick={() => {setSearchValue('')}}>
                                <GrClose />
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                </PopperWrapper>
            </div>
        </HeadlessTippy>
    );
}

export default Search;

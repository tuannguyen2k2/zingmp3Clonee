import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import 'tippy.js/dist/tippy.css';
import { useDebounce } from '~/components/hooks';

import { SearchIcon } from '~/components/Icon';
import { Wrapper as PopperWrapper } from '~/components/Wrapper';
import * as searchServices from '~/services/searchService';
import styles from './Search.module.scss';
import SearchPropose from './SearchPropose';
import SearchResults from './SearchResults';

const cx = classNames.bind(styles);

function Search() {
    const [showSearchList, setShowSearchList] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [proposeList, setProposeList] = useState([]);

    const debounceValue = useDebounce(searchValue, 500);
    // Get data topSuggest
    useEffect(() => {
        const proposeApi = async () => {
            const res = await searchServices.search();
            setProposeList(res.data.topSuggest);
           
        };
        proposeApi();
    }, []);
    //Get data searchResult
    useEffect(() => {
        const resultApi = async () => {
            const res = await searchServices.search(debounceValue);
            setSearchResults(res.data);
        };
        resultApi();
    }, [debounceValue]);

    return (
        <HeadlessTippy
            onClickOutside={() => setShowSearchList(false)}
            interactive
            placement="bottom-end"
            offset={0}
            visible={showSearchList}
            render={(attrs) => (
                <div className={cx('wrapper')}>
                    <div className={cx('search-list')} tabIndex="-1" {...attrs}>
                       <div className={cx('search-list-content')}>
                            {showResults ? (
                                <div className={cx('search-result')}>
                                    <div className={cx('keyword')}>
                                        <div className={cx('keyword-title')}>Từ khóa liên quan</div>
                                        <div className={cx('keyword-item')}>
                                            <span className={cx('keyword-icon')}>
                                                <SearchIcon width="20px" height="20px" />
                                            </span>
                                            <pre className={cx('keyword-text')}>
                                                Tìm kiếm <span className={cx('keyword-search')}>"{searchValue}"</span>
                                            </pre>
                                        </div>
                                    </div>
                                    <SearchResults searchResults={searchResults} />
                                </div>
                            ) : (
                                <SearchPropose proposeList={proposeList} />
                            )}
                       </div>
                    </div>
                </div>
            )}
        >
            <div>
                <PopperWrapper>
                    <div className={cx('search', showSearchList ? 'collapse' : '')}>
                        <button className={cx('search-btn')}>
                            <SearchIcon className={cx('search-icon')} width="23px" height="23px" />
                        </button>
                        <input
                            value={searchValue}
                            onFocus={() => {
                                setShowSearchList(true);
                            }}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                                if (e.target.value === '') {
                                    setShowResults(false);
                                } else {
                                    setShowResults(true);
                                }
                            }}
                            className={cx('search-input')}
                            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                        />
                        {searchValue !== '' ? (
                            <button
                                className={cx('btn-close')}
                                onClick={() => {
                                    setSearchValue('');
                                    setShowResults(false);
                                }}
                            >
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

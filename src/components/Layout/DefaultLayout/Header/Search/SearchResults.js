import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import PropTypes from 'prop-types';

import Item from '~/components/Item';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function SearchResults({ searchResults = {} }) {
    const resultType = {
        songs: false,
        artists: false,
    };
    if (typeof searchResults.songs === 'object') {
        resultType.songs = true;
    }
    if (typeof searchResults.artists === 'object') {
        resultType.artists = true;
    }
    if (resultType.songs || resultType.artists) {
        return (
            <div className={cx('result')}>
                <div className={cx('horizontal-line')}></div>
                <div className={cx('search-title')}>Gợi ý kết quả</div>
                {resultType.artists &&
                    searchResults.artists.map((data, index) => <Item key={index} data={data} type="artists" />)}
                {resultType.songs &&
                    searchResults.songs.map((data, index) => <Item key={index} data={data} type="songs" search isHover heartAction={true}/>)}
            </div>
        );
    }
}
SearchResults.propTypes = {
    searchResults: PropTypes.object.isRequired,
};

export default SearchResults;

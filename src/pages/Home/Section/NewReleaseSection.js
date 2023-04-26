/* eslint-disable array-callback-return */
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Button from '~/components/Button/Button';
import Item from '~/components/Item/Item';
import styles from './Section.module.scss';

const cx = classNames.bind(styles);
const BUTTON_CHANGE = ['TẤT CẢ', 'VIỆT NAM', 'QUỐC TẾ'];
const COLUMN_NUMBER = [0, 1, 2];

function NewReleaseSection({newReleaseResponse}) {
    const [genresSelect, setGenresSelect] = useState(0);
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        if (genresSelect === 0) {
            setDataTable(newReleaseResponse?.all);
        } else if (genresSelect === 1) {
            setDataTable(newReleaseResponse?.vPop);
        } else {
            setDataTable(newReleaseResponse?.others);
        }
    }, [genresSelect, newReleaseResponse]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-section')}>Mới phát hành</div>
            <div className={cx('genre-select')}>
                {BUTTON_CHANGE.map((item, index) => (
                    <Button
                        key={index}
                        rounded
                        className={cx('button-select', genresSelect === index && 'active-button')}
                        onClick={() => {
                            setGenresSelect(index);
                        }}
                    >
                        {item}
                    </Button>
                ))}
            </div>
            <div className={cx('table')}>
                {COLUMN_NUMBER.map((column) => (
                    <div key={column} className={cx('column')}>
                        {dataTable !== undefined && dataTable.map((item, index) => {
                            if (column * 4 <= index && index < column * 4 + 4) {
                                return <Item key={item.encodeId} data={item} type="songs" isHover search />;
                            }
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewReleaseSection;

/* eslint-disable array-callback-return */
import classNames from 'classnames/bind';
import styles from './Section.module.scss';
import Button from '~/components/Button/Button';
import { useEffect, useState } from 'react';
import * as homeService from '~/services/homeService';
import Item from '~/components/Item/Item';

const cx = classNames.bind(styles);
const BUTTON_CHANGE = ['TẤT CẢ', 'VIỆT NAM', 'QUỐC TẾ'];
const COLUMN_NUMBER = [0, 1, 2];

function NewReleaseSection() {
    const [genresSelect, setGenresSelect] = useState(0);
    const [newRelease, setNewRelease] = useState({});
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        const resultApi = async () => {
            const res = await homeService.home();
            // eslint-disable-next-line array-callback-return
            res.data.items.map((item) => {
                if (item.sectionType === 'new-release') {
                    setNewRelease(item);
                }
            });
        };
        resultApi();
    }, []);
    useEffect(() => {
        console.log(dataTable);
        if (genresSelect === 0) {
            setDataTable(newRelease?.items?.all);
        } else if (genresSelect === 1) {
            setDataTable(newRelease?.items?.vPop);
        } else {
            setDataTable(newRelease?.items?.others);
        }
    }, [genresSelect, newRelease]);
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

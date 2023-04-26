/* eslint-disable array-callback-return */
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Home.module.scss';
import Slider from './Slider';
import NewReleaseSection from './Section/NewReleaseSection';
import * as homeService from '~/services/homeService';
import PlaylistSection from './Section/PlaylistSection';
import Footer from './Footer';

const cx = classNames.bind(styles);

function Home() {
    const [listBannerResponse, setListBannerResponse] = useState([]);
    const [newReleaseResponse, setNewReleaseResponse] = useState({});
    const [playLists, setPlayLists] = useState([]);
    useEffect(() => {
        //Call Api
        const resultApi = async () => {
            const res = await homeService.home();
            let resPlayLists =[];
            res.data.items.map((item) => {
                if (item.sectionType === 'banner') {
                    setListBannerResponse(item.items);
                }
                if (item.sectionType === 'new-release') {
                    setNewReleaseResponse(item.items);
                }
                if (item.sectionType === 'playlist') {
                    resPlayLists = [...resPlayLists, item];
                }
            });
            setPlayLists(resPlayLists);
        };
        resultApi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(playLists)
    return (
        <div className={cx('wrapper')}>
            <Slider listBannerResponse={listBannerResponse} />
            <NewReleaseSection newReleaseResponse={newReleaseResponse} />
            {playLists.map((playList) => (
                <PlaylistSection key={playList.sectionId} title={playList.title} playList={playList.items} />
            ))}
            <Footer/>
        </div>
    );
}

export default Home;

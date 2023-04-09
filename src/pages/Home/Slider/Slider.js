import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import * as homeService from '~/services/homeService';
import styles from './Slider.module.scss';
import Button from '~/components/Button';
import { useDispatch } from 'react-redux';
import { musicSlice } from '~/components/redux/Slice/MusicSlice';
import { songSlice } from '~/components/redux/Slice/SongSlice';

const cx = classNames.bind(styles);
let indexBannerOne = 0;
let indexBannerTwo = 1;
let indexBannerThree = 2;
let listBannerResponse = [];
let isListBannerNext = false;
let isListBannerPrev = false;

function Slider() {
    const [listBanner, setListBanner] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        //Call Api
        const resultApi = async () => {
            const res = await homeService.home();
            //Assign data banner for listBannerResponse
            listBannerResponse = res.data.items[0].items;
            //Set default 3 banner
            setListBanner([
                listBannerResponse[indexBannerOne],
                listBannerResponse[indexBannerTwo],
                listBannerResponse[indexBannerThree],
            ]);
            isListBannerNext = true;
        };
        resultApi();
    }, []);

    const setListBannerPrev = () => {
        if (indexBannerOne === 0) {
            indexBannerOne = 6;
        }
        if (indexBannerTwo === 0) {
            indexBannerTwo = 6;
        }
        if (indexBannerThree === 0) {
            indexBannerThree = 6;
        }
        setListBanner([
            listBannerResponse[(indexBannerOne -= 1)],
            listBannerResponse[(indexBannerTwo -= 1)],
            listBannerResponse[(indexBannerThree -= 1)],
        ]);
    };
    const setListBannerNext = () => {
        if (indexBannerOne === 5) {
            indexBannerOne = -1;
        }
        if (indexBannerTwo === 5) {
            indexBannerTwo = -1;
        }
        if (indexBannerThree === 5) {
            indexBannerThree = -1;
        }
        setListBanner([
            listBannerResponse[(indexBannerOne += 1)],
            listBannerResponse[(indexBannerTwo += 1)],
            listBannerResponse[(indexBannerThree += 1)],
        ]);
    };
    const handleClickBanner = (item) => {
        if (item.type === 1) {
            dispatch(musicSlice.actions.setCurSongId(item.encodeId));
            dispatch(songSlice.actions.setIsPlaying(true));
        }
    };
    //HandleButton
    const handleButtonRight = () => {
        setListBannerNext();
        isListBannerNext = true;
    };

    const handleButtonLeft = () => {
        setListBannerPrev();
        isListBannerPrev = true;
    };
    // When listBanner is changed
    useEffect(() => {
        const listBannerElement = document.getElementsByClassName(cx('banner'));
        for (let item of listBannerElement) {
            item.classList.remove(cx('animation-prev-three'));
            item.classList.remove(cx('animation-prev-two'));
            item.classList.remove(cx('animation-prev-one'));
            item.classList.remove(cx('animation-next-three'));
            item.classList.remove(cx('animation-next-two'));
            item.classList.remove(cx('animation-next-one'));
        }

        if (isListBannerNext) {
            //Add animation
            for (let item of listBannerElement) {
                if (item.src === listBanner[2].banner) {
                    item.classList.add(cx('animation-next-three'));
                }
                if (item.src === listBanner[1].banner) {
                    item.classList.remove(cx('animation-next-three'));
                    item.classList.add(cx('animation-next-two'));
                }
                if (item.src === listBanner[0].banner) {
                    item.classList.remove(cx('animation-next-two'));
                    item.classList.add(cx('animation-next-one'));
                }
            }
        } else if (isListBannerPrev) {
            //Add animation
            for (let item of listBannerElement) {
                if (item.src === listBanner[0].banner) {
                    item.classList.add(cx('animation-prev-three'));
                }
                if (item.src === listBanner[1].banner) {
                    item.classList.remove(cx('animation-prev-three'));
                    item.classList.add(cx('animation-prev-two'));
                }
                if (item.src === listBanner[2].banner) {
                    item.classList.remove(cx('animation-prev-two'));
                    item.classList.add(cx('animation-prev-one'));
                }
            }
        }
        //Change banner every 4.2 second
        const interValid = setInterval(() => {
            setListBannerNext();
            isListBannerNext = true;
        }, 4200);
        isListBannerNext = false;
        isListBannerPrev = false;

        return () => {
            interValid && clearInterval(interValid);
        };
    }, [listBanner]);
    return (
        <div className={cx('slider')}>
            {listBanner.map((item) => (
                <img
                    className={cx('banner')}
                    onClick={() => handleClickBanner(item)}
                    key={item.encodeId}
                    src={item.banner}
                    alt=""
                />
            ))}
            <Button circle className={cx('btn-control', 'btn-left')} onClick={handleButtonLeft}>
                <SlArrowLeft size={30} />
            </Button>
            <Button circle className={cx('btn-control', 'btn-right')} onClick={handleButtonRight}>
                <SlArrowRight size={30} />
            </Button>
        </div>
    );
}

export default Slider;

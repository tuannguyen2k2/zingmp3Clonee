import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import 'tippy.js/dist/tippy.css'; // optional
import { FaBan } from 'react-icons/fa';
import { MdOutlineHighQuality } from 'react-icons/md';
import { AiOutlineCheck } from "react-icons/ai";

import Button from '~/components/Button';
import { DownloadIcon, TopicIcon, VipIcon } from '~/components/Icon';
import Menu from '~/components/Menu';
import styles from './Header.module.scss';
import Navigation from './Navigation';
import Search from './Search';
const cx = classNames.bind(styles);

const MENU_SETTINGS = [
    {
        id: 1,
        icon: <FaBan size={20} />,
        text: 'Danh sách chặn',
        children: '',
    },
    {
        id: 2,
        icon: <MdOutlineHighQuality size={20} />,
        text: 'Chất lượng nhạc',
        children: [
            {
                id: 3,
                title: 'SQ • 128',
                description: 'Giảm sử dụng dữ liệu cho các kết nối chậm hơn.',
                icon:<AiOutlineCheck size={20}/>
            },
            {
                id: 3,
                title: 'HQ • 320',
                description: 'Kết hợp tốt nhất giữa việc sử dụng dữ liệu và chất lượng âm thanh.',
                icon:<AiOutlineCheck size={20}/>
            },
        ],
    },
];

function Header({ showToastFunc }) {
    const stateHistoryWindow = window.history.state;

    const [enableArrowLeft, setEnableArrowLeft] = useState(false);
    const [enableArrowRight, setEnableArrowRight] = useState(false);
    const [indexHistory, setIndexHistory] = useState(stateHistoryWindow.idx);
    const [indexCurrent] = useState(stateHistoryWindow.idx);

    useEffect(() => {
        if (stateHistoryWindow.idx > indexCurrent) {
            setEnableArrowLeft(true);
        } else if (stateHistoryWindow.idx === indexCurrent) {
            setEnableArrowLeft(false);
        }

        if (stateHistoryWindow.idx > indexHistory) {
            setIndexHistory(stateHistoryWindow.idx);
        } else if (stateHistoryWindow.idx === indexHistory) {
            setEnableArrowRight(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateHistoryWindow.idx]);

    const handleGoForward = () => {
        window.history.forward();
    };

    const handleGoBack = () => {
        window.history.back();
        setEnableArrowRight(true);
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('action-left')}>
                {enableArrowLeft ? (
                    <Navigation enabled onClick={handleGoBack}>
                        <BsArrowLeft />
                    </Navigation>
                ) : (
                    <Navigation disabled onClick={handleGoBack}>
                        <BsArrowLeft />
                    </Navigation>
                )}
                {enableArrowRight ? (
                    <Navigation enabled onClick={handleGoForward}>
                        <BsArrowRight />
                    </Navigation>
                ) : (
                    <Navigation disabled onClick={handleGoForward}>
                        <BsArrowRight />
                    </Navigation>
                )}

                <Search showToastFunc={showToastFunc} />
            </div>
            <div className={cx('action-right')}>
                <Button href="/download" header rounded className={cx('download-btn')}>
                    <DownloadIcon className={cx('download-icon')} width="20px" height="20px" />
                    <span>Tải bản Windows</span>
                </Button>
                <Tippy content="Chủ đề" placement="bottom">
                    <div className={cx('action-btn')}>
                        <Button header circle>
                            <TopicIcon width="21px" height="21px" />
                        </Button>
                    </div>
                </Tippy>
                <Tippy content="Nâng cấp VIP" placement="bottom">
                    <div className={cx('action-btn')}>
                        <Button header circle>
                            <VipIcon fill="#dadada" />
                        </Button>
                    </div>
                </Tippy>
                <Menu data={MENU_SETTINGS}>
                    <Tippy content="Cài đặt" placement="bottom">
                        <div className={cx('action-btn')}>
                            <Button header circle className={cx('setting-btn')}>
                                <FiSettings className={cx('setting-icon')} />
                            </Button>
                        </div>
                    </Tippy>
                </Menu>
                <Button header circle className={cx('avatar-user-btn')}>
                    <img
                        src="https://s120.avatar.talk.zdn.vn/1/2/9/2/3/120/f9b3b9ae6e38ee44074b0c322fe4a9ad.jpg"
                        alt="Avatar"
                    />
                </Button>
            </div>
        </header>
    );
}

export default Header;

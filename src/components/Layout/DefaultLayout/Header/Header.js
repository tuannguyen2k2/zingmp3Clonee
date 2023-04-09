import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { AiOutlineCheck, AiOutlinePlayCircle } from 'react-icons/ai';
import { FaBan, FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';
import { FiSettings, FiUpload } from 'react-icons/fi';
import { TbArrowAutofitRight } from 'react-icons/tb';
import { RiVipLine, RiVipCrown2Line } from 'react-icons/ri';
import { GoSignOut } from 'react-icons/go';
import 'tippy.js/dist/tippy.css'; // optional

import Button from '~/components/Button';
import { DownloadIcon, TopicIcon, VipIcon } from '~/components/Icon';
import Menu from '~/components/Menu';
import styles from './Header.module.scss';
import Navigation from './Navigation';
import Search from './Search';
const cx = classNames.bind(styles);
const MENU_AVATARS = [
    {
        icon: <RiVipCrown2Line size={20} />,
        text: 'Nâng cấp vip',
    },
    {
        icon: <RiVipLine size={20} />,
        text: 'Mua code vip',
    },
    {
        icon: <FiUpload size={20} />,
        text: 'Tải lên',
    },
    {
        icon: <GoSignOut size={20} />,
        text: 'Đăng xuất',
        lineTop: true,
    },
];

function Header() {
    const [changeOption, setChangeOption] = useState('SD');
    const [isVisibleSetting, setIsVisibleSetting] = useState(false);
    const [isVisibleAvatar, setIsVisibleAvatar] = useState(false);

    const MENU_SETTINGS = [
        {
            icon: <FaBan size={20} />,
            text: 'Danh sách chặn',
        },
        {
            icon: changeOption === 'SD' ? <FaTemperatureLow size={20} /> : <FaTemperatureHigh size={20} />,
            text: 'Chất lượng nhạc',
            children: [
                {
                    type: 'SD',
                    title: 'SD • 128',
                    description: 'Giảm sử dụng dữ liệu cho các kết nối chậm hơn.',
                    icon: changeOption === 'SD' ? <AiOutlineCheck size={20} /> : '',
                    setChangeOption,
                },
                {
                    type: 'HD',
                    title: 'HD • 320',
                    description: 'Kết hợp tốt nhất giữa việc sử dụng dữ liệu và chất lượng âm thanh.',
                    icon: changeOption === 'HD' ? <AiOutlineCheck size={20} /> : '',
                    setChangeOption,
                },
            ],
        },
        {
            icon: <AiOutlinePlayCircle size={20} />,
            text: 'Giao diện',
        },
        {
            icon: <TbArrowAutofitRight size={20} />,
            text: 'Chuyển bài',
        },
    ];
    const handleOutSideSetting = () => {
        setIsVisibleSetting(false);
    };
    const handleOutSideAvatar = () => {
        setIsVisibleAvatar(false);
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('action-left')}>
                <Navigation />
                <Search />
            </div>
            <div className={cx('action-right')}>
                <Button href="/download" header rounded className={cx('download-btn')}>
                    <DownloadIcon className={cx('download-icon')} width="20px" height="20px" />
                    <span>Tải bản Windows</span>
                </Button>
                <Tippy content="Chủ đề" placement="bottom">
                    <Button header circle className={cx('action-btn')}>
                        <TopicIcon width="21px" height="21px" />
                    </Button>
                </Tippy>
                <Tippy content="Nâng cấp VIP" placement="bottom">
                    <Button header circle className={cx('action-btn')}>
                        <VipIcon fill="#dadada" />
                    </Button>
                </Tippy>

                <div className={cx('action-btn')}>
                    <Menu data={MENU_SETTINGS} isVisible={isVisibleSetting} handleOutSide={handleOutSideSetting}>
                        <Tippy content="Cài đặt" placement="bottom">
                            <Button
                                header
                                circle
                                className={cx('setting-btn')}
                                onClick={() => {
                                    isVisibleSetting ? setIsVisibleSetting(false) : setIsVisibleSetting(true);
                                }}
                            >
                                <FiSettings className={cx('setting-icon')} />
                            </Button>
                        </Tippy>
                    </Menu>
                </div>

                <Menu data={MENU_AVATARS} isVisible={isVisibleAvatar} handleOutSide={handleOutSideAvatar}>
                    <div>
                        <Button
                            header
                            circle
                            className={cx('avatar-user-btn')}
                            onClick={() => {
                                isVisibleAvatar ? setIsVisibleAvatar(false) : setIsVisibleAvatar(true);
                            }}
                        >
                            <img
                                src="https://s120.avatar.talk.zdn.vn/1/2/9/2/3/120/f9b3b9ae6e38ee44074b0c322fe4a9ad.jpg"
                                alt="Avatar"
                            />
                        </Button>
                    </div>
                </Menu>
            </div>
        </header>
    );
}

export default Header;

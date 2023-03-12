import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { followCursor } from 'tippy.js';
import Button from '~/components/Button';
import {
    ExploreIcon,
    FollowIcon, MusicPersonalIcon, RadioIcon, ZingChartIcon
} from '~/components/Icon';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);
export const MENU_SIDEBAR_TOP = [
    {
        listActionPrimary: true,
        className: 'action-top',
        divideLine: true,
        buttons: [
            {
                to: '/mymusic',
                icon: <MusicPersonalIcon />,
                text: 'Cá Nhân',
                isActive: false,
                playButton: true,
            },
            {
                to: '/',
                icon: <ExploreIcon />,
                text: 'Khám Phá',
                isActive: false,
            },
            {
                to: '/zing-chart',
                icon: <ZingChartIcon />,
                text: '#zingchart',
                isActive: false,
                playButton: true,
            },
            {
                to: '/radio',
                icon: <RadioIcon />,
                text: 'Radio',
                isActive: false,
                playButton: true,
                live: true,
            },
            {
                to: '/follow',
                icon: <FollowIcon />,
                text: 'Theo Dõi',
                isActive: false,
            },
        ],
    },
];
function TopSidebar({handleChangeAction}) {
    return ( 
        <div className={cx('sidebar-top')}>
            {MENU_SIDEBAR_TOP.map((menuItem, index) => (
            <div key={index} className={cx(menuItem.className)}>
                {menuItem.buttons.map((buttonItem, index) => (
                    <Tippy
                        key={index}
                        className={cx('tippy-content')}
                        followCursor={true}
                        plugins={[followCursor]}
                        content={buttonItem.text}
                        hideOnClick={false}
                        placement="right-start"
                        arrow={false}
                        offset={[10, 12]}
                    >
                        <div className={cx('action-item')}>
                            <Button
                                to={buttonItem.to}
                                className={cx('action-btn', buttonItem.isActive && 'is-active')}
                                onClick={() => handleChangeAction(buttonItem)}
                            >
                                {buttonItem.icon}
                                <p className={cx('action-text')}>{buttonItem.text}</p>
                                {buttonItem.live && (
                                    <img
                                        src="https://zjs.zmdcdn.me/zmp3-desktop/dev/147506/static/media/live-tag.e25dd240.svg"
                                        alt="live"
                                    />
                                )}
                                {buttonItem.playButton && (
                                    <Button className={cx('play-btn')}>
                                        <AiOutlinePlayCircle size={20} />
                                    </Button>
                                )}
                            </Button>
                        </div>
                    </Tippy>
                ))}
                {menuItem.divideLine && <div className={cx('divide-line')}></div>}
            </div>
        ))}
        </div> );
}

export default TopSidebar;
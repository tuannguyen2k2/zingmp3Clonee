import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { GrFormEdit } from 'react-icons/gr';
import { followCursor } from 'tippy.js';
import PropTypes from 'prop-types'

import Button from '~/components/Button';
import {
    CategoryIcon,
    ClockIcon, MusicIcon, MvIcon,
    PlaylistIcon, SongIcon,
    StarIcon
} from '~/components/Icon';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);
const MENU_SIDEBAR_MIDDLE = [
    {
        className: 'action-middle',

        banner: true,
        buttons: [
            {
                icon: <MusicIcon />,
                text: 'Nhạc mới',
                isActive: false,
            },
            {
                icon: <CategoryIcon />,
                text: 'Thể loại',
                isActive: false,
            },
            {
                icon: <StarIcon />,
                text: 'Top 100',
                isActive: false,
            },
            {
                icon: <MvIcon />,
                text: 'MV',
                isActive: false,
            },
        ],
    },
    {
        className: 'library',
        title: 'THƯ VIỆN',
        buttons: [
            {
                icon: <SongIcon />,
                text: 'Bài hát',
                noActive: true,
            },
            {
                icon: <PlaylistIcon />,
                text: 'Playlist',
                noActive: true,
            },
            {
                icon: <ClockIcon />,
                text: 'Gần đây',
                noActive: true,
            },
        ],
    },
];
function MiddleSidebar({handleChangeAction}) {
    return ( 
        <div className={cx('action-scrollbar')}>
                {MENU_SIDEBAR_MIDDLE.map((menuItem, index) => (
                    <div key={index} className={cx(menuItem.className)}>
                        {menuItem.title && (
                            <div className={cx('title-library')}>
                                <span>{menuItem.title}</span>
                                <Tippy content="Chỉnh sửa" placement="top">
                                    <div>
                                        <Button circle className={cx('edit-btn')}>
                                            <GrFormEdit />
                                        </Button>
                                    </div>
                                </Tippy>
                            </div>
                        )}
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
                                        className={cx('action-btn')}
                                        onClick={() => handleChangeAction(buttonItem)}
                                    >
                                        {buttonItem.icon}
                                        <p className={cx('action-text')}>{buttonItem.text}</p>
                                        {buttonItem.playButton && (
                                            <Button className={cx('play-btn')}>
                                                <AiOutlinePlayCircle size={20} />
                                            </Button>
                                        )}
                                    </Button>
                                </div>
                            </Tippy>
                        ))}
                        {menuItem.banner && (
                            <div className={cx('banner')}>
                                <span className={cx('text-banner')}>Nghe nhạc không quảng cáo cùng kho nhạc VIP</span>
                                <Button rounded className={cx('banner-btn')}>
                                    <span className={cx('text-btn')}>Nâng cấp VIP</span>
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
     );
}
MiddleSidebar.propTypes = {
    handleChangeAction: PropTypes.func.isRequired,
}

export default MiddleSidebar;
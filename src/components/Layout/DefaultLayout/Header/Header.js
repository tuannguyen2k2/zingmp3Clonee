import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import 'tippy.js/dist/tippy.css'; // optional

import Button from '~/components/Button';
import { DownloadIcon, TopicIcon, VipIcon } from '~/components/Icon';
import styles from './Header.module.scss';
import Navigation from './Navigation';
import Search from './Search';
const cx = classNames.bind(styles);

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
                <Tippy content="Cài đặt" placement="bottom">
                    <div className={cx('action-btn')}>
                        <Button header circle className={cx('setting-btn')}>
                            <FiSettings className={cx('setting-icon')} />
                        </Button>
                    </div>
                </Tippy>
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

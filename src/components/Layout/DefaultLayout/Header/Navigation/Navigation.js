import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import styles from './Navigation.module.scss';
import NavigationItem from './NavigationItem';
const cx = classNames.bind(styles);

function Navigation() {
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
    return ( <div className={cx('wrapper')}>
        {enableArrowLeft ? (
        <NavigationItem enabled onClick={handleGoBack}>
            <BsArrowLeft />
        </NavigationItem>
    ) : (
        <NavigationItem disabled onClick={handleGoBack}>
            <BsArrowLeft />
        </NavigationItem>
    )}
    {enableArrowRight ? (
        <NavigationItem enabled onClick={handleGoForward}>
            <BsArrowRight />
        </NavigationItem>
    ) : (
        <NavigationItem disabled onClick={handleGoForward}>
            <BsArrowRight />
        </NavigationItem>
    )} 
    </div>);
}

export default Navigation;
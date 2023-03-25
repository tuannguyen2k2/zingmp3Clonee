import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import styles from './Navigation.module.scss';
import NavigationItem from './NavigationItem';
const cx = classNames.bind(styles);

function Navigation() {
    const indexHistoryWindow = window.history.state.idx;
    const [enableArrowLeft, setEnableArrowLeft] = useState(false);
    const [enableArrowRight, setEnableArrowRight] = useState(false);
    const [indexBefore, setIndexBefore] = useState(indexHistoryWindow);
    const [indexStart] = useState(indexHistoryWindow); //indexStart will change when reload page

    useEffect(() => {
        if (indexHistoryWindow > indexStart) {
            setEnableArrowLeft(true);
        } else if (indexHistoryWindow === indexStart) {
            setEnableArrowLeft(false);
        }

        if (indexHistoryWindow > indexBefore) {
            setIndexBefore(indexHistoryWindow);
        } else if (indexHistoryWindow === indexBefore) {
            setEnableArrowRight(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [indexHistoryWindow]);

    const handleGoForward = () => {
        window.history.forward();
    };

    const handleGoBack = () => {
        window.history.back();
        setEnableArrowRight(true);
    };
    return (
        <div className={cx('wrapper')}>
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
        </div>
    );
}

export default Navigation;

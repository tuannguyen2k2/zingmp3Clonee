import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);
function Menu({
    data = [],
    children,
    tippyPlacement = 'bottom-start',
    tippyOffSet = [0, 10],
    isVisible,
    handleOutSide,
    hideOnClick
}) {
    return (
        <div>
            <HeadlessTippy
                hideOnClick={hideOnClick}
                onClickOutside={handleOutSide}
                placement={tippyPlacement}
                interactive
                visible={isVisible}
                offset={tippyOffSet}
                render={(attrs) => (
                    <div className={cx('menu')}>
                        {data.map((item, index) => (
                            <MenuItem key={index} data={item} />
                        ))}
                    </div>
                )}
            >
                {children}
            </HeadlessTippy>
        </div>
    );
}

export default Menu;

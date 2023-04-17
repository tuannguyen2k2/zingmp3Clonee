import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types'

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

Menu.propTypes = {
        data:PropTypes.array.isRequired,
    children:PropTypes.node.isRequired,
    tippyPlacement:PropTypes.string,
    tippyOffSet:PropTypes.array,
    isVisible:PropTypes.bool,
    handleOutSide:PropTypes.func,
    hideOnClick:PropTypes.bool,
}

export default Menu;

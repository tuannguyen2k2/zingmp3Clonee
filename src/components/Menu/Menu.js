import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);
function Menu({ data = [], children, tippyPlacement='bottom-start', tippyOffSet= [0,10] }) {
    return (
        <Tippy
            placement={tippyPlacement}
            interactive
            visible
            offset={tippyOffSet}
            render={(attrs) => (
                <div className={cx('menu')}>
                    {data.map((item, index) => (
                       <MenuItem key={index} data={item}/>
                    ))}
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;

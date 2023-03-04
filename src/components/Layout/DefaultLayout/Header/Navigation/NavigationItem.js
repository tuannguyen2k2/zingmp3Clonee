import classNames from 'classnames/bind';

import styles from './Navigation.module.scss';
const cx = classNames.bind(styles);

function NavigationItem({enabled,disabled, onClick,children, ...passProps}) {
    const props = {
        onClick,
        ...passProps,
    };
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    const classes = cx('see-history-button',{enabled,disabled})
    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}

export default NavigationItem;

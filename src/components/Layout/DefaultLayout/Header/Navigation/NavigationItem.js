import classNames from 'classnames/bind';
import PropTypes from 'prop-types'

import styles from './Navigation.module.scss';
const cx = classNames.bind(styles);

function NavigationItem({ enabled, disabled, onClick, children, ...passProps }) {
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
    const classes = cx('see-history-button', { enabled, disabled });
    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}

NavigationItem.propTypes = {
    enabled: PropTypes.bool,
disabled: PropTypes.bool,
onClick: PropTypes.func,
children: PropTypes.node,
}

export default NavigationItem;

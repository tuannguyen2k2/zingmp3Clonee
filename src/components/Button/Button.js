import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

const Button = forwardRef(
    ({ href, to, className, header, circle, rounded, isHover, disabled, onClick, ...passProps }, ref) => {
        let Comp = 'button';
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
        } else if (href) {
            props.href = href;
            Comp = 'a';
        } else if (to) {
            props.to = to;
            Comp = Link;
        }
        const classes = cx('wrapper', className, {
            header,
            circle,
            rounded,
            isHover,
            disabled,
        });
        return <Comp ref={ref} className={classes} {...props}></Comp>;
    },
);
Button.propTypes = {
    href: PropTypes.string,
    to: PropTypes.string,
    className: PropTypes.string,
    header: PropTypes.bool,
    circle: PropTypes.bool,
    rounded: PropTypes.bool,
    isHover: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;

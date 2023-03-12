import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ href, to, className, header, circle, rounded, ...props }) {
    let Comp = 'button';
    if (href) {
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
    });
    return <Comp className={classes} {...props}></Comp>;
}

export default Button;

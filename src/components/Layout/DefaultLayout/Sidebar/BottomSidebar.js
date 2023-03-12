import classNames from 'classnames/bind';
import { AiOutlinePlus } from "react-icons/ai";
import Button from '~/components/Button';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const MENU_SIDEBAR_BOTTOM = [{
    className:'action-bottom',
    buttons:[
        {
            icon:<AiOutlinePlus size={20}/>,
            text: 'Tạo playlist mới'
        }
    ]
}]
function BottomSidebar() {
    return ( <div>
          {MENU_SIDEBAR_BOTTOM.map((menuItem, index) => (
                <div key={index} className={cx(menuItem.className)}>
                    {menuItem.buttons.map((buttonItem, index) => (
                            <div key={index} className={cx('action-item')}>
                                <Button
                                    to={buttonItem.to}
                                    className={cx('action-bottom-btn')}
                                >
                                    {buttonItem.icon}
                                    <p className={cx('action-text')}>{buttonItem.text}</p>
                                </Button>
                            </div>
                    ))}
                </div>
            ))}
    </div> );
}

export default BottomSidebar;
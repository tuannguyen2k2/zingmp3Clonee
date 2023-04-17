import classNames from 'classnames/bind';
import { useEffect } from 'react';
import Button from '~/components/Button';
import BottomSidebar from './BottomSidebar';
import MiddleSidebar from './MiddleSidebar';
import styles from './Sidebar.module.scss';
import TopSidebar, { MENU_SIDEBAR_TOP } from './TopSidebar';

const cx = classNames.bind(styles);

//Set button default when page don't have session storage (Use in useEffect)
let defaultButton = {};

MENU_SIDEBAR_TOP.forEach((list, indexList) => {
    if (list.listActionPrimary) {
        list.buttons.forEach((button, indexButton) => {
            if (button.to === '/') {
                defaultButton = MENU_SIDEBAR_TOP[indexList].buttons[indexButton];
            }
        });
    }
});

function Sidebar() {
    // When u change pathname, create session storage with button match pathname
    MENU_SIDEBAR_TOP[0].buttons.forEach((button) => {
        if (window.location.pathname === button.to) {
            sessionStorage.setItem('sidebar-button-active', JSON.stringify(button));
        }
    });
    //use foreach to find the button that needs active when reload page
    MENU_SIDEBAR_TOP[0].buttons.forEach((button) => {
        button.isActive = false; //Reset all button
        if (window.location.pathname === button.to) {
            //Check button in pathname match button href
            button.isActive = true;
        }
    });
    useEffect(() => {
        sessionStorage.setItem('sidebar-button-active', JSON.stringify(defaultButton));
    }, []); // Occurs when there is no session Storage
    const handleChangeStatusButton = (button) => {
        if (!button.noActive) {
            // Check button is not active
            sessionStorage.setItem('sidebar-button-active', JSON.stringify(button)); //Create sessionStorage value
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('brand')}>
                <Button>
                    <img
                        className={cx('logo')}
                        src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
                        alt="logo"
                    />
                </Button>
            </div>
            <TopSidebar handleChangeAction={handleChangeStatusButton} />
            <MiddleSidebar handleChangeAction={handleChangeStatusButton} />
            <BottomSidebar />
        </div>
    );
}

export default Sidebar;

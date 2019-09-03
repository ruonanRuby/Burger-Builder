import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import './SideDrawer.css';

const sideDrawer = (props) => {

    return (
        <div className="SideDrawer">
            <div className="SideDrawerLogo">
                <Logo />
            </div>
            <nav>
                <NavItems />
            </nav>
        </div>
    );

};

export default sideDrawer;
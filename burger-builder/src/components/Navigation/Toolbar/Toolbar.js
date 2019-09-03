import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../Sidedrawer/DrawToggle/DrawToggle';

const toolbar = (props) => (
    <header className = "Toolbar">
        <DrawerToggle clicked= {props.drawToggleClicked} />
        <div className = "ToolbarLogo DesktopOnly">
            <Logo />
        </div>
        <nav className = "DesktopOnly">
            <NavItems />
        </nav>
    </header>
);

export default toolbar;

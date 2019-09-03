import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';

const toolbar = (props) => (
    <header className = "Toolbar">
        <div>Menu</div>
        <div className = "ToolbarLogo DesktopOnly">
            <Logo />
        </div>
        <nav className = "DesktopOnly">
            <NavItems />
        </nav>
    </header>
);

export default toolbar;

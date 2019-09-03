import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Hoc from '../../../hoc/Hoc';

const sideDrawer = (props) => {
    let attachedName = ["SideDrawer", "Close"];
    if (props.open) {
        attachedName = ["SideDrawer", "Open"];
    }
    return (
        <Hoc>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className= {attachedName.join(' ')}>
                <div className="SideDrawerLogo">
                    <Logo />
                </div>
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Hoc>
    );

};

export default sideDrawer;
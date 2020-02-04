import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Hoc from '../../../hoc/Hoc';

const sideDrawer = (props) => {
    let attachedName = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedName = [classes.SideDrawer, classes.Open];
    }
    return (
        <Hoc>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className= {attachedName.join(' ')} onClick={props.closed}>
                <div className= {classes.SideDrawerLogo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Hoc>
    );

};

export default sideDrawer;
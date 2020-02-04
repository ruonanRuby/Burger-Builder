import React from 'react';

import burgerLogo from '../../assets/images/burgerLogo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className = {classes.Logo}>
        <img src={burgerLogo}  alt="burgerLogo"/>
    </div>
);

export default logo;
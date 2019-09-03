import React from 'react';
import './DrawToggle.css';

const drawToggler = (props) => (
    <div className="DrawerToggle" onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
</div>
);

export default drawToggler;
import React from 'react';

import Hoc from '../../hoc/Hoc';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Sidedrawer/SideDrawer';

const layout = (props) => (
    <Hoc>
        <Toolbar />
        <SideDrawer />
        <main className="Content">
            {props.children}
        </main>
    </Hoc>
);


export default layout;
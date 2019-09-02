import React from 'react';

import Hoc from '../../hoc/Hoc';
import './Layout.css';

const layout = ( props ) => (
    <Hoc>
    <div>Toobar, SideDrawer,Backdrop</div>
    <main className = "Content">
        {props.children}
    </main>
    </Hoc>
);


export default layout;
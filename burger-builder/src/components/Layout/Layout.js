import React, {Component} from 'react';

import Hoc from '../../hoc/Hoc';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Sidedrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosed = () => {
        this.setState({showSideDrawer:false});
    }

    sideDrawerToggle = () => {
        this.setState(( prevState ) =>  {
           return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render () {
        return (
            <Hoc>
            <Toolbar drawToggleClicked = {this.sideDrawerToggle}/>
            <SideDrawer  open = {this.state.showSideDrawer}
            closed = {this.sideDrawerClosed}/>
            <main className="Content">
                {this.props.children}
            </main>
        </Hoc>
        )
    };
}


export default Layout;
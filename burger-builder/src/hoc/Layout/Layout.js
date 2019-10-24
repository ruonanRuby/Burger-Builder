import React, {Component} from 'react';

import Hoc from '../Hoc';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Sidedrawer/SideDrawer';

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
import React, {Component} from 'react';
import { connect } from 'react-redux';

import Hoc from '../Hoc';
import classes from './Layout.module.css';
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
            <Toolbar 
                isAuth={this.props.isAuthenticated}
                drawToggleClicked = {this.sideDrawerToggle}/>
            <SideDrawer  
                isAuth={this.props.isAuthenticated}
                open = {this.state.showSideDrawer}
            closed = {this.sideDrawerClosed}/>
            <main className= {classes.Content}>
                {this.props.children}
            </main>
        </Hoc>
        )
    };
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}
export default connect(mapStateToProps)(Layout);
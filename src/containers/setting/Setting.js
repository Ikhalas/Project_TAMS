import React, { Component } from 'react'
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';

export default class Setting extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Menu/>

                <Footer/>
            </div>
        )
    }
}

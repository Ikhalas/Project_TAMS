import React, { Component } from 'react'
import Header from '../Header';
import Menu from '../Menu';
import Footer from '../Footer';
import ItemList from './ItemList';


export default class ItemLand extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Menu/>
                <ItemList/>
                <Footer/>
            </div>
        )
    }
}

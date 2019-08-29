import React, { Component } from 'react'
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
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

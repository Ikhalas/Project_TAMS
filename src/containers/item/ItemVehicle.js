import React, { Component } from 'react'
import Header from '../Header';
import Menu from '../Menu';
import Footer from '../Footer';
import ItemList from './ItemList';
import axios from 'axios';

export default class ItemVehicle extends Component {
    constructor(props){
        super(props)
        this.state = {Items : ""}
    }

    componentDidMount(){
        axios.get("http://localhost:3001/itemVehicle").then(res =>{
            // console.log(res.data)
            {this.setState({ Items : res.data})}
        })
    }
    

    render() {
        return (
            <div>
                <Header/>
                <Menu/>
                <ItemList Items={this.state.Items} itemType="ครุภัณฑ์ยานพาหนะและขนส่ง" />
                <Footer/>
            </div>
        )
    }
}

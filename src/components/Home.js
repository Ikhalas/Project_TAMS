import React, { Component } from 'react'
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import Dashboard from '../containers/dashboard/Dashboard';


export default class Home extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Menu/>
        <Dashboard/>
        <Footer/>
      </div>
    )
  }
}

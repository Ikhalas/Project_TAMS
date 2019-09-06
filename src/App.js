import React, { Component } from 'react'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'

import Home from "./containers/dashboard/Home";

import Setting from './containers/setting/Setting';
import DepartmentAdd from './containers/setting/department/DepartmentAdd'
import DepartmentDetail from './containers/setting/department/DepartmentDetail'
import DepartmentEdit from './containers/setting/department/DepartmentEdit'
import ItemtypeAdd from './containers/setting/itemtype/ItemtypeAdd'
import ItemtypeDetail from './containers/setting/itemtype/ItemtypeDetail'
import ItemtypeEdit from './containers/setting/itemtype/ItemtypeEdit'

import Items from './containers/item/Showitems/Items'
import ItemDetail from './containers/item/Showitems/ItemDetail'
import ItemAdd from './containers/item/ItemAdd'



export default class Main extends Component {
  renderRouter(){
    return(
      
      <Switch>
        <Route exact path="/" component={Home}/>

        <Route exact path="/setting" component={Setting}/>
        <Route exact path="/setting/department-add" component={DepartmentAdd}/>
        <Route exact path="/setting/department-detail/:id" component={DepartmentDetail}/>
        <Route exact path="/setting/department-edit/:id" component={DepartmentEdit}/>
        <Route exact path="/setting/itemtype-add" component={ItemtypeAdd}/>
        <Route exact path="/setting/itemtype-detail/:id" component={ItemtypeDetail}/>
        <Route exact path="/setting/itemtype-edit/:id" component={ItemtypeEdit}/>

        <Route exact path="/items" component={Items}/>
        <Route exact path="/items/item-detail/:id" component={ItemDetail}/>
        <Route exact path="/items/item-add" component={ItemAdd}/>

      </Switch>
    )

  }

  render() {
    return (
      <BrowserRouter>
        <Header/>
        <Menu/>
        {this.renderRouter()}
        <Footer/>
      </BrowserRouter>
    )
  }
}

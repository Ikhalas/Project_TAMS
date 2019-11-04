import React, { Component } from 'react'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'

import Home from "./containers/dashboard/Home";

import NotFound from "./containers/error/NotFound"

import Setting from './containers/setting/Setting';

import DepartmentAdd from './containers/setting/department/DepartmentAdd'
import DepartmentDetail from './containers/setting/department/DepartmentDetail'
import DepartmentEdit from './containers/setting/department/DepartmentEdit'

import ItemtypeAdd from './containers/setting/itemtype/ItemtypeAdd'
import ItemtypeDetail from './containers/setting/itemtype/ItemtypeDetail'
import ItemtypeEdit from './containers/setting/itemtype/ItemtypeEdit'

import TypeAdd from './containers/setting/type/TypeAdd'
import TypeDetail from './containers/setting/type/TypeDetail'
import TypeEdit from './containers/setting/type/TypeEdit'

import Items from './containers/item/Showitems/Items'
import ItemDetail from './containers/item/Showitems/ItemDetail'
import FormContainer from './containers/item/Form/FormContainer'

import LandEdit from './containers/item/Showitems/Land/LandEdit'
import GeneralEdit from './containers/item/Showitems/General/GeneralEdit'


import Itemdepreciation from './containers/depreciation/ItemDepreciation'


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

        <Route exact path="/setting/type-add" component={TypeAdd}/>
        <Route exact path="/setting/type-detail/:id" component={TypeDetail}/>
        <Route exact path="/setting/type-edit/:id" component={TypeEdit}/>

        <Route exact path="/items" component={Items}/>

        <Route exact path="/items/item-detail/:id" component={ItemDetail}/>
        <Route exact path="/items/item-add" component={FormContainer}/>

        <Route exact path="/items/item-detail/land-edit/:id" component={LandEdit}/>
        <Route exact path="/items/item-detail/general-edit/:id" component={GeneralEdit}/>

        <Route exact path="/depreciation/item-depreciation/:id" component={Itemdepreciation}/>
        


        <Route component={NotFound}/>

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

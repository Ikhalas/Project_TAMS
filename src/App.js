import React, { Component } from 'react'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import ItemLand from "./containers/item/ItemLand";
import ItemOffice from "./containers/item/ItemOffice";
import ItemVehicle from "./containers/item/ItemVehicle";
import Setting from './containers/setting/Setting';
import DepartmentEdit from './containers/setting/DepartmentEdit';

export default class App extends Component {

  renderRouter(){
    return(
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/setting" component={Setting}/>
        <Route exact path="/setting/add-department" component={DepartmentEdit}/>
        <Route exact path="/setting/edit-department/:id" component={DepartmentEdit}/>
        <Route exact path="/itemland" component={ItemLand}/>
        <Route exact path="/itemoffice" component={ItemOffice}/>
        <Route exact path="/itemvehicle" component={ItemVehicle}/>
      </Switch>
    )

    
  }

  render() {
    return (
      <BrowserRouter>
        {this.renderRouter()}
      </BrowserRouter>
    )
  }
}

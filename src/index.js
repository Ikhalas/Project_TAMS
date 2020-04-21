import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/css/Main.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import Login from "./layouts/Login";
import AdminLayout from "layouts/Admin.jsx";
import ItemImovable from "./views/mobile-view/ItemImovable";
import ItemMovable from "./views/mobile-view/ItemMovable";
import NotFound from "./views/notfound/NotFound"

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/item-imovable/:id" component={ItemImovable} />
      <Route path="/item-movable/:id" component={ItemMovable} />
      <Route component={NotFound} />
      <Redirect to="/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);

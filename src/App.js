import React, { Component } from 'react'
import Home from './Home'
import Login from './Login'
import {auth} from './common/firebaseConfig'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
    }
  }

  componentDidMount() {
    //console.log(auth)
    auth.onAuthStateChanged(user => {
      if (user) this.setState({currentUser: user})
      else this.setState({currentUser: null})
    })

  }
  render() {
    return (
      <div>
        {this.state.currentUser ? <Home/> : <Login />}
        
      </div>
    )
  }
}

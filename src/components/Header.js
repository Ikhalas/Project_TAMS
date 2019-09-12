import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export default class Header extends Component {
  render() {

    return (
      <div>
        <header className="main-header">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-mini" style={{ fontSize: 15 }}><b>T</b>AMS</span>
            <span className="logo-lg title " style={{ fontSize: 30 }}>อบต.ท่าข้าม</span>
          </Link>
          <nav className="navbar navbar-static-top">
            <a href="fake_url" className="sidebar-toggle" data-toggle="push-menu" role="button">
              <span className="sr-only">Toggle navigation</span>
            </a>
          </nav>
        </header>
      </div>

    )
  }
}

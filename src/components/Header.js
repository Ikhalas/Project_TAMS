import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export default class Header extends Component {
  render() {

    return (
      <div>
        <header className="main-header">
          {/* Logo */}
          <Link to="/" className="logo">
            {/* mini logo for sidebar mini 50x50 pixels */}
            <span className="logo-mini" style={{ fontSize: 15 }}><b>T</b>AMS</span>
            {/* logo for regular state and mobile devices */}
            <span className="logo-lg title " style={{ fontSize: 30 }}>อบต.ท่าข้าม</span>
          </Link>
          {/* Header Navbar: style can be found in header.less */}
          <nav className="navbar navbar-static-top">
            {/* Sidebar toggle button*/}
            <a href="fake_url" className="sidebar-toggle" data-toggle="push-menu" role="button">
              <span className="sr-only">Toggle navigation</span>
            </a>
            {/* Navbar Right Menu */}
          </nav>
        </header>
      </div>

    )
  }
}

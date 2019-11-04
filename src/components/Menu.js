import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Menu extends Component {
  render() {
    const font18 = { fontSize: 18 }
    return (
      <div>
        <aside className="main-sidebar">
          {/* sidebar: style can be found in sidebar.less */}

          <section className="sidebar">
            {/* Sidebar user panel */}
            <div className="user-panel">
              <div className="pull-left image">
                <img src="../../public/image/logo.png" className="img-circle" alt="THAKHAM" />
              </div>
              <div className="pull-left info">
                <p className="title">&nbsp;อิคลาศ หมันหนุน</p>
              </div>
            </div>

            {/* sidebar menu: : style can be found in sidebar.less */}
            <ul className="sidebar-menu" data-widget="tree">
              <li className="header title" ></li>

              <li className="header title" style={font18}>แผงควบคุม</li>

              <li>
                <Link to="/">
                  <i className="fa fa-dashboard" /> <span className="title">หน้าหลัก</span>
                </Link>
              </li>

              <li>
                <Link to="/setting">
                  <i className="fa fa-gears" /> <span className="title">ตั้งค่า</span>
                </Link>
              </li>

              <li className="header title" style={font18}>รายการครุภัณฑ์</li>

              <li>
                <Link to="/items">
                  <i className="fa fa-files-o" /> <span className="title">รายการครุภัณฑ์ทั้งหมด</span>
                </Link>
              </li>

              <li>
                <Link to="/items/item-add">
                  <i className="fa fa-plus-circle" /> <span className="title">เพิ่มรายการครุภัณฑ์</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
              </li>

              <li className="header title" style={font18}>การจัดการ</li>

              <li>
                <Link to="fake_url">
                  <i className="fa fa-pie-chart" /><span className="title">&nbsp;การซ่อมบำรุง</span>
                </Link>
              </li>

              <li>
                <Link to="fake_url">
                  <i className="fa fa-pie-chart" /><span className="title">&nbsp;การยืม-คืน</span>
                </Link>
              </li>

              <li className="header title" style={font18}>บริการอื่น ๆ</li>

              <li className="treeview">
                <Link to="fake_url">
                  <i className="fa fa-pie-chart" /><span className="title">&nbsp;กล่องข้อความ</span>
                </Link>
              </li>

              <li className="treeview">
                <Link to="fake_url">
                  <i className="fa fa-pie-chart" /><span className="title">&nbsp;จัดทำเอกสาร</span>
                </Link>
              </li>

              <li className="header title" style={font18}> </li>

              <li className="treeview">
                <Link to="fake_url">
                  <i className="fa fa-pie-chart" /><span className="title">&nbsp;ออกจากระบบ</span>
                </Link>
              </li>

              <li className="header title" style={font18}> <br /><br /><br /><br /><br /><br /> </li>












            </ul>
          </section>
          {/* /.sidebar */}
        </aside>
      </div>

    )
  }
}

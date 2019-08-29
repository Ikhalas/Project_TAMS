import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Dashboard extends Component {
    render() {
      const font20 = { fontSize: 20 }
      return (
<div>
  <div className="content-wrapper">

    {/* Content Header (Page header) */}
    <section className="content-header">
      <h1>
        <span className="title">หน้าหลัก</span>
      </h1>
    </section>

    {/* Main content */}
    <section className="content">
      {/* Small boxes (Stat box) */}
      <div className="row">
        <div className="col-lg-3 col-xs-6">
          {/* small box */}
          <div className="small-box bg-aqua">
            <div className="inner">
              <h3>150 รายการ</h3>
              <p style={font20}>รายการครุภัณฑ์ทั้งหมด</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag" />
            </div>
            <Link to="fake_URL" className="small-box-footer title">เพิ่มเติม <i className="fa fa-arrow-circle-right" /></Link>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-xs-6">
          {/* small box */}
          <div className="small-box bg-green">
            <div className="inner">
              <h3>10,524,265 บาท</h3>
              <p style={font20}>ราคารวมสินทรัพย์</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars" />
            </div>
            <Link to="fake_URL" className="small-box-footer title">เพิ่มเติม <i className="fa fa-arrow-circle-right" /></Link>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-xs-6">
          {/* small box */}
          <div className="small-box bg-yellow">
            <div className="inner">
              <h3>1 คน</h3>
              <p style={font20}>จำนวนผู้มีสิทธ์</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
            <Link to="fake_URL" className="small-box-footer title">เพิ่มเติม <i className="fa fa-arrow-circle-right" /></Link>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-xs-6">
          {/* small box */}
          <div className="small-box bg-red">
            <div className="inner">
              <h3>65 รายการ</h3>
              <p style={font20}>รายการการยืม/คืน</p>
            </div>
            <div className="icon">
              <i className="ion ion-pie-graph" />
            </div>
            <Link to="fake_URL" className="small-box-footer title">เพิ่มเติม <i className="fa fa-arrow-circle-right" /></Link>
          </div>
        </div>
        {/* ./col */}
      </div>
    </section>
    {/* /.content */}
  </div>
</div>


        )
    }
}

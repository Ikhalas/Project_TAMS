import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, CardTitle, Row, Col } from "reactstrap";

export default class ConcludeCard extends Component {
    render() {
        const {MoveSum, ImoveSum, usersSum} = this.props
        return (
            <>
                <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-bullet-list-67 text-info" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p
                          style={{ fontSize: "20px" }}
                          className="card-category"
                        >
                          รายการครุภัณฑ์
                        </p>
                        <p
                          style={{ fontSize: "25px" }}
                          className="card-category"
                        >
                          ทั้งหมด
                        </p>
                        <CardTitle tag="p">{(MoveSum + ImoveSum)} รายการ</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    &nbsp;
                    <i className="fas fa-info" /> &nbsp;
                    <Link to="/admin/item-detail">
                      <span style={{ color: "#66615b" }}>ดูรายการทั้งหมด</span>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </Col>

            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-app text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p
                          style={{ fontSize: "20px" }}
                          className="card-category"
                        >
                          รายการครุภัณฑ์
                        </p>
                        <p
                          style={{ fontSize: "25px" }}
                          className="card-category"
                        >
                          สังหาริมทรัพย์
                        </p>
                        <CardTitle tag="p">{MoveSum} รายการ</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    &nbsp;
                    <i className="fas fa-info" /> &nbsp;
                    <Link to="/admin/item-detail">
                      <span style={{ color: "#66615b" }}>ดูรายการทั้งหมด</span>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </Col>

            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-bank text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p
                          style={{ fontSize: "20px" }}
                          className="card-category"
                        >
                          รายการครุภัณฑ์
                        </p>
                        <p
                          style={{ fontSize: "25px" }}
                          className="card-category"
                        >
                          อสังหาริมทรัพย์
                        </p>
                        <CardTitle tag="p">{ImoveSum} รายการ</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    &nbsp;
                    <i className="fas fa-info" /> &nbsp;
                    <Link to="/admin/item-detail">
                      <span style={{ color: "#66615b" }}>ดูรายการทั้งหมด</span>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </Col>

            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-single-02 text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p
                          style={{ fontSize: "20px" }}
                          className="card-category"
                        >
                          รายการบัญชีผู้ใช้
                        </p>
                        <p
                          style={{ fontSize: "25px" }}
                          className="card-category"
                        >
                          ที่มีสิทธิ์ใช้งานระบบ
                        </p>
                        <CardTitle tag="p">{usersSum} บัญชี</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    &nbsp;
                    <i className="fas fa-info" /> &nbsp;
                    <Link to="/admin/dashboard">
                      <span style={{ color: "#66615b" }}>
                        จัดการบัญชีผู้ใช้
                      </span>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row> 
            </>
        )
    }
}

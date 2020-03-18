import React from "react";
import { Link } from 'react-router-dom'
import { db } from '../../api/firebase'
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
    this._isMounted && this.getUser();
  }

  getUser() {
    db.collection('staffs').get().then(snapshot => {
      let users = []
      snapshot.forEach(doc => {
        users.push(doc.data())
      })
      this._isMounted && this.setState({ users })
    }).catch(error => console.log(error))
  }

  getTotalUser() {
    return this.state.users.length
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <>
        <div className="content regular-th">
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
                        <p style={{ fontSize: '20px' }} className="card-category">รายการครุภัณฑ์</p>
                        <p style={{ fontSize: '25px' }} className="card-category">ทั้งหมด</p>
                        <CardTitle tag="p">xxx รายการ</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    &nbsp;<i className="fas fa-info" /> &nbsp;
                    <Link to='/admin/dashboard'>
                      <span style={{ color: '#66615b' }}>ดูรายการทั้งหมด</span>
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
                        <p style={{ fontSize: '20px' }} className="card-category">รายการครุภัณฑ์</p>
                        <p style={{ fontSize: '25px' }} className="card-category">สังหาริมทรัพย์</p>
                        <CardTitle tag="p">xxx รายการ</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    &nbsp;<i className="fas fa-info" /> &nbsp;
                    <Link to='/admin/dashboard'>
                      <span style={{ color: '#66615b' }}>ดูรายการทั้งหมด</span>
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
                        <p style={{ fontSize: '20px' }} className="card-category">รายการครุภัณฑ์</p>
                        <p style={{ fontSize: '25px' }} className="card-category">อสังหาริมทรัพย์</p>
                        <CardTitle tag="p">xxx รายการ</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    &nbsp;<i className="fas fa-info" /> &nbsp;
                    <Link to='/admin/dashboard'>
                      <span style={{ color: '#66615b' }}>ดูรายการทั้งหมด</span>
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
                        <p style={{ fontSize: '20px' }} className="card-category">รายการบัญชีผู้ใช้</p>
                        <p style={{ fontSize: '25px' }} className="card-category">ที่มีสิทธิ์ใช้งานระบบ</p>
                        <CardTitle tag="p">{this.getTotalUser()} บัญชี</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    &nbsp;<i className="fas fa-info" /> &nbsp;
                    <Link to='/admin/user-page'>
                      <span style={{ color: '#66615b' }}>จัดการบัญชีผู้ใช้</span>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;

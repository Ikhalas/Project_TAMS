import React, { Component } from "react";
import { db } from "../../../api/firebase";
import AddDepartmant from "./AddDepartmant";
import AddSubDepartment from "./AddSubDepartment";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  Card,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Row,
  Col
} from "reactstrap";

export default class Departments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readyToRender1: false,
      readyToRender2: false,
      departments: [],
      subDepartments: [],
      depSelected: "",

      mainDepModal: false,
      subDepModal: false
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getDepartment();
    this._isMounted && this.getSubDepartment();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.refresher !== prevProps.refresher) {
      this._isMounted && this.getDepartment();
      this._isMounted && this.getSubDepartment();
    }
  }

  getDepartment() {
    db.collection("departments")
      .get()
      .then(snapshot => {
        let departments = [];
        snapshot.forEach(doc => {
          departments.push(doc.data());
        });
        this._isMounted && this.setState({ departments, readyToRender1: true });
      })
      .catch(error => console.log(error));
  }

  getSubDepartment() {
    db.collection("subDepartments")
      .get()
      .then(snapshot => {
        let subDepartments = [];
        snapshot.forEach(doc => {
          subDepartments.push(doc.data());
        });
        this._isMounted &&
          this.setState({ subDepartments, readyToRender2: true });
      })
      .catch(error => console.log(error));
  }

  genDepartment() {
    return (
      this.state.departments &&
      this.state.departments.map(dep => (
        <ListGroupItem
          className="listGroupItem regular-th"
          tag="button"

          action
          key={dep.label}
          onClick={() => this.setState({ depSelected: dep.label })}
        >
          <Row>
            <Col md="10" sm="6">
              {" "}
              &nbsp;&nbsp;{dep.code}&nbsp;{dep.label}
            </Col>
            <Col md="2" sm="6">
              <i
                style={{ fontSize: "13px" }}
                className="nc-icon nc-minimal-right"
              />
            </Col>
          </Row>
        </ListGroupItem>
      ))
    );
  }

  genSubDepartment() {
    if (this.state.depSelected) {
      let filter = this.state.subDepartments.filter(dep => {
        return dep.parent === this.state.depSelected;
      });

      if (filter.length > 0) {
        return filter.map(subDep => (
          <ListGroupItem className="listGroupItem" action key={subDep.label}>
            &nbsp;&nbsp;{this.state.depSelected}/ {subDep.label}
          </ListGroupItem>
        ));
      } else {
        return (
          <>
            <br />

            <div style={{ textAlign: "center" }}>
              <p>ยังไม่มีหน่วยงานย่อย</p>
            </div>
          </>
        );
      }
    }
  }

  toggleMainDep = () => {
    this.setState({ mainDepModal: !this.state.mainDepModal });
  };

  toggleSubDep = () => {
    this.setState({ subDepModal: !this.state.subDepModal });
  };

  toggleAlert = res => {
    //console.log("Im here");
    if (res) {
      this.props.toggleAlert(res);
    }
  };

  render() {
    return this.state.readyToRender1 && this.state.readyToRender2 ? (
      <>
        <Card>
          <CardTitle
            style={{ fontSize: "33px", color: "#66615b" }}
            className="pt-4 pl-4"
          >
            ตั้งค่าหน่วยงาน
          </CardTitle>
          <Row>
            <Col md="6" sm="12" style={{ padding: "0px 0px 20px 25px" }}>
              <ListGroup>
                <ListGroupItem action className="listGroupItem-title">
                  <b style={{ fontSize: "25px" }}>หน่วยงานหลัก</b>
                </ListGroupItem>
                <ListGroupItem
                  onClick={() => this.toggleMainDep()}
                  action
                  className="listGroupItem-add text-info"
                >
                  &nbsp;&nbsp;
                  <i
                    style={{ fontSize: "13px" }}
                    className="nc-icon nc-simple-add"
                  />
                  &nbsp;&nbsp;
                  <span style={{ fontSize: "22px" }}>เพิ่มหน่วยงานหลัก</span>
                </ListGroupItem>
                {this.genDepartment()}
              </ListGroup>
            </Col>
            <Col md="6" sm="12" style={{ padding: "0px 25px 20px 0px" }}>
              <ListGroup>
                <ListGroupItem action className="listGroupItem-title">
                  <b style={{ fontSize: "25px" }}>หน่วยงานย่อย</b>
                </ListGroupItem>
                {this.state.depSelected ? (
                  <>
                    <ListGroupItem
                      onClick={() => this.toggleSubDep()}
                      action
                      className="listGroupItem-add text-info"
                    >
                      &nbsp;&nbsp;
                      <i
                        style={{ fontSize: "13px" }}
                        className="nc-icon nc-simple-add"
                      />
                      &nbsp;&nbsp;
                      <span style={{ fontSize: "22px" }}>
                        เพิ่มหน่วยงานย่อย
                      </span>
                    </ListGroupItem>
                    {this.genSubDepartment()}
                  </>
                ) : (
                  <>
                    <br />

                    <div style={{ textAlign: "center" }}>
                      <p>กรุณาเลือกหน่วยงานหลัก</p>
                    </div>
                  </>
                )}
              </ListGroup>
            </Col>
          </Row>
        </Card>

        <AddDepartmant
          mainDepModal={this.state.mainDepModal}
          toggleFn={this.toggleMainDep}
          toggleAlert={this.toggleAlert}
        />
        <AddSubDepartment
          subDepModal={this.state.subDepModal}
          toggleFn={this.toggleSubDep}
          parent={this.state.depSelected}
          toggleAlert={this.toggleAlert}
        />
      </>
    ) : (
      <>
        {" "}
        <div className="content">
          <SkeletonTheme color="#fafafa">
            <p>
              <Skeleton height={350} />
            </p>
          </SkeletonTheme>
        </div>
      </>
    );
  }
}

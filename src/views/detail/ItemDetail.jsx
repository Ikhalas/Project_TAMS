import React, { Component } from "react";
import MovableDetail from "./movable/MovableDetail";
import ImovableDetail from "./imovable/ImovableDetail";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { db } from "../../api/firebase";
import classnames from "classnames";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import "../../assets/css/Settings.css";

export default class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsMove: "",
      itemsImove: "",
      activeTab: "1",
      readyToRender1: false,
      readyToRender2: false,

      showDetail: false, //false
      showMovable: false,
      showImovable: false, //false
      itemId: ""
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getitemMovable();
    this._isMounted && this.getitemImovable();
  }

  componentWillUnmount() {
    //cancel subscriptions and asynchronous tasks
    this._isMounted = false;
  }

  getitemMovable() {
    db.collection("itemMovable")
      .orderBy("itemCode")
      .get()
      .then(snapshot => {
        let itemsMove = [];
        snapshot.forEach(doc => {
          itemsMove.push(doc);
        });
        this._isMounted && this.setState({ itemsMove, readyToRender1: true });
      })
      .catch(error => console.log(error));
  }

  getitemImovable() {
    db.collection("itemImovable")
      .orderBy("itemCode")
      .get()
      .then(snapshot => {
        let itemsImove = [];
        snapshot.forEach(doc => {
          itemsImove.push(doc);
        });
        this._isMounted && this.setState({ itemsImove, readyToRender2: true });
      })
      .catch(error => console.log(error));
  }

  generateItemsMoveRows() {
    if (this.state.itemsMove) {
      // filter only !== "จำหน่าย"
      const filItem = this.state.itemsMove.filter(item => {
        return item.data().status !== "จำหน่าย";
      });

      return filItem.map(item => (
        <tr
          key={item.id}
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.setState({
              showMovable: true,
              showDetail: true,
              itemId: item.id
            });
          }}
        >
          <td style={{ fontSize: 20 }}>&nbsp;{item.data().itemCode}</td>
          <td style={{ fontSize: 20 }}>&nbsp;{item.data().itemType}</td>
          <td style={{ fontSize: 20 }}>&nbsp;{item.data().itemName}</td>
          <td className="text-right pr-5" style={{ fontSize: 20 }}>
            &nbsp;{item.data().department}
          </td>
        </tr>
      ));
    }
  }

  generateItemsImoveRows() {
    if (this.state.itemsImove) {
      // filter only !== "จำหน่าย"
      const filItem = this.state.itemsImove.filter(item => {
        return item.data().status !== "จำหน่าย";
      });

      return filItem.map(item => (
        <tr
          key={item.id}
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.setState({
              showImovable: true,
              showDetail: true,
              itemId: item.id
            });
          }}
        >
          <td style={{ fontSize: 20 }}>&nbsp;{item.data().itemCode}</td>
          <td style={{ fontSize: 20 }}>&nbsp;{item.data().itemType}</td>
          <td style={{ fontSize: 20 }}>&nbsp;{item.data().itemName}</td>
          <td className="text-right pr-5" style={{ fontSize: 20 }}>
            &nbsp;{item.data().department}
          </td>
        </tr>
      ));
    }
  }

  genDeactImove() {
    if (this.state.itemsImove) {
      const filImov = this.state.itemsImove.filter(item => {
        return item.data().status === "จำหน่าย";
      });

      return filImov.map(item => (
        <tr
          key={item.id}
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.setState({
              showImovable: true,
              showDetail: true,
              itemId: item.id
            });
          }}
        >
          <td className="text-danger" style={{ fontSize: 20 }}>&nbsp;{item.data().itemCode}</td>
          <td style={{ fontSize: 20 }}>&nbsp;{item.data().itemType}</td>
          <td style={{ fontSize: 20 }}>&nbsp;{item.data().itemName}</td>
          <td className="text-right pr-5" style={{ fontSize: 20 }}>
            &nbsp;{item.data().department}
          </td>
        </tr>
      ));
    }
  }

  genDeactMove() {
    if (this.state.itemsMove) {
      const filMov = this.state.itemsMove.filter(item => {
        return item.data().status === "จำหน่าย";
      });

      return filMov.map(item => (
        <tr
          key={item.id}
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.setState({
              showMovable: true,
              showDetail: true,
              itemId: item.id
            });
          }}
        >
          <td className="text-danger" style={{ fontSize: 20 }}>&nbsp;{item.data().itemCode}</td>
          <td style={{ fontSize: 20 }}>&nbsp;{item.data().itemType}</td>
          <td style={{ fontSize: 20 }}>&nbsp;{item.data().itemName}</td>
          <td className="text-right pr-5" style={{ fontSize: 20 }}>
            &nbsp;{item.data().department}
          </td>
        </tr>
      ));
    }
  }

  toggle = tab => {
    this.setState({ activeTab: tab });
  };

  renderMain() {
    const { activeTab } = this.state;
    return (
      <>
        <Card>
          <br />
          <Nav tabs className="px-3">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                style={{
                  backgroundColor: activeTab === "1" ? "#f5f5f5" : "",
                  cursor: "pointer"
                }}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                <span style={{ fontSize: "23px" }}>ครุภัณฑ์สังหาริมทรัพย์</span>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                style={{
                  backgroundColor: activeTab === "2" ? "#f5f5f5" : "",
                  cursor: "pointer"
                }}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                <span style={{ fontSize: "23px" }}>
                  ครุภัณฑ์อสังหาริมทรัพย์
                </span>
              </NavLink>
            </NavItem>

            <NavItem style={{ paddingLeft: "20px" }}>
              <NavLink
                className={classnames({ active: activeTab === "3" })}
                style={{
                  backgroundColor: activeTab === "3" ? "#f5f5f5" : "",
                  cursor: "pointer"
                }}
                onClick={() => {
                  this.toggle("3");
                }}
              >
                <span className="text-danger" style={{ fontSize: "23px" }}>
                  ครุภัณฑ์ที่ถูกจำหน่าย
                </span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <CardHeader>
                    <CardTitle tag="h5" style={{ color: "#66615b" }}>
                      รายการครุภัณฑ์
                      <b style={{ fontSize: "32px" }}> สังหาริมทรัพย์ </b>
                      ทั้งหมด
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table responsive hover size="sm">
                      <thead className="text-primary">
                        <tr>
                          <th
                            className="table-header"
                            style={{ fontWeight: "normal" }}
                          >
                            <b style={{ fontSize: "23px" }}>เลขรหัสครุภัณฑ์</b>
                          </th>
                          <th
                            className="table-header"
                            style={{ fontWeight: "normal" }}
                          >
                            <b style={{ fontSize: "23px" }}>ประเภทครุภัณฑ์</b>
                          </th>
                          <th
                            className="table-header"
                            style={{ fontWeight: "normal" }}
                          >
                            <b style={{ fontSize: "23px" }}>ชื่อพัสดุ</b>
                          </th>
                          <th
                            className="table-header text-right pr-5"
                            style={{ fontWeight: "normal" }}
                          >
                            <b style={{ fontSize: "23px" }}>
                              {" "}
                              หน่วยงานที่รับผิดชอบ
                            </b>
                          </th>
                        </tr>
                      </thead>
                      <tbody>{this.generateItemsMoveRows()}</tbody>
                    </Table>
                  </CardBody>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <CardHeader>
                    <CardTitle tag="h5" style={{ color: "#66615b" }}>
                      รายการครุภัณฑ์
                      <b style={{ fontSize: "32px" }}> อสังหาริมทรัพย์ </b>
                      ทั้งหมด
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table responsive hover size="sm">
                      <thead className="text-primary">
                        <tr>
                          <th
                            className="table-header"
                            style={{ fontWeight: "normal" }}
                          >
                            <b style={{ fontSize: "23px" }}>เลขรหัสครุภัณฑ์</b>
                          </th>
                          <th
                            className="table-header"
                            style={{ fontWeight: "normal" }}
                          >
                            <b style={{ fontSize: "23px" }}>ประเภทครุภัณฑ์</b>
                          </th>
                          <th
                            className="table-header"
                            style={{ fontWeight: "normal" }}
                          >
                            <b style={{ fontSize: "23px" }}>ชื่อครุภัณฑ์</b>
                          </th>
                          <th
                            className="table-header text-right pr-5"
                            style={{ fontWeight: "normal" }}
                          >
                            <b style={{ fontSize: "23px" }}>
                              {" "}
                              หน่วยงานที่รับผิดชอบ
                            </b>
                          </th>
                        </tr>
                      </thead>

                      <tbody>{this.generateItemsImoveRows()}</tbody>
                    </Table>
                  </CardBody>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <CardHeader>
                    <CardTitle tag="h5" style={{ color: "#66615b" }}>
                      รายการครุภัณฑ์ที่ถูก
                      <b className="text-danger" style={{ fontSize: "32px" }}>
                        {" "}
                        จำหน่าย{" "}
                      </b>
                      แล้ว
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table responsive hover size="sm">
                      <thead className="text-primary">
                        <tr>
                          <th
                            className="table-header"
                            style={{ fontWeight: "normal" }}
                          >
                            <b style={{ fontSize: "23px" }}>เลขรหัสครุภัณฑ์</b>
                          </th>
                          <th
                            className="table-header"
                            style={{ fontWeight: "normal" }}
                          >
                            <b style={{ fontSize: "23px" }}>ประเภทครุภัณฑ์</b>
                          </th>
                          <th
                            className="table-header"
                            style={{ fontWeight: "normal" }}
                          >
                            <b style={{ fontSize: "23px" }}>ชื่อครุภัณฑ์</b>
                          </th>
                          <th
                            className="table-header text-right pr-5"
                            style={{ fontWeight: "normal" }}
                          >
                            <b style={{ fontSize: "23px" }}>
                              {" "}
                              หน่วยงานที่รับผิดชอบ
                            </b>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {this.genDeactImove()}
                        {this.genDeactMove()}
                      </tbody>
                    </Table>
                  </CardBody>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Card>
      </>
    );
  }

  renderDetail() {
    const { showMovable, showImovable, itemId } = this.state;
    if (showMovable || showImovable) {
      if (showMovable) {
        return <MovableDetail itemId={itemId} backButton={this.backButton} />;
      } else if (showImovable) {
        return <ImovableDetail itemId={itemId} backButton={this.backButton} />;
      } else {
        return <p>เกิดข้อผิดพลาด</p>;
      }
    } else {
      console.log("Something Wrong !!");
    }
  }

  backButton = () => {
    this.setState({
      showImovable: false,
      showMovable: false,
      showDetail: false,
      itemId: ""
    });
  };

  render() {
    const { readyToRender1, readyToRender2 } = this.state;
    const { showDetail } = this.state;
    return readyToRender1 && readyToRender2 ? (
      <>
        <div className="content regular-th">
          {showDetail ? <>{this.renderDetail()}</> : <>{this.renderMain()}</>}
        </div>
      </>
    ) : (
      <div className="content">
        <SkeletonTheme color="#fafafa">
          <p>
            <Skeleton height={600} />
          </p>
        </SkeletonTheme>
      </div>
    );
  }
}

import React, { Component } from "react";
import NotificationAlert from "react-notification-alert";
import BorrowModal from "./BorrowModal";
import { db } from "../../api/firebase";
import classnames from "classnames";
import {
  Row,
  Col,
  Card,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Table
} from "reactstrap";

var optionsBor = {
  place: "tc",
  message: (
    <div>
      <div style={{ fontSize: "22px" }}>
        เพิ่มรายการ <b style={{ color: "white" }}>การยืมครุภัณฑ์</b> สำเร็จ
      </div>
    </div>
  ),
  type: "success",
  icon: "nc-icon nc-cloud-upload-94",
  autoDismiss: 3
};

export default class ItemBorrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      readyToRender: false,
      refresher: false,

      itemsMove: "",

      borModal: false,
      idToModal: "",
      codeToModal: ""
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getitemMovable();
  }

  componentWillUnmount() {
    //cancel subscriptions and asynchronous tasks
    this._isMounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.refresher !== prevState.refresher) {
      //console.log('boom')
      this._isMounted && this.getitemMovable();
    }
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
        this._isMounted && this.setState({ itemsMove, readyToRender: true });
      })
      .catch(error => console.log(error));
  }

  toggle = tab => {
    this.setState({ activeTab: tab });
  };

  genBorrowFalse() {
    if (this.state.itemsMove) {
      // filter only !== "จำหน่าย"
      const filItem = this.state.itemsMove.filter(item => {
        return item.data().borrowSta === false;
      });

      return (
        <Row>
          <Col sm="12">
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
                      <b style={{ fontSize: "23px" }}> หน่วยงานที่รับผิดชอบ</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filItem.map(item => (
                    <tr
                      key={item.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.setState({
                          idToModal: item.id,
                          codeToModal: item.data().itemCode,
                          borModal: !this.state.borModal
                        });
                      }}
                    >
                      <td style={{ fontSize: 20 }}>
                        &nbsp;{item.data().itemCode}
                      </td>
                      <td style={{ fontSize: 20 }}>
                        &nbsp;{item.data().itemType}
                      </td>
                      <td style={{ fontSize: 20 }}>
                        &nbsp;{item.data().itemName}
                      </td>
                      <td className="text-right pr-5" style={{ fontSize: 20 }}>
                        &nbsp;{item.data().department}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Col>
        </Row>
      );
    }
  }

  genBorrowTrue() {
    if (this.state.itemsMove) {
      // filter only !== "จำหน่าย"
      const filItem = this.state.itemsMove.filter(item => {
        return item.data().borrowSta === true;
      });

      if (filItem.length)
        return (
          <>
            <Row>
              <Col sm="12">
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
                    <tbody>
                      {filItem.map(item => (
                        <tr
                          key={item.id}
                          style={{ cursor: "pointer" }}
                          //onClick={() => {this.setState({})}}
                        >
                          <td style={{ fontSize: 20 }}>
                            &nbsp;{item.data().itemCode}
                          </td>
                          <td style={{ fontSize: 20 }}>
                            &nbsp;{item.data().itemType}
                          </td>
                          <td style={{ fontSize: 20 }}>
                            &nbsp;{item.data().itemName}
                          </td>
                          <td
                            className="text-right pr-5"
                            style={{ fontSize: 20 }}
                          >
                            &nbsp;{item.data().department}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Col>
            </Row>
          </>
        );
      else
        return (
          <>
            <br />
            <div
              className="text-center"
              style={{ fontSize: "35px", height: "100px" }}
            >
              ไม่มีรายการครุภัณฑ์ที่ถูกยืม
            </div>
          </>
        );
    }
  }

  toggleBorModal = () => {
    this.setState({ borModal: !this.state.borModal });
  };

  toggleAlert = res => {
    if (res === "complete") {
      this.refs.notify.notificationAlert(optionsBor);
      this.setState({ refresher: !this.state.refresher });
    } else {
      //console.log("shit");
    }
  };

  render() {
    const { activeTab } = this.state;
    return (
      <div className="content regular-th">
        <NotificationAlert ref="notify" />
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
                <span style={{ fontSize: "23px" }}>จัดทำรายการยืม</span>
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
                <span style={{ fontSize: "23px" }}>ครุภัณฑ์ที่ถูกยืม</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">{this.genBorrowFalse()}</TabPane>
            <TabPane tabId="2">{this.genBorrowTrue()}</TabPane>
          </TabContent>
        </Card>

        <BorrowModal
          borModal={this.state.borModal}
          toggleFn={this.toggleBorModal}
          itemId={this.state.idToModal}
          itemCode={this.state.codeToModal}
          toggleAlert={this.toggleAlert}
        />
      </div>
    );
  }
}

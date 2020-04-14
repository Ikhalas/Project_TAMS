import React, { Component } from "react";
import BorrowLog from "./borrowLog/BorrowLog";
import NotificationAlert from "react-notification-alert";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import BorrowModal from "./borrow/BorrowModal";
import ReturnModal from "./return/ReturnModal";
import { db } from "../../api/firebase";
import moment from "moment";
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
  Table,
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
  autoDismiss: 3,
};

var optionsRet = {
  place: "tc",
  message: (
    <div>
      <div style={{ fontSize: "22px" }}>
        ทำรายการ <b style={{ color: "white" }}>การคืนครุภัณฑ์</b> สำเร็จ
      </div>
    </div>
  ),
  type: "success",
  icon: "nc-icon nc-cloud-upload-94",
  autoDismiss: 3,
};

export default class ItemBorrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      readyToRender1: false,
      readyToRender2: false,
      refresher: false,

      renderLog: false, // Default Value : false

      itemsMove: "",
      itemBorrow: "",

      borModal: false,
      retModal: false,
      idToModal: "",
      nameToModal: "",
      codeToModal: "",
      retIdToModal: "",
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getitemMovable();
    this._isMounted && this.getBorrow();
  }

  componentWillUnmount() {
    //cancel subscriptions and asynchronous tasks
    this._isMounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.refresher !== prevState.refresher) {
      this._isMounted && this.getitemMovable();
      this._isMounted && this.getBorrow();
    }
  }

  getitemMovable() {
    db.collection("itemMovable")
      .orderBy("itemCode")
      .get()
      .then((snapshot) => {
        let itemsMove = [];
        snapshot.forEach((doc) => {
          itemsMove.push(doc);
        });
        this._isMounted && this.setState({ itemsMove, readyToRender1: true });
      })
      .catch((error) => console.log(error));
  }

  getBorrow() {
    db.collection("borrowList")
      .orderBy("mustReturnDate") //เรียงจากน้อยไปมาก
      .get()
      .then((snapshot) => {
        let itemBorrow = [];
        snapshot.forEach((doc) => {
          itemBorrow.push(doc);
        });
        this._isMounted && this.setState({ itemBorrow, readyToRender2: true });
      })
      .catch((error) => console.log(error));
  }

  toggle = (tab) => {
    this.setState({ activeTab: tab });
  };

  calDate(ret) {
    if (ret) {
      let a = moment(new Date());
      let b = moment(new Date(ret.seconds * 1000));
      let dateToShow = b.diff(a, "days") + 1; // b-a

      //console.log(dateToShow)
      if (dateToShow <= 0)
        return (
          <>
            <span style={{ fontSize: "17px" }} className="text-danger">
              {" "}
              (เกินกำหนดวันคืน)
            </span>
          </>
        );
      else if (dateToShow <= 5 && dateToShow > 0)
        return (
          <>
            <span style={{ fontSize: "17px" }} className="text-danger">
              {" "}
              (เหลืออีก {dateToShow} วัน)
            </span>
          </>
        );
      else
        return (
          <>
            <span style={{ fontSize: "17px" }}>
              {" "}
              (เหลืออีก {dateToShow} วัน)
            </span>
          </>
        );
    }
  }

  convertDate(date) {
    let month = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    //console.log(month[(new Date(date.seconds * 1000).getMonth() + 1)])
    return (
      <>
        {" "}
        {new Date(date.seconds * 1000).getDate() +
          " " +
          month[new Date(date.seconds * 1000).getMonth()] +
          " " +
          (new Date(date.seconds * 1000).getFullYear() + 543)}
      </>
    );
  }

  /* การยืม */
  genBorrowFalse() {
    //console.log(this.state.itemsMove.length)
    if (this.state.itemsMove) {
      // filter only !== "จำหน่าย"
      const filItem = this.state.itemsMove.filter((item) => {
        return item.data().borrowSta === false && item.data().status === "ใช้งานได้ดี";
      });
      //console.log(filItem.length)
      if (filItem.length) {
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
                        className="table-header text-center"
                        style={{ fontWeight: "normal" }}
                      >
                        <b style={{ fontSize: "23px" }}>ประเภทครุภัณฑ์</b>
                      </th>
                      <th
                        className="table-header text-center"
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
                    {filItem.map((item) => (
                      <tr
                        key={item.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          this.setState({
                            idToModal: item.id,
                            codeToModal: item.data().itemCode,
                            borModal: !this.state.borModal,
                            nameToModal: item.data().itemName,
                          });
                        }}
                      >
                        <td style={{ fontSize: 20 }}>
                          &nbsp;{item.data().itemCode}
                        </td>
                        <td className="text-center" style={{ fontSize: 20 }}>
                          &nbsp;{item.data().itemType}
                        </td>
                        <td className="text-center" style={{ fontSize: 20 }}>
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
        );
      }
      else
      return (
        <>
          <br />
          <div
            className="text-center"
            style={{ fontSize: "35px", height: "100px" }}
          >
            ไม่มีรายการครุภัณฑ์ที่สามารถให้ยืมได้
          </div>
        </>
      );
    }
  }

  /* การคืน */
  genBorrowTrue() {
    if (this.state.itemBorrow) {
      if (this.state.itemBorrow.length)
        return (
          <>
            <Row>
              <Col sm="12">
                <CardBody>
                  <Table responsive hover size="sm">
                    <thead className="text-primary">
                      <tr>
                        <th
                          className="table-header text-left"
                          style={{ fontWeight: "normal" }}
                        >
                          <b style={{ fontSize: "23px" }}>เลขรหัสครุภัณฑ์</b>
                        </th>
                        <th
                          className="table-header text-center"
                          style={{ fontWeight: "normal" }}
                        >
                          <b style={{ fontSize: "23px" }}>ชื่อพัสดุ</b>
                        </th>
                        <th
                          className="table-header text-center"
                          style={{ fontWeight: "normal" }}
                        >
                          <b style={{ fontSize: "23px" }}>ชื่อผู้ยืม</b>
                        </th>
                        <th
                          className="table-header text-center"
                          style={{ fontWeight: "normal" }}
                        >
                          <b style={{ fontSize: "23px" }}> วันที่ยืม</b>
                        </th>
                        <th
                          className="table-header text-right pr-5"
                          style={{ fontWeight: "normal" }}
                        >
                          <b style={{ fontSize: "23px" }}> วันที่กำหนดคืน</b>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.itemBorrow.map((item) => (
                        <tr
                          key={item.id}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            this.setState({
                              retModal: !this.state.retModal,
                              retIdToModal: item.id,
                            })
                          }
                        >
                          <td className="text-left" style={{ fontSize: 20 }}>
                            &nbsp;{item.data().itemCode}
                          </td>
                          <td className="text-center" style={{ fontSize: 20 }}>
                            &nbsp;{item.data().itemName}
                          </td>
                          <td className="text-center" style={{ fontSize: 20 }}>
                            &nbsp;{item.data().borrower}
                          </td>
                          <td className="text-center" style={{ fontSize: 20 }}>
                            &nbsp;
                            {this.convertDate(item.data().borrowDate)}
                          </td>
                          <td
                            className="text-right pr-5"
                            style={{ fontSize: 20 }}
                          >
                            &nbsp;
                            {this.convertDate(item.data().mustReturnDate)}
                            &nbsp;
                            {this.calDate(item.data().mustReturnDate)}
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

  toggleRetModal = () => {
    this.setState({ retModal: !this.state.retModal });
  };

  toggleAlert = (res) => {
    if (res === "borrow") {
      this.refs.notify.notificationAlert(optionsBor);
      this.setState({ refresher: !this.state.refresher });
    } else if (res === "return") {
      this.refs.notify.notificationAlert(optionsRet);
      this.setState({ refresher: !this.state.refresher });
    } else {
      //console.log("shit");
    }
  };

  togglePage = () => {
    this.setState({ renderLog: !this.state.renderLog });
  };

  renderMain() {
    const { activeTab } = this.state;
    return (
      <>
        <Card>
          <div
            onClick={() => this.togglePage()}
            className="text-right button-like-a pr-3 pt-2 text-primary"
            style={{ fontSize: "20px" }}
          >
            ประวัติการยืมคืนครุภัณฑ์
          </div>
          <Nav tabs className="px-3">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                style={{
                  backgroundColor: activeTab === "1" ? "#f5f5f5" : "",
                  cursor: "pointer",
                }}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                <span style={{ fontSize: "23px" }}>ยืมครุภัณฑ์</span>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                style={{
                  backgroundColor: activeTab === "2" ? "#f5f5f5" : "",
                  cursor: "pointer",
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
      </>
    );
  }

  renderLog() {
    return (
      <>
        <BorrowLog togglePageFn={this.togglePage} />
      </>
    );
  }

  render() {
    const { renderLog, readyToRender1, readyToRender2 } = this.state;
    return readyToRender1 && readyToRender2 ? (
      <div className="content regular-th">
        <NotificationAlert ref="notify" />

        {renderLog ? this.renderLog() : this.renderMain()}

        {this.state.borModal && (
          <BorrowModal
            borModal={this.state.borModal}
            toggleFn={this.toggleBorModal}
            itemId={this.state.idToModal}
            itemCode={this.state.codeToModal}
            itemName={this.state.nameToModal}
            toggleAlert={this.toggleAlert}
          />
        )}
        {this.state.retModal && (
          <ReturnModal
            retModal={this.state.retModal}
            toggleFn={this.toggleRetModal}
            itemid={this.state.retIdToModal}
            toggleAlert={this.toggleAlert}
          />
        )}
      </div>
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

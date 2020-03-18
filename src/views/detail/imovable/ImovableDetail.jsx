import React, { Component } from "react";
import NotificationAlert from "react-notification-alert";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { db } from "../../../api/firebase";
import { apiKey } from "../../../api/google-map";
import { Link } from "react-router-dom";
import ResModal from "./responsibility/ResModal";
import ValModal from "./valueAdded/ValModal";
import BenModal from "./benefit/BenModal";
import MainModal from "./maintenance/MainModal";
import DeactCollapse from "./deactivation/DeactCollapse";
import DeactivateInfo from "./deactivation/DeactivateInfo";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Alert,
  Button,
  Collapse
} from "reactstrap";

var notiAlert = {
  place: "tc",
  message: (
    <div>
      <div style={{ fontSize: "23px" }}>เพิ่มรายการสำเร็จ</div>
    </div>
  ),
  type: "success",
  icon: "nc-icon nc-cloud-upload-94",
  autoDismiss: 3
};

var notiDeact = {
  place: "tc",
  message: (
    <div>
      <div style={{ fontSize: "23px" }}>จำหน่ายครุภัณฑ์สำเร็จ</div>
    </div>
  ),
  type: "danger",
  icon: "nc-icon nc-cloud-upload-94",
  autoDismiss: 3
};

function DetailTable(props) {
  return (
    <tr>
      <td style={{ fontSize: "23px" }}>
        <b>{props.label}</b>
      </td>
      <td style={{ fontSize: "25px" }}>{props.detail ? props.detail : "-"}</td>
    </tr>
  );
}

class ImovableDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemDetail: "",
      res: "",
      val: "",
      ben: "",
      main: "",

      readyToRender: false,
      refresher: false,

      resModal: false,
      valModal: false,
      benModal: false,
      mainModal: false,

      deactOpen: false
    };

    this._isMounted = false;
    this._statusLabel = "text-secondary";
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getItemDetail();
  }

  componentWillUnmount() {
    //cancel subscriptions and asynchronous tasks
    this._isMounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.refresher !== prevState.refresher) {
      this._isMounted && this.getItemDetail();
    }
  }

  getItemDetail() {
    // if (this.props.itemId) {
    db.collection("itemImovable")
      .doc(this.props.itemId) //mock  nJfNUbGbLYz4CzbMonCb
      .get()
      .then(doc => {
        this._isMounted &&
          this.setState({
            itemDetail: Object(doc.data()),
            readyToRender: true
          });
        //console.log(this.state.itemDetail);
        this._isMounted && this.getResponsibility();
        this._isMounted && this.getLandValue();
        this._isMounted && this.getBenefit();
        this._isMounted && this.getMaintenance();
        this._isMounted && this.statusLabel();
      })
      .catch(error => console.log(error));
    // }
  }

  getResponsibility() {
    db.collection("landRes")
      .where("itemCode", "==", this.state.itemDetail.itemCode) //mock => this.props.itemId
      .get()
      .then(snapshot => {
        let res = [];
        snapshot.forEach(doc => {
          res.push(doc.data());
        });
        this._isMounted && this.setState({ res });
        //console.log(Object(this.state.res));
      })
      .catch(error => console.log(error));
  }

  getLandValue() {
    db.collection("landValue")
      .where("itemCode", "==", this.state.itemDetail.itemCode) //mock => this.props.itemId
      .get()
      .then(snapshot => {
        let val = [];
        snapshot.forEach(doc => {
          val.push(doc.data());
        });
        this._isMounted && this.setState({ val });
        //console.log(Object(this.state.val));
      })
      .catch(error => console.log(error));
  }

  getBenefit() {
    db.collection("landBen")
      .where("itemCode", "==", this.state.itemDetail.itemCode)
      .get()
      .then(snapshot => {
        let ben = [];
        snapshot.forEach(doc => {
          ben.push(doc.data());
        });
        this._isMounted && this.setState({ ben });
        //console.log(this.state.ben);
      })
      .catch(error => console.log(error));
  }

  getMaintenance() {
    db.collection("landMain")
      .where("itemCode", "==", this.state.itemDetail.itemCode)
      .get()
      .then(snapshot => {
        let main = [];
        snapshot.forEach(doc => {
          main.push(doc.data());
        });
        this._isMounted && this.setState({ main });
        //console.log(this.state.main);
      })
      .catch(error => console.log(error));
  }

  statusLabel() {
    const { itemDetail } = this.state;
    if (itemDetail.status === "ใช้งานได้ดี") this._statusLabel = "text-success";
    else if (itemDetail.status === "ชำรุด") this._statusLabel = "text-warning";
    else if (itemDetail.status === "เสื่อมสภาพ")
      this._statusLabel = "text-warning";
    else if (itemDetail.status === "สูญหาย") this._statusLabel = "text-danger";
    else if (itemDetail.status === "จำหน่าย") this._statusLabel = "text-danger";
    else this._statusLabel = "text-secondary";
  }

  genResRows() {
    if (!this.state.res.length) {
      return (
        <tr>
          <td style={{ textAlign: "center" }}>
            <b>-</b>
          </td>
          <td style={{ textAlign: "center" }}>
            <Alert color="warning">
              <span>ยังไม่มีรายการ</span>
            </Alert>
          </td>
          <td style={{ textAlign: "center" }}>
            <b>-</b>
          </td>
        </tr>
      );
    }
    if (this.state.res) {
      const sorted = this.state.res;
      sorted.sort((a, b) => (a.seq > b.seq ? 1 : -1)); //sort seq
      return (
        sorted &&
        sorted.map(res => (
          <tr key={res.seq}>
            <td style={{ textAlign: "center", fontSize: "23px" }}>
              {res.date}
            </td>
            <td style={{ textAlign: "center", fontSize: "23px" }}>
              {res.resSubDepartment}
            </td>
            <td style={{ textAlign: "center", fontSize: "23px" }}>
              {res.resName}
            </td>
          </tr>
        ))
      );
    }
  }

  genValRows() {
    if (!this.state.val.length) {
      return (
        <tr>
          <td style={{ textAlign: "center" }}>
            <b>-</b>
          </td>
          <td style={{ textAlign: "center" }}>
            <Alert color="warning">
              <span>ยังไม่มีรายการ</span>
            </Alert>
          </td>
          <td style={{ textAlign: "center" }}>
            <b>-</b>
          </td>
        </tr>
      );
    }
    if (this.state.val) {
      const sorted = this.state.val;
      sorted.sort((a, b) => (a.seq > b.seq ? 1 : -1)); //sort seq
      return (
        sorted &&
        sorted.map(val => (
          <tr key={val.seq}>
            <td style={{ textAlign: "center", fontSize: "23px" }}>
              {val.date}
            </td>
            <td style={{ textAlign: "center", fontSize: "23px" }}>
              {val.percent} %
            </td>
            <td style={{ textAlign: "center", fontSize: "23px" }}>
              {val.balance} บาท
            </td>
            <td style={{ textAlign: "center", fontSize: "18px" }}>
              {val.note}
            </td>
          </tr>
        ))
      );
    }
  }

  genBenRows() {
    if (!this.state.ben.length) {
      return (
        <tr>
          <td style={{ textAlign: "center" }}>
            <b>-</b>
          </td>
          <td style={{ textAlign: "center" }}>
            <Alert color="warning">
              <span>ยังไม่มีรายการ</span>
            </Alert>
          </td>
          <td style={{ textAlign: "center" }}>
            <b>-</b>
          </td>
        </tr>
      );
    }
    const sorted = this.state.ben;
    this.state.ben && sorted.sort((a, b) => (a.seq > b.seq ? 1 : -1)); //sort seq
    return (
      sorted &&
      sorted.map(ben => (
        <tr key={ben.seq}>
          <td style={{ textAlign: "center" }}>{ben.date}</td>
          <td style={{ textAlign: "center" }}>{ben.detail}</td>
          <td style={{ textAlign: "center" }}>{ben.total}</td>
        </tr>
      ))
    );
  }

  genMainRows() {
    if (!this.state.main.length) {
      return (
        <tr>
          <td style={{ textAlign: "center" }}>
            <b>-</b>
          </td>
          <td style={{ textAlign: "center" }}>
            <Alert color="warning">
              <span>ยังไม่มีรายการ</span>
            </Alert>
          </td>
          <td style={{ textAlign: "center" }}>
            <b>-</b>
          </td>
        </tr>
      );
    }
    const sorted = this.state.main;
    this.state.main && sorted.sort((a, b) => (a.seq > b.seq ? 1 : -1)); //sort seq
    return (
      this.state.main &&
      sorted.map(main => (
        <tr key={main.seq}>
          <td style={{ textAlign: "center" }}>{main.seq}</td>
          <td style={{ textAlign: "center" }}>{main.date}</td>
          <td style={{ textAlign: "center" }}>{main.detail}</td>
        </tr>
      ))
    );
  }

  toggleDeact = () => {
    this.setState({ deactOpen: !this.state.deactOpen }, () => {
      //console.log("done")
    });
  };

  deactivateLand() {
    if (this.state.itemDetail.status !== "จำหน่าย") {
      //console.log(this.state.itemDetail.status)
      return (
        <>
          <div>
            สถานะปัจจุบัน :
            <span style={{ fontSize: 23 }}>{this.state.itemDetail.status}</span>
          </div>
          <Button outline color="danger" block onClick={this.toggleDeact}>
            <span className="regular-th" style={{ fontWeight: "normal" }}>
              {this.state.deactOpen ? "ยกเลิก" : "จำหน่ายครุภัณฑ์"}
            </span>
          </Button>
          <br />
          <Collapse isOpen={this.state.deactOpen}>
            <DeactCollapse
              itemId={this.props.itemId}
              itemCode={this.state.itemDetail.itemCode}
              itemName={this.state.itemDetail.itemName}
              price={this.state.itemDetail.price}
              toggleFn={this.toggleDeact}
              toggleAlert={this.toggleAlert}
            />
          </Collapse>
        </>
      );
    }
  }

  toggleAlert = res => {
    if (res === "complete") {
      this.setState({ refresher: !this.state.refresher });
      this.refs.notify.notificationAlert(notiAlert);
    }

    if (res === "deactivated") {
      this.setState({ refresher: !this.state.refresher });
      this.refs.notify.notificationAlert(notiDeact);
    }
  };

  toggleResModal = () => {
    this.setState({ resModal: !this.state.resModal });
  };

  toggleValModal = () => {
    this.setState({ valModal: !this.state.valModal });
  };

  toggleBenModal = () => {
    this.setState({ benModal: !this.state.benModal }, () => {
      //console.log("done")
    });
  };

  toggleMainModal = () => {
    this.setState({ mainModal: !this.state.mainModal }, () => {
      //console.log("done")
    });
  };

  render() {
    const { readyToRender, itemDetail } = this.state;
    return readyToRender ? (
      <>
        <NotificationAlert ref="notify" />
        {/* ข้อมูลเบื้องต้นของครุภัณฑ์ */}
        <Card>
          <Link
            to="/admin/item-detail"
            onClick={() => this.props.backButton()}
            className="pl-2 pt-2"
            style={{ textDecorationColor: "black" }}
          >
            <i
              style={{ fontSize: "15px", color: "black" }}
              className="nc-icon nc-minimal-left"
            />
            <span
              className="regular-th"
              style={{
                fontSize: "25px",
                color: "black",
                fontWeight: "normal"
              }}
            >
              {" "}
              ย้อนกลับ
            </span>
          </Link>

          {/* case: item deactivated */}
          {itemDetail.status === "จำหน่าย" ? (
            <DeactivateInfo itemCode={itemDetail.itemCode} />
          ) : (
            <></>
          )}

          <CardHeader>
            <CardTitle>
              <Row>
                <Col style={{ color: "#66615b", fontSize: "25px" }}>
                  ข้อมูลเบื้องต้นของครุภัณฑ์{" "}
                </Col>
                <Col
                  style={{ fontSize: "25px", paddingRight: "50px" }}
                  className="text-right"
                >
                  <p className={this._statusLabel}>
                    สถานะ : {itemDetail.status}
                  </p>
                </Col>
              </Row>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="6" sm="12">
                <Table size="sm" hover>
                  <tbody>
                    <DetailTable
                      label="ชื่อครุภัณฑ์"
                      detail={itemDetail.itemName}
                    />
                    <DetailTable
                      label="รหัสครุภัณฑ์"
                      detail={itemDetail.itemCode}
                    />
                    <DetailTable
                      label="หน่วยงานที่รับผิดชอบ"
                      detail={itemDetail.department}
                    />
                    <DetailTable
                      label="หน่วยงานย่อย"
                      detail={itemDetail.subDepartment}
                    />
                    <DetailTable
                      label="เอกสารสิทธิ์ครุภัณฑ์"
                      detail={itemDetail.certificate}
                    />
                    <DetailTable
                      label="ชื่อผู้รับจ้าง/ผู้ขาย/ผู้ให้"
                      detail={itemDetail.sellerName}
                    />
                  </tbody>
                </Table>
              </Col>
              <Col md="6" sm="12">
                <div
                  style={{
                    paddingBottom: "20px",
                    textAlign: "center"
                  }}
                >
                  <img
                    src={itemDetail.url}
                    width="350px"
                    height="auto"
                    style={{ boxShadow: "2px 2px 5px grey" }}
                    alt="ไม่มีรูปภาพประกอบ"
                  />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        {/* แผนที่ */}
        <Card>
          <CardHeader>
            <CardTitle style={{ color: "#66615b", fontSize: "25px" }}>
              ที่ตั้งครุภัณฑ์
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="12" sm="12">
                <Table size="sm" hover>
                  <tbody>
                    <DetailTable label="ที่อยู่" detail={itemDetail.address} />
                    <tr>
                      <td style={{ fontSize: "23px" }}>
                        <b>เนื้อที่</b>
                      </td>
                      <td style={{ fontSize: "25px" }}>
                        {itemDetail.rai ? itemDetail.rai : "-"} ไร่ &nbsp;&nbsp;
                        {itemDetail.ngan ? itemDetail.ngan : "-"} งาน
                        &nbsp;&nbsp;
                        {itemDetail.wah ? itemDetail.wah : "-"} ตารางวา
                      </td>
                    </tr>
                  </tbody>
                </Table>

                <Map
                  google={this.props.google}
                  style={{
                    width: "96%",
                    height: "500px"
                  }}
                  zoom={15}
                  initialCenter={{ lat: itemDetail.lat, lng: itemDetail.lng }}
                >
                  <Marker
                    key={Math.random()}
                    //position={marker.position}
                    draggable={false}
                  />
                </Map>
                <Row style={{ marginTop: "520px" }}>
                  <Col md="6">
                    <p>
                      ตำแหน่ง : [{itemDetail.lat}, {itemDetail.lng} ]
                    </p>
                  </Col>

                  <Col
                    md="6"
                    className="text-right"
                    style={{ paddingRight: "30px" }}
                  >
                    <a
                      href={
                        "https://www.google.com/maps/search/?api=1&query=" +
                        itemDetail.lat +
                        "," +
                        itemDetail.lng
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      เปิดบน Google Maps
                    </a>
                  </Col>
                </Row>
                <CardHeader>
                  <CardTitle style={{ color: "#66615b", fontSize: "25px" }}>
                    ประเภทโรงเรือน
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <Table size="sm" hover>
                        <tbody>
                          <DetailTable
                            label="ประเภทโรงเรือน"
                            detail={itemDetail.buildingType}
                          />
                          <DetailTable
                            label="วัสดุที่ใช้ก่อสร้าง"
                            detail={itemDetail.material}
                          />
                        </tbody>
                      </Table>
                    </Col>
                    <Col md="6">
                      <Table size="sm" hover>
                        <tbody>
                          <DetailTable
                            label="จำนวนชั้น"
                            detail={itemDetail.floor}
                          />
                          <tr>
                            <td style={{ fontSize: "23px" }}></td>
                            <td style={{ fontSize: "25px" }}></td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>

                <CardHeader>
                  <CardTitle style={{ color: "#66615b", fontSize: "25px" }}>
                    ประเภทโรงเรือน
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <Table size="sm" hover>
                        <tbody>
                          <DetailTable
                            label="ลักษณะ/ชนิด"
                            detail={itemDetail.otherType}
                          />
                        </tbody>
                      </Table>
                    </Col>
                    <Col md="6">
                      <Table size="sm" hover>
                        <tbody>
                          <DetailTable
                            label="ขนาด"
                            detail={itemDetail.otherSize}
                          />
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>
              </Col>
            </Row>
          </CardBody>
        </Card>
        {/* ข้อมูลที่มาของครุภัณฑ์ */}
        <Card>
          <CardHeader>
            <CardTitle style={{ color: "#66615b", fontSize: "25px" }}>
              ข้อมูลที่มาของครุภัณฑ์
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="6" sm="12">
                <Table size="sm" hover>
                  <tbody>
                    <DetailTable
                      label="วันที่ซื้อ/ได้มา"
                      detail={itemDetail.derivedDate}
                    />
                    <DetailTable
                      label="เลขที่หนังสืออนุมัติ/ลงวันที่"
                      detail={itemDetail.letterNo}
                    />
                  </tbody>
                </Table>
              </Col>
              <Col md="6" sm="12">
                <Table size="sm" hover>
                  <tbody>
                    <DetailTable label="ราคา" detail={itemDetail.price} />
                    <DetailTable
                      label="หน่วยงานเจ้าของงบประมาณ"
                      detail={itemDetail.budgetOf}
                    />
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardBody>
        </Card>
        {/* หมายเหตุ */}
        <Row>
          <Col>
            <Card>
              <CardHeader></CardHeader>
              <CardBody>
                <Table size="sm" hover>
                  <tbody>
                    <DetailTable label="หมายเหตุ" detail={itemDetail.note} />
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* ข้อมูลผู้ดูแลรับผิดชอบครุภัณฑ์ */}
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#66615b", fontSize: "25px" }}>
                  <Row>
                    <Col style={{ color: "#66615b", fontSize: "25px" }}>
                      ข้อมูลผู้ดูแลรับผิดชอบครุภัณฑ์{" "}
                    </Col>
                    <Col
                      style={{ fontSize: "22px", paddingRight: "50px" }}
                      className="text-right text-success"
                    >
                      {itemDetail.status === "จำหน่าย" ? (
                        <></>
                      ) : (
                        <>
                          <button
                            className="regular-th button-like-a text-info"
                            onClick={() => this.toggleResModal()}
                          >
                            <i
                              style={{ fontSize: "15px" }}
                              className="far fa-plus-square"
                            />{" "}
                            เพิ่มรายการ
                          </button>
                        </>
                      )}
                    </Col>
                  </Row>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table size="sm" hover>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#66615b"
                        }}
                      >
                        วันที่
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#66615b"
                        }}
                      >
                        ชื่อส่วนราชการ
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#66615b"
                        }}
                      >
                        ชื่อหัวหน้าส่วนราชการ
                      </th>
                    </tr>
                  </thead>
                  <tbody>{this.genResRows()}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* ข้อมูลการเพิ่มมูลค่าของที่ดิน */}
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#66615b", fontSize: "25px" }}>
                  <Row>
                    <Col style={{ color: "#66615b", fontSize: "25px" }}>
                      ข้อมูลการเพิ่มมูลค่าของที่ดิน{" "}
                    </Col>
                    <Col
                      style={{ fontSize: "22px", paddingRight: "50px" }}
                      className="text-right text-success"
                    >
                      {itemDetail.status === "จำหน่าย" ? (
                        <></>
                      ) : (
                        <>
                          <button
                            className="regular-th button-like-a text-info"
                            onClick={() => this.toggleValModal()}
                          >
                            <i
                              style={{ fontSize: "15px" }}
                              className="far fa-plus-square"
                            />{" "}
                            เพิ่มรายการ
                          </button>
                        </>
                      )}
                    </Col>
                  </Row>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table size="sm" hover>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#66615b"
                        }}
                      >
                        วันที่
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#66615b"
                        }}
                      >
                        มูลค่าเพิ่มขึ้น(%)
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#66615b"
                        }}
                      >
                        มูลค่าปัจจุบัน
                      </th>
                      <th style={{ width: "10%" }}></th>
                    </tr>
                  </thead>
                  <tbody>{this.genValRows()}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* ข้อมูลผลประโยชน์ที่หาได้จากครุภัณฑ์ */}
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#66615b", fontSize: "25px" }}>
                  <Row>
                    <Col style={{ color: "#66615b", fontSize: "25px" }}>
                      ข้อมูลผลประโยชน์ที่หาได้จากครุภัณฑ์{" "}
                    </Col>
                    <Col
                      style={{ fontSize: "22px", paddingRight: "50px" }}
                      className="text-right text-success"
                    >
                      {itemDetail.status === "จำหน่าย" ? (
                        <></>
                      ) : (
                        <>
                          <button
                            className="regular-th button-like-a text-info"
                            onClick={() => this.toggleBenModal()}
                          >
                            <i
                              style={{ fontSize: "15px" }}
                              className="far fa-plus-square"
                            />{" "}
                            เพิ่มรายการ
                          </button>
                        </>
                      )}
                    </Col>
                  </Row>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table size="sm" hover>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#66615b"
                        }}
                      >
                        วันที่
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#66615b"
                        }}
                      >
                        รายการ
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#66615b"
                        }}
                      >
                        ผลประโยชน์ที่ได้รับ (บาท)
                      </th>
                    </tr>
                  </thead>
                  <tbody>{this.genBenRows()}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* บันทึกการซ่อม/ปรับปรุงแก้ไขพัสดุ */}
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#66615b", fontSize: "25px" }}>
                  <Row>
                    <Col style={{ color: "#66615b", fontSize: "25px" }}>
                      บันทึกการซ่อม/ปรับปรุงแก้ไขครุภัณฑ์{" "}
                    </Col>
                    <Col
                      style={{ fontSize: "22px", paddingRight: "50px" }}
                      className="text-right text-success"
                    >
                      {itemDetail.status === "จำหน่าย" ? (
                        <></>
                      ) : (
                        <>
                          <button
                            className="regular-th button-like-a text-info"
                            onClick={() => this.toggleMainModal()}
                          >
                            <i
                              style={{ fontSize: "15px" }}
                              className="far fa-plus-square"
                            />{" "}
                            เพิ่มรายการ
                          </button>
                        </>
                      )}
                    </Col>
                  </Row>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table size="sm" hover>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#66615b"
                        }}
                      >
                        ครั้งที่
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#66615b"
                        }}
                      >
                        วันที่
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#66615b"
                        }}
                      >
                        รายการซ่อม/ปรับปรุงแก้ไข
                      </th>
                    </tr>
                  </thead>
                  <tbody>{this.genMainRows()}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* การจำหน่ายครุภัณฑ์ */}
        {this.deactivateLand()}

        {this.state.resModal && (
          <ResModal
            resModal={this.state.resModal}
            toggleFn={this.toggleResModal}
            itemCode={this.state.itemDetail.itemCode}
            department={this.state.itemDetail.department}
            res={this.state.res}
            toggleAlert={this.toggleAlert}
          />
        )}

        {this.state.valModal && (
          <ValModal
            valModal={this.state.valModal}
            toggleFn={this.toggleValModal}
            itemCode={this.state.itemDetail.itemCode}
            val={this.state.val}
            toggleAlert={this.toggleAlert}
          />
        )}

        {this.state.benModal && (
          <BenModal
            benModal={this.state.benModal}
            toggleFn={this.toggleBenModal}
            itemCode={this.state.itemDetail.itemCode}
            ben={this.state.ben}
            toggleAlert={this.toggleAlert}
          />
        )}

        {this.state.mainModal && (
          <MainModal
            mainModal={this.state.mainModal}
            toggleFn={this.toggleMainModal}
            itemCode={this.state.itemDetail.itemCode}
            main={this.state.main}
            toggleAlert={this.toggleAlert}
          />
        )}
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

export default GoogleApiWrapper({
  apiKey: apiKey
})(ImovableDetail);

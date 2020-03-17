import React, { Component } from "react";
import NotificationAlert from "react-notification-alert";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { db } from "../../../api/firebase";
import { apiKey } from "../../../api/google-map";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Alert,
  Button
} from "reactstrap";

/*
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
*/

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
      refresher: false
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getItemDetail();
  }

  componentWillUnmount() {
    //cancel subscriptions and asynchronous tasks
    this._isMounted = false;
  }

  getItemDetail() {
    // if (this.props.itemId) {
    db.collection("itemImovable")
      .doc(this.props.itemId) //mock this.props.itemId
      .get()
      .then(doc => {
        this._isMounted &&
          this.setState({
            itemDetail: Object(doc.data()),
            readyToRender: true
          });
        console.log(this.state.itemDetail);
        this._isMounted && this.getResponsibility();
        this._isMounted && this.getLandValue();
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
        console.log(Object(this.state.res));
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
        console.log(Object(this.state.val));
      })
      .catch(error => console.log(error));
  }

  getBenefit() {
    db.collection("landBenefit")
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
    db.collection("itemMaintenance")
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
          <td style={{ textAlign: "center" }}>
            <b>{ben.date}</b>
          </td>
          <td style={{ textAlign: "center" }}>
            <b>{ben.detail}</b>
          </td>
          <td style={{ textAlign: "center" }}>
            <b>{ben.total}</b>
          </td>
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
          <td style={{ textAlign: "center" }}>
            <b>{main.No}</b>
          </td>

          <td style={{ textAlign: "center" }}>
            <b>{main.date}</b>
          </td>
          <td style={{ textAlign: "center" }}>
            <b>{main.detail}</b>
          </td>
        </tr>
      ))
    );
  }

  deactivateLand() {
    if (this.state.itemDetail.status !== "จำหน่าย") {
      //console.log(this.state.itemDetail.status)
      return (
        <>
          <div>
            สถานะปัจจุบัน :
            <span style={{ fontSize: 23 }}>{this.state.itemDetail.status}</span>
          </div>
          <Button outline color="danger" block>
            <span className="regular-th" style={{ fontWeight: "normal" }}>
              จำหน่ายครุภัณฑ์
            </span>
          </Button>
          <br />
        </>
      );
    }
  }

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
                  สถานะ : {itemDetail.status}
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
                      <a
                        href="javascript:void(0);"
                        onClick={() => this.toggleResModal()}
                      >
                        <i
                          style={{ fontSize: "15px" }}
                          className="far fa-plus-square"
                        />{" "}
                        เพิ่มรายการ
                      </a>
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
        {/* ข้อมูลผู้ดูแลรับผิดชอบครุภัณฑ์ */}
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
                      <a
                        href="javascript:void(0);"
                        onClick={() => this.toggleResModal()}
                      >
                        <i
                          style={{ fontSize: "15px" }}
                          className="far fa-plus-square"
                        />{" "}
                        เพิ่มรายการ
                      </a>
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
                        เปอร์เซ็นต์
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#66615b"
                        }}
                      >
                        ราคาปัจจุบัน
                      </th>
                      <th style={{width:'10%'}}></th>
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
                      <a href="javascript:void(0);">
                        <i
                          style={{ fontSize: "15px" }}
                          className="far fa-plus-square"
                        />{" "}
                        เพิ่มรายการ
                      </a>
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
                      <a href="javascript:void(0);">
                        <i
                          style={{ fontSize: "15px" }}
                          className="far fa-plus-square"
                        />{" "}
                        เพิ่มรายการ
                      </a>
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

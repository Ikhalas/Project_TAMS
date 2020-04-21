import React, { Component } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { db } from "../../api/firebase";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  Table
} from "reactstrap";

import logo from "../../assets/img/logo.png";

function DetailTable(props) {
  return (
    <tr>
      <td
        style={{ fontSize: "23px", backgroundColor: "#ffffff", width: "40%" }}
      >
        <b style={{ backgroundColor: "#ffffff" }}>{props.label}</b>
      </td>
      <td
        style={{ fontSize: "25px", backgroundColor: "#ffffff", width: "60%" }}
      >
        {props.detail ? props.detail : "-"}
      </td>
    </tr>
  );
}

export default class ItemMovable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemDetail: "",
      res: "",
      resName: "",
      resDep: "",
      readyToRender: "",
      error: false
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getItemDetail();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getItemDetail() {
    db.collection("itemMovable")
      .doc(this.props.match.params.id) //mock X32UtvVTayGD5ykl9qSH
      .get()
      .then(doc => {
        this._isMounted &&
          this.setState({
            itemDetail: Object(doc.data()),
            readyToRender: true
          });
        this._isMounted && this.getResponsibility();
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
  }

  getResponsibility() {
    db.collection("itemRes")
      .where("itemCode", "==", this.state.itemDetail.itemCode)
      .get()
      .then(snapshot => {
        let res = [];
        snapshot.forEach(doc => {
          res.push(doc.data());
        });
        this._isMounted && this.setState({ res });

        let _lastSeq = Math.max.apply(
          Math,
          this.state.res.map(function(obj) {
            return obj.seq;
          })
        );

        let fil = this.state.res.filter(fil => {
          return fil.seq === _lastSeq;
        });

        this.setState({
          resName: fil[0].resName,
          resDep: fil[0].resSubDepartment
        });
      })
      .catch(error => console.log(error));
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
    //console.log(month[new Date(date.seconds * 1000).getMonth() + 1]);
    if (date) {
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
    } else {
      return <></>;
    }
  }

  render() {
    const { itemDetail, readyToRender, error } = this.state;
    return readyToRender ? (
      <div className="regular-th">
        <Row className="px-2 py-3">
          <Col md="12" sm="12" className="text-center">
            <Card>
              <CardHeader tag="h2">
                องค์การบริหารส่วนตำบลท่าข้าม&nbsp;&nbsp;
                <img width="10%" src={logo} alt="logo-Thakham" />
              </CardHeader>

              {error ? (
                <>
                  <CardBody style={{ backgroundColor: "#ffffff" }}>
                    <h1 style={{ backgroundColor: "#ffffff" }}>
                      เกิดข้อผิดพลาด
                    </h1>
                    <p style={{ backgroundColor: "#ffffff" }}>
                      URL อาจไม่ถูกต้อง โปรดลองใหม่อีกครั้ง
                    </p>
                    <i
                      style={{ backgroundColor: "#ffffff", fontSize: "80px" }}
                      className="fas fa-exclamation-triangle"
                    ></i>
                  </CardBody>
                </>
              ) : (
                <>
                  {" "}
                  <CardBody style={{ backgroundColor: "#ffffff" }}>
                    <div style={{ backgroundColor: "#ffffff" }}>
                      <img
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                        src={itemDetail.url}
                        alt="ไม่มีภาพประกอบ"
                      />
                    </div>
                    <br />
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
                          label="หน่วยงาน"
                          detail={itemDetail.department}
                        />
                        <DetailTable
                          label="หน่วยงานย่อย"
                          detail={itemDetail.subDepartment}
                        />
                        <DetailTable
                          label="เลขใบส่งของ"
                          detail={itemDetail.waybillCode}
                        />

                        <DetailTable
                          label="วันที่ได้มา"
                          detail={this.convertDate(itemDetail.derivedDate)}
                        />

                        <DetailTable
                          label="งบประมาณของ"
                          detail={itemDetail.budgetOf}
                        />

                        <DetailTable
                          label="ผู้รับผิดชอบ"
                          detail={this.state.resName}
                        />
                        <DetailTable
                          label="ส่วนราชการที่รับผิดชอบ"
                          detail={this.state.resDep}
                        />
                      </tbody>
                    </Table>
                  </CardBody>
                </>
              )}

              <CardFooter
                style={{ fontSize: "15px" }}
                className="text-muted text-right"
              >
                power by IKHALAS CoE PSU
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    ) : (
      <div className="px-2 py-3">
        <SkeletonTheme color="#fafafa">
          <p>
            <Skeleton height={700} />
          </p>
        </SkeletonTheme>
      </div>
    );
  }
}

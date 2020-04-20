import React, { Component } from "react";
import { db } from "../../../../api/firebase";
import NumberFormat from "react-number-format";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { CardHeader, CardTitle, Table } from "reactstrap";

export default class DeactivateInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: [],
      readyRender: false,
    };
  }
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getDeactivateInfo();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getDeactivateInfo() {
    db.collection("deactivatedItem")
      .where("itemCode", "==", this.props.itemCode)
      .get()
      .then((snapshot) => {
        let detail;
        snapshot.forEach((doc) => {
          detail = doc.data();
        });
        this._isMounted && this.setState({ detail, readyRender: true });
        //console.log(Object(this.state.detail));
      })
      .catch((error) => console.log(error));
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
    const { detail, readyRender } = this.state;
    return readyRender ? (
      <>
        <CardHeader
          style={{ textAlign: "center", fontSize: "45px", color: "#ef8157" }}
        >
          ครุภัณฑ์รหัส "{this.props.itemCode}" ถูกจำหน่ายแล้ว
        </CardHeader>
        <CardHeader>
          <CardTitle>
            <p style={{ color: "#66615b", fontSize: "25px" }}>
              รายละเอียดการจำหน่าย{" "}
            </p>
          </CardTitle>
        </CardHeader>
        <div className="px-2">
          <Table size="sm" hover>
            <tbody>
              <tr>
                <td>
                  <b>วันที่จำหน่าย</b> :
                </td>
                <td>{this.convertDate(detail.date)}</td>
              </tr>
              <tr>
                <td>
                  <b>เลขที่หนังสืออนุมัติ</b> :
                </td>
                <td>{detail.docNo}</td>
              </tr>
              <tr>
                <td>
                  <b>วิธีจำหน่าย</b> :
                </td>
                <td>{detail.method}</td>
              </tr>

              <tr>
                <td>
                  <b>ราคาจำหน่าย</b> :
                </td>
                <td>
                  <NumberFormat
                    value={detail.salePrice}
                    displayType={"text"}
                    thousandSeparator={true}
                  />{" "}
                  &nbsp;บาท
                </td>
              </tr>
              <tr>
                <td>
                  <b>กำไร/ขาดทุน</b> :
                </td>
                <td>
                  {detail.profit}&nbsp;&nbsp;
                  <NumberFormat
                    value={detail.amount}
                    displayType={"text"}
                    thousandSeparator={true}
                  />{" "}
                  &nbsp;บาท
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <hr />
      </>
    ) : (
      <div className="content">
        <SkeletonTheme color="#fafafa">
          <p style={{textAlign:'center'}}>
            <Skeleton height={400} width={1100} />
          </p>
        </SkeletonTheme>
      </div>
    );
  }
}

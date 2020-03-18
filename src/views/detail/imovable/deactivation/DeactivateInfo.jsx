import React, { Component } from "react";
import { db } from "../../../../api/firebase";
import { CardHeader, CardTitle, Table } from "reactstrap";

export default class DeactivateInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: []
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
    db.collection("deactivatedLand")
      .where("itemCode", "==", this.props.itemCode)
      .get()
      .then(snapshot => {
        let detail;
        snapshot.forEach(doc => {
          detail = doc.data();
        });
        this._isMounted && this.setState({ detail });
        //console.log(Object(this.state.detail));
      })
      .catch(error => console.log(error));
  }

  render() {
    const detail = this.state.detail;
    return (
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
                <td>{detail.date}</td>
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
                <td>{detail.salePrice}&nbsp;บาท</td>
              </tr>
              <tr>
                <td>
                  <b>กำไร/ขาดทุน</b> :
                </td>
                <td>
                  {detail.profit}&nbsp;&nbsp;
                  {detail.amount}&nbsp;บาท
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <hr />
      </>
    );
  }
}

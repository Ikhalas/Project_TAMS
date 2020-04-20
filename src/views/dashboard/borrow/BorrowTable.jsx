import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

export default class BorrowTable extends Component {
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
  genBorrowTrue() {
    if (this.props.itemBorrow) {
      if (this.props.itemBorrow.length)
        return (
          <>
            <Row>
              <Col sm="12">
                <CardHeader>
                  <CardTitle tag="h5" style={{ color: "#66615b" }}>
                    &nbsp;รายการครุภัณฑ์ที่ต้องคืน
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Table hover size="sm">
                    <thead className="text-primary">
                      <tr>
                        <th
                          className="table-header text-left"
                          style={{ fontWeight: "normal", width: "20%" }}
                        >
                          <b style={{ fontSize: "23px" }}>เลขรหัสครุภัณฑ์</b>
                        </th>
                        <th
                          className="table-header text-center"
                          style={{ fontWeight: "normal", width: "20%" }}
                        >
                          <b style={{ fontSize: "23px" }}>ชื่อพัสดุ</b>
                        </th>
                        <th
                          className="table-header text-center"
                          style={{ fontWeight: "normal", width: "20%" }}
                        >
                          <b style={{ fontSize: "23px" }}>ชื่อผู้ยืม</b>
                        </th>
                        <th
                          className="table-header text-right pr-5"
                          style={{ fontWeight: "normal", width: "40%" }}
                        >
                          <b style={{ fontSize: "23px" }}> วันที่กำหนดคืน</b>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.itemBorrow.map((item) => (
                        <tr key={item.id} style={{ cursor: "pointer" }}>
                          <td className="text-left" style={{ fontSize: 20 }}>
                            &nbsp;{item.data().itemCode}
                          </td>
                          <td className="text-center" style={{ fontSize: 20 }}>
                            &nbsp;{item.data().itemName}
                          </td>
                          <td className="text-center" style={{ fontSize: 20 }}>
                            &nbsp;{item.data().borrower}
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
                  <Table hover size="sm">
                    <tbody>
                      <tr>
                        <td width="100%" align="center">
                          <Link
                            className="button-like-a"
                            to="/admin/item-borrow"
                          >
                            <>&gt;&gt; รายการการยืม-คืนทั้งหมด &lt;&lt;</>
                          </Link>
                        </td>
                      </tr>
                    
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
            <CardHeader>
              <CardTitle tag="h5" style={{ color: "#66615b" }}>
                &nbsp;รายการครุภัณฑ์ที่ต้องคืน
              </CardTitle>
            </CardHeader>
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
  render() {
    return (
      <>
        <Row>
          <Col lg="12" md="12" sm="12">
            <Card>{this.genBorrowTrue()}</Card>
          </Col>
        </Row>
      </>
    );
  }
}

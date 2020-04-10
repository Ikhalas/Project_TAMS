import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardBody,
  Table,
} from "reactstrap";

function DetailTable(props) {
  return (
    <tr>
      <td style={{ fontSize: "22px" }}>
        <b>{props.label}</b>
      </td>
      <td style={{ fontSize: "24px" }}>
        {props.detail ? (
          props.detail
        ) : (
          <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</>
        )}

        {props.overdue ? (
          <span style={{ fontSize: "20px" }} className="text-danger">
            &nbsp;&nbsp;&nbsp;เกินกำหนด&nbsp;{props.overdue}&nbsp;วัน
          </span>
        ) : (
          <>&nbsp;</>
        )}
      </td>
    </tr>
  );
}

export default class LogModal extends Component {
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

  convertTime(time) {
    //console.log(new Date(time.seconds * 1000).getSeconds().toString().length);
    if (new Date(time.seconds * 1000).getSeconds().toString().length === 1) {
      return (
        <>
          {new Date(time.seconds * 1000).getHours() +
            ":" +
            new Date(time.seconds * 1000).getMinutes() +
            ":" +
            "0" +
            new Date(time.seconds * 1000).getSeconds()}
          &nbsp;น.
        </>
      );
    } else {
      return (
        <>
          {new Date(time.seconds * 1000).getHours() +
            ":" +
            new Date(time.seconds * 1000).getMinutes() +
            ":" +
            new Date(time.seconds * 1000).getSeconds()}
          &nbsp;น.
        </>
      );
    }
  }

  render() {
    const {
      logTimestamp,
      header,
      logDetail,
      returnDate,
      returner,
      overdue,
    } = this.props;
    return (
      <>
        <Modal
          backdrop="static"
          keyboard={false}
          size="lg"
          className="add-modal regular-th"
          isOpen={this.props.logModal}
          toggle={this.props.toggleFn}
        >
          <ModalHeader style={{ color: "white" }}>
            ประวัติการยืม/คืนครุภัณฑ์
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col className="pl-3" md="12" sm="12">
                {/* วันที่ */}
                <i style={{ fontSize: "35px" }}>
                  &nbsp;&nbsp;วันที่
                  {this.convertDate(logTimestamp)}
                  &nbsp;&nbsp;เวลา&nbsp;
                  {this.convertTime(logTimestamp)}
                </i>

                {header === "คืน" ? (
                  <>
                    {" "}
                    <div
                      className="py-2"
                      style={{
                        backgroundColor: "#e9feee",
                        textAlign: "center",
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <i
                        style={{ fontSize: "40px", color: "#28a745" }}
                        className="fas fa-undo pt-3"
                      ></i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <b style={{ color: "gray" }}>
                        <span style={{ fontSize: "25px" }}>
                          ดำเนินการ&nbsp;&nbsp;
                          <span style={{ fontSize: "50px", color: "#28a745" }}>
                            '&nbsp;คืน&nbsp;'
                          </span>
                          &nbsp;&nbsp;ครุภัณฑ์
                        </span>
                      </b>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                  </>
                ) : header === "ยืม" ? (
                  <>
                    {" "}
                    <div
                      className="py-2"
                      style={{
                        backgroundColor: "#fffbee",
                        textAlign: "center",
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <i
                        style={{ fontSize: "50px", color: "#ffc107" }}
                        className="nc-icon nc-basket pt-3"
                      ></i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <b style={{ color: "gray" }}>
                        <span style={{ fontSize: "25px" }}>
                          ดำเนินการ&nbsp;&nbsp;
                          <span style={{ fontSize: "50px", color: "#ffc107" }}>
                            '&nbsp;ยืม&nbsp;'
                          </span>
                          &nbsp;&nbsp;ครุภัณฑ์
                        </span>
                      </b>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <p></p>
                <i className="pl-3" style={{ fontSize: "25px", color: "gray" }}>
                  รายละเอียดการ<b style={{ fontSize: "27px" }}> ยืม </b>ครุภัณฑ์
                </i>

                {/* Borrow detail card */}
                <Card>
                  <CardBody>
                    <Row>
                      <Col md="12">
                        <Table size="sm" hover>
                          <tbody>
                            <DetailTable
                              label="รหัสครุภัณฑ์"
                              detail={logDetail.itemCode}
                            />
                            <DetailTable
                              label="ชื่อครุภัณฑ์"
                              detail={logDetail.itemName}
                            />
                            <DetailTable
                              label="ผู้ยืม"
                              detail={logDetail.borrower}
                            />
                            <DetailTable
                              label="วันที่ยืม"
                              detail={this.convertDate(logDetail.borrowDate)}
                            />
                            <DetailTable
                              label="วันที่ต้องคืน"
                              detail={this.convertDate(
                                logDetail.mustReturnDate
                              )}
                            />
                            <DetailTable
                              label="รายละเอียดอื่น ๆ"
                              detail={logDetail.detail}
                            />
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                {header === "คืน" ? (
                  <>
                    <p></p>
                    <i
                      className="pl-3"
                      style={{ fontSize: "25px", color: "gray" }}
                    >
                      รายละเอียดการ<b style={{ fontSize: "27px" }}> คืน </b>
                      ครุภัณฑ์
                    </i>
                    {/* Return detail Card */}
                    <Card>
                      <CardBody>
                        <Row>
                          <Col md="12">
                            <Table size="sm" hover>
                              <tbody>
                                <DetailTable
                                  label="วันที่คืน"
                                  detail={this.convertDate(returnDate)}
                                  overdue={overdue}
                                />

                                <DetailTable label="ผู้คืน" detail={returner} />
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </>
                ) : null}

                <br />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            &nbsp;&nbsp;
            <Button
              type="submit"
              className="btn-round regular-th"
              size="sm"
              color="info"
              onClick={this.props.toggleFn}
              style={{ fontSize: "25px", fontWeight: "normal" }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;
              <>ตกลง</>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </Button>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

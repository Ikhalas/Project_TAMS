import React, { Component } from "react";
import { Card, CardHeader, CardBody, Row, Col, CardFooter } from "reactstrap";

export default class NotFound extends Component {
  render() {
    return (
      <div className="regular-th">
        <Row className="px-2 py-3">
          <Col md="12" sm="12">
            <Card>
              <CardHeader tag="h1">404 Not Found</CardHeader>
              <CardBody style={{ backgroundColor: "#ffffff" }}>
                <p style={{ fontSize: "30px", backgroundColor: "#ffffff" }}>
                  เกิดข้อผิดพลาด
                </p>
                <p style={{ backgroundColor: "#ffffff", lineHeight: "0px" }}>
                  ไม่เจอหน้าที่ท่านต้องการ โปรดลองใหม่อีกครั้ง
                </p>
                <br />
                <div
                  style={{ textAlign: "center", backgroundColor: "#ffffff" }}
                >
                  <i
                    style={{ backgroundColor: "#ffffff", fontSize: "100px" }}
                    className="fas fa-exclamation-triangle"
                  ></i>
                </div>
              </CardBody>
              <CardFooter
                style={{ fontSize: "15px" }}
                className="text-muted text-right"
              >
                &copy; {1900 + new Date().getYear()}, made with{" "}
                <i className="fa fa-heart heart" /> and{" "}
                <span style={{ fontSize: "18px" }}>
                  <i className="fas fa-mug-hot" />
                </span>{" "}
                by IKHALAS CoE PSU
              </CardFooter>
            </Card>
          </Col>
        </Row>{" "}
      </div>
    );
  }
}

import React, { Component } from "react";
import { db } from "../../../api/firebase";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Card, CardTitle, CardBody, Row, Col, Table, Button } from "reactstrap";

export default class Types extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readyToRender: false,
      types: []
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getType();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getType() {
    db.collection("types")
      .get()
      .then(snapshot => {
        let types = [];
        snapshot.forEach(doc => {
          types.push(doc.data());
        });
        this._isMounted && this.setState({ types, readyToRender: true });
      })
      .catch(error => console.log(error));
  }

  genType() {
    return (
      this.state.types &&
      this.state.types.map(type => (
        <tr key={type.label}>
          <td></td>
          <td>{type.label}</td>
          <td
            className={
              type.movable === "สังหาริมทรัพย์"
                ? "text-success"
                : "text-warning"
            }
            style={{ textAlign: "center" }}
          >
            {type.movable}
          </td>
          <td style={{ textAlign: "center" }}>
            {type.note === "" ? "-" : type.note}
          </td>
        </tr>
      ))
    );
  }

  render() {
    return this.state.readyToRender ? (
      <>
        <Card>
          <CardTitle
            style={{ fontSize: "33px", color: "#66615b" }}
            className="pt-4 pl-4"
          >
            <Row>
              <Col md="6">ตั้งค่าประเภทครุภัณฑ์</Col>
              <Col
                md="6"
                className="text-right"
                style={{ padding: "0px 50px 0px 0px" }}
              >
                <Button
                  size="sm"
                  outline
                  color="info"
                  className="regular-th"
                  style={{ fontSize: "20px", fontWeight: "normal" }}
                >
                  &nbsp;&nbsp;&nbsp;เพิ่มรายการ&nbsp;&nbsp;&nbsp;
                </Button>
              </Col>
            </Row>
          </CardTitle>
          <CardBody>
            <Table size="sm" hover responsive>
              <thead>
                <tr>
                  <th></th>
                  <th style={{ fontSize: "23px", color: "#66615b" }}>ประเภท</th>
                  <th
                    style={{
                      fontSize: "23px",
                      color: "#66615b",
                      textAlign: "center"
                    }}
                  >
                    สังหาริมทรัพย์/อสังหาริมทรัพย์
                  </th>
                  <th
                    style={{
                      fontSize: "23px",
                      color: "#66615b",
                      textAlign: "center"
                    }}
                    
                  >
                    หมายเหตุ
                  </th>
                </tr>
              </thead>
              <tbody>{this.genType()}</tbody>
            </Table>
          </CardBody>
        </Card>
      </>
    ) : (
      <>
        {" "}
        <div className="content">
          <SkeletonTheme color="#fafafa">
            <p>
              <Skeleton height={350} />
            </p>
          </SkeletonTheme>
        </div>
      </>
    );
  }
}

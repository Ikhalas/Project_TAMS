import React, { Component } from "react";
import { db } from "../../../api/firebase";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Card, CardTitle, CardBody, Row, Col, Table, Button } from "reactstrap";

export default class ItemName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readyToRender: false,
      itemName: []
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getItemName();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getItemName() {
    db.collection("itemsCode")
      .get()
      .then(snapshot => {
        let itemName = [];
        snapshot.forEach(doc => {
          itemName.push(doc.data());
        });
        this._isMounted && this.setState({ itemName, readyToRender: true });
      })
      .catch(error => console.log(error));
  }

  genItemName() {
    return (
      this.state.itemName &&
      this.state.itemName.map(item => (
        <tr key={item.label}>
          <td></td>
          <td>{item.code}</td>
          <td style={{ textAlign: "center" }}>{item.label}</td>
          <td style={{ textAlign: "center" }}>{item.type}</td>
          <td style={{ textAlign: "center" }}>
            {item.note === "" ? "-" : item.note}
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
              <Col md="6">ตั้งค่าชื่อและรหัสครุภัณฑ์</Col>
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
                  <th style={{ fontSize: "23px", color: "#66615b" }}>รหัส</th>
                  <th
                    style={{
                      fontSize: "23px",
                      color: "#66615b",
                      textAlign: "center"
                    }}
                  >
                    ชื่อ
                  </th>
                  <th
                    style={{
                      fontSize: "23px",
                      color: "#66615b",
                      textAlign: "center"
                    }}
                  >
                    ประเภท
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
              <tbody>{this.genItemName()}</tbody>
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

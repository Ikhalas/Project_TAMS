import React, { Component } from "react";
import { db } from "../../../api/firebase";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Card, CardTitle, CardBody, Row, Col, Table, Button } from "reactstrap";
import AddItemCode from "./AddItemCode";

export default class itemsCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readyToRender: false,
      itemName: [],

      itemCodeModal: false
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

  componentDidUpdate(prevProps) {
    if (this.props.refresher !== prevProps.refresher) {
      this._isMounted && this.getItemName();
    }
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
        </tr>
      ))
    );
  }

  toggleModal = () => {
    this.setState({ itemCodeModal: !this.state.itemCodeModal });
  };

  toggleAlert = res => {
    if (res) {
      this.props.toggleAlert(res);
    }
  };

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
                  onClick={() => this.toggleModal()}
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
                  <th style={{ fontSize: "23px", color: "#66615b" }}>
                    รหัสครุภัณฑ์
                  </th>
                  <th
                    style={{
                      fontSize: "23px",
                      color: "#66615b",
                      textAlign: "center"
                    }}
                  >
                    ชื่อครุภัณฑ์
                  </th>
                  <th
                    style={{
                      fontSize: "23px",
                      color: "#66615b",
                      textAlign: "center"
                    }}
                  >
                    ประเภทครุภัณฑ์
                  </th>
                </tr>
              </thead>
              <tbody>{this.genItemName()}</tbody>
            </Table>
          </CardBody>
        </Card>

        <AddItemCode
          itemCodeModal={this.state.itemCodeModal}
          toggleFn={this.toggleModal}
          toggleAlert={this.toggleAlert}
        />

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

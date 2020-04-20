import React, { Component } from "react";
import { db } from "../../../api/firebase";
import AddType from "./AddType";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  Card,
  CardTitle,
  CardBody,
  Row,
  Col,
  Table,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

export default class Types extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readyToRender: false,
      types: [],
      typeModal: false,
      currentPage: 0,
    };
    this._isMounted = false;
    this.pageSize = 5;
    //this.pagesCount = Math.ceil(this.dataSet.length / this.pageSize);
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getType();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.refresher !== prevProps.refresher) {
      this._isMounted && this.getType();
    }
  }

  getType() {
    db.collection("types")
      .orderBy("movable", "desc")
      .get()
      .then((snapshot) => {
        let types = [];
        snapshot.forEach((doc) => {
          types.push(doc.data());
        });
        this._isMounted && this.setState({ types, readyToRender: true });
        //console.log(this.pagesCount);
        //console.log(this.state.types.length)
      })
      .catch((error) => console.log(error));
  }

  genType() {
    const { currentPage } = this.state;
    return (
      this.state.types &&
      this.state.types
        .slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize)
        .map((type) => (
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
          </tr>
        ))
    );
  }

  handlePagination(e, index) {
    e.preventDefault();
    this.setState({
      currentPage: index,
    });
  }

  toggleTypeModal = () => {
    this.setState({ typeModal: !this.state.typeModal });
  };

  toggleAlert = (res) => {
    //console.log("Im here");
    if (res) {
      this.props.toggleAlert(res);
    }
  };

  render() {
    this.pagesCount = Math.ceil(this.state.types.length / this.pageSize); // number of pagination
    const { currentPage } = this.state;
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
                  onClick={() => this.toggleTypeModal()}
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
                      textAlign: "center",
                    }}
                  >
                    สังหาริมทรัพย์/อสังหาริมทรัพย์
                  </th>
                </tr>
              </thead>
              <tbody>{this.genType()}</tbody>
            </Table>
          </CardBody>

          <div style={{ textAlign: "center", overflowX: "auto" }}>
            <Pagination
              aria-label="Page navigation example"
              style={{
                justifyContent: "center",
                margin: "15px",
                fontSize: "13px",
              }}
              className="regular-th"
            >
              <PaginationItem disabled={currentPage <= 0}>
                <PaginationLink
                  onClick={(e) => this.handlePagination(e, currentPage - 1)}
                  previous
                />
              </PaginationItem>

              {[...Array(this.pagesCount)].map((page, i) => (
                <PaginationItem active={i === currentPage} key={i}>
                  <PaginationLink onClick={(e) => this.handlePagination(e, i)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                <PaginationLink
                  onClick={(e) => this.handlePagination(e, currentPage + 1)}
                  next
                />
              </PaginationItem>
            </Pagination>
          </div>
        </Card>

        <AddType
          typeModal={this.state.typeModal}
          toggleFn={this.toggleTypeModal}
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

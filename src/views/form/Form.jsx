import React, { Component } from "react";
import MovableForm from "./MovableForm";
import ImovableForm from "./ImovableForm";
import Select from "react-select";
import { db } from "../../api/firebase";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 16,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center"
};

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: "",
      groupedOptions: "",
      readyToRender: false,
      selectedOption: "",
      formType: ""
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getTypeOptions();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ readyToRender: false });
  }

  getTypeOptions() {
    db.collection("types")
      .orderBy("label")
      .get()
      .then(snapshot => {
        let types = [];
        snapshot.forEach(doc => {
          types.push(doc.data());
        });
        this._isMounted && this.setState({ types, readyToRender: true });
        this._isMounted && this.filterOption();
      })
      .catch(error => console.log(error));
  }

  filterOption() {
    let movable = this.state.types.filter(type => {
      return type.movable === "สังหาริมทรัพย์";
    });

    let imovable = this.state.types.filter(type => {
      return type.movable === "อสังหาริมทรัพย์";
    });

    const groupedOptions = [
      {
        label: "อสังหาริมทรัพย์",
        options: imovable
      },
      {
        label: "สังหาริมทรัพย์",
        options: movable
      }
    ];

    this.setState({ groupedOptions });
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption }, () => {
      this.setForm(this.state.selectedOption.movable);
    });
  };

  setForm(types) {
    if (types === "สังหาริมทรัพย์") this.setState({ formType: "movable" });
    else if (types === "อสังหาริมทรัพย์")
      this.setState({ formType: "imovable" });
    else this.setState({ formType: "error" });
  }

  renderForm() {
    if (this.state.formType === "movable")
      return <MovableForm typeSelected={this.state.selectedOption} />;
    else if (this.state.formType === "imovable") return <ImovableForm typeSelected={this.state.selectedOption} />;
    else
      return (
        <Row>
          <Col md="12" style={{ textAlign: "center" }}>
            <br/>
            <span style={{ fontSize: "25px" }}>กรุณาเลือกประเภทครุภัณฑ์</span>
          </Col>
        </Row>
      );
  }

  render() {
    const selectedOption = this.state.selectedOption;
    return this.state.readyToRender === true ? (
      <>
        <div className="content regular-th">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5" style={{ color: "#66615b" }}>
                    &nbsp;เพิ่มรายการครุภัณฑ์
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <span className="text-success" style={{ fontSize: "17px" }}>
                    * หากไม่มีรายการที่ท่านต้องการ ท่านสามารถเพิ่มรายการได้ที่{" "}
                    "การตั้งค่าประเภทครุภัณฑ์"
                  </span>
                  <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={this.state.groupedOptions}
                    formatGroupLabel={formatGroupLabel}
                    placeholder="เลือกหรือค้นหา..."
                  />
                  <br />
                  <hr />
              
                </CardBody>
              </Card>
              {this.renderForm()}
              
            </Col>
          </Row>
        </div>
      </>
    ) : (
      <>
        <div className="content">
          <SkeletonTheme color="#fafafa">
            <p>
              <Skeleton height={250} />
            </p>
          </SkeletonTheme>
        </div>
      </>
    );
  }
}

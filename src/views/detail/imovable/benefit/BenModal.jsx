import React, { Component } from "react";
import { db } from "../../../../api/firebase";
import Select from "react-select";
import DatePicker from "react-date-picker";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  InputGroup,
  Spinner,
  Row,
  Col,
} from "reactstrap";

function TextInput(props) {
  function onChangeHandle(e) {
    if (props.onChange) props.onChange(e);
  }
  return (
    <FormGroup>
      <label style={{ fontSize: "23px", color: "black" }}>
        <b>{props.label}</b>{" "}
        <span style={{ fontSize: "18px", color: "red" }}>*จำเป็น</span>
      </label>
      <Input
        type="text"
        name={props.name}
        className="regular-th"
        style={{ height: 40, fontSize: "22px" }}
        onChange={onChangeHandle}
      />
    </FormGroup>
  );
}

const options = [
  { value: "รายเดือน", label: "รายเดือน" },
  { value: "รายปี", label: "รายปี" },
  { value: "ต่อครั้ง", label: "ต่อครั้ง" },
];

export default class BenModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: false,
      detail: "",
      total: 0,
      selected: "",
      date: new Date(),
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleInputTextChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
    //console.log([e.target.name] + " ===> " + e.target.value);
  };

  handleSummit(e) {
    e.preventDefault();
    this.setState({ inProgress: true });

    //console.log(this.props.ben)
    let _lastSeq = 0;
    if (this.props.ben.length !== 0) {
      _lastSeq = Math.max.apply(
        Math,
        this.props.ben.map(function (obj) {
          return obj.seq;
        })
      );
    }

    let _total = "";
    if (this.state.selected.value === "รายเดือน") {
      _total = "เดือน";
    } else if (this.state.selected.value === "ต่อปี") {
      _total = "ปี";
    } else if (this.state.selected.value === "ต่อครั้ง") {
      _total = "ครั้ง";
    } else _total = "";

    const data = {
      seq: Number(_lastSeq) + 1,
      date: this.state.date,
      itemCode: this.props.itemCode,
      detail: this.state.detail,
      total: this.state.total,
      per: "/" + _total,
    };
    this.addBenToDatabase(data);
  }

  addBenToDatabase(data) {
    db.collection("landBen")
      .add(data)
      .then(() => {
        //console.log("add itemResponsibility complete !!");
        this.setState({ inProgress: false });
        this.props.toggleFn();
        this.props.toggleAlert("complete");
      });
  }

  render() {
    const { detail, total, date, selected } = this.state;
    const { inProgress } = this.state;

    return (
      <>
        <Modal
          backdrop="static"
          keyboard={false}
          size="lg"
          className="add-modal regular-th"
          isOpen={this.props.benModal}
          toggle={this.props.toggleFn}
        >
          <ModalHeader style={{ color: "white" }}>
            เพิ่มรายการผลประโยชน์ที่หาได้จากครุภัณฑ์
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col className="pl-3" md="9" sm="12">
                <p style={{ fontSize: "30px" }}>/{this.props.itemCode}</p>
                <hr />
                <FormGroup>
                  <label style={{ fontSize: "23px", color: "black" }}>
                    <b>วันที่</b>{" "}
                    <span style={{ fontSize: "18px", color: "red" }}>
                      *จำเป็น
                    </span>
                  </label>
                  <InputGroup>
                    <label>
                      {" "}
                      <i
                        className="nc-icon nc-calendar-60 pl-2"
                        style={{ fontSize: "20px", paddingTop: "10px" }}
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <DatePicker
                      className="date-picker"
                      calendarClassName="calendar-class"
                      locale="th-TH"
                      value={date}
                      onChange={(date) => {
                        this.setState({ date });
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <TextInput
                  label="รายการ"
                  name="detail"
                  onChange={this.handleInputTextChange}
                />
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label style={{ fontSize: "23px", color: "black" }}>
                        <b>ผลประโยชน์ที่ได้รับ (บาท)</b>{" "}
                        <span style={{ fontSize: "18px", color: "red" }}>
                          *จำเป็น
                        </span>
                      </label>
                      <Input
                        type="number"
                        name="total"
                        className="regular-th"
                        style={{ height: 40, fontSize: "22px" }}
                        onChange={this.handleInputTextChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label style={{ fontSize: "23px", color: "black" }}>
                        <b>(รายเดือนหรือรายปี)</b>{" "}
                        <span style={{ fontSize: "18px", color: "red" }}>
                          *จำเป็น
                        </span>
                      </label>
                      <Select
                        value={selected}
                        onChange={(selected) => {
                          this.setState({ selected });
                        }}
                        options={options}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ModalBody>

          <ModalFooter>
            <Button
              className="btn-round regular-th"
              size="sm"
              outline
              color="secondary"
              onClick={this.props.toggleFn}
              disabled={inProgress}
              style={{
                fontSize: "25px",
                fontWeight: "normal",
                backgroundColor: "#f8f9fa",
                color: "gray",
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;ยกเลิก&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
            &nbsp;&nbsp;
            <Button
              type="submit"
              className="btn-round regular-th"
              size="sm"
              color="info"
              onClick={this.handleSummit.bind(this)}
              style={{ fontSize: "25px", fontWeight: "normal" }}
              disabled={!detail || !total || !date || !selected || inProgress}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;
              {inProgress ? (
                <>
                  <Spinner color="light" />
                </>
              ) : (
                <>บันทึก</>
              )}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

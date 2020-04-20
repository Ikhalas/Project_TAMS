import React, { Component } from "react";
import { db } from "../../../../api/firebase";
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
  Col,
  Row,
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

export default class MainModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: false,

      date: new Date(),
      docNo: "",
      detail: "",
      amount: "",
      resName: "",
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
    if (this.props.main.length !== 0) {
      _lastSeq = Math.max.apply(
        Math,
        this.props.main.map(function (obj) {
          return obj.seq;
        })
      );
    }

    const data = {
      itemCode: this.props.itemCode,
      seq: Number(_lastSeq) + 1,
      date: this.state.date,
      docNo: this.state.docNo,
      detail: this.state.detail,
      amount: this.state.amount,
      resName: this.state.resName,
    };

    //console.log(data)

    this.addMainToDatabase(data);
  }

  addMainToDatabase(data) {
    db.collection("itemMain")
      .add(data)
      .then(() => {
        //console.log("add itemResponsibility complete !!");
        this.setState({ inProgress: false });
        this.props.toggleFn();
        this.props.toggleAlert("complete");
      });
  }

  render() {
    const { date, docNo, detail, amount, resName } = this.state;
    const { inProgress } = this.state;

    return (
      <>
        <Modal
          backdrop="static"
          keyboard={false}
          size="lg"
          className="add-modal regular-th"
          isOpen={this.props.mainModal}
          toggle={this.props.toggleFn}
        >
          <ModalHeader style={{ color: "white" }}>
            เพิ่มรายการบันทึกการซ่อม/ปรับปรุงแก้ไขครุภัณฑ์
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
                  label="เลขที่หนังสือ"
                  name="docNo"
                  onChange={this.handleInputTextChange}
                />

                <TextInput
                  label="รายการซ่อม/ปรับปรุงรายการ"
                  name="detail"
                  onChange={this.handleInputTextChange}
                />

                <FormGroup>
                  <label style={{ fontSize: "23px", color: "black" }}>
                    <b>จำนวนเงิน</b>{" "}
                    <span style={{ fontSize: "18px", color: "red" }}>
                      *จำเป็น
                    </span>
                  </label>
                  <Input
                    type="number"
                    name="amount"
                    className="regular-th"
                    style={{ height: 40, fontSize: "22px" }}
                    onChange={this.handleInputTextChange}
                  />
                </FormGroup>

                <TextInput
                  label="ผู้รับผิดชอบ"
                  name="resName"
                  onChange={this.handleInputTextChange}
                />
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
              disabled={
                !detail || !docNo || !date || !amount || !resName || inProgress
              }
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

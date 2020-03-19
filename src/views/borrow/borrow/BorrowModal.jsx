import React, { Component } from "react";
import { db } from "../../../api/firebase";
import moment from "moment";
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
        {props.required ? (
          <>
            <span style={{ fontSize: "18px", color: "red" }}>*จำเป็น</span>
          </>
        ) : (
          <>
            <span style={{ fontSize: "18px" }}>(ถ้ามี)</span>
          </>
        )}
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

export default class BorrowModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: false,

      borrowDate: new Date(),
      returnDate: "",
      borrower: "",
      detail: "",

      dateToShow: ""
    };
    this._isMounted = false;
  }

  handleDateChange = () => {
    if (this.state.borrowDate && this.state.returnDate) {
      //let dateToShow = moment(this.state.borrowDate).format("YYYY-MM-DD");
      let a = moment(this.state.returnDate);
      let b = moment(this.state.borrowDate);
      let dateToShow = a.diff(b, "days") + 1; // include the start
      //let dateToShow = moment().add(543, 'years')._d
      //console.log(this.state.borrowDate)
      this.setState({ dateToShow });
    }
  };

  handleInputTextChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSummit(e) {
    e.preventDefault();
    this.setState({ inProgress: true });

    const data = {
      itemId: this.props.itemId,
      itemCode: this.props.itemCode,
      itemName: this.props.itemName,
      borrowDate: this.state.borrowDate,
      returnDate: this.state.returnDate,
      borrower: this.state.borrower,
      detail: this.state.detail
    };

    //console.log(data);

    this.addBorToDatabase(data);
  }

  addBorToDatabase(data) {
    db.collection("borrowList")
      .add(data)
      .then(() => {
        db.collection("itemMovable")
          .doc(this.props.itemId)
          .update({ borrowSta: true })
          .then(() => {
            this.setState({ inProgress: false });
            this.props.toggleFn();
            this.props.toggleAlert("borrow");
          });
        //console.log("add itemResponsibility complete !!");
      });
  }

  render() {
    const { borrowDate, returnDate, borrower } = this.state;
    const { inProgress } = this.state;
    return (
      <>
        <Modal
          backdrop="static"
          keyboard={false}
          size="lg"
          className="add-modal regular-th"
          isOpen={this.props.borModal}
          toggle={this.props.toggleFn}
        >
          <ModalHeader style={{ color: "white" }}>
            เพิ่มรายการการยืมครุภัณฑ์
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col className="pl-3" md="12" sm="12">
                <p style={{ fontSize: "30px" }}>/{this.props.itemCode}</p>
                <hr />
                {/* Date */}
                <Row>
                  {/* Borrow Date */}
                  <Col md="6" sm="12">
                    <InputGroup>
                      <label style={{ fontSize: "23px", color: "black" }}>
                        <b>วันที่ยืม</b>{" "}
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
                          value={borrowDate}
                          onChange={borrowDate =>
                            this.setState({ borrowDate }, () =>
                              this.handleDateChange()
                            )
                          }
                        />
                      </InputGroup>
                    </InputGroup>
                  </Col>
                  {/* Return Date */}
                  <Col md="6" sm="12" style={{ height: "120px" }}>
                    <InputGroup>
                      <label style={{ fontSize: "23px", color: "black" }}>
                        <b>วันที่ต้องคืน</b>{" "}
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
                          minDate={borrowDate}
                          value={returnDate}
                          onChange={returnDate =>
                            this.setState({ returnDate }, () =>
                              this.handleDateChange()
                            )
                          }
                        />
                      </InputGroup>
                      {this.state.dateToShow ? (
                        <>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; อีก{" "}
                          {this.state.dateToShow} วัน (นับตั้งแต่วันที่เริ่มยืม){" "}
                        </>
                      ) : (
                        <></>
                      )}
                    </InputGroup>
                  </Col>
                </Row>

                <TextInput
                  label="ผู้ยืม"
                  name="borrower"
                  onChange={this.handleInputTextChange}
                  required={true}
                />

                <TextInput
                  label="รายละเอียด"
                  name="detail"
                  onChange={this.handleInputTextChange}
                  required={false}
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
                color: "gray"
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
              disabled={!borrowDate || !returnDate || !borrower || inProgress}
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

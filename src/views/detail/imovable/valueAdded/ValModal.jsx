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
  Row,
  Col,
} from "reactstrap";

export default class ValModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dep: "",
      inProgress: false,
      date: new Date(),
      percent: 0,
      balance: 0,
      curBalance: "",
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    //console.log(this.props.val);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  calBalance() {
    //console.log(this.state.percent)
    if (this.props.val && this.state.percent) {
      let landValue = this.props.val.map((landValue) => landValue);
      let maxIndex = landValue.length - 1;

      let B = this.props.val.map((landValue) => landValue.balance);
      let curBalance = B[maxIndex];

      let percent = this.state.percent;

      let b = (Number(curBalance) * Number(percent)) / 100;
      let balance = (Number(curBalance) + b).toFixed(2);
      //console.log(balance)
      this.setState({
        balance,
        curBalance,
      });
    }
  }

  handleInputTextChange = (e) => {
    e.preventDefault();
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        if (this.state.percent) {
          this.calBalance();
        } else {
          this.setState({ balance: 0 });
        }
      }
    );
    //console.log([e.target.name] + " ===> " + e.target.value);
  };

  handleSummit(e) {
    e.preventDefault();
    this.setState({ inProgress: true });

    let _lastSeq = 0;
    if (this.props.val.length !== 0) {
      _lastSeq = Math.max.apply(
        Math,
        this.props.val.map(function (obj) {
          return obj.seq;
        })
      );
    }

    const data = {
      itemCode: this.props.itemCode,
      date: this.state.date,
      seq: Number(_lastSeq) + 1,
      percent: this.state.percent,
      balance: this.state.balance,
    };

    //console.log(data)

    this.addValToDatabase(data);
  }

  addValToDatabase(data) {
    db.collection("landValue")
      .add(data)
      .then(() => {
        //console.log("add itemResponsibility complete !!");
        this.setState({ inProgress: false });
        this.props.toggleFn();
        this.props.toggleAlert("complete");
      });
  }

  render() {
    const { balance, percent, curBalance } = this.state;
    const { date, inProgress } = this.state;
    return (
      <>
        <Modal
          backdrop="static"
          keyboard={false}
          className="add-modal regular-th"
          isOpen={this.props.valModal}
          toggle={this.props.toggleFn}
          style={{ maxWidth: "1000px" }}
        >
          <ModalHeader style={{ color: "white" }}>
            เพิ่มรายการการเพิ่มมูลค่าของที่ดิน
          </ModalHeader>

          <ModalBody>
            <Row>
              <Col className="pl-3" md="9" sm="12">
                <p style={{ fontSize: "30px" }}>/{this.props.itemCode}</p>
                <hr />
                {/* date */}
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
                      locale="th-TH"
                      calendarClassName="calendar-class"
                      value={date}
                      onChange={(date) => {
                        this.setState({ date });
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                {/* balance */}
                <FormGroup>
                  <label style={{ fontSize: "23px", color: "black" }}>
                    <b>เปอร์เซ็นต์ (%)</b>{" "}
                    <span style={{ fontSize: "18px", color: "red" }}>
                      *จำเป็น
                    </span>
                  </label>
                  <Input
                    type="number"
                    name="percent"
                    className="regular-th"
                    style={{ height: 40, fontSize: "22px" }}
                    onChange={this.handleInputTextChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label style={{ fontSize: "23px", color: "black" }}>
                    <b>มูลค่าเพิ่มขึ้น (บาท)</b>{" "}
                  </label>
                  <Input
                    type="number"
                    name="balance"
                    value={balance}
                    className="regular-th"
                    style={{ height: 40, fontSize: "22px" }}
                    onChange={this.handleInputTextChange}
                  />
                  {percent ? (
                    <>
                      {" "}
                      <span style={{ fontSize: "22px" }}>
                        มูลค่าปัจจุบัน : {curBalance} บาท ===> เพิ่มเป็น{" "}
                        {balance} บาท
                      </span>
                    </>
                  ) : null}
                </FormGroup>
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
              disabled={!date || !balance || !percent || inProgress}
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

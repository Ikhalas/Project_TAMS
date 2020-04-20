import React, { Component } from "react";
import { db } from "../../../../api/firebase";
import DatePicker from "react-date-picker";
import NumberFormat from "react-number-format";
import Select from "react-select";
import {
  Card,
  CardHeader,
  CardBody,
  Spinner,
  Row,
  Col,
  FormGroup,
  InputGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
  { value: "ขายทอดตลาด", label: "ขายทอดตลาด" },
  { value: "บริจาค", label: "บริจาค" },
  { value: "ทิ้ง", label: "ทิ้ง" },
];

export default class DeactCollapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: false,

      docNo: "",
      selectedMet: "",
      salePrice: 0,
      date: new Date(),

      confirmModal: false,
    };
    this._isMounted = false;
    this._profitOrLoss = "";
    this._amount = 0;
  }

  componentDidMount() {
    this._isMounted = true;
    //console.log(this.props.itemId)
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

    const data = {
      itemCode: this.props.itemCode,
      date: this.state.date,
      docNo: this.state.docNo,
      method: this.state.selectedMet.value,
      salePrice: this.state.salePrice,
      profit: this._profitOrLoss,
      amount: this._amount,
    };

    //console.log(data);

    this.deactivateItem(data);
  }

  deactivateItem(data) {
    if (data) {
      db.collection("deactivatedItem")
        .add(data)
        .then(() => {
          db.collection("itemMovable")
            .doc(this.props.itemId)
            .update({ status: "จำหน่าย" })
            .then(() => {
              //console.log("add Deactivation complete !!")
              this.props.toggleFn();
              this.props.toggleAlert("deactivated");
            });
        });
    }
  }

  showTotal() {
    //console.log(Number(this.state.salePrice))
    let price = Number(this.props.price);
    let salePrice = Number(this.state.salePrice);
    //console.log(salePrice);
    if (salePrice > price && salePrice !== 0) {
      //กำไร
      let amount = price - salePrice;
      this._profitOrLoss = "กำไร";
      this._amount = Math.abs(amount);
      //console.log(this._profitOrLoss)
      return (
        <span style={{ fontSize: "25px" }}>
          ราคาของครุภัณฑ์ :
          <NumberFormat
            value={this.props.price}
            displayType={"text"}
            thousandSeparator={true}
          />{" "}
          บาท
          <br />
          กำไร :{" "}
          <b style={{ fontSize: "27px" }} className="text-success">
            <NumberFormat
              value={Math.abs(amount)}
              displayType={"text"}
              thousandSeparator={true}
            />{" "}
          </b>{" "}
          บาท
        </span>
      );
    } else if (salePrice < price && salePrice !== 0) {
      //ขาดทุน
      let amount = salePrice - price;
      this._profitOrLoss = "ขาดทุน";
      this._amount = Math.abs(amount);
      //console.log(this._profitOrLoss)
      return (
        <span style={{ fontSize: "25px" }}>
          ราคาของครุภัณฑ์ :{" "}
          <NumberFormat
            value={this.props.price}
            displayType={"text"}
            thousandSeparator={true}
          />{" "}
          บาท
          <br />
          ขาดทุน :{" "}
          <b style={{ fontSize: "27px" }} className="text-danger">
            <NumberFormat
              value={Math.abs(amount)}
              displayType={"text"}
              thousandSeparator={true}
            />{" "}
          </b>{" "}
          บาท
        </span>
      );
    } else if (salePrice < price && salePrice === 0) {
      //ขาดทุน
      let amount = salePrice - price;
      this._profitOrLoss = "ขาดทุน";
      this._amount = Math.abs(amount);
      //console.log(this._profitOrLoss)
      return (
        <span style={{ fontSize: "25px" }}>
          ราคาของครุภัณฑ์ :{" "}
          <NumberFormat
            value={this.props.price}
            displayType={"text"}
            thousandSeparator={true}
          />{" "}
          บาท
          <br />
          ขาดทุน :{" "}
          <b style={{ fontSize: "27px" }} className="text-danger">
            <NumberFormat
              value={Math.abs(amount)}
              displayType={"text"}
              thousandSeparator={true}
            />{" "}
          </b>{" "}
          บาท
        </span>
      );
    } else if (salePrice === price && salePrice !== 0) {
      this._profitOrLoss = "เท่าทุน";
      this._amount = 0;
      return (
        <span style={{ fontSize: "25px" }}>
          ราคาของครุภัณฑ์ :{" "}
          <NumberFormat
            value={this.props.price}
            displayType={"text"}
            thousandSeparator={true}
          />{" "}
          บาท
          <br />
          เท่าทุน
        </span>
      );
    } else {
      return (
        <span style={{ fontSize: "25px" }}>
          ราคาของครุภัณฑ์ :{" "}
          <NumberFormat
            value={this.props.price}
            displayType={"text"}
            thousandSeparator={true}
          />{" "}
          บาท
          <br />
          ...
        </span>
      );
    }
  }

  toggleModal = () => {
    this.setState({ confirmModal: !this.state.confirmModal }, () => {
      //console.log("click");
    });
  };

  confirmModal() {
    return (
      <>
        <Modal
          backdrop="static"
          keyboard={false}
          size="lg"
          className="add-modal regular-th"
          isOpen={this.state.confirmModal}
          toggle={this.toggleModal}
        >
          <ModalHeader style={{ color: "white", backgroundColor: "#ef8157" }}>
            ยืนยันการจำหนายครุภัณฑ์
          </ModalHeader>
          <ModalBody>
            <div
              style={{
                backgroundColor: "#fbe9e7",
                padding: "8px 10px 8px 20px",
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;
              <i
                style={{ fontSize: "25px", color: "#ef8157" }}
                className="fas fa-exclamation-triangle"
              ></i>
              &nbsp;&nbsp;
              <b>
                <span style={{ fontSize: "25px" }}>
                  การดำเนินการนี้จะเปลี่ยนสถานะของครุภัณฑ์ เป็น&nbsp;
                  <span style={{ fontSize: "30px" }}>'จำหน่าย'</span>
                </span>
              </b>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <br />
            หมายเลขครุภัณฑ์ :{" "}
            <b style={{ fontSize: "25px" }}>{this.props.itemCode}</b>
            <br />
            ชื่อครุภัณฑ์ :{" "}
            <b style={{ fontSize: "25px" }}>{this.props.itemName}</b>
            <br />
            <br />
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn-round regular-th"
              size="sm"
              outline
              color="secondary"
              onClick={this.toggleModal}
              style={{
                fontSize: "25px",
                fontWeight: "normal",
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;ยกเลิก&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
            &nbsp;&nbsp;
            <Button
              type="submit"
              className="btn-round regular-th"
              size="sm"
              color="danger"
              onClick={this.handleSummit.bind(this)}
              style={{
                fontSize: "25px",
                fontWeight: "normal",
                backgroundColor: "#f8f9fa",
                color: "gray",
              }}
              disabled={this.state.inProgress}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;
              {this.state.inProgress ? (
                <>
                  <Spinner color="light" />
                </>
              ) : (
                <>ยืนยัน</>
              )}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </>
    );
  }

  render() {
    const { date, selectedMet, docNo, salePrice } = this.state;
    const { inProgress } = this.state;
    return (
      <>
        <Card>
          <CardHeader style={{ color: "#66615b", fontSize: "25px" }}>
            จำหน่ายครุภัณฑ์รหัส {this.props.itemCode}
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="4">
                {" "}
                <FormGroup>
                  <label style={{ fontSize: "23px", color: "black" }}>
                    <b>วันที่จำหน่าย</b>{" "}
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
              </Col>
              <Col md="8">
                <TextInput
                  label="เลขที่หนังสืออนุมัติ"
                  name="docNo"
                  onChange={this.handleInputTextChange}
                />
              </Col>
            </Row>
            <FormGroup>
              <label style={{ fontSize: "23px", color: "black" }}>
                <b>วิธีจำหน่าย</b>{" "}
                <span style={{ fontSize: "18px", color: "red" }}>*จำเป็น</span>
              </label>
              <Select
                value={selectedMet}
                onChange={(selectedMet) => {
                  this.setState({ selectedMet });
                }}
                options={options}
              />
            </FormGroup>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label style={{ fontSize: "23px", color: "black" }}>
                    <b>ราคาจำหน่าย (บาท)</b>{" "}
                    <span style={{ fontSize: "18px", color: "red" }}>
                      *จำเป็น
                    </span>
                  </label>
                  <Input
                    type="number"
                    name="salePrice"
                    placeholder={salePrice}
                    className="regular-th"
                    style={{ height: 40, fontSize: "22px" }}
                    onChange={this.handleInputTextChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label style={{ fontSize: "23px", color: "black" }}>
                    <b>กำไร/ขาดทุน</b>&nbsp;&nbsp;{" "}
                  </label>
                  {this.showTotal()}
                </FormGroup>
              </Col>
            </Row>
            <hr />
            <div className="text-right">
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
                color="danger"
                onClick={this.toggleModal}
                style={{ fontSize: "25px", fontWeight: "normal" }}
                disabled={
                  !selectedMet || !salePrice || !date || !docNo || inProgress
                }
              >
                &nbsp;&nbsp;&nbsp;&nbsp;
                <>ยืนยัน</>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </Button>{" "}
            </div>
          </CardBody>
        </Card>
        {this.confirmModal()}
      </>
    );
  }
}

import React, { Component } from "react";
import { db } from "../../../../api/firebase";
import DatePicker from "react-date-picker";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
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
  Table,
} from "reactstrap";

export default class DepModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dep: "",
      inProgress: false,
      readyToRender: false,
      date: new Date(),
      balance: "",
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getDepDetail();
    this._isMounted && this.calBalance();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getDepDetail() {
    db.collection("itemDep")
      .where("itemCode", "==", this.props.itemCode)
      .where("seq", "==", 0)
      .get()
      .then((snapshot) => {
        let dep = [];
        snapshot.forEach((doc) => {
          dep.push(doc.data());
        });
        this._isMounted && this.setState({ dep, readyToRender: true });
        //console.log(this.state.dep);
      })
      .catch((error) => console.log(error));
  }

  calBalance() {
    //console.log(this.props.dep)
    if (this.props.dep) {
      var depreciation = this.props.dep.map((depreciation) => depreciation);
      var maxIndex = depreciation.length - 1;
      //console.log(maxIndex)

      var Cumulative = this.props.dep.map(
        (depreciation) => depreciation.cumulative
      );
      //console.log(Cumulative)

      var lastBalance = this.props.dep.map(
        (depreciation) => depreciation.balance
      );

      var B = lastBalance[maxIndex] - Cumulative[0];
      this.setState({ balance: B.toFixed(2) });
    }
  }

  convertDate(date) {
    let month = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    //console.log(month[new Date(date.seconds * 1000).getMonth() + 1]);
    if (date) {
      return (
        <>
          {" "}
          {new Date(date.seconds * 1000).getDate() +
            " " +
            month[new Date(date.seconds * 1000).getMonth()] +
            " " +
            (new Date(date.seconds * 1000).getFullYear() + 543)}
        </>
      );
    } else {
      return <></>;
    }
  }

  renderDetail() {
    return (
      this.state.dep &&
      this.state.dep.map((seq) => (
        <Row key={seq.seq}>
          <Col md="4">
            <Table>
              <tbody>
                <tr>
                  <td style={{ fontSize: 19 }}>
                    <b>วันที่ได้มา</b>
                  </td>
                  <td style={{ fontSize: 19 }}>{this.convertDate(seq.date)}</td>
                </tr>
                <tr>
                  <td style={{ fontSize: 19 }}>
                    <b>ราคาทุน</b>
                  </td>
                  <td style={{ fontSize: 19 }}>{seq.balance}&nbsp;บาท</td>
                </tr>
                <tr>
                  <td style={{ fontSize: 19 }}>
                    <b>อายุการใช้งาน</b>
                  </td>
                  <td style={{ fontSize: 19 }}>{seq.lifeTime}&nbsp;ปี</td>
                </tr>
                <tr>
                  <td style={{ fontSize: 19 }}>
                    <b>อัตราค่าเสื่อมสภาพ</b>
                  </td>
                  <td style={{ fontSize: 19 }}>{seq.percent}&nbsp;%</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md="4">
            <Table className="table">
              <tbody>
                <tr>
                  <td style={{ fontSize: 19 }}>
                    <b>จำนวนปี</b>
                  </td>
                  <td style={{ fontSize: 19 }}>{seq.yearRate}&nbsp;ปี</td>
                </tr>
                <tr>
                  <td style={{ fontSize: 19 }}>
                    <b>จำนวนเดือน</b>
                  </td>
                  <td style={{ fontSize: 19 }}>{seq.monthRate}&nbsp;เดือน</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md="4">
            <Table className="table">
              <tbody>
                <tr>
                  <td style={{ fontSize: 19 }}>
                    <b>ค่าเสื่อมราคา/ปี</b>
                  </td>
                  <td style={{ fontSize: 19 }}>{seq.perYear}&nbsp;บาท</td>
                </tr>
                <tr>
                  <td style={{ fontSize: 19 }}>
                    <b>ค่าเสื่อมราคา/{seq.monthRate}เดือน</b>
                  </td>
                  <td style={{ fontSize: 19 }}>{seq.perMonth}&nbsp;บาท</td>
                </tr>
                <tr>
                  <td style={{ fontSize: 19 }}>
                    <b>ค่าเสื่อมราคาสะสม</b>
                  </td>
                  <td style={{ fontSize: 19 }}>{seq.cumulative}&nbsp;บาท</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      ))
    );
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

    let _lastSeq = 0;
    if (this.props.dep.length !== 0) {
      _lastSeq = Math.max.apply(
        Math,
        this.props.dep.map(function (obj) {
          return obj.seq;
        })
      );
    }

    const data = {
      seq: Number(_lastSeq) + 1,
      date: this.state.date,
      itemCode: this.props.itemCode,
      balance: this.state.balance,
    };

    //console.log(data)

    this.addDepToDatabase(data);
  }

  addDepToDatabase(data) {
    db.collection("itemDep")
      .add(data)
      .then(() => {
        //console.log("add itemResponsibility complete !!");
        this.setState({ inProgress: false });
        this.props.toggleFn();
        this.props.toggleAlert("complete");
      });
  }

  render() {
    const { balance, readyToRender } = this.state;
    const { date, inProgress } = this.state;
    return (
      <>
        <Modal
          backdrop="static"
          keyboard={false}
          className="add-modal regular-th"
          isOpen={this.props.depModal}
          toggle={this.props.toggleFn}
        >
          <ModalHeader style={{ color: "white" }}>
            เพิ่มรายการค่าเสื่อมราคาครุภัณฑ์
          </ModalHeader>
          {readyToRender ? (
            <>
              <ModalBody>
                <Row>
                  <Col className="pl-3" md="9" sm="12">
                    <p style={{ fontSize: "30px" }}>/{this.props.itemCode}</p>
                    <hr />
                    {this.renderDetail()}
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
                          calendarClassName="calendar-class"
                          locale="th-TH"
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
                        <b>ราคาคงเหลือ</b>{" "}
                        <span style={{ fontSize: "18px", color: "red" }}>
                          *จำเป็น
                        </span>
                      </label>
                      <Input
                        type="number"
                        name="balance"
                        value={balance}
                        className="regular-th"
                        style={{ height: 40, fontSize: "22px" }}
                        onChange={this.handleInputTextChange}
                      />
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
                  disabled={!date || !balance || inProgress}
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
            </>
          ) : (
            <>
              <ModalBody>
                <SkeletonTheme color="#fafafa">
                  <p>
                    <Skeleton height={600} width={600} />
                  </p>
                </SkeletonTheme>
              </ModalBody>
            </>
          )}
        </Modal>
      </>
    );
  }
}

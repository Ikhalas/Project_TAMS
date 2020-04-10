import React, { Component } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import DatePicker from "react-date-picker";
import { db } from "../../../api/firebase";
import moment from "moment";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Input,
  FormGroup,
  InputGroup,
} from "reactstrap";

export default class ReturnModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readyToRender: false,
      inProgress: false,

      listId: "",
      itemBorrow: "",
      returnDate: new Date(),
      returner: "",
      overdue: "",
    };

    this._isMounted = false;
    this._overdue = 0;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getBorrow();
  }

  componentWillUnmount() {
    //cancel subscriptions and asynchronous tasks
    this._isMounted = false;
  }

  getBorrow() {
    db.collection("borrowList")
      .doc(this.props.itemid)
      .get()
      .then((doc) => {
        this._isMounted &&
          this.setState({
            listId: doc.id,
            itemBorrow: Object(doc.data()),
            readyToRender: true,
            overdue: "ไม่เกินกำหนด",
          });
      })
      .catch((error) => console.log(error));
  }

  handleSummit(e) {
    e.preventDefault();
    this.setState({ inProgress: true });

    const data = {
      borDetail: this.state.itemBorrow,
      returner: this.state.returner,
      returnDate: this.state.returnDate,
      header: "คืน",
      timestamp: new Date(),
      overdue: Number(this._overdue),
    };

    //console.log(this.state.itemBorrow.itemId);

    this.addRetToDatabase(data);
  }

  addRetToDatabase(data) {
    db.collection("borrowLog")
      .add(data)
      .then(() => {
        db.collection("itemMovable")
          .doc(this.state.itemBorrow.itemId)
          .update({ borrowSta: false })
          .then(() => {
            db.collection("borrowList")
              .doc(this.state.listId)
              .delete()
              .then(() => {
                this.setState({ inProgress: false });
                this.props.toggleFn();
                this.props.toggleAlert("return");
              });
          });
        //console.log("add itemResponsibility complete !!");
      });
  }

  calOverdue(mustReturnDate) {
    if (this.state.returnDate) {
      //console.log(mustReturnDate + this.state.returnDate)
      let a = moment(new Date(mustReturnDate.seconds * 1000));
      let b = moment(this.state.returnDate);
      let dueDate = b.diff(a, "days"); // b-a

      //console.log(new Date(mustReturnDate.seconds * 1000))
      //console.log(this.state.returnDate)
      console.log(dueDate);

      if (dueDate > 0) {
        this._overdue = dueDate;
        return (
          <>
            <p className="text-danger" style={{ fontSize: "25px" }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* เกินกำหนด {dueDate} วัน
            </p>
          </>
        );
      } else {
        this._overdue = 0;
        return <></>;
      }
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
    return (
      <b style={{ fontSize: "25px" }}>
        {" "}
        {new Date(date.seconds * 1000).getDate() +
          " " +
          month[new Date(date.seconds * 1000).getMonth()] +
          " " +
          (new Date(date.seconds * 1000).getFullYear() + 543)}
      </b>
    );
  }

  render() {
    const { readyToRender, itemBorrow } = this.state;
    const { returnDate, returner, inProgress } = this.state;
    return readyToRender ? (
      <>
        <Modal
          backdrop="static"
          keyboard={false}
          size="lg"
          className="add-modal regular-th"
          isOpen={this.props.retModal}
          toggle={this.props.toggleFn}
        >
          <ModalHeader style={{ color: "white" }}>
            ยืนยันการคืนครุภัณฑ์
          </ModalHeader>
          <ModalBody>
            <div
              style={{
                backgroundColor: "#def8ff",
                padding: "8px 10px 8px 20px",
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;
              <i
                style={{ fontSize: "25px" }}
                className="fas fa-exclamation-triangle"
              ></i>
              &nbsp;&nbsp;
              <b>
                <span style={{ fontSize: "25px" }}>
                  การดำเนินการนี้จะเปลี่ยนสถานะของครุภัณฑ์ เป็น&nbsp;
                  <span style={{ fontSize: "30px" }}>'คืนแล้ว'</span>
                </span>
              </b>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <br />
            หมายเลขครุภัณฑ์ :{" "}
            <b style={{ fontSize: "25px" }}>{itemBorrow.itemCode}</b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ชื่อครุภัณฑ์ :{" "}
            <b style={{ fontSize: "25px" }}>{itemBorrow.itemName}</b>
            <br />
            รายละเอียด :{" "}
            <b style={{ fontSize: "25px" }}>
              {itemBorrow.detail ? itemBorrow.detail : <>&nbsp;&nbsp;-</>}
            </b>
            <br />
            วันที่ยืม : {this.convertDate(itemBorrow.borrowDate)}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; วันที่กำหนดคืน :{" "}
            {this.convertDate(itemBorrow.mustReturnDate)}
            <hr />
            <InputGroup>
              <label style={{ fontSize: "23px", color: "black" }}>
                <b>วันที่คืน</b>{" "}
                <span style={{ fontSize: "18px", color: "red" }}>*จำเป็น</span>
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
                  minDate={
                    new Date(
                      itemBorrow.borrowDate.seconds * 1000 +
                        itemBorrow.borrowDate.nanoseconds / 1000
                    )
                  } //Firebase firestore timestamp to Formatted Date
                  value={returnDate}
                  onChange={(returnDate) => this.setState({ returnDate })}
                />

                {this.calOverdue(itemBorrow.mustReturnDate)}
              </InputGroup>
            </InputGroup>
            <FormGroup>
              <label style={{ fontSize: "23px", color: "black" }}>
                <b>ผู้คืน</b>{" "}
                <span style={{ fontSize: "18px", color: "red" }}>*จำเป็น</span>
              </label>
              <Input
                type="text"
                name="returner"
                className="regular-th"
                style={{ height: 40, fontSize: "22px" }}
                onChange={(e) => this.setState({ returner: e.target.value })}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn-round regular-th"
              size="sm"
              outline
              color="secondary"
              onClick={this.props.toggleFn}
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
              style={{
                fontSize: "25px",
                fontWeight: "normal",
              }}
              disabled={!returner || !returnDate || inProgress}
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
    ) : (
      <>
        <Modal
          backdrop="static"
          keyboard={false}
          size="lg"
          className="add-modal regular-th"
          isOpen={this.props.retModal}
          toggle={this.props.toggleFn}
        >
          <ModalHeader style={{ color: "white" }}>
            ยืนยันการคืนครุภัณฑ์
          </ModalHeader>
          <ModalBody>
            <SkeletonTheme color="#fafafa">
              <p>
                <Skeleton height={200} />
              </p>
            </SkeletonTheme>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

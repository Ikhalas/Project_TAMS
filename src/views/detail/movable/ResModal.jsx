import React, { Component } from "react";
import { db } from "../../../api/firebase";
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
  Spinner
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
        style={{ height: 40, fontSize: "22px", width: "600px" }}
        onChange={onChangeHandle}
      />
    </FormGroup>
  );
}

export default class ResModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subDep: "",
      dateToShow: "",
      inProgress: false,

      date: "",
      selectedDep: "",
      resName: "",
      resUser: ""
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getSubDepOptions();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getSubDepOptions() {
    if (this.props.resModal) {
      db.collection("subDepartments")
        .where("parent", "==", this.props.department)
        .get()
        .then(snapshot => {
          let subDep = [];
          snapshot.forEach(doc => {
            subDep.push(doc.data());
          });
          this._isMounted && this.setState({ subDep });
        })
        .catch(error => console.log(error));
    }
  }

  handleInputTextChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    //console.log([e.target.name] + " ===> " + e.target.value);
  };

  handleSummit(e) {
    e.preventDefault();
    this.setState({ inProgress: true });

    let _lastSeq = "";
    if (this.props.res.length !== 0) {
      _lastSeq = Math.max.apply(
        Math,
        this.props.res.map(function(obj) {
          return obj.seq;
        })
      );
    }

    const data = {
      seq: Number(_lastSeq) + 1,
      date: this.state.date,
      itemCode: this.props.itemCode,
      resDepartment: this.props.department,
      resSubDepartment: this.state.selectedDep.label,
      resUser: this.state.resUser,
      resName: this.state.resName
    };

    this.addResToDatabase(data);
  }

  addResToDatabase(data) {
    db.collection("itemRes")
      .add(data)
      .then(() => {
        //console.log("add itemResponsibility complete !!");
        this.setState({ inProgress: false });
        this.props.toggleFn();
        this.props.toggleAlert("complete");
      });
  }

  render() {
    const { inProgress, resName, resUser, date } = this.state;
    const { dateToShow, selectedDep, subDep } = this.state;

    return (
      <>
        <Modal
          backdrop="static"
          keyboard={false}
          size="lg"
          className="regular-th"
          isOpen={this.props.resModal}
          toggle={this.props.toggleFn}
        >
          <ModalHeader style={{ color: "white" }}>
            เพิ่มรายการผู้ดูแลรับผิดชอบครุภัณฑ์
          </ModalHeader>
          <ModalBody>
            <p style={{ fontSize: "30px" }}>/{this.props.itemCode}</p>

            <FormGroup>
              <label style={{ fontSize: "23px", color: "black" }}>
                <b>วันที่ซื้อ/ได้มา</b>{" "}
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
                  value={dateToShow}
                  onChange={date => {
                    if (date) {
                      let formatted_date =
                        date.getDate() +
                        "-" +
                        (date.getMonth() + 1) +
                        "-" +
                        (date.getFullYear() + 543);

                      this.setState({
                        date: formatted_date,
                        dateToShow: date
                      });
                    }
                  }}
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <label>
                <b>ชื่อส่วนราชการ</b>{" "}
                <span style={{ fontSize: "18px", color: "red" }}>*จำเป็น</span>
              </label>
              <Select
                style={{ height: 40, fontSize: "22px" }}
                value={selectedDep}
                onChange={selectedDep => {
                  this.setState({
                    selectedDep
                  });
                }}
                options={subDep}
                placeholder="เลือกส่วนราชการ..."
                className="regular-th"
              />
            </FormGroup>

            <TextInput
              label="ชื่อผู้ใช้ครุภัณฑ์"
              name="resUser"
              onChange={this.handleInputTextChange}
            />

            <TextInput
              label="ชื่อหัวหน้าส่วนราชการ"
              name="resName"
              onChange={this.handleInputTextChange}
            />
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
              disabled={
                !resName || !resUser || !date || !selectedDep || inProgress
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

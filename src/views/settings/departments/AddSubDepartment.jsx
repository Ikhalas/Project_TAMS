import React, { Component } from "react";
import { db } from "../../../api/firebase";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Row,
  Col,
  Spinner
} from "reactstrap";

function TextInput(props) {
  function onChangeHandle(e) {
    if (props.onChange) props.onChange(e);
  }
  return (
    <FormGroup style={{ height: "110px" }}>
      <label style={{ fontSize: "25px", color: "black" }}>
        <b>{props.label}</b>&nbsp;
        {props.required ? (
          <span style={{ fontSize: "18px", color: "red" }}>*จำเป็น</span>
        ) : (
          ""
        )}
      </label>
      <Input
        type="text"
        name={props.name}
        className="regular-th"
        style={{ height: 40, fontSize: "22px" }}
        onChange={onChangeHandle}
      />
      {!props.check ? (
        <>
          {" "}
          <span style={{ fontSize: "18px", color: "red" }}>
            {props.errorMsg}
          </span>
        </>
      ) : (
        <></>
      )}
    </FormGroup>
  );
}

export default class AddSubDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameCheck: true,
      inProgress: false
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleInputTextChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      nameCheck: true
    });
    //console.log([e.target.name] + " ===> " + e.target.value);
  };

  async handleSummit(e) {
    e.preventDefault();
    this.setState({ inProgress: true });

    this._isMounted &&
      (await db
        .collection("subDepartments")
        .where("label", "==", this.state.name)
        .where("parent", "==", this.props.parent)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            //console.log("No matching documents. can submit");
            this.setState({ nameCheck: true }); //can submit
            return;
          }
          snapshot.forEach(doc => {
            //let data = doc.data();
            //console.log(this.state.name + "|" + data.label + " can't submit");
            this.setState({ nameCheck: false, inProgress: false }); //can't submit
          });
        })
        .catch(error => console.log(error)));

    if (this.state.nameCheck) {
      const data = {
        label: this.state.name,
        value: this.state.name,
        parent: this.props.parent
      };
      //console.log(data);
      this.uploadData(data);
    }
  }

  uploadData(data) {
    db.collection("subDepartments")
      .add(data)
      .then(() => {
        this.setState({ inProgress: false });
        this.props.toggleFn();
        this.props.toggleAlert("department");
      });
  }

  /*
  handleResult = () => {
    this.props.toggleAlert('department')
  }
  */

  render() {
    const { subDepModal } = this.props;
    const { name, inProgress, nameCheck } = this.state;
    return (
      <>
        {" "}
        <Modal
          className="add-modal regular-th"
          isOpen={subDepModal}
          toggle={this.props.toggleFn}
          unmountOnClose={true}
          backdrop="static"
          keyboard={false}
        >
          <ModalHeader
            className="pl-4"
            style={{ color: "white", fontSize: "25px" }}
          >
            เพิ่มหน่วยงานย่อย
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col className="pl-3" md="9" sm="12">
                <TextInput
                  label="ชื่อหน่วยงานย่อย"
                  name="name"
                  onChange={this.handleInputTextChange}
                  required={true}
                  check={nameCheck}
                  errorMsg="ชื่อหน่วยงาน มีอยู่ในระบบแล้ว"
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            {name ? (
              <></>
            ) : (
              <>
                <span style={{ fontSize: "20px", color: "red", paddingRight:'220px'  }}>
                  *กรุณากรอกฟิลด์ที่จำเป็นให้ครบถ้วน
                </span>
                
              </>
            )}
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
              disabled={!name || inProgress}
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
            &nbsp;&nbsp;&nbsp;&nbsp;
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

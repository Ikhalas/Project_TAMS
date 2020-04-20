import React, { Component } from "react";
import Select from "react-select";
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
  Spinner,
} from "reactstrap";

export default class AddItemCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      name: "",
      type: "",

      typeOption: "",

      readyToRender: false,

      codeCheck: true,
      nameCheck: true,
      inProgress: false,
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getType();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getType() {
    db.collection("types")
      .orderBy("label")
      .get()
      .then((snapshot) => {
        let typeOption = [];
        snapshot.forEach((doc) => {
          typeOption.push(doc.data());
        });
        this._isMounted && this.setState({ typeOption, readyToRender: true });
      })
      .catch((error) => console.log(error));
  }

  handleInputTextChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      nameCheck: true,
      codeCheck: true,
    });
    //console.log([e.target.name] + " ===> " + e.target.value);
  };

  handleCancelBtn = () => {
    this.props.toggleFn();
    this.setState({ type: null }); //clear option when cancel modal
  };

  async handleSummit(e) {
    e.preventDefault();
    this.setState({ inProgress: true });

    this._isMounted &&
      (await db
        .collection("itemsCode")
        .where("label", "==", this.state.name)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            //console.log("No matching documents. can submit");
            this.setState({ nameCheck: true }); //can submit
            return;
          }
          snapshot.forEach((doc) => {
            //let data = doc.data();
            //console.log(this.state.name + "|" + data.label + " can't submit");
            this.setState({ nameCheck: false, inProgress: false }); //can't submit
          });
        })
        .catch((error) => console.log(error)));

    this._isMounted &&
      (await db
        .collection("itemsCode")
        .where("code", "==", this.state.code)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            //console.log("No matching documents. can submit");
            this.setState({ codeCheck: true }); //can submit
            return;
          }
          snapshot.forEach((doc) => {
            //let data = doc.data();
            //console.log(this.state.name + "|" + data.label + " can't submit");
            this.setState({ codeCheck: false, inProgress: false }); //can't submit
          });
        })
        .catch((error) => console.log(error)));

    if (this.state.nameCheck && this.state.codeCheck) {
      const data = {
        label: this.state.name,
        value: this.state.name,
        code: this.state.code,
        type: this.state.type.label,
      };
      //console.log(data);
      this.uploadData(data);
    }
  }

  uploadData(data) {
    db.collection("itemsCode")
      .add(data)
      .then(() => {
        this.setState({ inProgress: false, type: null });
        this.props.toggleFn();
        this.props.toggleAlert("itemsCode");
      });
  }

  render() {
    const { itemCodeModal } = this.props;
    const { name, code, type, typeOption } = this.state;
    const { codeCheck, nameCheck, inProgress, readyToRender } = this.state;
    return readyToRender ? (
      <>
        <Modal
          className="add-modal regular-th"
          isOpen={itemCodeModal}
          toggle={this.props.toggleFn}
          unmountOnClose={true}
          backdrop="static"
          keyboard={false}
        >
          <ModalHeader
            className="pl-4"
            style={{ color: "white", fontSize: "25px" }}
          >
            ชื่อและรหัสครุภัณฑ์
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col className="pl-3" md="9" sm="12">
                <FormGroup style={{ height: "110px" }}>
                  <label style={{ fontSize: "25px", color: "black" }}>
                    <b>รหัสครุภัณฑ์</b>&nbsp;
                    <span style={{ fontSize: "18px", color: "red" }}>
                      *จำเป็น
                    </span>
                  </label>
                  <Input
                    type="number"
                    name="code"
                    className="regular-th"
                    style={{ height: 40, fontSize: "22px" }}
                    onChange={this.handleInputTextChange}
                  />
                  {!codeCheck ? (
                    <>
                      {" "}
                      <span style={{ fontSize: "18px", color: "red" }}>
                        รหัสครุภัณฑ์ มีอยู่ในระบบแล้ว
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </FormGroup>

                <FormGroup style={{ height: "110px" }}>
                  <label style={{ fontSize: "25px", color: "black" }}>
                    <b>ชื่อครุภัณฑ์</b>&nbsp;
                    <span style={{ fontSize: "18px", color: "red" }}>
                      *จำเป็น
                    </span>
                  </label>
                  <Input
                    type="text"
                    name="name"
                    className="regular-th"
                    style={{ height: 40, fontSize: "22px" }}
                    onChange={this.handleInputTextChange}
                  />
                  {!nameCheck ? (
                    <>
                      {" "}
                      <span style={{ fontSize: "18px", color: "red" }}>
                        ชื่อครุภัณฑ์ มีอยู่ในระบบแล้ว
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </FormGroup>

                <FormGroup style={{ height: "110px" }}>
                  <label style={{ fontSize: "25px", color: "black" }}>
                    <b>ประเภทครุภัณฑ์</b>&nbsp;
                    <span style={{ fontSize: "18px", color: "red" }}>
                      *จำเป็น
                    </span>
                  </label>
                  <Select
                    value={type}
                    onChange={(type) => this.setState({ type })}
                    options={typeOption}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            {name && code && type ? (
              <></>
            ) : (
              <>
                <span
                  style={{
                    fontSize: "20px",
                    color: "red",
                    paddingRight: "220px",
                  }}
                >
                  *กรุณากรอกฟิลด์ที่จำเป็นให้ครบถ้วน
                </span>
              </>
            )}
            <Button
              className="btn-round regular-th"
              size="sm"
              outline
              color="secondary"
              onClick={this.handleCancelBtn}
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
              disabled={!name || !code || !type || inProgress}
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
    ) : (
      <></>
    );
  }
}

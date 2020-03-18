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
  Spinner
} from "reactstrap";

const moveOptions = [
  { value: "สังหาริมทรัพย์", label: "สังหาริมทรัพย์" },
  { value: "อสังหาริมทรัพย์", label: "อสังหาริมทรัพย์" }
];

export default class AddType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      move: "",

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
        .collection("types")
        .where("label", "==", this.state.name)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            //console.log("No matching documents. can submit");
            this.setState({ codeCheck: true }); //can submit
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
        movable: this.state.move.label
      };
      //console.log(data);
      this.uploadData(data);
    }
  }

  uploadData(data) {
    db.collection("types")
      .add(data)
      .then(() => {
        this.setState({ inProgress: false });
        this.props.toggleFn();
        this.props.toggleAlert("types");
      });
  }

  render() {
    const { typeModal } = this.props;
    const { name, move, nameCheck, inProgress } = this.state;
    return (
      <>
        <Modal
          className="add-modal regular-th"
          isOpen={typeModal}
          toggle={this.props.toggleFn}
          unmountOnClose={true}
          backdrop="static"
          keyboard={false}
        >
          <ModalHeader
            className="pl-4"
            style={{ color: "white", fontSize: "25px" }}
          >
            เพิ่มประเภทครุภัณฑ์
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col className="pl-3" md="9" sm="12">
                <FormGroup style={{ height: "110px" }}>
                  <label style={{ fontSize: "25px", color: "black" }}>
                    <b>ประเภทครุภัณฑ์</b>&nbsp;
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
                        ประเภทครุภัณฑ์ มีอยู่ในระบบแล้ว
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
                    value={move}
                    onChange={move => this.setState({ move })}
                    options={moveOptions}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            {name && move ? (
              <></>
            ) : (
              <>
                <span style={{ fontSize: "20px", color: "red" }}>
                  *กรุณากรอกฟิลด์ที่จำเป็นให้ครบถ้วน
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
              disabled={!name || !move || inProgress}
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

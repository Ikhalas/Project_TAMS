import React, { Component } from "react";
import Select from "react-select";
import DatePicker from "react-date-picker";
import axios from "axios";
import { db, storage } from "../../api/firebase";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Row,
  Col,
  Spinner,
  ListGroupItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";

import "../../assets/css/Form.css";

function TextInput(props) {
  function onChangeHandle(e) {
    if (props.onChange) props.onChange(e);
  }
  return (
    <FormGroup>
      <label style={{ fontSize: "23px", color: "black" }}>
        <b>{props.label}</b>
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

export default class MovableForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readyToRender1: false,
      readyToRender2: false,
      subDep: "",
      depOptions: "",
      subDevOptions: "",
      codeOptions: "",
      selectedDep: "",
      selectedSubDep: "",
      selectedName: "",
      newItemCode: "",
      oldListNo: 0,
      fakeReload: false,

      status: "ใช้งานได้ดี",
      itemType: "",
      department: "",
      subDepartment: "",
      itemName: "",
      itemCode: "",
      itemCodeSt: "",
      itemCodeNd: "",
      itemCodeTh: "",
      waybillCode: "",
      itemBrand: "",
      itemStyle: "",
      orderNo: "",
      bodyNo: "",
      frameNo: "",
      regisNo: "",
      itemColor: "",
      other: "",
      insuranceTerms: "",
      insuranceCompany: "",
      insuranceDate: "",
      insuranceExpDate: "",
      derivedFrom: "",
      derivedDate: "",
      price: "",
      budgetOf: "",
      note: "",

      resDepartment: "",
      resSubDepartment: "",
      resName: "",
      resUser: "",

      percent: "",
      lifeTime: "",
      monthRate: "",
      yearRate: "",

      insuranceDateValue: "",
      derivedDateValue: "",
      insuranceExpDateValue: "",

      imagePreviewUrl: "",
      btn1: true,
      btn2: true,
      btn3: true,
      haveImg: false,

      modal: false,
      isUploading: false
    };
    this._isMounted = false;
    this._newItemCode = "xxx-xx-xxxx";
    this._diableSubSelect = false;
    this._placeholderSubSelect = "เลือกหน่วยงานที่รับผิดชอบ...";
    this._selectedFile = "";
    this._imgType = "";
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getDepOptions();
    this._isMounted && this.getSubDepOptions();
    this._isMounted && this.getItemCodeOptions();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.typeSelected !== prevProps.typeSelected) {
      this.setState({
        selectedDep: null,
        selectedName: null,
        budgetOf: null,
        oldListNo: 0,
        imagePreviewUrl: "",
        haveImg: false,
        btn1: true,
        btn2: true,
        btn3: true,
        resDepartment: "",
        resSubDepartment: "",
        newItemCode: "",
        itemCodeSt: "",
        itemCodeNd: "",
        itemCodeTh: "",
        waybillCode: "",
        itemBrand: "",
        itemStyle: "",
        orderNo: "",
        bodyNo: "",
        frameNo: "",
        regisNo: "",
        itemColor: "",
        other: "",
        insuranceTerms: "",
        insuranceExpDate: "",
        insuranceCompany: "",
        insuranceDate: "",
        derivedFrom: "",
        derivedDate: "",
        price: "",
        note: "",
        subDepartment: "",
        resName: "",
        resUser: "",
        percent: "",
        lifeTime: "",
        monthRate: "",
        yearRate: ""
      });
      this._isMounted && this.getDepOptions();
      this._isMounted && this.getSubDepOptions();
      this._isMounted && this.getItemCodeOptions();

      this.setState({ fakeReload: true });
      setTimeout(
        function() {
          this.setState({ fakeReload: false });
        }.bind(this),
        1000
      );
    }
  }

  getDepOptions() {
    db.collection("departments")
      .get()
      .then(snapshot => {
        let depOptions = [];
        snapshot.forEach(doc => {
          depOptions.push(doc.data());
        });
        this._isMounted && this.setState({ depOptions, readyToRender1: true });
      })
      .catch(error => console.log(error));
  }

  getSubDepOptions() {
    db.collection("subDepartments")
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

  getItemCodeOptions() {
    db.collection("itemsCode")
      .where("type", "==", this.props.typeSelected.label)
      .get()
      .then(snapshot => {
        let codeOptions = [];
        snapshot.forEach(doc => {
          codeOptions.push(doc.data());
        });
        this._isMounted && this.setState({ codeOptions, readyToRender2: true });
      })
      .catch(error => console.log(error));
  }

  genSubDevOptions() {
    if (this.state.selectedDep.label) {
      let filterOptions = this.state.subDep.filter(sub => {
        return sub.parent === this.state.selectedDep.label;
      });

      if (filterOptions.length > 0) {
        this._diableSubSelect = false;
        this._placeholderSubSelect =
          "เลือกหน่วยงานย่อยของ " + this.state.selectedDep.label;
        return filterOptions;
      } else {
        this._diableSubSelect = true;
        this._placeholderSubSelect = "ไม่มีหน่วยงานย่อย...";
        return;
      }
    }
  }

  genItemCode() {
    //console.log(this.state.selectedName.value);
    if (this.state.selectedName) {
      db.collection("itemMovable")
        .where("itemName", "==", this.state.selectedName.value)
        .get()
        .then(snapshot => {
          let oldItemName = [];
          snapshot.forEach(doc => {
            oldItemName.push(doc.data());
          });

          let allCode = [];
          oldItemName.map(name => {
            allCode.push(name.itemCodeTh);
            return null;
          });

          //(allCode.length);

          if (allCode.length > 0) {
            let newValue = (Math.max(...allCode) + 1).toString();
            this.setState(
              {
                itemCodeSt: Number(this.state.selectedName.code),
                itemCodeNd: 183 - new Date().getYear(),
                itemCodeTh: Math.max(...allCode) + 1
              },
              () => console.log(this.state.itemCodeTh)
            );
            let noToStr = "";

            newValue.length === 1
              ? (noToStr = "000" + newValue)
              : newValue.length === 2
              ? (noToStr = "00" + newValue)
              : newValue.length === 3
              ? (noToStr = "0" + newValue)
              : (noToStr = newValue);

            this._newItemCode =
              this.state.selectedName.code +
              "-" +
              (183 - new Date().getYear()) +
              "-" +
              noToStr;
          } else {
            this.setState({
              itemCodeSt: Number(this.state.selectedName.code),
              itemCodeNd: 183 - new Date().getYear(),
              itemCodeTh: 1
            });
            this._newItemCode =
              this.state.selectedName.code +
              "-" +
              (183 - new Date().getYear()) +
              "-" +
              "0001";
          }

          this.setState({
            itemCode: this._newItemCode,
            newItemCode: this._newItemCode,
            oldListNo: allCode.length
          });
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

  imgSelectedHandler = e => {
    //console.log(e.target.files[0]);
    this._selectedFile = e.target.files[0];
    this._imgType = this._selectedFile.type.replace("image/", "");

    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
        haveImg: true
      });
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  calDepreciations() {
    let valueYear, perYear, valueMonth, perMonth, C, cumulative;

    if (this.state.yearRate > 0) {
      valueYear = (this.state.price * this.state.percent) / 100;
      perYear = valueYear.toFixed(2);

      valueMonth = (this.state.monthRate * valueYear) / 12;
      perMonth = valueMonth.toFixed(2);

      C = valueYear + valueMonth;
      cumulative = C.toFixed(2);
      return [cumulative, perMonth, perYear];
    } else {
      valueYear = (this.state.price * this.state.percent) / 100;
      perYear = 0;

      valueMonth = (this.state.monthRate * valueYear) / 12;
      perMonth = valueMonth.toFixed(2);

      C = valueMonth;
      cumulative = C.toFixed(2);

      return [perMonth, perYear, cumulative];
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ btn1: true, btn2: true, btn3: true, isUploading: true });
    this.toggleModal();

    let budgetOf = "";
    this.state.budgetOf && (budgetOf = this.state.budgetOf.label);

    if (this.state.haveImg) {
      let imgName = this.state.newItemCode + "." + this._imgType;
      //console.log(imgName);
      const fd = new FormData();
      fd.append("image", this._selectedFile, imgName);
      axios
        .post("https://us-central1-tams-psu.cloudfunctions.net/uploadFile", fd)
        .then(res => {
          storage
            .ref()
            .child(imgName)
            .getDownloadURL()
            .then(url => {
              const newItem = {
                status: "ใช้งานได้ดี",
                itemType: this.props.typeSelected.label,
                department: this.state.selectedDep.label,
                subDepartment: this.state.subDepartment.label,
                itemCode: this.state.newItemCode,
                itemCodeSt: Number(this.state.itemCodeSt),
                itemCodeNd: Number(this.state.itemCodeNd),
                itemCodeTh: Number(this.state.itemCodeTh),
                itemName: this.state.selectedName.label,
                waybillCode: this.state.waybillCode,
                itemBrand: this.state.itemBrand,
                itemStyle: this.state.itemStyle,
                orderNo: this.state.orderNo,
                bodyNo: this.state.bodyNo,
                frameNo: this.state.frameNo,
                regisNo: this.state.regisNo,
                itemColor: this.state.itemColor,
                other: this.state.other,
                insuranceTerms: this.state.insuranceTerms,
                insuranceExpDate: this.state.insuranceExpDate,
                insuranceCompany: this.state.insuranceCompany,
                insuranceDate: this.state.insuranceDate,
                derivedFrom: this.state.derivedFrom,
                derivedDate: this.state.derivedDate,
                price: Number(this.state.price),
                budgetOf: budgetOf,
                url: url,
                note: this.state.note,
                borrowSta: false
              };

              const itemRes = {
                itemCode: this.state.newItemCode,
                date: this.state.derivedDate,
                seq: 0,
                resDepartment: this.state.selectedDep.label,
                resSubDepartment: this.state.subDepartment.label,
                resName: this.state.resName,
                resUser: this.state.resUser,
                note: ""
              };

              let depreciat = this.calDepreciations();
              const itemDep = {
                itemCode: this.state.newItemCode,
                seq: 0,
                date: this.state.derivedDate,
                percent: Number(this.state.percent),
                lifeTime: Number(this.state.lifeTime),
                monthRate: Number(this.state.monthRate),
                yearRate: Number(this.state.yearRate),
                balance: Number(this.state.price),
                perMonth: Number(depreciat[0]),
                perYear: Number(depreciat[1]),
                cumulative: Number(depreciat[2]),
                note: "-- ราคาเริ่มต้น --"
              };

              this.uploadData(newItem, itemRes, itemDep);
            })
            .catch(error => {
              console.log(error);
            });
        });
    } else {
      const newItem = {
        status: "ใช้งานได้ดี",
        itemType: this.props.typeSelected.label,
        department: this.state.selectedDep.label,
        subDepartment: this.state.subDepartment.label,
        itemCode: this.state.newItemCode,
        itemCodeSt: Number(this.state.itemCodeSt),
        itemCodeNd: Number(this.state.itemCodeNd),
        itemCodeTh: Number(this.state.itemCodeTh),
        itemName: this.state.selectedName.label,
        waybillCode: this.state.waybillCode,
        itemBrand: this.state.itemBrand,
        itemStyle: this.state.itemStyle,
        orderNo: this.state.orderNo,
        bodyNo: this.state.bodyNo,
        frameNo: this.state.frameNo,
        regisNo: this.state.regisNo,
        itemColor: this.state.itemColor,
        other: this.state.other,
        insuranceTerms: this.state.insuranceTerms,
        insuranceExpDate: this.state.insuranceExpDate,
        insuranceCompany: this.state.insuranceCompany,
        insuranceDate: this.state.insuranceDate,
        derivedFrom: this.state.derivedFrom,
        derivedDate: this.state.derivedDate,
        price: Number(this.state.price),
        budgetOf: budgetOf,
        note: this.state.note,
        borrowSta: false
      };

      const itemRes = {
        itemCode: this.state.newItemCode,
        date: this.state.derivedDate,
        seq: 0,
        resDepartment: this.state.selectedDep.label,
        resSubDepartment: this.state.subDepartment.label,
        resName: this.state.resName,
        resUser: this.state.resUser,
        note: ""
      };

      let depreciat = this.calDepreciations();
      const itemDep = {
        itemCode: this.state.newItemCode,
        seq: 0,
        percent: Number(this.state.percent),
        lifeTime: Number(this.state.lifeTime),
        monthRate: Number(this.state.monthRate),
        yearRate: Number(this.state.yearRate),
        balance: Number(this.state.price),
        perMonth: Number(depreciat[0]),
        perYear: Number(depreciat[1]),
        cumulative: Number(depreciat[2]),
        note: "-- ราคาเริ่มต้น --"
      };

      this.uploadData(newItem, itemRes, itemDep);
    }
  }

  uploadData(newItem, itemRes, itemDep) {
    db.collection("itemMovable")
      .add(newItem)
      .then(() => {
        //console.log("add item complete !! 1");
        db.collection("itemRes")
          .add(itemRes)
          .then(() => {
            //console.log("add itemRes complete !! 2");
            db.collection("itemDep")
              .add(itemDep)
              .then(() => {
                //console.log("add itemDep complete !! 3");
                this.setState({ isUploading: false });
              });
          });
      });
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const {
      fakeReload,

      selectedDep,
      subDepartment,
      selectedName,
      depOptions,
      codeOptions,

      newItemCode,
      oldListNo,
      budgetOf,
      derivedDateValue,
      insuranceDateValue,
      insuranceExpDateValue,

      resDepartment,
      resSubDepartment,

      price,
      btn1,
      btn2,
      btn3,

      modal
    } = this.state;
    return fakeReload ? (
      <>
        <Row>
          <Col md="12" style={{ textAlign: "center" }}>
            <span className="mt-5">
              <br />
              <br />
              <br />
              <Spinner
                animation="border"
                variant="info"
                style={{ width: "70px", height: "70px" }}
              />
              <br />
              <br />
              <br />
              <br />
              <br />
            </span>
          </Col>
        </Row>
      </>
    ) : (
      <>
        {this.state.readyToRender1 && this.state.readyToRender2 ? (
          <>
            <Form>
              <Card>
                <CardBody>
                  <Row>
                    <Col md="12" style={{ textAlign: "center" }}>
                      <h3 style={{ color: "#66615b", fontSize: "35px" }}>
                        ฟอร์มสำหรับเพิ่มรายการครุภัณฑ์{" "}
                        <span
                          style={{
                            color: "#66615b",
                            fontSize: "40px",
                            fontWeight: "bold"
                          }}
                        >
                          "{this.props.typeSelected.label} (
                          {this.props.typeSelected.movable})"
                        </span>
                      </h3>
                    </Col>
                  </Row>
                  <p
                    style={{
                      color: "#66615b",
                      fontSize: "25px",
                      lineHeight: "50%"
                    }}
                  >
                    ข้อมูลเบื้องต้นของครุภัณฑ์
                  </p>
                  <hr />

                  <Row>
                    <Col md="6" sm="12" style={{ height: "130px" }}>
                      <FormGroup>
                        <label>
                          <b>หน่วยงานที่รับผิดชอบ</b>{" "}
                          <span style={{ fontSize: "18px", color: "red" }}>
                            *จำเป็น
                          </span>
                        </label>
                        <Select
                          style={{ height: 40, fontSize: "22px" }}
                          value={selectedDep}
                          onChange={selectedDep => {
                            this.setState({
                              selectedDep,
                              department: selectedDep,
                              resDepartment: selectedDep,
                              btn1: false
                            });
                          }}
                          options={depOptions}
                          placeholder="เลือกหน่วยงานที่รับผิดชอบ..."
                          className="regular-th"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12" style={{ height: "130px" }}>
                      <FormGroup>
                        <label style={{ fontSize: "23px", color: "black" }}>
                          <b>หน่วยงานย่อย</b>{" "}
                          <span style={{ fontSize: "18px", color: "red" }}>
                            *จำเป็น
                          </span>
                        </label>
                        {selectedDep ? (
                          <>
                            {" "}
                            <Select
                              style={{ height: 40, fontSize: "22px" }}
                              value={subDepartment}
                              onChange={subDepartment => {
                                this.setState({
                                  subDepartment,
                                  resSubDepartment: subDepartment,
                                  btn3: false
                                });
                              }}
                              options={this.genSubDevOptions()}
                              isDisabled={this._diableSubSelect}
                              placeholder={this._placeholderSubSelect}
                            />
                          </>
                        ) : (
                          <>
                            <Select
                              style={{ height: 40, fontSize: "22px" }}
                              isDisabled={true}
                              placeholder="โปรดระบุหน่วยงานที่รับผิดชอบก่อน..."
                            />
                          </>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6" sm="12" style={{ height: "130px" }}>
                      <FormGroup>
                        <label style={{ fontSize: "23px", color: "black" }}>
                          <b>ชื่อครุภัณฑ์</b>{" "}
                          <span style={{ fontSize: "18px", color: "red" }}>
                            *จำเป็น
                          </span>
                        </label>
                        <Select
                          style={{ height: 40, fontSize: "22px" }}
                          value={selectedName}
                          onChange={selectedName => {
                            this.setState(
                              {
                                selectedName,
                                itemName: selectedName,
                                btn2: false
                              },
                              () => {
                                this.genItemCode();
                              }
                            );
                          }}
                          options={codeOptions}
                          placeholder="เลือกชื่อครุภัณฑ์..."
                          className="regular-th"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12" style={{ height: "140px" }}>
                      <FormGroup>
                        <label style={{ fontSize: "23px", color: "black" }}>
                          <b>รหัสครุภัณฑ์</b>
                        </label>
                        {newItemCode ? (
                          <>
                            <ListGroupItem>
                              <Row>
                                <Col md="5">
                                  {" "}
                                  <span style={{ fontSize: "25px" }}>
                                    {newItemCode}
                                  </span>
                                </Col>
                                <Col md="7" className="text-right">
                                  <span
                                    style={{
                                      fontSize: "16px"
                                    }}
                                  >
                                    {!oldListNo ? (
                                      <>
                                        ยังไม่มี{" "}
                                        <b>
                                          {selectedName
                                            ? selectedName.label
                                            : null}
                                        </b>{" "}
                                        อยู่ในระบบ
                                      </>
                                    ) : (
                                      <>
                                        มี{" "}
                                        <b>
                                          {selectedName
                                            ? selectedName.label
                                            : null}
                                        </b>{" "}
                                        อยุ่ในระบบแล้ว <b>{oldListNo}</b> รายการ
                                      </>
                                    )}
                                  </span>
                                </Col>
                              </Row>
                            </ListGroupItem>
                          </>
                        ) : (
                          <>
                            <Input
                              type="text"
                              className="regular-th disable-input"
                              style={{ height: 50, fontSize: "20px" }}
                              value="โปรดระบุชื่อครุภัณฑ์ก่อน..."
                              disabled
                            />
                          </>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="4" sm="12">
                      <TextInput
                        label="เลขใบส่งของ"
                        name="waybillCode"
                        onChange={this.handleInputTextChange}
                      />
                    </Col>
                    <Col className="px-1" md="4" sm="12">
                      <TextInput
                        label="ชื่อ/ยี่ห้อผู้ทำหรือผลิต"
                        name="itemBrand"
                        onChange={this.handleInputTextChange}
                      />
                    </Col>
                    <Col className="pl-1" md="4" sm="12">
                      <TextInput
                        label="แบบ/ชนิด/ลักษณะ"
                        name="itemStyle"
                        onChange={this.handleInputTextChange}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="4" sm="12">
                      <TextInput
                        label="สีของพัสดุ"
                        name="itemColor"
                        onChange={this.handleInputTextChange}
                      />
                    </Col>
                    <Col className="px-1" md="4" sm="12">
                      <TextInput
                        label="หมายเลขลำดับ"
                        name="orderNo"
                        onChange={this.handleInputTextChange}
                      />
                    </Col>
                    <Col className="pl-1" md="4" sm="12">
                      <TextInput
                        label="หมายเลขกรอบ"
                        name="frameNo"
                        onChange={this.handleInputTextChange}
                      />
                    </Col>
                  </Row>

                  <Row style={{ height: "140px" }}>
                    <Col className="pr-1" md="4" sm="12">
                      <TextInput
                        label="หมายเลขจดทะเบียน"
                        name="regisNo"
                        onChange={this.handleInputTextChange}
                      />
                    </Col>
                    <Col className="px-1" md="4" sm="12">
                      <TextInput
                        label="หมายเลขเครื่อง"
                        name="bodyNo"
                        onChange={this.handleInputTextChange}
                      />
                    </Col>
                    <Col className="pl-1" md="4" sm="12">
                      <TextInput
                        label="อื่นๆ (ถ้ามี)"
                        name="other"
                        onChange={this.handleInputTextChange}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div>
                    {this.state.imagePreviewUrl ? (
                      <div style={{ width: "100%", textAlign: "center" }}>
                        <img
                          src={this.state.imagePreviewUrl}
                          alt="icon"
                          width="200"
                        />{" "}
                        <Button
                          className="regular-th"
                          size="sm"
                          outline
                          color="danger"
                          onClick={() => this.setState({ imagePreviewUrl: "" })}
                          style={{
                            position: "absolute",
                            top: "0px",
                            right: "10px",
                            fontWeight: "normal"
                          }}
                        >
                          ยกเลิก
                        </Button>
                      </div>
                    ) : (
                      <>
                        <label
                          className="regular-th"
                          style={{ color: "#66615b", fontSize: "25px" }}
                        >
                          กดเลือกรูปภาพหรือลากมาวางในกรอบ{" "}
                          <span style={{ fontSize: "18px", color: "red" }}>
                            *เฉพาะไฟล์นามสกุล png, gif, jpeg, jpg
                          </span>
                        </label>

                        <input
                          type="file"
                          onChange={this.imgSelectedHandler}
                          accept="image/x-png,image/gif,image/jpeg"
                          className="regular-th"
                          style={{
                            width: "100%",
                            height: "100px",
                            border: "dashed #adb5bd 2px",
                            backgroundColor: "rgba(255,255,255,.8)",
                            textAlign: "center"
                          }}
                        />
                      </>
                    )}
                  </div>
                </CardBody>
              </Card>

              <Row>
                <Col md="6" sm="12">
                  <Card>
                    
                    <CardBody>
                      <p
                        style={{
                          color: "#66615b",
                          fontSize: "25px",
                          lineHeight: "50%",
                          paddingTop: "10px"
                        }}
                      >
                        ข้อมูลที่มาของครุภัณฑ์
                      </p>
                      <hr />
                      <TextInput
                        label="ซื้อ/จ้าง/ได้มา จาก"
                        name="derivedFrom"
                        onChange={this.handleInputTextChange}
                      />
                      <FormGroup>
                        <label style={{ fontSize: "23px", color: "black" }}>
                          <b>วันที่ซื้อ/จ้าง/ได้มา</b>
                        </label>
                        <InputGroup>
                          <label htmlFor="inputdatepicker2">
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
                            value={derivedDateValue}
                            onChange={date => {
                              if (date) {
                                let formatted_date =
                                  date.getDate() +
                                  "/" +
                                  (date.getMonth() + 1) +
                                  "/" +
                                  (date.getFullYear() + 543);

                                this.setState({
                                  derivedDate: formatted_date,
                                  derivedDateValue: date
                                });
                              }
                            }}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <label style={{ fontSize: "23px", color: "black" }}>
                          <b>ราคา</b>
                        </label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="price"
                            className="regular-th"
                            style={{ height: 40, fontSize: "22px" }}
                            onChange={this.handleInputTextChange}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText
                              style={{ height: 40, fontSize: "22px" }}
                            >
                              บาท&nbsp;&nbsp;&nbsp;
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <label style={{ fontSize: "23px", color: "black" }}>
                          <b>หน่วยงานเจ้าของงบประมาณ</b>
                        </label>
                        <Select
                          style={{ height: 40, fontSize: "22px" }}
                          value={budgetOf}
                          onChange={budgetOf => {
                            this.setState({ budgetOf });
                          }}
                          options={depOptions}
                          placeholder="เลือกหน่วยงานที่รับผิดชอบ..."
                        />
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Col>

                <Col md="6" sm="12">
                  <Card>
                    <CardBody>
                      <p
                        style={{
                          color: "#66615b",
                          fontSize: "25px",
                          lineHeight: "50%",
                          paddingTop: "10px"
                        }}
                      >
                        ข้อมูลการประกันครุภัณฑ์
                      </p>
                      <hr />
                      <TextInput
                        label="เงื่อนไขการรับประกัน"
                        name="insuranceTerms"
                        onChange={this.handleInputTextChange}
                      />
                      <TextInput
                        label="พัสดุรับประกันไว้ที่บริษัท"
                        name="insuranceCompany"
                        onChange={this.handleInputTextChange}
                      />

                      <FormGroup>
                        <label style={{ fontSize: "23px", color: "black" }}>
                          <b>วันที่เริ่มประกัน</b>
                        </label>
                        <InputGroup>
                          <label htmlFor="inputdatepicker2">
                            {" "}
                            <i
                              className="nc-icon nc-calendar-60 pl-2"
                              style={{ fontSize: "20px", paddingTop: "10px" }}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                          </label>
                          <DatePicker
                            className="date-picker"
                            value={insuranceDateValue}
                            calendarClassName="calendar-class"
                            onChange={date => {
                              if (date) {
                                let formatted_date =
                                  date.getDate() +
                                  "/" +
                                  (date.getMonth() + 1) +
                                  "/" +
                                  (date.getFullYear() + 543);

                                this.setState({
                                  insuranceDate: formatted_date,
                                  insuranceDateValue: date
                                });
                              }
                            }}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <label style={{ fontSize: "23px", color: "black" }}>
                          <b>วันที่สิ้นสุดประกัน</b>
                        </label>
                        <InputGroup>
                          <label htmlFor="inputdatepicker2">
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
                            value={insuranceExpDateValue}
                            onChange={date => {
                              if (date) {
                                let formatted_date =
                                  date.getDate() +
                                  "-" +
                                  (date.getMonth() + 1) +
                                  "-" +
                                  (date.getFullYear() + 543);

                                this.setState({
                                  insuranceExpDate: formatted_date,
                                  insuranceExpDateValue: date
                                });
                              }
                            }}
                          />
                        </InputGroup>
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col md="6" sm="12">
                  <Card>
                    <CardBody>
                      <p
                        style={{
                          color: "#66615b",
                          fontSize: "25px",
                          lineHeight: "50%",
                          paddingTop: "10px"
                        }}
                      >
                        ผู้ดูแลรับผิดชอบ
                      </p>
                      <hr />
                      <FormGroup>
                        <label>
                          <b>ส่วนราชการที่รับผิดชอบ</b>{" "}
                        </label>
                        <Row>
                          <Col md="6" sm="6">
                            <Input
                              className="regular-th"
                              style={{ height: 40, fontSize: "24px" }}
                              value={resDepartment && resDepartment.label}
                              readOnly
                            />
                          </Col>
                          <Col md="6" sm="6">
                            <Input
                              className="regular-th"
                              style={{ height: 40, fontSize: "24px" }}
                              value={resSubDepartment && resSubDepartment.label}
                              readOnly
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <TextInput
                        label="ชื่อหัวหน้าส่วนราชการ"
                        name="resName"
                        onChange={this.handleInputTextChange}
                      />
                      <TextInput
                        label="ชื่อหัวหน้าส่วนราชการ"
                        name="resUser"
                        onChange={this.handleInputTextChange}
                      />
                    </CardBody>
                  </Card>
                </Col>

                <Col md="6" sm="12">
                  <Card>
                    <CardBody>
                      <p
                        style={{
                          color: "#66615b",
                          fontSize: "25px",
                          lineHeight: "50%",
                          paddingTop: "10px"
                        }}
                      >
                        อัตราค่าเสื่อมราคา
                      </p>
                      <hr />
                      <InputGroup>
                        <Input
                          className="regular-th"
                          style={{ height: 40, fontSize: "24px" }}
                          value={"ราคาครุภัณฑ์ : " + price}
                          readOnly
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText
                            style={{ height: 40, fontSize: "22px" }}
                          >
                            &nbsp;&nbsp;บาท
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>

                      <Row>
                        <Col md="6" sm="12">
                          <FormGroup>
                            <label style={{ fontSize: "23px", color: "black" }}>
                              <b>อายุการใช้งาน</b>
                            </label>
                            <InputGroup>
                              <Input
                                type="number"
                                name="lifeTime"
                                className="regular-th"
                                style={{ height: 40, fontSize: "22px" }}
                                onChange={this.handleInputTextChange}
                              />
                              <InputGroupAddon addonType="append">
                                <InputGroupText
                                  style={{ height: 40, fontSize: "22px" }}
                                >
                                  ปี&nbsp;&nbsp;
                                </InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col md="6" sm="12">
                          <FormGroup>
                            <label style={{ fontSize: "23px", color: "black" }}>
                              <b>อัตราค่าเสื่อมสภาพ</b>
                            </label>
                            <InputGroup>
                              <Input
                                type="number"
                                name="percent"
                                className="regular-th"
                                style={{ height: 40, fontSize: "22px" }}
                                onChange={this.handleInputTextChange}
                              />
                              <InputGroupAddon addonType="append">
                                <InputGroupText
                                  style={{ height: 40, fontSize: "22px" }}
                                >
                                  &nbsp;&nbsp;เปอร์เซ็นต์&nbsp;&nbsp;
                                </InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6" sm="12">
                          <FormGroup>
                            <label style={{ fontSize: "23px", color: "black" }}>
                              <b>รายปี</b>
                            </label>
                            <InputGroup>
                              <Input
                                type="number"
                                name="yearRate"
                                className="regular-th"
                                style={{ height: 40, fontSize: "22px" }}
                                onChange={this.handleInputTextChange}
                              />
                              <InputGroupAddon addonType="append">
                                <InputGroupText
                                  style={{ height: 40, fontSize: "22px" }}
                                >
                                  &nbsp;&nbsp;ปี&nbsp;&nbsp;
                                </InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col md="6" sm="12">
                          <FormGroup>
                            <label style={{ fontSize: "23px", color: "black" }}>
                              <b>รายเดือน</b>
                            </label>
                            <InputGroup>
                              <Input
                                type="number"
                                name="monthRate"
                                className="regular-th"
                                style={{ height: 40, fontSize: "22px" }}
                                onChange={this.handleInputTextChange}
                              />
                              <InputGroupAddon addonType="append">
                                <InputGroupText
                                  style={{ height: 40, fontSize: "22px" }}
                                >
                                  &nbsp;&nbsp;เดือน&nbsp;&nbsp;
                                </InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col md="12" sm="12">
                  <Card>
                    <CardBody>
                      <FormGroup>
                        <label style={{ fontSize: "23px", color: "black" }}>
                          <b>หมายเหตุ (ถ้ามี)</b>
                        </label>
                        <Input
                          type="textarea"
                          name="note"
                          className="regular-th"
                          style={{ fontSize: "22px" }}
                          onChange={this.handleInputTextChange}
                        />
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row>
                <div
                  className="update ml-auto mr-auto"
                  style={{ width: "95%" }}
                >
                  <div className="text-right">
                    {this.state.isUploading ? (
                      <></>
                    ) : (
                      <>
                        {btn1 || btn2 || btn3 ? (
                          <>
                            <span style={{ fontSize: "18px", color: "red" }}>
                              *กรุณากรอกฟิลด์ที่จำเป็นให้ครบถ้วน
                            </span>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </div>
                  <Button
                    size="lg"
                    block
                    color="info"
                    type="submit"
                    onClick={this.handleSubmit.bind(this)}
                    disabled={btn1 || btn2 || btn3}
                  >
                    <span
                      className="regular-th"
                      style={{ fontSize: "25px", fontWeight: "normal" }}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;ยื&nbsp;น&nbsp;ยั&nbsp;น&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  </Button>
                </div>
              </Row>
            </Form>
            <Modal
              isOpen={modal}
              toggle={() => this.toggleModal()}
              backdrop="static"
              keyboard={false}
            >
              <ModalHeader className="regular-th h-25 text-white">
                เพิ่มข้อมูลครุภัณฑ์
              </ModalHeader>

              <ModalBody
                style={{
                  width: "500px",
                  height: "300px",
                  textAlign: "center"
                }}
              >
                <br />
                <br />
                {this.state.isUploading ? (
                  <>
                    <br />
                    <Spinner
                      color="info"
                      style={{ width: "3rem", height: "3rem" }}
                    />
                    <br /> <br />
                    <p className="regular-th" style={{ fontSize: "20px" }}>
                      กำลังอัพโหลดข้อมูลเข้าสู่ระบบโปรดรอสักครู่...
                    </p>
                  </>
                ) : (
                  <>
                    <i
                      className="nc-icon nc-check-2"
                      style={{
                        color: "#28a745",
                        fontSize: "60px"
                      }}
                    ></i>
                    <br />
                    <br />
                    <p className="regular-th" style={{ fontSize: "20px" }}>
                      อัพโหลดข้อมูลสำเร็จ
                    </p>
                    <Button style={{ borderRadius: 10 }} color="info">
                      <span
                        className="regular-th"
                        style={{ fontSize: "22px", fontWeight: "normal" }}
                        onClick={() => window.location.reload()}
                      >
                        ยืนยัน
                      </span>
                    </Button>{" "}
                  </>
                )}
              </ModalBody>
            </Modal>
          </>
        ) : (
          <>
            <Row>
              <Col md="12" style={{ textAlign: "center" }}>
                <span className="mt-5">
                  <br />
                  <br />
                  <br />
                  <Spinner
                    animation="border"
                    variant="info"
                    style={{ width: "70px", height: "70px" }}
                  />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </span>
              </Col>
            </Row>
          </>
        )}
      </>
    );
  }
}

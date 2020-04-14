import React, { Component } from "react";
import Select from "react-select";
import DatePicker from "react-date-picker";
import axios from "axios";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { db, storage } from "../../api/firebase";
import { apiKey } from "../../api/google-map";
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

class ImovableForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readyToRender1: false,
      readyToRender2: false,
      fakeReload: false,

      depOptions: "",
      selectedDep: "",
      subDep: "", //go to filter

      selectedName: "",
      nameOptions: "",
      itemCodeSt: "",
      itemCodeNd: "",
      itemCodeTh: "",
      itemCode: "",
      newItemCode: "",
      oldListNo: "",

      markers: [
        {
          name: "Current position",
          position: { lat: 7.0486814, lng: 100.5712017 }
        }
      ],
      haveLocate: false,

      imagePreviewUrl: "",
      haveImg: false,

      status: "ใช้งานได้ดี",
      certificate: "",
      sellerName: "",
      address: "",
      rai: 0,
      ngan: 0,
      wah: 0,
      buildingType: "",
      material: "",
      floors: "",
      otherType: "",
      otherSize: "",

      derivedDate: "",
      derivedDateValue: "", //for show
      letterNo: "",
      price: 0,
      budgetOf: "",

      resDepartment: "",
      resSubDepartment: "",
      resName: "",

      note: "",

      btn1: true,
      btn2: true,
      btn3: true,
      isUploading: false,
      modal: false
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
    this._isMounted && this.getItemnameOptions();
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
        newItemCode: "",
        oldListNo: 0,
        itemCodeTh: "",
        imagePreviewUrl: "",
        haveImg: false,
        btn1: true,
        btn2: true,
        btn3: true,
        resDepartment: "",
        resSubDepartment: "",
        buildingType: null,
        material: null,
        derivedDate: "",
        derivedDateValue: "",
        typeSelected: "",
        subDepartment: "",
        itemCodeSt: "",
        itemCodeNd: "",
        letterNo: "",
        price: "",
        certificate: "",
        sellerName: "",
        rai: "",
        ngan: "",
        wah: "",
        floors: "",
        otherType: "",
        otherSize: "",
        note: "",
        address: "",
        haveLocate: false,
        resName: ""
      });

      this._newItemCode = "xxx-xx-xxxx";
      this._diableSubSelect = false;
      this._placeholderSubSelect = "เลือกหน่วยงานที่รับผิดชอบ...";
      this.currentPosition = { lat: 7.0486814, lng: 100.5712017 };

      this._isMounted && this.getDepOptions();
      this._isMounted && this.getSubDepOptions();
      this._isMounted && this.getItemnameOptions();

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

  getItemnameOptions() {
    db.collection("itemsCode")
      .where("type", "==", this.props.typeSelected.label)
      .get()
      .then(snapshot => {
        let nameOptions = [];
        snapshot.forEach(doc => {
          nameOptions.push(doc.data());
        });
        this._isMounted && this.setState({ nameOptions, readyToRender2: true });
      })
      .catch(error => console.log(error));
  }

  genItemCode() {
    //console.log(this.state.selectedName.value);
    if (this.state.selectedName) {
      db.collection("itemImovable")
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

          //console.log(allCode.length);

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

  /*------------------- map ---------------------*/
  onMarkerClick = (props, marker, e) => {
    const position = marker.getPosition();
    var lat = position.lat();
    var lng = position.lng();
    this.currentPosition = { lat: lat, lng: lng };
    this.setState({ haveLocate: true }
      //console.log(this.state.haveLocate)
    );

    //console.log(this.currentPosition);
  };

  onMouseoverMarker = (props, marker, e) => {
    const position = marker.getPosition();
    var lat = position.lat();
    var lng = position.lng();
    this.currentPosition = { lat: lat, lng: lng };

    //console.log(this.currentPosition);
  };

  onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState(prevState => {
      const markers = [...this.state.markers];
      markers[index] = { ...markers[index], position: { lat, lng } };
      return { markers };
    });
    this.setState({ haveLocate: true }
      //console.log(this.state.haveLocate)
    );
  };
  /*------------------- /map ---------------------*/

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

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ btn1: true, btn2: true, btn3: true, isUploading: true });
    this.toggleModal();

    let budgetOf = "";
    let buildingType = "";
    let material = "";
    let lat = "";
    let lng = "";
    this.state.budgetOf && (budgetOf = this.state.budgetOf.label);
    this.state.buildingType && (buildingType = this.state.buildingType.label);
    this.state.material && (material = this.state.material.label);
    if (this.state.haveLocate) {
      lat = this.currentPosition.lat;
      lng = this.currentPosition.lng;
    }

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
              const newLand = {
                status: "ใช้งานได้ดี", //สภาพพัสดุ
                itemType: this.props.typeSelected.label, //ประเภท
                department: this.state.selectedDep.label,
                subDepartment: this.state.subDepartment.label, //หน่วยงานต้นสังกัด
                itemName: this.state.selectedName.label, //ชื่อ
                itemCode: this.state.newItemCode,
                itemCodeSt: Number(this.state.itemCodeSt),
                itemCodeNd: Number(this.state.itemCodeNd),
                itemCodeTh: Number(this.state.itemCodeTh), //เลขรหัส
                derivedDate: this.state.derivedDate, //วันที่ได้มา
                letterNo: this.state.letterNo, //เลขที่หนังสืออนุมัติ/ลงวันที่
                price: Number(this.state.price), //ราคา
                budgetOf: budgetOf, //งบประมาณของ
                certificate: this.state.certificate, //เอกสารสิทธิ์
                sellerName: this.state.sellerName, //ชื่อผู้ขาย
                rai: Number(this.state.rai), //เนื้อที่
                ngan: Number(this.state.ngan),
                wah: Number(this.state.wah),
                buildingType: buildingType, //ประเภทโรงเรือน
                material: material, //วัสดุก่อสร้าง
                floors: Number(this.state.floors), //ชั้น
                otherType: this.state.otherType, //อื่นๆ .ชนิด
                otherSize: this.state.otherSize, //อื่นๆ .ขนาด
                note: this.state.note, //หมายเหตุ
                address: this.state.address, //ที่ตั้ง
                lat: lat,
                lng: lng,
                url: url
              };

              const landRes = {
                itemCode: this.state.newItemCode,
                seq: 0,
                date: this.state.derivedDate,
                resDepartment: this.state.resDepartment.label,
                resSubDepartment: this.state.resSubDepartment.label,
                resName: this.state.resName,
                note: ""
              };

              const landValue = {
                itemCode: this.state.newItemCode,
                seq: 0,
                date: this.state.derivedDate,
                percent: 0,
                balance: Number(this.state.price),
                note: "-- ราคาเริ่มต้น --"
              };

              //console.log(newLand)
              //console.log(landRes)
              //console.log(landValue)
              this.uploadData(newLand, landRes, landValue);
            })
            .catch(error => {
              console.log(error);
            });
        });
    } else {
      const newLand = {
        status: "ใช้งานได้ดี", //สภาพพัสดุ
        itemType: this.props.typeSelected.label, //ประเภท
        department: this.state.selectedDep.label,
        subDepartment: this.state.subDepartment.label, //หน่วยงานต้นสังกัด
        itemName: this.state.selectedName.label, //ชื่อ
        itemCode: this.state.newItemCode,
        itemCodeSt: Number(this.state.itemCodeSt),
        itemCodeNd: Number(this.state.itemCodeNd),
        itemCodeTh: Number(this.state.itemCodeTh), //เลขรหัส
        derivedDate: this.state.derivedDate, //วันที่ได้มา
        letterNo: this.state.letterNo, //เลขที่หนังสืออนุมัติ/ลงวันที่
        price: Number(this.state.price), //ราคา
        budgetOf: budgetOf, //งบประมาณของ
        certificate: this.state.certificate, //เอกสารสิทธิ์
        sellerName: this.state.sellerName, //ชื่อผู้ขาย
        rai: Number(this.state.rai), //เนื้อที่
        ngan: Number(this.state.ngan),
        wah: Number(this.state.wah),
        buildingType: buildingType, //ประเภทโรงเรือน
        material: material, //วัสดุก่อสร้าง
        floors: Number(this.state.floors), //ชั้น
        otherType: this.state.otherType, //อื่นๆ .ชนิด
        otherSize: this.state.otherSize, //อื่นๆ .ขนาด
        note: this.state.note, //หมายเหตุ
        address: this.state.address, //ที่ตั้ง
        lat: lat,
        lng: lng
      };

      const landRes = {
        itemCode: this.state.newItemCode,
        seq: 0,
        date: this.state.derivedDate,
        resDepartment: this.state.resDepartment.label,
        resSubDepartment: this.state.resSubDepartment.label,
        resName: this.state.resName,
        note: ""
      };

      const landValue = {
        itemCode: this.state.newItemCode,
        seq: 0,
        date: this.state.derivedDate,
        percent: "-",
        balance: Number(this.state.price),
        note: "-- ราคาเริ่มต้น --"
      };

      this.uploadData(newLand, landRes, landValue);
    }
  }

  uploadData(newLand, landRes, landValue) {
    db.collection("itemImovable")
      .add(newLand)
      .then(() => {
        //console.log("add item complete !! 1");
        db.collection("landRes")
          .add(landRes)
          .then(() => {
            //console.log("add landRes complete !! 2");
            db.collection("landValue")
              .add(landValue)
              .then(() => {
                //console.log("add landValue complete !! 3");
                this.setState({ isUploading: false });
              });
          });
      });
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const { readyToRender1, readyToRender2, fakeReload } = this.state;
    const { selectedDep, depOptions, subDepartment } = this.state;
    const { selectedName, nameOptions, newItemCode, oldListNo } = this.state;
    const { imagePreviewUrl } = this.state;
    const { buildingType, material } = this.state;
    const { derivedDateValue } = this.state;
    const { budgetOf } = this.state;
    const { resSubDepartment, resDepartment } = this.state;

    const { btn1, btn2, btn3, isUploading, modal } = this.state;

    const buildingOptions = [
      { value: "อาคารเดี่ยว", label: "อาคารเดี่ยว" },
      { value: "อาคารแถว", label: "อาคารแถว" }
    ];
    const materialOption = [
      { value: "ตึก", label: "ตึก" },
      { value: "ไม้", label: "ไม้" },
      { value: "ครึ่งตกครึ่งไม้", label: "ครึ่งตกครึ่งไม้" }
    ];
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
        {" "}
        {/* fakeReload */}
        {readyToRender1 && readyToRender2 ? (
          <>
            {" "}
            <Form id="form">
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
                    ข้อมูลเบื้องต้นของพัสดุครุภัณฑ์
                  </p>
                  <hr />
                  <Row>
                    <Col md="6" sm="12">
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

                    <Col md="6" sm="12">
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
                    <Col md="6" sm="12">
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
                          options={nameOptions}
                          placeholder="เลือกชื่อครุภัณฑ์..."
                          className="regular-th"
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6" sm="12">
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
                    <Col className="pr-1" md="6" sm="12">
                      <TextInput
                        label="เอกสารสิทธิ์ครุภัณฑ์"
                        name="certificate"
                        onChange={this.handleInputTextChange}
                      />
                    </Col>
                    <Col className="pr-1" md="6" sm="12">
                      <TextInput
                        label="ชื่อผู้รับจ้าง/ผู้ขาย/ผู้ให้"
                        name="sellerName"
                        onChange={this.handleInputTextChange}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              {/*map*/}
              <Card>
                <CardBody>
                  <Row>
                    <Col className="pr-1" md="12" sm="12">
                      <TextInput
                        label="ที่อยู่"
                        name="address"
                        onChange={this.handleInputTextChange}
                      />
                    </Col>
                  </Row>
                  <label style={{ fontSize: "25px", color: "black" }}>
                    ระบุตำแหน่งที่อยู่ของท่านบน Google Maps
                    <p style={{ fontSize: "20px" }}>
                      " โดยการเลื่อน
                      <span style={{ color: "#fd5559" }}>
                        <i className="nc-icon nc-pin-3"></i>หมุดสีแดง
                      </span>{" "}
                      ให้ใกล้เคียงกับตำแหน่งของครุภัณฑ์ "
                    </p>
                  </label>
                  <Map
                    google={this.props.google}
                    style={{
                      width: "96%",
                      height: "400px"
                    }}
                    zoom={15}
                    initialCenter={{ lat: 7.0486814, lng: 100.5712017 }}
                    onClick={this.handleMapClick}
                  >
                    {this.state.markers.map((marker, index) => (
                      <Marker
                        key={Math.random()}
                        position={marker.position}
                        draggable={true}
                        onDragend={(t, map, coord) =>
                          this.onMarkerDragEnd(coord, index)
                        }
                        name={marker.name}
                        onClick={this.onMarkerClick}
                        onMouseover={this.onMouseoverMarker}
                      />
                    ))}
                  </Map>
                  {this.state.haveLocate ? (
                    <>
                      {" "}
                      <Row style={{ marginTop: "410px" }}>
                        <Col md="6">
                          <div>
                            <p>
                              ตำแหน่ง : [{" "}
                              {this.currentPosition.lat +
                                " " +
                                this.currentPosition.lng}{" "}
                              ]
                            </p>
                          </div>
                        </Col>
                        <Col md="6" className="text-right">
                          <div className="pr-5 mb-3">
                            <Button
                              className="regular-th"
                              size="sm"
                              outline
                              color="danger"
                              onClick={() =>
                                this.setState({ haveLocate: false })
                              }
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
                        </Col>
                      </Row>
                    </>
                  ) : (
                    <>
                      <div style={{ marginTop: "410px" }}>
                        <p>ระบุตำแหน่ง</p>
                      </div>
                    </>
                  )}
                </CardBody>
              </Card>

              {/* image */}
              <Card>
                <CardBody>
                  <div>
                    {imagePreviewUrl ? (
                      <div style={{ width: "100%", textAlign: "center" }}>
                        <img src={imagePreviewUrl} alt="icon" width="200" />{" "}
                        <Button
                          className="regular-th"
                          size="sm"
                          outline
                          color="danger"
                          onClick={() => this.setState({ imagePreviewUrl: "", haveLocate: false })}
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
                        เนื้อที่
                      </p>
                      <hr />
                      <FormGroup>
                        <InputGroup>
                          <Input
                            type="number"
                            name="rai"
                            className="regular-th"
                            style={{ height: 40, fontSize: "22px" }}
                            onChange={this.handleInputTextChange}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText
                              style={{ height: 40, fontSize: "22px" }}
                            >
                              ไร่&nbsp;&nbsp;&nbsp;
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup>
                          <Input
                            type="number"
                            name="ngan"
                            className="regular-th"
                            style={{ height: 40, fontSize: "22px" }}
                            onChange={this.handleInputTextChange}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText
                              style={{ height: 40, fontSize: "22px" }}
                            >
                              งาน&nbsp;&nbsp;&nbsp;
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>

                        <InputGroup>
                          <Input
                            type="number"
                            name="wah"
                            className="regular-th"
                            style={{ height: 40, fontSize: "22px" }}
                            onChange={this.handleInputTextChange}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText
                              style={{ height: 40, fontSize: "22px" }}
                            >
                              ตารางวา&nbsp;&nbsp;&nbsp;
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </CardBody>
                  </Card>

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
                        ประเภทโรงเรือน
                      </p>
                      <hr />
                      <FormGroup>
                        <label style={{ fontSize: "23px", color: "black" }}>
                          <b>ประเภทโรงเรือน</b>
                        </label>
                        <Select
                          style={{ height: 40, fontSize: "22px" }}
                          value={buildingType}
                          onChange={buildingType => {
                            this.setState({ buildingType });
                          }}
                          options={buildingOptions}
                          placeholder="เลือกหน่วยงานที่รับผิดชอบ..."
                        />
                      </FormGroup>
                      <FormGroup>
                        <label style={{ fontSize: "23px", color: "black" }}>
                          <b>วัสดุที่ใช้ก่อสร้าง</b>
                        </label>
                        <Select
                          style={{ height: 40, fontSize: "22px" }}
                          value={material}
                          onChange={material => {
                            this.setState({ material });
                          }}
                          options={materialOption}
                          placeholder="เลือกหน่วยงานที่รับผิดชอบ..."
                        />
                      </FormGroup>
                      <FormGroup>
                        <label style={{ fontSize: "23px", color: "black" }}>
                          <b>จำนวนชั้น</b>
                        </label>
                        <InputGroup>
                          <Input
                            type="number"
                            name="floors"
                            className="regular-th"
                            style={{ height: 40, fontSize: "22px" }}
                            onChange={this.handleInputTextChange}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText
                              style={{ height: 40, fontSize: "22px" }}
                            >
                              ชั้น&nbsp;&nbsp;&nbsp;
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </CardBody>
                  </Card>

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
                        อื่น ๆ
                      </p>
                      <hr />
                      <TextInput
                        label="ลักษณะ/ชนิด"
                        name="otherType"
                        onChange={this.handleInputTextChange}
                      />
                      <TextInput
                        label="ขนาด"
                        name="otherSize"
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
                        ที่มาของครุภัณฑ์
                      </p>
                      <hr />
                      <FormGroup>
                        <label style={{ fontSize: "23px", color: "black" }}>
                          <b>วันที่ซื้อ/ได้มา</b>
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
                      <TextInput
                        label="เลขที่หนังสืออนุมัติ/ลงวันที่"
                        name="letterNo"
                        onChange={this.handleInputTextChange}
                      />
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
                        ผู้ดูแลและรับผิดชอบ
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
                    </CardBody>
                  </Card>
                </Col>
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
                    {isUploading ? (
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
            {" "}
            {/* readyToRender1 && readyToRender2 */}{" "}
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

export default GoogleApiWrapper({
  apiKey: apiKey
})(ImovableForm);

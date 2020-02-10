import React, { Component, Fragment } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { apiKey } from '../../../common/GmapAPIKey'
import { db, storage } from '../../../common/firebaseConfig'
import Select from 'react-select';
import { withRouter } from "react-router";


class LandForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            departments: [],
            Landtypes: [],

            departmentsOption1: "",
            departmentsOption2: "",
            itemNameOption: "",
            buildingType: "",
            materialType: "",
            itemCode: "",

            image: "",
            codeCheck: true,
            markers: [{
                name: "Current position",
                position: { lat: 7.0486814, lng: 100.5712017 }
            }],
            
        }

        this._isMounted = false

        this.currentPosition = { lat: 7.0486814, lng: 100.5712017 }

        this._check1 = false
        this._check2 = false
        this._check3 = false
        this._check4 = false

        this._imageURL = []
        this._refId = ""

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.loadScript() //for inputmask
        this._isMounted = true
        this._isMounted && this.getDepartmentData();
        this._isMounted && this.getItemTypeData();
    }

    loadScript() {
        const script = document.createElement('script')
        script.src = '/js/addform.js'
        script.async = true
        document.body.appendChild(script)
    }

    getDepartmentData() {
        db.collection('departments').orderBy('code').get().then(snapshot => {
            let departments = []
            snapshot.forEach(doc => {
                let data = doc.data()
                departments.push(data)
            })
            this._isMounted && this.setState({ departments: departments })
            //console.log("departments |" + this.state.departments)
        }).catch(error => console.log(error))
    }

    getItemTypeData() {
        db.collection('itemTypes').where('type', '==', this.props.type).get().then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }

            let itemTypes = []
            snapshot.forEach(doc => {
                let data = doc.data()
                itemTypes.push(data)
            })
            this._isMounted && this.setState({ Landtypes: itemTypes })
            //console.log("itemTypes |" + this.state.Landtypes)
        }).catch(error => console.log(error))
    }

    async onSubmit(e) {
        e.preventDefault();

        await db.collection('items').where('itemCode', '==', this.state.itemCode.concat(this.refs.itemCode.value))
            .get().then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents. can submit');
                    this.setState({ codeCheck: true }) //can submit
                    return;
                }

                snapshot.forEach(doc => {
                    let data = doc.data()
                    console.log(this.state.itemCode.concat(this.refs.itemCode.value) + "|" + data.itemCode + "can't submit")
                    this.setState({ codeCheck: false }) //can't submit
                })
            }).catch(error => console.log(error))

        const newLand = {
            "status": "ใช้งานได้ดี",                                               //สภาพพัสดุ
            "itemType": this.refs.itemType.value,                               //ประเภท         
            "Department": this.state.departmentsOption1.value,                           //หน่วยงานต้นสังกัด
            "itemName": this.state.itemNameOption.value,                             //ชื่อ
            "itemCode": this.state.itemCode.concat(this.refs.itemCode.value),                               //เลขรหัส
            "derivedDate": this.refs.derivedDate.value,                         //วันที่ได้มา
            "approvalDate": this.refs.approvalDate.value,                       //เลขที่หนังสืออนุมัติ/ลงวันที่
            "Price": this.refs.Price.value,                                     //ราคา
            "budgetOf": this.state.departmentsOption2.value,                               //งบประมาณของ
            "Certificate": this.refs.Certificate.value,                         //เอกสารสิทธิ์
            "sellerName": this.refs.sellerName.value,                           //ชื่อผู้ขาย
            "Rai": this.refs.Rai.value,                                         //เนื้อที่
            "Ngan": this.refs.Ngan.value,                                       //งาน
            "buildingType": this.state.buildingType.value,                      //ประเภทโรงเรือน
            "Material": this.state.materialType.value,                               //วัสดุก่อสร้าง
            "Floors": this.refs.Floors.value,                                   //ชั้น
            "otherType": this.refs.otherType.value,                             //อื่นๆ .ชนิด
            "otherSize": this.refs.otherSize.value,                             //อื่นๆ .ขนาด
            "Note": this.refs.Note.value,                                       //หมายเหตุ
            "address": this.refs.address.value,                                     //ที่ตั้ง
            "location": this.currentPosition

        }

        const landResponsibility = {
            "itemCode": this.state.itemCode.concat(this.refs.itemCode.value),
            "seq": 0,
            "Year": this.refs.derivedDate.value,
            "responsibilityDepartmentName": this.refs.responsibilityDepartmentName.value,
            "responsibilityDepartmentHead": this.refs.responsibilityDepartmentHead.value,
            "Note": ""
        }

        const landValue = {
            "itemCode": this.state.itemCode.concat(this.refs.itemCode.value),
            "seq": 0,
            "Year": this.refs.derivedDate.value,
            "Percent": "-",
            "Balance": this.refs.Price.value,
            "Note": "-- ราคาเริ่มต้น --"
        }

        /*const Disposal = {
            "itemCode": this.refs.itemCode.value,
            "itemName": this.refs.itemName.value,
            "itemType": this.refs.itemType.value, 
            "Department": this.refs.Department.value, 
            "disposalDate": "",                                                 //วันที่จำหน่าย
            "disposalMethod": "",                                               //วิธีจำหน่าย
            "disposalapprovalNo": "",                                           //เลขที่หนังสืออนุมัติ
            "disposalPrice": "",                                                //ราคาจำหน่าย
            "profitOrLost": "",                                                 //กำไร/ขาดทุน
            "Note": "",                                                         //หมายเหตุจการจำหน่าย
        }*/


        /*const landDepreciations = {
            "itemCode": this.refs.itemCode.value,
            "itemName": this.refs.itemName.value,
            "itemType": this.refs.itemType.value, 
            "Department": this.refs.Department.value, 
            "Year": "",
            "Percent": "",
            "Balance": "",
            "Note": ""
        }*/





        /*const landExploitation = {
            "itemCode": this.refs.itemCode.value,
            "itemName": this.refs.itemName.value,
            "itemType": this.refs.itemType.value, 
            "Department": this.refs.Department.value, 
            "Year": "",
            "List": "",
            "Benefits": "",
            "Note": ""
        }*/

        if (this.state.codeCheck) {
            this.uploadImg()
            this.addItem(newLand)
            this.addlandResponsibility(landResponsibility)
            this.addlandValue(landValue)
        }
        //this.addlandDepreciations(landDepreciations)
        //this.addlandExploitation(landExploitation)
        //this.addlandDisposal(Disposal)
    }

    addItem(newLand) {
        db.collection('items').add(newLand).then(() => {
            console.log("add item complete !!")
            this._check1 = true
            this.confirmAdd()
        })
    }

    addlandResponsibility(landResponsibility) {
        db.collection('itemResponsibility').add(landResponsibility).then(() => {
            console.log("add itemResponsibility complete !!")
            this._check2 = true
            this.confirmAdd()
        })
    }
    /*******************************************************/
    addlandValue(landValue) {
        db.collection('landValue').add(landValue).then(() => {
            console.log("add landValue complete !!")
            this._check3 = true
            this.confirmAdd()
        })
    }

    async uploadImg() {
        
        let imgCode = this.state.itemCode.concat(this.refs.itemCode.value)
        let seq = 1
        await this.createURLCollection(imgCode)

        if (this.state.image) {
            await this.state.image.forEach((image) => {
                const uploadTask = storage.ref(`images/${imgCode}/${imgCode}(${seq})`).put(image)
                uploadTask.on('state_changed',
                    (snapshot) => { /*progress function */ },
                    (error) => { console.log(error) },
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then(url => {
                            this._imageURL.push(url)
                            this.updateURLCollection(this._imageURL, imgCode)
                        })
                    })
                seq = seq + 1;
            })
        }
        this._check4 = true
        console.log("add image complete !!")
    }

    async createURLCollection(imgCode) {
        const newURL = {
            "url": []
        }
        await db.collection('itemURL').doc(imgCode).set(newURL).then(() => {
            console.log("create url collection complete !! |" + this._refId)
        })

    }

    async updateURLCollection(imageURL, imgCode) {
        console.log(this._refId)
        const updateURL = {
            "url": imageURL
        }
        await db.collection('itemURL').doc(imgCode).update(updateURL).then(() => {
            console.log("update url collection complete !!")
        })
    }

    confirmAdd() {
        if (this._check1 && this._check2 && this._check3 && this._check4) {
            this.props.history.push('/items')
            console.log("เพิ่มข้อมูลสำเร็จ")
        }
        else {
            //console.log("ผิดพลาด")
        }
    }

    handleChange = departmentsOption1 => {
        this.setState(
            { departmentsOption1 },
            //() => console.log(`Option selected:`, this.state.departmentsOption1.value)
        );
    };

    handleChange2 = departmentsOption2 => {
        this.setState(
            { departmentsOption2 },
            //() => console.log(`Option selected2:`, this.state.departmentsOption2.value)
        );
    };

    handleChangeCode = itemNameOption => {
        this.setState(
            { itemNameOption },
            () => {
                //console.log(`Option selected3:`, this.state.itemNameOption.code)
                this.setState({
                    itemCode: this.state.itemNameOption.code
                })
            }
        );
    };

    handleBuildingOptions = buildingType => {
        this.setState(
            { buildingType },
            //() => console.log(`Option selected2:`, this.state.buildingType.value)
        );
    }

    handleMaterialOptions = materialType => {
        this.setState(
            { materialType },
            //() => console.log(`Option selected2:`, this.state.materialType.value)
        );
    }

    handleImgChange = e => {
        if (e.target.files[0]) {
            const image = Array.from(e.target.files)
            this.setState({ image })
        }
    }

    onMarkerClick = (props, marker, e) => {
        const position = marker.getPosition();
        var lat = position.lat()
        var lng = position.lng()
        this.currentPosition = { lat: lat, lng: lng }

        console.log(this.currentPosition)
    }

    onMouseoverMarker = (props, marker, e) => {
        const position = marker.getPosition();
        var lat = position.lat()
        var lng = position.lng()
        this.currentPosition = { lat: lat, lng: lng }

        //console.log(this.currentPosition)
    }

    onMarkerDragEnd = (coord, index) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.setState(prevState => {
            const markers = [...this.state.markers];
            markers[index] = { ...markers[index], position: { lat, lng } };
            return { markers };
        });
    };

    componentWillUnmount() {  //cancel subscriptions and asynchronous tasks
        this._isMounted = false;
    }

    render() {
        const { departmentsOption1, departmentsOption2, itemNameOption, buildingType, materialType } = this.state;
        const buildingOptions = [
            { value: 'อาคารเดี่ยว', label: 'อาคารเดี่ยว' },
            { value: 'อาคารแถว', label: 'อาคารแถว' },
        ]
        const materialOption = [
            { value: 'ตึก', label: 'ตึก' },
            { value: 'ไม้', label: 'ไม้' },
            { value: 'ครึ่งตกครึ่งไม้', label: 'ครึ่งตกครึ่งไม้' },
        ]

        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>

                    <input
                        type="hidden"
                        name="itemType"
                        ref="itemType"
                        value={this.props.type}
                    />

                    <div className="box box-success">
                        <div className="box-header">
                            <h1 className="box-title title" style={{ fontSize: 30, marginTop: 10 }}><b>ข้อมูลเบื้องต้นของที่ดิน</b></h1>
                        </div>
                        {/* /.box-header */}
                        <div className="box-body">
                            <div className="row">

                                <div className="col-md-6">
                                    <div style={{ marginBottom: '21px' }}>
                                        <div className="form-group">
                                            <label>หน่วยงานที่รับผิดชอบ</label>
                                            <Fragment>
                                                <Select
                                                    options={this.state.departments}
                                                    value={departmentsOption1}
                                                    onChange={this.handleChange}
                                                    placeholder="--- โปรดเลือกหน่วยงานที่รับผิดชอบ ---"
                                                />
                                                <input
                                                    tabIndex={-1}
                                                    autoComplete="off"
                                                    style={{ opacity: 0, height: 0 }}
                                                    value={departmentsOption1}
                                                    required
                                                />
                                            </Fragment>
                                        </div>
                                    </div>


                                    <div style={{ marginBottom: '21px' }}>
                                        <div className="form-group">
                                            <label>ชื่อพัสดุ</label>
                                            <Fragment>
                                                <Select                                                   
                                                    options={this.state.Landtypes}
                                                    value={itemNameOption}
                                                    onChange={this.handleChangeCode}
                                                    placeholder="--- โปรดเลือกรายการพัสดุครุภัณฑ์ ---"
                                                />
                                                <input
                                                    tabIndex={-1}
                                                    autoComplete="off"
                                                    style={{ opacity: 0, height: 0 }}
                                                    value={itemNameOption}
                                                    required
                                                />
                                            </Fragment>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>เลขรหัสพัสดุ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-hashtag" />
                                            </div>
                                            <div className="input-group-addon" style={{ fontSize: 30 }}>
                                                {this.state.itemCode}
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 30, zIndex: 0, height: 46 }}
                                                data-inputmask="'mask': ['-99-9999']"
                                                data-mask
                                                required
                                                name="itemCode" /*****/
                                                ref="itemCode"  /*****/
                                            />
                                        </div>
                                    </div>

                                    {!this.state.codeCheck &&
                                        <div style={{ marginTop: 10 }} className="callout callout-warning">
                                            <p style={{ fontSize: 17 }}>เลขรหัสพัสดุมีอยู่ในระบบแล้ว</p>
                                        </div>
                                    }

                                </div>
                                {/* /col-md-6 */}

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>เอกสารสิทธิ์พัสดุ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-certificate" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20, zIndex: 0 }}
                                                name="Certificate" /*****/
                                                ref="Certificate"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ marginTop: 60 }}>
                                        <label>ชื่อผู้รับจ้าง/ผู้ขาย/ผู้ให้</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-user" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20, zIndex: 0 }}
                                                name="sellerName" /*****/
                                                ref="sellerName"  /*****/
                                            />
                                        </div>
                                    </div>

                                </div>
                                {/* /col-md-6 */}
                            </div>
                            {/* /.row */}
                        </div>
                        {/* /.box-body */}
                    </div>
                    {/* /.box box-default */}

                    {/* Google Map */}
                    <div className="box box-success">
                        <div className="box-header">
                            <h1 className="box-title title" style={{ fontSize: 30, marginTop: 10 }}><b>ระบุตำแหน่งของที่ดิน</b></h1>
                        </div>

                        <div className="box-body">
                            <div className="form-group">
                                <label>ที่ตั้งพัสดุ</label>
                                <div className="input-group">
                                    <div className="input-group-addon">
                                        <i className="fa fa-area-chart" />
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={{ fontSize: 20, zIndex: 0 }}
                                        name="address" /*****/
                                        ref="address"  /*****/
                                    />
                                </div>
                            </div>

                            <div className="box-body" style={{ height: `550px` }} >
                                <Map
                                    google={this.props.google}
                                    style={{
                                        width: "96%",
                                        height: "500px",
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
                                            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
                                            name={marker.name}

                                            onClick={this.onMarkerClick}
                                            onMouseover={this.onMouseoverMarker}
                                        />
                                    ))}
                                </Map >

                                <div style={{ marginTop: "510px" }}>
                                    <p >ตำแหน่ง : [ {this.currentPosition.lat + " " + this.currentPosition.lng} ]</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="box box-success">
                        <div className="box-header">
                            <h1 className="box-title title" style={{ fontSize: 30, marginTop: 10 }}><b>อัพโหลดรูปภาพ</b></h1>
                        </div>
                        <div className="box-body" onChange={this.handleImgChange}>
                            <input id="file" type="file" accept="image/*" multiple />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="box box-danger">
                                <div className="box-header">
                                    <h1 className="box-title title" style={{ fontSize: 30, marginTop: 10 }}><b>เนื้อที่</b></h1>
                                </div>
                                <div className="box-body">

                                    <div className="form-group">
                                        <label>เนื้อที่</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-arrows-alt" />
                                            </div>
                                            <input
                                                type="number"
                                                placeholder="ไร่"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="Rai" /*****/
                                                ref="Rai"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>งาน</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-arrows-alt" />
                                            </div>
                                            <input
                                                type="number"
                                                placeholder="ตารางวา"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="Ngan" /*****/
                                                ref="Ngan"  /*****/
                                            />
                                        </div>
                                    </div>


                                </div>
                                {/* /.box-body */}

                                <div className="box-header">
                                    <h1 className="box-title title" style={{ fontSize: 30, marginTop: 10 }}><b>โรงเรือน</b></h1>
                                </div>
                                <div className="box-body">
                                    <div className="form-group">
                                        <label>ประเภทโรงเรือน</label>
                                        <Fragment>
                                            <Select
                                                options={buildingOptions}
                                                value={buildingType}
                                                onChange={this.handleBuildingOptions}
                                                placeholder="--- โปรดเลือกประเภทโรงเรือน ---"
                                            />
                                            <input
                                                tabIndex={-1}
                                                autoComplete="off"
                                                style={{ opacity: 0, height: 0 }}
                                                value={buildingType}
                                                readOnly
                                                required
                                            />
                                        </Fragment>

                                    </div>
                                    <div className="form-group">
                                        <label>วัสดุที่ใช้ก่อสร้าง</label>
                                        <Fragment>
                                            <Select
                                                options={materialOption}
                                                value={materialType}
                                                onChange={this.handleMaterialOptions}
                                                placeholder="--- โปรดเลือกประเภทวัสดุที่ใช้ก่อสร้าง ---"
                                            />
                                            <input
                                                tabIndex={-1}
                                                autoComplete="off"
                                                style={{ opacity: 0, height: 0 }}
                                                value={materialType}
                                                readOnly
                                                required
                                            />
                                        </Fragment>
                                    </div>
                                    <div className="form-group">
                                        <label>จำนวนชั้น</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-align-justify" />
                                            </div>
                                            <input
                                                type="number"
                                                className="form-control"
                                                style={{ fontSize: 20, zIndex: 0 }}
                                                name="Floors" /*****/
                                                ref="Floors"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="box-header">
                                    <h1 className="box-title title" style={{ fontSize: 30, marginTop: 10 }}><b>อื่น ๆ</b></h1>
                                </div>
                                <div className="box-body">

                                    <div className="form-group">
                                        <label>ลักษณะ/ชนิด</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-align-justify" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20, zIndex: 0 }}
                                                name="otherType" /*****/
                                                ref="otherType"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>ขนาด</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-align-justify" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="otherSize" /*****/
                                                ref="otherSize"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /.box */}
                        </div>
                        {/* /.col (left) */}


                        <div className="col-md-6">

                            <div className="box box-danger">
                                <div className="box-header">
                                    <h3 className="box-title" style={{ fontSize: 30, marginTop: 10 }}><b>ที่มาของที่ดิน</b></h3>
                                </div>
                                <div className="box-body">

                                    <div className="form-group">
                                        <label>ซื้อ/จ้าง/ได้มา เมื่อวันที่</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-calendar" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control datepicker"
                                                id="inputdatepicker"
                                                data-date-format="dd/mm/yyyy"
                                                placeholder="วัน/เดือน/ปี"
                                                style={{ fontSize: 20 }}
                                                name="derivedDate" /*****/
                                                ref="derivedDate"  /*****/
                                            />
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label>เลขที่หนังสืออนุมัติ/ลงวันที่</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-book" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="approvalDate" /*****/
                                                ref="approvalDate"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>ราคา</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-money" />
                                            </div>
                                            <input
                                                type="number"
                                                placeholder="บาท"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="Price" /*****/
                                                ref="Price"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>งบประมาณของ</label>
                                        <Fragment>
                                            <Select
                                                required
                                                options={this.state.departments}
                                                value={departmentsOption2}
                                                onChange={this.handleChange2}
                                                placeholder="--- โปรดเลือกหน่วยงานที่รับผิดชอบ ---"
                                            />
                                            <input
                                                tabIndex={-1}
                                                autoComplete="off"
                                                style={{ opacity: 0, height: 0 }}
                                                value={departmentsOption2}
                                                readOnly
                                                required
                                            />
                                        </Fragment>
                                    </div>
                                </div>
                            </div>

                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title" style={{ fontSize: 30, marginTop: 10 }}><b>ผู้ดูแลรับผิดชอบ</b></h3>
                                </div>
                                <div className="box-body">
                                    <div className="form-group">
                                        <label>ชื่อส่วนราชการ (สำนัก, กอง, ฝ่าย)</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-home" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20, zIndex: 0 }}
                                                name="responsibilityDepartmentName" /*****/
                                                ref="responsibilityDepartmentName"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>ชื่อหัวหน้าส่วนราชการ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-address-card" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20, zIndex: 0 }}
                                                name="responsibilityDepartmentHead" /*****/
                                                ref="responsibilityDepartmentHead"  /*****/
                                            />
                                        </div>
                                    </div>

                                </div>
                                {/* /.box-body */}
                            </div>
                            {/* /.box */}


                        </div>
                        {/* /.col (right) */}
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="box box-default">
                                <div className="box-body">
                                    <div className="form-group">
                                        <label>หมายเหตุเพิ่มเติม(ของพัสดุชิ้นนี้)</label>

                                        <textarea
                                            component="textarea"
                                            className="form-control"
                                            rows="3"
                                            style={{ fontSize: 20 }}
                                            placeholder="หมายเหตุ ..."
                                            name="Note" /*****/
                                            ref="Note"  /*****/
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-block btn-info title" type="submit" style={{ fontSize: 25 }}>
                        บันทึก
                    </button>

                    {!this.state.codeCheck &&
                        <div style={{ backgroundColor: "#ffc107", paddingTop: 0.1, paddingBottom: 0.1, marginTop: 5 }}>
                            <h4 style={{ color: 'white', fontSize: 17 }}>&nbsp;&nbsp;
                                <i className="icon fa fa-alert"></i>
                                &nbsp;เกิดข้อผิดพลาด กรุณาทำตามคำแนะนำที่ปรากฎข้างต้น
                                </h4>
                        </div>
                    }

                </form>
            </div >
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (apiKey)
})(withRouter(LandForm))


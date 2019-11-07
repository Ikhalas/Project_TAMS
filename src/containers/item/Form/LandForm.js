import React, { Component } from 'react'
import axios from 'axios';
import Select from 'react-select';
import { withRouter } from "react-router";

class LandForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Departments: [],
            Landtypes: [],
            departmentsOption1: null,
            departmentsOption2: null,
            itemNameOption: null,
            buildingType: null,
            materialType: null,
            itemCode: '',
            check_1: false,
            check_2: false,
            check_3: false
        }
    }

    componentDidMount() {
        const script = document.createElement('script')
        script.src = '/js/addform.js'
        script.async = true
        document.body.appendChild(script)

        axios.get('http://localhost:3001/Department').then(
            res => {
                //console.log(res)
                this.setState({ Departments: res.data })
            }).catch(err => console.log(err))

        //console.log(this.props.type)   
        axios.get('http://localhost:3001/itemType?type=' + this.props.type).then(
            res => {
                //console.log(res.data)
                this.setState({ Landtypes: res.data })
            }).catch(err => console.log(err))

    }


    onSubmit = (e) => {
        //console.log(this.refs.name.value)
        const newLand = {
            "status": "ใช้งานได้ดี",                                               //สภาพพัสดุ
            "itemType": this.refs.itemType.value,                               //ประเภท         
            "Department": this.state.departmentsOption1.value,                           //หน่วยงานต้นสังกัด
            "itemName": this.state.itemNameOption.value,                             //ชื่อ
            "itemCode": this.state.itemCode.concat(this.refs.itemCode.value),                               //เลขรหัส
            "Location": this.refs.Location.value,                               //ที่ตั้ง
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
            "thumbnail": ""                                                     //รูป
        }

        const landResponsibility = {
            "itemCode": this.state.itemCode.concat(this.refs.itemCode.value),
            "seq": 0,
            "Year": this.refs.derivedDate.value,
            "responsibilityDepartmentName": this.refs.responsibilityDepartmentName.value,
            "responsibilityDepartmentHead": this.refs.responsibilityDepartmentHead.value,
            "Note": ""
        }

        const landValueIncreases4Years = {
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

        this.addItem(newLand)
        this.addlandResponsibility(landResponsibility)
        this.addlandValueIncreases4Years(landValueIncreases4Years)
        //this.addlandDepreciations(landDepreciations)
        //this.addlandExploitation(landExploitation)
        //this.addlandDisposal(Disposal)

        e.preventDefault();
    }



    /*******************************************************/
    addItem(newLand) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Items',
            data: newLand
        }).then(res => {
            this.setState({ check_1: true })
        }).catch(err => console.log(err));
    }

    /*******************************************************/
    addlandResponsibility(landResponsibility) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Responsibility',
            data: landResponsibility
        }).then(res => {
            this.setState({ check_2: true })
        }).catch(err => console.log(err));
    }
    /*******************************************************/
    addlandValueIncreases4Years(landValueIncreases4Years) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/landValueIncreases4Years',
            data: landValueIncreases4Years
        }).then(res => {
            this.setState({check_3:true}) 
            this.confirmAdd()  
        }).catch(err => console.log(err));
    }

    /*addlandDisposal(Disposal) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Disposal',
            data: Disposal
        }).then(res => {
            this.setState({check_3:true})
            this.confirmAdd()
        }).catch(err => console.log(err));
    }*/

    /*******************************************************/

    /*addlandDepreciations(landDepreciations) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Depreciations',
            data: landDepreciations
        }).then(res => {
            this.setState({check_2:true})
            this.confirmAdd()
        }).catch(err => console.log(err));
    }*/

    /*******************************************************/

    

    /*******************************************************/

    /*addlandExploitation(landExploitation) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Exploitation',
            data: landExploitation
        }).then(res => {
            this.setState({check_5:true})
            this.confirmAdd()
        }).catch(err => console.log(err));
    }*/

    /*******************************************************/

    confirmAdd() {
        if (this.state.check_1 && this.state.check_2 && this.state.check_3) {
            this.props.history.push('/items')
            alert("เพิ่มข้อมูลสำเร็จ")
        }
        else {
            alert("ผิดพลาด")
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
            () => console.log(`Option selected2:`, this.state.materialType.value)
        );
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
                        name="itemType" /******/
                        ref="itemType"  /******/
                        value={this.props.type}
                    />

                    <div className="box box-success">
                        <div className="box-header">
                            <h1 className="box-title title" style={{ fontSize: 30, marginTop: 10 }}><b>ข้อมูลเบื่องต้นของที่ดิน</b></h1>
                        </div>
                        {/* /.box-header */}
                        <div className="box-body">
                            <div className="row">

                                <div className="col-md-6">
                                    <div style={{ marginBottom: '21px' }}>
                                        <div className="form-group">
                                            <label>หน่วยงานที่รับผิดชอบ</label>
                                            <Select
                                                required
                                                options={this.state.Departments}
                                                value={departmentsOption1}
                                                onChange={this.handleChange}
                                                placeholder="--- โปรดเลือกหน่วยงานที่รับผิดชอบ ---"
                                            />
                                        </div>
                                    </div>


                                    <div style={{ marginBottom: '21px' }}>
                                        <div className="form-group">
                                            <label>ชื่อพัสดุ</label>
                                            <Select
                                                required
                                                options={this.state.Landtypes}
                                                value={itemNameOption}
                                                onChange={this.handleChangeCode}
                                                placeholder="--- โปรดเลือกรายการพัสดุครุภัณฑ์ ---"
                                            />
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
                                </div>
                                {/* /col-md-6 */}

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>ที่ตั้งพัสดุ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-compass" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20, zIndex: 0 }}
                                                name="Location" /*****/
                                                ref="Location"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ marginTop: 30 }}>
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

                                    <div className="form-group" style={{ marginTop: 30 }}>
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
                                        <Select
                                            options={buildingOptions}
                                            value={buildingType}
                                            onChange={this.handleBuildingOptions}
                                            placeholder="--- โปรดเลือกประเภทโรงเรือน ---"
                                        />
                              
                                    </div>
                                    <div className="form-group">
                                        <label>วัสดุที่ใช้ก่อสร้าง</label>
                                        <Select
                                            options={materialOption}
                                            value={materialType}
                                            onChange={this.handleMaterialOptions}
                                            placeholder="--- โปรดเลือกประเภทวัสดุที่ใช้ก่อสร้าง ---"
                                        />
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
                                        <Select
                                            required
                                            options={this.state.Departments}
                                            value={departmentsOption2}
                                            onChange={this.handleChange2}
                                            placeholder="--- โปรดเลือกหน่วยงานที่รับผิดชอบ ---"
                                        />
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

                </form>

            </div >
        )
    }
}

export default withRouter(LandForm)


import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from "react-router";

class LandForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Departments: [],
            types:[],
            Itemtypes: [],
            Landtypes: [],
            check_1: false,
            check_2: false,
            check_3: false,
            check_4: false,
            check_5: false,
            check_6: false,
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


        axios.get('http://localhost:3001/itemType?type='+ this.props.type).then(
            res => {
                this.setState({ Landtypes: res.data })
            }).catch(err => console.log(err))

    }

    generateDepartmentOption() {
        return (
            this.state.Departments.map(Department => (
                <option key={Department.id}>{Department.name}</option>
            ))
        )
    }

    generateLandtypeOption() {
        return (
            this.state.Landtypes.map(Landtype => (
                <option key={Landtype.id}>{Landtype.name}</option>
            ))
        )
    }


    onSubmit = (e) => {
        //console.log(this.refs.name.value)
        const newLand = {
            "status": "ใช้งานได้ดี",                                               //สภาพพัสดุ
            "itemType": this.refs.itemType.value,                               //ประเภท         
            "Department": this.refs.Department.value,                           //หน่วยงานต้นสังกัด
            "itemName": this.refs.itemName.value,                               //ชื่อ
            "itemCode": this.refs.itemCode.value,                               //เลขรหัส
            "Location": this.refs.Location.value,                               //ที่ตั้ง
            "derivedDate": this.refs.derivedDate.value,                         //วันที่ได้มา
            "approvalDate": this.refs.approvalDate.value,                       //เลขที่หนังสืออนุมัติ/ลงวันที่
            "Price": this.refs.Price.value,                                     //ราคา
            "budgetOf": this.refs.budgetOf.value,                               //งบประมาณของ
            "Certificate": this.refs.Certificate.value,                         //เอกสารสิทธิ์
            "sellerName": this.refs.sellerName.value,                           //ชื่อผู้ขาย
            "Rai": this.refs.Rai.value,                                         //เนื้อที่
            "Ngan": this.refs.Ngan.value,                                       //งาน
            "buildingType": this.refs.buildingType.value,                       //ประเภทโรงเรือน
            "Material": this.refs.Material.value,                               //วัสดุก่อสร้าง
            "Floors": this.refs.Floors.value,                                   //ชั้น
            "otherType": this.refs.otherType.value,                             //อื่นๆ .ชนิด
            "otherSize": this.refs.otherSize.value,                             //อื่นๆ .ขนาด
            "Note": this.refs.Note.value,                                       //หมายเหตุ
            "thumbnail": ""                                                     //รูป
        }

        const Disposal = {
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
        }


        const landDepreciations = {
            "itemCode": this.refs.itemCode.value,
            "itemName": this.refs.itemName.value,
            "itemType": this.refs.itemType.value, 
            "Department": this.refs.Department.value, 
            "Year": "",
            "Percent": "",
            "Balance": "",
            "Note": ""
        }

        const landValueIncreases4Years = {
            "itemCode": this.refs.itemCode.value,
            "itemName": this.refs.itemName.value,
            "itemType": this.refs.itemType.value, 
            "Department": this.refs.Department.value, 
            "Year": "",
            "Percent": "",
            "Balance": "",
            "Note": ""
        }

        const landResponsibility = {
            "itemCode": this.refs.itemCode.value,
            "itemName": this.refs.itemName.value,
            "itemType": this.refs.itemType.value, 
            "Department": this.refs.Department.value, 
            "Year": this.refs.Year.value,
            "responsibilityDepartmentName": this.refs.responsibilityDepartmentName.value,
            "responsibilityDepartmentHead": this.refs.responsibilityDepartmentHead.value,
            "Note": ""
        }

        const landExploitation = {
            "itemCode": this.refs.itemCode.value,
            "itemName": this.refs.itemName.value,
            "itemType": this.refs.itemType.value, 
            "Department": this.refs.Department.value, 
            "Year": "",
            "List": "",
            "Benefits": "",
            "Note": ""
        }

        this.addItem(newLand)
        this.addlandDepreciations(landDepreciations)
        this.addlandValueIncreases4Years(landValueIncreases4Years)
        this.addlandResponsibility(landResponsibility)
        this.addlandExploitation(landExploitation)
        this.addlandDisposal(Disposal)

        e.preventDefault();
    }

    

    /*******************************************************/
    addItem(newLand) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Items',
            data: newLand
        }).then(res => {
            this.setState({check_1:true})
            this.confirmAdd()
        }).catch(err => console.log(err));
    }

    /*******************************************************/
    addlandDepreciations(landDepreciations) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Depreciations',
            data: landDepreciations
        }).then(res => {
            this.setState({check_2:true})
            this.confirmAdd()
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

    /*******************************************************/
    addlandResponsibility(landResponsibility) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Responsibility',
            data: landResponsibility
        }).then(res => {
            this.setState({check_4:true})
            this.confirmAdd()
        }).catch(err => console.log(err));
    }

    /*******************************************************/
    addlandExploitation(landExploitation) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Exploitation',
            data: landExploitation
        }).then(res => {
            this.setState({check_5:true})
            this.confirmAdd()
        }).catch(err => console.log(err));
    }
    /*******************************************************/
    addlandDisposal(Disposal) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Disposal',
            data: Disposal
        }).then(res => {
            this.setState({check_6:true})
            this.confirmAdd()
        }).catch(err => console.log(err));
    }

    confirmAdd(){
        if(this.state.check_1 && this.state.check_2 && this.state.check_3 && this.state.check_4 && this.state.check_5 && this.state.check_6){
            this.props.history.push('/items')
            alert("เพิ่มข้อมูลสำเร็จ")
        }
    }



    render() {

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
                        {/* /.box-header */}
                        <div className="box-body">
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>หน่วยงานที่รับผิดชอบ</label>
                                        <select
                                            className="form-control select2"
                                            style={{ width: '100%' }}
                                            required
                                            name="Department" /******/
                                            ref="Department" /******/
                                        >
                                            <option disabled selected="selected" value="" >-- โปรดเลือกหน่วยงานที่รับผิดชอบ --</option>
                                            {this.generateDepartmentOption()}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
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
                                </div>

                            </div>
                            {/* /.row */}
                            {/* /------------------------------------------------------------------------------------------------------ */}
                            <div className="row">



                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>ชื่อพัสดุ</label>
                                        <select
                                            className="form-control select2"
                                            style={{ width: '100%' }}
                                            required
                                            name="itemName" /******/
                                            ref="itemName" /******/
                                        >
                                            <option disabled selected="selected" value="" >-- โปรดเลือกรายการพัสดุครุภัณฑ์ --</option>
                                            {this.generateLandtypeOption()}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
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
                                </div>



                            </div>
                            {/* /------------------------------------------------------------------------------------------------------ */}
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>เลขรหัสพัสดุ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-hashtag" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                data-inputmask="'mask': ['999-99-9999']"
                                                data-mask
                                                required
                                                name="itemCode" /*****/
                                                ref="itemCode"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>งบประมาณของ</label>
                                        <select
                                            className="form-control select2"
                                            style={{ width: '100%' }}
                                            name="budgetOf" /******/
                                            ref="budgetOf" /******/
                                        >
                                            <option disabled selected="selected" value="ยังไม่ได้เลือก" >-- โปรดเลือกหน่วยงานที่รับผิดชอบ --</option>
                                            {this.generateDepartmentOption()}
                                        </select>
                                    </div>
                                </div>






                            </div>
                            {/* /------------------------------------------------------------------------------------------------------ */}
                            <div className="row">

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
                                                style={{ fontSize: 20 }}
                                                name="Location" /*****/
                                                ref="Location"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>


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
                                                style={{ fontSize: 20 }}
                                                name="Certificate" /*****/
                                                ref="Certificate"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>



                            </div>
                            {/* /------------------------------------------------------------------------------------------------------ */}
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>ซื้อ/จ้าง/ได้มา เมื่อวันที่</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-calendar" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                data-inputmask="'alias': 'dd/mm/yyyy'"
                                                data-mask
                                                name="derivedDate" /*****/
                                                ref="derivedDate"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>




                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>ชื่อผู้รับจ้าง/ผู้ขาย/ผู้ให้</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-user" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="sellerName" /*****/
                                                ref="sellerName"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /------------------------------------------------------------------------------------------------------ */}
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
                                        <select
                                            className="form-control select2"
                                            style={{ width: '100%' }}
                                            name="buildingType" /******/
                                            ref="buildingType" /******/
                                        >
                                            <option disabled selected="selected" value="" >-- โปรดเลือกประเภทโรงเรือน --</option>
                                            <option>อาคารเดี่ยว</option>
                                            <option>อาคารแถว</option>

                                        </select>
                                        <br />
                                    </div>
                                    <div className="form-group">
                                        <label>วัสดุที่ใช้ก่อสร้าง</label>
                                        <select
                                            className="form-control select2"
                                            style={{ width: '100%' }}
                                            name="Material" /******/
                                            ref="Material" /******/
                                        >
                                            <option disabled selected="selected" value="" >-- โปรดเลือกวัสดุที่ใช้ก่อสร้าง --</option>
                                            <option>ตึก</option>
                                            <option>ไม้</option>
                                            <option>ครึ่งตึกครึ่งไม้</option>

                                        </select>
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
                                                style={{ fontSize: 20 }}
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
                                                style={{ fontSize: 20 }}
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
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title" style={{ fontSize: 30, marginTop: 10 }}><b>การเปลี่ยนแปลงส่วนราชการและผู้ดูแลรับผิดชอบ</b></h3>
                                </div>
                                <div className="box-body">

                                    <div className="form-group">
                                        <label>พ.ศ.</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-calendar" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="Year" /*****/
                                                ref="Year"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>ชื่อส่วนราชการ (สำนัก, กอง, ฝ่าย)</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-home" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
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
                                                style={{ fontSize: 20 }}
                                                name="responsibilityDepartmentHead" /*****/
                                                ref="responsibilityDepartmentHead"  /*****/
                                            />
                                        </div>
                                    </div>

                                </div>
                                {/* /.box-body */}
                            </div>
                            {/* /.box */}

                            <div className="box box-default">
                                <div className="box-body">
                                    <div className="form-group">
                                        <label>หมายเหตุเพิ่มเติม</label>

                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            style={{ fontSize: 20 }}
                                            placeholder="หมายเหตุ ..."
                                            name="Note" /*****/
                                            ref="Note"  /*****/
                                        >
                                        </textarea>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /.col (right) */}
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


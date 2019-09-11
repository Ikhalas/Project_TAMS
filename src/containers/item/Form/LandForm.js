import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { DEPARTMENT, ITEMTYPE, ITEMS } from '../../../common/APIutl'


class LandForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Departments: [],
            Itemtypes: [],
            Landtypes: []
          
        }

      

    }

    componentDidMount() {
        const script = document.createElement('script')
        script.src = '/js/addform.js'
        script.async = true
        document.body.appendChild(script)

        axios.get(DEPARTMENT).then(
            res => {
                //console.log(res)
                this.setState({ Departments: res.data })
            }
        )
            .catch(err => console.log(err))

        axios.get(ITEMTYPE).then(
            res => {
                //console.log(res)
                this.setState({ Itemtypes: res.data })
            }
        )
            .catch(err => console.log(err))

        axios.get(ITEMTYPE + "?type=ที่ดิน").then(
            res => {
                //console.log(res)
                this.setState({ Landtypes: res.data })
            }
        )
            .catch(err => console.log(err))


    }

    generateDepartmentOption() {
        return (
            this.state.Departments.map(Department => (
                <option key={Department.id}>{Department.name}</option>
            ))
        )
    }

    generateItemtypeOption() {
        return (
            this.state.Itemtypes.map(Itemtype => (
                <option key={Itemtype.id}>{Itemtype.name}</option>
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
            itemType: this.refs.itemType.value,
            Department: this.refs.Department.value,
            itemName: this.refs.itemName.value,
            itemCode: this.refs.itemCode.value,
            Location: this.refs.Location.value,
            derivedDate: this.refs.derivedDate.value,
            approvalDate: this.refs.approvalDate.value,
            Price: this.refs.Price.value,
            budgetOf: this.refs.budgetOf.value,
            Certificate: this.refs.Certificate.value,
            sellerName: this.refs.sellerName.value,
            Rai: this.refs.Rai.value,
            Ngan: this.refs.Ngan.value,
            buildingType: this.refs.buildingType.value,
            Material: this.refs.Material.value,
            Floors: this.refs.Floors.value,
            otherType: this.refs.otherType.value,
            otherSize: this.refs.otherSize.value,
            Note: this.refs.Note.value,
            disposalDate: this.refs.disposalDate.value,
            disposalMethod: this.refs.disposalMethod.value,
            disposalapprovalNo: this.refs.disposalapprovalNo.value,
            disposalPrice: this.refs.disposalPrice.value,
            profitOrLost: this.refs.profitOrLost.value,

        }
        const Responsibility = {
            responsibilityYear: this.refs.responsibilityYear.value,
            responsibilityDepartmentName: this.refs.responsibilityDepartmentName.value,
            responsibilityDepartmentHead: this.refs.responsibilityDepartmentHead.value
        }
        console.log(Responsibility)
        this.addItem(newLand)
        e.preventDefault();
    }

    addItem(newLand) {
        //console.log(newDepartment)
        axios.request({
            method: 'post',
            url: ITEMS,
            data: newLand
        }).then(res => {
            this.props.history.push('/items');
            console.log(this.state.selectbuildingType)
            alert(`เพิ่มรายการพัสดุครุภัณฑ์แล้ว`);
        }).catch(err => console.log(err));
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

                            </div>
                            {/* /.row */}

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

                            </div>

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

                            <div className="row">
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

                            <div className="row">
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
                                                name="responsibilityYear" /*****/
                                                ref="responsibilityYear"  /*****/
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

                    <input
                        type="hidden"
                        name="disposalDate" /******/
                        ref="disposalDate"  /******/
                        value=""
                    />
                    <input
                        type="hidden"
                        name="disposalMethod" /******/
                        ref="disposalMethod"  /******/
                        value=""
                    />
                    <input
                        type="hidden"
                        name="disposalapprovalNo" /******/
                        ref="disposalapprovalNo"  /******/
                        value=""
                    />
                    <input
                        type="hidden"
                        name="disposalPrice" /******/
                        ref="disposalPrice"  /******/
                        value=""
                    />
                    <input
                        type="hidden"
                        name="profitOrLost" /******/
                        ref="profitOrLost"  /******/
                        value=""
                    />

                    <button className="btn btn-block btn-info title" type="submit" style={{ fontSize: 25 }}>
                        บันทึก
                    </button>

                </form>

            </div >
        )
    }
}

export default withRouter(LandForm)


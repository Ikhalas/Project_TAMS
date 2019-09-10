import React, { Component } from 'react'
import axios from 'axios';

import { DEPARTMENT, ITEMTYPE } from '../../../common/APIutl'


export default class LandForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Departments: [],
            Itemtypes: [],
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


    render() {

        return (
            <div>
                <form>

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
                                            <option disabled selected="selected" >-- โปรดเลือกหน่วยงานที่รับผิดชอบ --</option>
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
                                            <option disabled selected="selected" >-- โปรดเลือกรายการพัสดุครุภัณฑ์ --</option>
                                            {this.generateItemtypeOption()}
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
                                            <option disabled selected="selected" >-- โปรดเลือกหน่วยงานที่รับผิดชอบ --</option>
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
                                    <div class="form-group">
                                        <div>
                                            <label>
                                                <input type="radio" name="buildingType" value="อาคารเดี่ยว" className="flat-red" /> อาคารเดี่ยว
                                            </label>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <label>
                                                <input type="radio" name="buildingType" value="อาคารแถว" className="flat-red" /> อาคารแถว
                                            </label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>
                                                <input type="radio" name="Material" value="ตึก" className="flat-red" /> ตึก
                                            </label>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <label>
                                                <input type="radio" name="Material" value="ไม้" className="flat-red" /> ไม้
                                            </label>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <label>
                                                <input type="radio" name="Material" value="ครึ่งตึกครึ่งไม้" className="flat-red" /> ครึ่งตึกครึ่งไม้
                                            </label>
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
                                            class="form-control" 
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

                    <button className="btn btn-block btn-info title" type="submit" style={{fontSize:25}}>
                        บันทึก
                    </button>
                
                </form>

            </div >
        )
    }
}


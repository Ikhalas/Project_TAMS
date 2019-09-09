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

                    <div className="col-md-9 input-group" style={{ marginTop: 10 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>หน่วยงานที่รับผิดชอบ</b></span>
                        <select
                            name="Department" /******/
                            ref="Department" /******/
                            className="form-control selectpicker"
                            style={{ fontSize: 20 }}
                            required
                        >
                            <option disabled selected>&nbsp;-- โปรดเลือกหน่วยงานที่รับผิดชอบ --</option>
                            {this.generateDepartmentOption()}

                        </select>
                    </div>

                    <div className="col-md-9 input-group" style={{ marginTop: 5 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>ชื่อพัสดุ</b></span>
                        <select
                            name="itemName" /******/
                            ref="itemName" /******/
                            className="form-control selectpicker"
                            style={{ fontSize: 20 }}
                            required
                        >
                            <option disabled selected>&nbsp;-- โปรดเลือกหน่วยงานที่รับผิดชอบ --</option>
                            {this.generateItemtypeOption()}
                        </select>
                    </div>


                    <div className="col-md-9 input-group" style={{ marginTop: 5 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>เลขรหัสพัสดุ</b></span>
                        <input
                            style={{ fontSize: 20, }}
                            type="number"
                            className="form-control"
                            name="itemCode" /*****/
                            ref="itemCode"  /*****/
                            required
                        />
                    </div>

                    <div className="col-md-9 input-group" style={{ marginTop: 5 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>ที่ตั้งพัสดุ</b></span>
                        <input
                            style={{ fontSize: 20, }}
                            type="text"
                            className="form-control"
                            name="Location" /*****/
                            ref="Location"  /*****/

                        />
                    </div>

                    <div className="col-md-9 input-group" style={{ marginTop: 5 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>ซื้อ/จ้าง/ได้มา เมื่อวันที่</b></span>
                        <input
                            style={{ fontSize: 20, }}
                            type="text"
                            className="form-control"
                            name="derivedDate" /*****/
                            ref="derivedDate"  /*****/

                        />
                    </div>

                    <div className="col-md-9 input-group" style={{ marginTop: 5 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>เลขที่หนังสืออนุมัติ/ลงวันที่</b></span>
                        <input
                            style={{ fontSize: 20, }}
                            type="text"
                            className="form-control"
                            name="approvalDate" /*****/
                            ref="approvalDate"  /*****/

                        />
                    </div>

                    <div className="col-md-9 input-group" style={{ marginTop: 5 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>ราคา</b></span>
                        <input
                            style={{ fontSize: 20, }}
                            type="number"
                            className="form-control"
                            name="Price" /*****/
                            ref="Price"  /*****/

                        />
                    </div>

                    <div className="col-md-9 input-group" style={{ marginTop: 10 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>งบประมาณของ</b></span>
                        <select
                            name="budgetOf" /******/
                            ref="budgetOf" /******/
                            className="form-control selectpicker"
                            style={{ fontSize: 20 }}
                        >
                            <option disabled selected>&nbsp;-- โปรดเลือกหน่วยงานที่รับผิดชอบ --</option>
                            {this.generateDepartmentOption()}
                        </select>
                    </div>

                    <div className="col-md-9 input-group" style={{ marginTop: 5 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>เอกสารสิทธิ์พัสดุ</b></span>
                        <input
                            style={{ fontSize: 20, }}
                            type="text"
                            className="form-control"
                            name="Certificate" /*****/
                            ref="Certificate"  /*****/
                        />
                    </div>

                    <div className="col-md-9 input-group" style={{ marginTop: 5 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>ชื่อผู้รับจ้าง/ผู้ขาย/ผู้ให้</b></span>
                        <input
                            style={{ fontSize: 20, }}
                            type="text"
                            className="form-control"
                            name="sellerName" /*****/
                            ref="sellerName"  /*****/
                        />
                    </div>


                    <div style={{ marginTop: 20, fontSize: 25 }}><label>&nbsp;ที่ดิน</label></div>

                    <div className="col-md-4 input-group" style={{ marginTop: 1 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>เนื้อที่</b></span>
                        <input
                            style={{ fontSize: 20, }}
                            type="number"
                            className="form-control"
                            placeholder="&nbsp;ไร่"
                            name="Rai" /*****/
                            ref="Rai"  /*****/
                        />
                    </div>

                    <div className="col-md-4 input-group" style={{ marginTop: 5 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>งาน</b></span>
                        <input
                            style={{ fontSize: 20, }}
                            type="number"
                            className="form-control"
                            placeholder="&nbsp;ตารางวา"
                            name="Ngan" /*****/
                            ref="Ngan"  /*****/
                        />
                    </div>

                    <div style={{ marginTop: 20, fontSize: 25 }}><label>&nbsp;โรงเรือน</label></div>

                    &nbsp;&nbsp;&nbsp;&nbsp;
                        <label class="radio-inline">
                        <input type="radio" name="buildingType" id="buildingType1" value="อาคารเดี่ยว" />&nbsp;อาคารเดี่ยว
                        </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label class="radio-inline">
                        <input type="radio" name="buildingType" id="buildingType2" value="อาคารแถว" />&nbsp;อาคารแถว
                        </label>

                    <br />


                    &nbsp;&nbsp;&nbsp;&nbsp;
                        <label class="radio-inline">
                        <input type="radio" name="Material" id="Material1" value="ตึก" />&nbsp;ตึก
                        </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label class="radio-inline">
                        <input type="radio" name="Material" id="Material2" value="ไม้" />&nbsp;ไม้
                        </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label class="radio-inline">
                        <input type="radio" name="Material" id="Material3" value="ครึ่งตึกครึ่งไม้" />&nbsp;ครึ่งตึกครึ่งไม้
                        </label>

                    <div style={{ marginTop: 20, fontSize: 25 }}><label>&nbsp;อื่น ๆ</label></div>

                    <div className="col-md-9 input-group" style={{ marginTop: 5 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>ลักษณะ/ชนิด</b></span>
                        <input
                            style={{ fontSize: 20, }}
                            type="text"
                            className="form-control"
                            name="otherType" /*****/
                            ref="otherType"  /*****/
                        />
                    </div>

                    <div className="col-md-9 input-group" style={{ marginTop: 5 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>ขนาด</b></span>
                        <input
                            style={{ fontSize: 20, }}
                            type="text"
                            className="form-control"
                            name="otherSize" /*****/
                            ref="otherSize"  /*****/
                        />
                    </div>

                    <div style={{ marginTop: 20, fontSize: 25 }}><label>&nbsp;การเปลี่ยนแปลงส่วนราชการและผู้ดูแลรับผิดชอบ</label></div>

                    <div className="col-md-9 input-group" style={{ marginTop: 5 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>พ.ศ.</b></span>
                        <input
                            style={{ fontSize: 20, }}
                            type="text"
                            className="form-control"
                            name="responsibilityYear" /*****/
                            ref="responsibilityYear"  /*****/
                        />
                    </div>

                    <div className="col-md-9 input-group" style={{ marginTop: 5 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>ชื่อส่วนราชการ (สำนัก, กอง, ฝ่าย)</b></span>
                        <input
                            style={{ fontSize: 20, }}
                            type="text"
                            className="form-control"
                            name="responsibilityDepartmentName" /*****/
                            ref="responsibilityDepartmentName"  /*****/
                        />
                    </div>

                    <div className="col-md-9 input-group" style={{ marginTop: 5 }}>
                        <span className="input-group-addon title" style={{ fontSize: 20 }}><b>ชื่อหัวหน้าส่วนราชการ</b></span>
                        <input
                            style={{ fontSize: 20, }}
                            type="text"
                            className="form-control"
                            name="responsibilityDepartmentHead" /*****/
                            ref="responsibilityDepartmentHead"  /*****/
                        />
                    </div>

                </form>

            </div>
        )
    }
}


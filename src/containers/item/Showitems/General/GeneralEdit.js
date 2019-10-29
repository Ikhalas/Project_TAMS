import React, { Component } from 'react'
import axios from 'axios';

export default class GeneralEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: '',
            itemType: '',
            Department: '',
            itemCode: '',
            itemName: '',
            waybillCode: '',
            itemBrand: '',
            itemStyle: '',
            orderNo: '',
            bodyNo: '',
            frameNo: '',
            regisNo: '',
            itemColor: '',
            other: '',
            insuranceTerms: '',
            insuranceExpDate: '',
            insuranceCompany: '',
            insuranceDate: '',
            derivedFrom: '',
            derivedDate: '',
            Price: '',
            budgetOf: '',
            Note: '',

            Departments: [],
            detail: []
        }
    }

    componentDidMount() {
        const script = document.createElement('script')
        script.src = '/js/addform.js'
        script.async = true
        document.body.appendChild(script)

        let id = this.props.match.params.id;
        axios.get('http://localhost:3001/items/' + id).then(
            res => {
                this.setState({
                    status: res.data.status,
                    itemType: res.data.itemType,
                    Department: res.data.Department,
                    itemCode: res.data.itemCode,
                    itemName: res.data.itemName,
                    waybillCode: res.data.waybillCode,
                    itemBrand: res.data.itemBrand,
                    itemStyle: res.data.itemStyle,
                    orderNo: res.data.orderNo,
                    bodyNo: res.data.bodyNo,
                    frameNo: res.data.frameNo,
                    regisNo: res.data.regisNo,
                    itemColor: res.data.itemColor,
                    other: res.data.other,
                    insuranceTerms: res.data.insuranceTerms,
                    insuranceExpDate: res.data.insuranceExpDate,
                    insuranceCompany: res.data.insuranceCompany,
                    insuranceDate: res.data.insuranceDate,
                    derivedFrom: res.data.derivedFrom,
                    derivedDate: res.data.derivedDate,
                    Price: res.data.Price,
                    budgetOf: res.data.budgetOf,
                    Note: res.data.Note,

                    detail: res.data
                })

                axios.get('http://localhost:3001/Department').then(
                    res => {
                        this.setState({ Departments: res.data })
                    }).catch(err => console.log(err))
            })
    }

    generateDepartmentOption() {
        return (
            this.state.Departments.map(Department => (
                <option key={Department.id}>{Department.name}</option>
            ))
        )
    }

    handleInputChange(e) {
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }


    onSubmit = (e) => {
        //console.log(this.refs.status.value)
        const newItem = {
            "status": this.refs.status.value,
            "itemType": this.state.itemType, //เดิม
            "Department": this.state.Department, //เดิม
            "itemCode": this.state.itemCode, //เดิม
            "itemName": this.state.itemName, //เดิม
            "waybillCode": this.refs.waybillCode.value,
            "itemBrand": this.refs.itemBrand.value,
            "itemStyle": this.refs.itemStyle.value,
            "orderNo": this.refs.orderNo.value,
            "bodyNo": this.refs.bodyNo.value,
            "frameNo": this.refs.frameNo.value,
            "regisNo": this.refs.regisNo.value,
            "itemColor": this.refs.itemColor.value,
            "other": this.refs.other.value,
            "insuranceTerms": this.refs.insuranceTerms.value,
            "insuranceExpDate": this.refs.insuranceExpDate.value,
            "insuranceCompany": this.refs.insuranceCompany.value,
            "insuranceDate": this.refs.insuranceDate.value,
            "derivedFrom": this.refs.derivedFrom.value,
            "derivedDate": this.refs.derivedDate.value,
            "Price": this.refs.Price.value,
            "budgetOf": this.refs.budgetOf.value,
            "Note": this.refs.Note.value,
            "thumbnail": ""
        }
        //console.log(newItem)
        this.editDetail(newItem)
        e.preventDefault();
    }


    editDetail(newDetail) {
        let id = this.props.match.params.id;
        axios.request({
            method: 'put',
            url: 'http://localhost:3001/items/' + id,
            data: newDetail
        }).then(res => {
            alert("แก้ไขข้อมูลแล้ว")
            this.props.history.push('/items/item-detail/' + id)
        }).catch(err => console.log(err));
    }


    render() {
        return (
            <div>
                <div className="content-wrapper title">
                    <section className="content-header">
                        <h1>
                            <span style={{ fontSize: 35 }}>&nbsp;แก้ไขรายการพัสดุครุภัณฑ์</span>
                        </h1>
                    </section>
                    <section className="content">

                        <form onSubmit={this.onSubmit.bind(this)}>

                            <div className="box box-warning">
                                {/* /.box-header */}
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-12">


                                            <li className="list-group-item title">
                                                <span style={{ fontSize: 20 }}><b>เลขรหัสพัสดุ</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <span style={{ fontSize: 30 }}>{this.state.itemCode}</span>
                                                <br />
                                                <span style={{ fontSize: 20 }}><b>ชื่อพัสดุ</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <span style={{ fontSize: 30 }}>{this.state.itemName}</span>
                                                <br />
                                                <span style={{ fontSize: 20 }}><b>หน่วยงานที่รับผิดชอบ</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <span style={{ fontSize: 30 }}>{this.state.Department}</span>
                                            </li>

                                            <br />
                                            <ul className="list-group">
                                                <li className="list-group-item title">
                                                    <div className="box-header">
                                                        <h1 className="box-title" style={{ fontSize: 25 }}><b>---------- ข้อมูลเบื่องต้นของพัสดุ ----------</b></h1>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>สถานะของพัสดุ</label>
                                                        <select
                                                            className="form-control select2"
                                                            style={{ width: '100%' }}
                                                            name="status" /******/
                                                            ref="status" /******/
                                                            onChange={this.handleInputChange.bind(this)}
                                                            defaultValue={this.state.status}
                                                        >
                                                            <option disabled value={this.state.status} >-- {this.state.status} --</option>
                                                            <option>ใช้งานได้ดี</option>
                                                            <option>ชำรุด</option>
                                                            <option>เสื่อมสภาพ</option>
                                                            <option>สูญหาย</option>

                                                        </select>
                                                        <br />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>ใบส่งของที่</label>
                                                        <div className="input-group">
                                                            <div className="input-group-addon">
                                                                <i className="fa fa-compass" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                style={{ fontSize: 20 }}
                                                                name="waybillCode" /*****/
                                                                ref="waybillCode"  /*****/
                                                                value={this.state.waybillCode}
                                                                onChange={this.handleInputChange.bind(this)}

                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>ชื่อ/ยี่ห้อผู้ทำหรือผลิต</label>
                                                        <div className="input-group">
                                                            <div className="input-group-addon">
                                                                <i className="fa fa-calendar" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                style={{ fontSize: 20 }}
                                                                name="itemBrand" /*****/
                                                                ref="itemBrand"  /*****/
                                                                value={this.state.itemBrand}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>แบบ/ชนิด/ลักษณะ</label>
                                                        <div className="input-group">
                                                            <div className="input-group-addon">
                                                                <i className="fa fa-book" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                style={{ fontSize: 20 }}
                                                                name="itemStyle" /*****/
                                                                ref="itemStyle"  /*****/
                                                                value={this.state.itemStyle}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>หมายเลขลำดับ</label>
                                                        <div className="input-group">
                                                            <div className="input-group-addon">
                                                                <i className="fa fa-book" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                style={{ fontSize: 20 }}
                                                                name="orderNo" /*****/
                                                                ref="orderNo"  /*****/
                                                                value={this.state.orderNo}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>หมายเลขเครื่อง</label>
                                                        <div className="input-group">
                                                            <div className="input-group-addon">
                                                                <i className="fa fa-book" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                style={{ fontSize: 20 }}
                                                                name="bodyNo" /*****/
                                                                ref="bodyNo"  /*****/
                                                                value={this.state.bodyNo}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>หมายเลขกรอบ</label>
                                                        <div className="input-group">
                                                            <div className="input-group-addon">
                                                                <i className="fa fa-book" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                style={{ fontSize: 20 }}
                                                                name="frameNo" /*****/
                                                                ref="frameNo"  /*****/
                                                                value={this.state.frameNo}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>หมายเลขจดทะเบียน</label>
                                                        <div className="input-group">
                                                            <div className="input-group-addon">
                                                                <i className="fa fa-book" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                style={{ fontSize: 20 }}
                                                                name="regisNo" /*****/
                                                                ref="regisNo"  /*****/
                                                                value={this.state.regisNo}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>สีของพัสดุ</label>
                                                        <div className="input-group">
                                                            <div className="input-group-addon">
                                                                <i className="fa fa-book" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                style={{ fontSize: 20 }}
                                                                name="itemColor" /*****/
                                                                ref="itemColor"  /*****/
                                                                value={this.state.itemColor}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>อื่น ๆ</label>
                                                        <div className="input-group">
                                                            <div className="input-group-addon">
                                                                <i className="fa fa-book" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                style={{ fontSize: 20 }}
                                                                name="other" /*****/
                                                                ref="other"  /*****/
                                                                value={this.state.other}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>

                                            <ul className="list-group">
                                                <li className="list-group-item title">

                                                    <div className="box-header">
                                                        <h1 className="box-title" style={{ fontSize: 25 }}><b>---------- การประกันพัสดุ ----------</b></h1>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>เงือนไข - การประกัน</label>
                                                        <div className="input-group">
                                                            <div className="input-group-addon">
                                                                <i className="fa fa-book" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                style={{ fontSize: 20 }}
                                                                name="insuranceTerms" /*****/
                                                                ref="insuranceTerms"  /*****/
                                                                value={this.state.insuranceTerms}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>พัสดุรับประกันถึงวันที่</label>
                                                        <div className="input-group">
                                                            <div className="input-group-addon">
                                                                <i className="fa fa-book" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                style={{ fontSize: 20 }}
                                                                name="insuranceExpDate" /*****/
                                                                ref="insuranceExpDate"  /*****/
                                                                value={this.state.insuranceExpDate}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>พัสดุรับประกันไว้ที่บริษัท</label>
                                                        <div className="input-group">
                                                            <div className="input-group-addon">
                                                                <i className="fa fa-book" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                style={{ fontSize: 20 }}
                                                                name="insuranceCompany" /*****/
                                                                ref="insuranceCompany"  /*****/
                                                                value={this.state.insuranceCompany}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>วันที่ประกันพัสดุ</label>
                                                        <div className="input-group">
                                                            <div className="input-group-addon">
                                                                <i className="fa fa-book" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                style={{ fontSize: 20 }}
                                                                name="insuranceDate" /*****/
                                                                ref="insuranceDate"  /*****/
                                                                value={this.state.insuranceDate}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>



                                                </li>
                                            </ul>


                                            <ul className="list-group">
                                                <li className="list-group-item title">

                                                    <div className="box-header">
                                                        <h1 className="box-title" style={{ fontSize: 25 }}><b>---------- ที่มาของพัสดุ ----------</b></h1>
                                                        
                                                    </div>

                                                    <div className="form-group">
                                                        <label>ซื้อ/จ้าง/ได้มาจาก</label>
                                                        <div className="input-group">
                                                            <div className="input-group-addon">
                                                                <i className="fa fa-money" />
                                                            </div>
                                                            <input
                                                                type="type"
                                                                className="form-control"
                                                                style={{ fontSize: 20 }}
                                                                name="derivedFrom" /*****/
                                                                ref="derivedFrom"  /*****/
                                                                value={this.state.derivedFrom}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>ซื้อ/จ้าง/ได้มา เมื่อวันที่</label>
                                                        <div className="input-group">
                                                            <div className="input-group-addon">
                                                                <i className="fa fa-money" />
                                                            </div>
                                                            <input
                                                                type="type"
                                                                className="form-control"
                                                                style={{ fontSize: 20 }}
                                                                name="derivedDate" /*****/
                                                                ref="derivedDate"  /*****/
                                                                value={this.state.derivedDate}
                                                                onChange={this.handleInputChange.bind(this)}
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
                                                                type="type"
                                                                className="form-control"
                                                                style={{ fontSize: 20 }}
                                                                name="Price" /*****/
                                                                ref="Price"  /*****/
                                                                value={this.state.Price}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>งบประมาณของ</label>
                                                        <select
                                                            className="form-control select2"
                                                            style={{ width: '100%' }}
                                                            name="budgetOf" /******/
                                                            ref="budgetOf" /******/
                                                            onChange={this.handleInputChange.bind(this)}
                                                            defaultValue={this.state.budgetOf}
                                                        >
                                                            <option disabled value={this.state.budgetOf} >-- {this.state.budgetOf} --</option>
                                                            {this.generateDepartmentOption()}
                                                        </select>
                                                    </div>

                                                </li>
                                            </ul>

                                            <ul className="list-group">
                                                <li className="list-group-item title">

                                                    <div className="box-header">
                                                        <h1 className="box-title" style={{ fontSize: 25 }}><b>---------- หมายเหตุ ----------</b></h1>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>หมายเหตุเพิ่มเติม</label>

                                                        <textarea
                                                            className="form-control"
                                                            rows="3"
                                                            style={{ fontSize: 20 }}
                                                            placeholder="หมายเหตุ ..."
                                                            name="Note" /*****/
                                                            ref="Note"  /*****/
                                                            value={this.state.Note}
                                                            onChange={this.handleInputChange.bind(this)}
                                                        >
                                                        </textarea>

                                                    </div>


                                                </li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="btn btn-block btn-info title" type="submit" style={{ fontSize: 25 }}>
                                บันทึก
                            </button>

                        </form>

                    </section>
                </div>
            </div>
        )
    }
}

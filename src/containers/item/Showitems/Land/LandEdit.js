import React, { Component } from 'react'
import axios from 'axios';


class LandEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: '',
            itemType: '',
            Department: '',
            itemName: '',
            itemCode: '',
            Location: '',
            derivedDate: '',
            approvalDate: '',
            Price: '',
            budgetOf: '',
            Certificate: '',
            sellerName: '',
            Rai: '',
            Ngan: '',
            buildingType: '',
            Material: '',
            Floors: '',
            otherType: '',
            otherSize: '',
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
                    itemName: res.data.itemName,
                    itemCode: res.data.itemCode,
                    Location: res.data.Location,
                    derivedDate: res.data.derivedDate,
                    approvalDate: res.data.approvalDate,
                    Price: res.data.Price,
                    budgetOf: res.data.budgetOf,
                    Certificate: res.data.Certificate,
                    sellerName: res.data.sellerName,
                    Rai: res.data.Rai,
                    Ngan: res.data.Ngan,
                    buildingType: res.data.buildingType,
                    Material: res.data.Material,
                    Floors: res.data.Floors,
                    otherType: res.data.otherType,
                    otherSize: res.data.otherSize,
                    Note: res.data.Note,

                    detail: res.data
                })

                axios.get('http://localhost:3001/Department').then(
                    res => {
                        this.setState({ Departments: res.data })
                    }).catch(err => console.log(err))

            }).catch(err => console.log(err))
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
        //console.log(this.state.itemType)
        const newLand = {
            "status": this.refs.status.value,
            "itemType": this.state.itemType, //เดิม
            "Department": this.state.Department, //เดิม
            "itemName": this.state.itemName, //เดิม
            "itemCode": this.state.itemCode, //เดิม
            "Location": this.refs.Location.value,
            "derivedDate": this.refs.derivedDate.value,
            "approvalDate": this.refs.approvalDate.value,
            "Price": this.refs.Price.value,
            "budgetOf": this.refs.budgetOf.value,
            "Certificate": this.refs.Certificate.value,
            "sellerName": this.refs.sellerName.value,
            "Rai": this.refs.Rai.value,
            "Ngan": this.refs.Ngan.value,
            "buildingType": this.refs.buildingType.value,
            "Material": this.refs.Material.value,
            "Floors": this.refs.Floors.value,
            "otherType": this.refs.otherType.value,
            "otherSize": this.refs.otherSize.value,
            "Note": this.refs.Note.value,
            "thumbnail": ""
        }
        //console.log(newDetail)
        this.editDetail(newLand)

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
                                                                value={this.state.Location}
                                                                onChange={this.handleInputChange.bind(this)}

                                                            />
                                                        </div>
                                                    </div>

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
                                                                value={this.state.Certificate}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>

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
                                                                value={this.state.sellerName}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>

                                            <ul className="list-group">
                                                <li className="list-group-item title">
                                                    <div className="box-header">
                                                        <h1 className="box-title" style={{ fontSize: 25 }}><b>---------- เนื้อที่ ----------</b></h1>
                                                    </div>
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
                                                                value={this.state.Rai}
                                                                onChange={this.handleInputChange.bind(this)}
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
                                                                value={this.state.Ngan}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>ประเภทโรงเรือน</label>
                                                        <select
                                                            className="form-control select2"
                                                            style={{ width: '100%' }}
                                                            name="buildingType" /******/
                                                            ref="buildingType" /******/
                                                            onChange={this.handleInputChange.bind(this)}
                                                            defaultValue={this.state.buildingType}
                                                        >
                                                            <option disabled value={this.state.buildingType} >-- {this.state.buildingType} --</option>
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
                                                            onChange={this.handleInputChange.bind(this)}
                                                            defaultValue={this.state.Material}
                                                        >
                                                            <option disabled value={this.state.Material} >-- {this.state.Material} --</option>
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
                                                                value={this.state.Floors}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>

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
                                                                value={this.state.otherType}
                                                                onChange={this.handleInputChange.bind(this)}
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
                                                                value={this.state.otherSize}
                                                                onChange={this.handleInputChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>

                                            <ul className="list-group">
                                                <li className="list-group-item title">
                                                    <div className="box-header">
                                                        <h1 className="box-title" style={{ fontSize: 25 }}><b>---------- ที่มาของที่ดิน ----------</b></h1>
                                                    </div>
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
                                                                value={this.state.derivedDate}
                                                                onChange={this.handleInputChange.bind(this)}
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
                                                                value={this.state.approvalDate}
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
                                                                type="number"
                                                                placeholder="บาท"
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

export default LandEdit

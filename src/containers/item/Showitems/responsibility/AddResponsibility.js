import React, { Component } from 'react'
import { db } from '../../../../common/firebaseConfig'

export default class AddResponsibility extends Component {
    componentDidMount() {
        //console.log(this.props.Responsibility)
        this.loadScript()  //script for datepicker
        
    }

    loadScript() {
        const script = document.createElement('script')
        script.src = '/js/thaidate.js'
        script.async = true
        document.body.appendChild(script)
    }

    onSubmit = (e) => {
        let _lastSeq = 0
        if(this.props.responsibility.length !== 0){
            _lastSeq = Math.max.apply(Math, this.props.responsibility.map(function (obj) { return obj.seq; }))
        }
        //console.log(_lastSeq)

        const newVal = {
            "itemCode": this.props.itemCode,
            "seq": Number(_lastSeq) + 1,
            "Year": this.refs.Date.value,
            "responsibilityDepartmentName": this.refs.departmentName.value,
            "responsibilityDepartmentHead": this.refs.headName.value,
            "responsibilityUserName": this.refs.userName.value,
            "Note": "-"
        }
        //console.log(newVal)
        e.preventDefault()

        this.addResponsibility(newVal)
    }

    addResponsibility(newVal) {
        db.collection('itemResponsibility').add(newVal).then(() => {
            console.log("add itemResponsibility complete !!")
            window.location.reload();
        })
    }

    render() {
        return (
            <div className="title">
                <section className="content-header">
                    <h1>
                        <span style={{ fontSize: 35 }}>&nbsp;ส่วนราชการและผู้ดูแลรับผิดชอบ</span>
                    </h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-warning" style={{ borderRadius: '5px' }}>
                                <ul className="list-group">
                                    <li className="list-group-item title">
                                        <span style={{ fontSize: 20 }}><b>เลขรหัสพัสดุครุภัณฑ์&nbsp;:&nbsp;&nbsp; </b></span>
                                        <span style={{ fontSize: 30 }}>{this.props.itemCode}</span>
                                    </li>
                                </ul>
                                <div className="box-header with-border">
                                    <h1 className="box-title" style={{ fontSize: 21 }}>เพิ่มรายการส่วนราชการและผู้ดูแลรับผิดชอบ</h1>
                                </div>
                                <div className="box-body">
                                    <form onSubmit={this.onSubmit.bind(this)}>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon" style={{ fontSize: 18 }}>
                                                    <div style={{ width: '150px', textAlign: 'initial' }}>
                                                        <i className="fa fa-home" />
                                                        &nbsp;&nbsp;วัน/เดือน/ปี
                                                    </div>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control datepicker"
                                                    id="inputdatepicker"
                                                    data-date-format="dd/mm/yyyy"
                                                    placeholder="วัน/เดือน/ปี"
                                                    style={{ fontSize: 20, width: '13%' }}
                                                    name="Date" /*****/
                                                    ref="Date"  /*****/
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon" style={{ fontSize: 18 }}>
                                                    <div style={{ width: '150px', textAlign: 'initial' }}>
                                                        <i className="fa fa-home" />
                                                        &nbsp;&nbsp;ชื่อส่วนราชการ
                                                    </div>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    style={{ fontSize: 20 }}
                                                    name="departmentName" /*****/
                                                    ref="departmentName"  /*****/
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon" style={{ fontSize: 18 }}>
                                                    <div style={{ width: '150px', textAlign: 'initial' }}>
                                                        <i className="fa fa-address-card" />
                                                        &nbsp;&nbsp;ชื่อหัวหน้าส่วนราชการ
                                                    </div>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    style={{ fontSize: 20 }}
                                                    name="headName" /*****/
                                                    ref="headName"  /*****/
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon" style={{ fontSize: 18 }}>
                                                    <div style={{ width: '150px', textAlign: 'initial' }}>
                                                        <i className="fa fa-address-card" />
                                                        &nbsp;&nbsp;ชื่อผู้ใช้พัสดุ
                                                    </div>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    style={{ fontSize: 20 }}
                                                    name="userName" /*****/
                                                    ref="userName"  /*****/
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="box-tools pull-right">
                                            <button className="btn btn-success title" type="submit" style={{ fontSize: 20 }}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;บันทึก&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

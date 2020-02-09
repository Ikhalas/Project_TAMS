import React, { Component } from 'react'
import { db } from '../../../../common/firebaseConfig'

export default class AddMaintenance extends Component {
    componentDidMount() {
        //console.log(this.props.maintenance)
        this.loadScript()  //script for datepicker
    }
    loadScript() {
        const script = document.createElement('script')
        script.src = '/js/thaidate.js'
        script.async = true
        document.body.appendChild(script)
    }

    onSubmit = (e) => {
        e.preventDefault()
        let _lastSeq = 0
        let _lastNo = 1
        //console.log(this.props.maintenance.length)
        if (this.props.maintenance.length !== 0) {
            _lastSeq = Math.max.apply(Math, this.props.maintenance.map(function (obj) { return obj.seq; }))
            _lastSeq = _lastSeq + 1
            _lastNo = Math.max.apply(Math, this.props.maintenance.map(function (obj) { return obj.No; }))
            _lastNo =_lastNo + 1
        }
        //console.log(_lastSeq)
        const newVal = {
            "itemCode": this.props.itemCode,
            "seq": _lastSeq,
            "No": _lastNo,
            "docNo": this.refs.docNo.value,
            "date": this.refs.date.value,
            "detail": this.refs.detail.value,
            "amount": this.refs.amount.value,
            "responsible": this.refs.responsible.value,
            "note": this.refs.note.value
        }
        //console.log(newVal)
        this.addMaintenance(newVal)
    }

    addMaintenance(newVal) {
        db.collection('itemMaintenance').add(newVal).then(() => {
            console.log("add itemMaintenance complete !!")
            window.location.reload();
        })
    }

    render() {
        return (
            <div className="title">
                <section className="content-header">
                    <h1>
                        <span style={{ fontSize: 35 }}>&nbsp;การหาผลประโยชน์ในพัสดุ</span>
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
                                    <h1 className="box-title" style={{ fontSize: 21 }}>เพิ่มรายการการหาผลประโยชน์ในพัสดุ</h1>
                                </div>
                                <div className="box-body">
                                    <form onSubmit={this.onSubmit.bind(this)}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-addon" style={{ fontSize: 18 }}>
                                                            <div style={{ width: '150px', textAlign: 'initial' }}>
                                                                <i className="fa fa-calendar" />
                                                                &nbsp;&nbsp;วัน/เดือน/ปี
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="form-control datepicker"
                                                            id="inputdatepicker"
                                                            data-date-format="dd/mm/yyyy"
                                                            placeholder="วัน/เดือน/ปี"
                                                            style={{ fontSize: 20 }}
                                                            name="date" /*****/
                                                            ref="date"  /*****/
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-addon" style={{ fontSize: 18 }}>
                                                            <div style={{ width: '100px', textAlign: 'initial' }}>
                                                                <i className="fa fa-home" />
                                                                &nbsp;&nbsp;เลขที่หนังสือ
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            style={{ fontSize: 20 }}
                                                            name="docNo" /*****/
                                                            ref="docNo"  /*****/
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon" style={{ fontSize: 18 }}>
                                                    <div style={{ width: '150px', textAlign: 'initial' }}>
                                                        <i className="fa fa-home" />
                                                        &nbsp;&nbsp;รายละเอียด
                                                    </div>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    style={{ fontSize: 20 }}
                                                    name="detail" /*****/
                                                    ref="detail"  /*****/
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon" style={{ fontSize: 18 }}>
                                                    <div style={{ width: '150px', textAlign: 'initial' }}>
                                                        <i className="fa fa-address-card" />
                                                        &nbsp;&nbsp;จำนวนเงิน(บาท)
                                                    </div>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    style={{ fontSize: 20 }}
                                                    name="amount" /*****/
                                                    ref="amount"  /*****/
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon" style={{ fontSize: 18 }}>
                                                    <div style={{ width: '150px', textAlign: 'initial' }}>
                                                        <i className="fa fa-address-card" />
                                                        &nbsp;&nbsp;ชื่อบุคคล-บริษัทผู้ซ่อม/ปรังปรุง
                                                    </div>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    style={{ fontSize: 20 }}
                                                    name="responsible" /*****/
                                                    ref="responsible"  /*****/
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon" style={{ fontSize: 18 }}>
                                                    <div style={{ width: '150px', textAlign: 'initial' }}>
                                                        <i className="fa fa-address-card" />
                                                        &nbsp;&nbsp;หมายเหตุ (ถ้ามี)
                                                    </div>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    style={{ fontSize: 20 }}
                                                    name="note" /*****/
                                                    ref="note"  /*****/
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

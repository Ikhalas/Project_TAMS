import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import { db } from '../../../../common/firebaseConfig'

const modalStyles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f9f9f9',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '25px'
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000
    },
};

class Deactivation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ModalIsOpen: false,
            salePrice: ""
        }

        this.closeModal = this.closeModal.bind(this)
        this.openModal = this.openModal.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    _newValue = ''
    _profitOrLoss = ''
    _amount = ''


    componentDidMount() {
        //console.log(this.props.itemId)
        this.loadScript()  //script for datepicker
    }

    loadScript() {
        const script = document.createElement('script')
        script.src = '/js/thaidate.js'
        script.async = true
        document.body.appendChild(script)
    }

    openModal = e => {
        e.preventDefault()
        this.setState({ ModalIsOpen: true });
        document.body.style.overflow = 'hidden'
    }

    closeModal() {
        this.setState({ ModalIsOpen: false });
        document.body.style.overflow = 'unset';
    }

    onPriceChange(e) {
        const target = e.target
        const value = target.value
        //console.log(value)
        this.setState({ salePrice: value })
    }

    showProfitOrLoss() {
        //console.log(Number(this.state.salePrice))
        let price = Number(this.props.price)
        let salePrice = Number(this.state.salePrice)
        console.log(salePrice)
        if (salePrice > price && salePrice !== 0) { //กำไร
            let amount = price - salePrice
            this._profitOrLoss = 'กำไร'
            this._amount = Math.abs(amount)
            //console.log(this._profitOrLoss)
            return (
                <span style={{fontSize:'25px'}} >
                    ราคาของครุภัณฑ์ : {this.props.price} บาท<br />
                    กำไร : <b style={{fontSize:'27px'}} className="text-success">{Math.abs(amount)}</b> บาท
                </span>
            )
        }
        else if (salePrice < price && salePrice !== 0) { //ขาดทุน
            let amount = salePrice - price
            this._profitOrLoss = 'ขาดทุน'
            this._amount = Math.abs(amount)
            //console.log(this._profitOrLoss)
            return (
                <span style={{fontSize:'25px'}}>
                    ราคาของครุภัณฑ์ : {this.props.price} บาท<br />
                    ขาดทุน : <b style={{fontSize:'27px'}} className="text-danger">{Math.abs(amount)}</b> บาท
                </span>
            )
        }
        else if (salePrice === price && salePrice !== 0){
            this._profitOrLoss = 'เท่าทุน'
            this._amount = 0
            return (
                <span style={{fontSize:'25px'}}>
                    ราคาของครุภัณฑ์ : {this.props.price} บาท<br />
                    เท่าทุน
                </span>
            )
        }
        else{
            return (
                <span style={{fontSize:'25px'}}>
                    ราคาของครุภัณฑ์ : {this.props.price} บาท<br />
                    ...
                </span>
            )
        }
    }

    onSubmit = e => {
        e.preventDefault()
        this._newValue = {
            "itemCode": this.props.itemCode,
            "docNo": this.refs.docNo.value,
            "date": this.refs.date.value,
            "method": this.refs.method.value,
            "price": this.refs.price.value,
            "profit": this._profitOrLoss,
            "amount": this._amount,
            "note": this.refs.note.value
        }
        //console.log(this._newValue)
        this.openModal(e)
    }

    addDeactivation(newValue) {
        if (newValue) {
            //console.log(Object.entries(newValue))
            db.collection('itemDeactivation').add(newValue).then(() => {
                db.collection('items').doc(this.props.itemId).update({ status: 'จำหน่าย' }).then(() => {
                    console.log("add Deactivation complete !!")
                    this.props.history.push('/items')
                })
            })
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={this.onSubmit}>
                        <div className="box box-danger">
                            <div className="box-header with-border">
                                <h1 className="box-title" style={{ fontSize: 30, color: 'red' }}>การจำหน่ายครุภัณฑ์</h1>
                            </div>
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>วันที่จำหน่าย</label>
                                            <div className="input-group">
                                                <div className="input-group-addon">
                                                    <i className="fa fa-bars" />
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control datepicker"
                                                    id="inputdatepicker"
                                                    data-date-format="dd/mm/yyyy"
                                                    style={{ fontSize: 20 }}
                                                    name="date"
                                                    ref="date"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>เลขที่หนังสืออนุมัติ</label>
                                            <div className="input-group">
                                                <div className="input-group-addon">
                                                    <i className="fa fa-bars" />
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
                                    <label>วิธีจำหน่าย</label>
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-bars" />
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            style={{ fontSize: 20 }}
                                            name="method" /*****/
                                            ref="method"  /*****/
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>ราคาจำหน่าย (บาท)</label>
                                            <div className="input-group">
                                                <div className="input-group-addon">
                                                    <i className="fa fa-bars" />
                                                </div>
                                                <input
                                                    onChange={this.onPriceChange.bind(this)}
                                                    type="number"
                                                    className="form-control"
                                                    style={{ fontSize: 20 }}
                                                    name="price" /*****/
                                                    ref="price"  /*****/
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>กำไร/ขาดทุน</label>
                                            <br/>
                                            {this.showProfitOrLoss()}
                                            <br/>
                                            <p style={{fontSize:'17px'}}>*คำนวณอัตโนมัติ</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>หมายเหตุ (ถ้ามี)</label>
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-bars" />
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            style={{ fontSize: 20, zIndex: 0 }}
                                            name="note" /*****/
                                            ref="note"  /*****/
                                        />
                                    </div>
                                </div>
                                <button
                                    className="btn btn-success btn-block title"
                                    style={{ fontSize: 20 }}
                                    type="submit"
                                >
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;บันทึก&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/*Confirm Modal*/}
                <Modal
                    isOpen={this.state.ModalIsOpen}
                    closeTimeoutMS={500}
                    onRequestClose={this.closeModal}
                    style={modalStyles}
                    contentLabel="Confirm Modal"
                >
                    <div className="box-header with-border" style={{ width: "600px" }}>
                        <h3 className="box-title" style={{ fontSize: "25px" }}><b>จำหน่ายครุภัณฑ์</b></h3>
                        <div className="box-tools pull-right">
                            <button type="button" className="btn btn-box-tool" onClick={this.closeModal}><i className="fa fa-times" /></button>
                        </div>
                    </div>
                    <div className="box-body title">
                        <div style={{ backgroundColor: "#fbe9e7", padding: '8px 10px 8px 20px', color: "#c72a2a" }}>
                            <i className="icon fa fa-warning"></i>&nbsp;&nbsp;
                            <span style={{ fontSize: "19px" }}>
                                <b>การดำเนินการนี้จะเปลี่ยนสถานะของครุภัณฑ์หมายเลข&nbsp;
                                <span style={{ fontSize: "25px" }}>'จำหน่ายแล้ว'</span>
                                </b>
                            </span>
                        </div>
                        <br />
                        หมายเลขครุภัณฑ์ : <b style={{ fontSize: "25px" }}>{this.props.itemCode}</b>
                        <br />
                        ชื่อครุภัณฑ์ : <b style={{ fontSize: "25px" }}>{this.props.itemName}</b>
                        <br /><br />
                        <div className="row">
                            <div className="col-md-8">
                                <p style={{ fontSize: '17px' }}>สามารถดูข้อมูลของครุภัณฑ์ที่มีสถานะ&nbsp;จำหน่ายแล้ว<br />ที่หน้า&nbsp;"ครุภัณฑ์ที่ถูกจำหน่าย"</p>
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-default title" style={{ borderRadius: '12px' }} onClick={this.closeModal}>
                                    <span style={{ fontSize: '19px' }}>&nbsp;&nbsp;&nbsp;ยกเลิก&nbsp;&nbsp;&nbsp;</span>
                                </button>
                                &nbsp;&nbsp;
                                <button
                                    className="btn btn-danger title"
                                    style={{ borderRadius: '12px' }}
                                    onClick={() => { this.addDeactivation(this._newValue) }}>
                                    <span style={{ fontSize: '19px' }}>&nbsp;&nbsp;&nbsp;ยืนยัน&nbsp;&nbsp;&nbsp;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Deactivation)
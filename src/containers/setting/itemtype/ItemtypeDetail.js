import React, { Component } from 'react'
import Modal from 'react-modal';
import { db } from '../../../common/firebaseConfig'

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement("div")


export default class ItemtypeDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
            itemTypeId: this.props.match.params.id,

            detail: ''
        }
        this._isMounted = false;

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;  //for cancel subscriptions and asynchronous tasks
        this._isMounted && this.getItemTypeData()
    }

    getItemTypeData() {
        //console.log(departmentId)
        db.collection('itemTypes').doc(this.state.itemTypeId).get().then(doc => {
            console.log('Document data:', doc.data());
            this._isMounted && this.setState({ detail: doc.data() })
        }).catch(err => console.log('Error getting document', err))
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    
    onDelete() {
        db.collection('itemTypes').doc(this.state.itemTypeId).delete().then(
            this.props.history.push('/setting')
        )
    }

    componentWillUnmount() {  //cancel subscriptions and asynchronous tasks
        this._isMounted = false;
    }


    render() {
        return (
            <div>
                <div className="content-wrapper title">
                    <section className="content-header">
                        <h1>
                            <span style={{ fontSize: 35 }}>&nbsp;รายละเอียดประเภทพัสดุครุภัณฑ์&nbsp;<strong>{this.state.detail.type}</strong></span>
                        </h1>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="col-xs-12">
                                <ul className="list-group">
                                    <li className="list-group-item title"><span style={{ fontSize: 20 }}><b>ประเภทพัสดุครุภัณฑ์</b> &nbsp; : &nbsp;</span>
                                        {this.state.detail.type}
                                    </li>
                                    <li className="list-group-item title"><span style={{ fontSize: 20 }}><b>เลขรหัสพัสดุครุภัณฑ์</b> &nbsp; : &nbsp;</span>
                                        {this.state.detail.code}
                                    </li>
                                    <li className="list-group-item title"><span style={{ fontSize: 20 }}><b>ชื่อพัสดุครุภัณฑ์</b> &nbsp;: &nbsp;</span>
                                        {this.state.detail.name}
                                    </li>
                                    <li className="list-group-item title"><span style={{ fontSize: 20 }}><b>รายละเอียดอื่น ๆ</b> &nbsp;: &nbsp;</span>
                                        {this.state.detail.note}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12">
                                <button className="btn btn-info btn-sm title pull-left" onClick={() => this.props.history.push('/setting')}>&nbsp;ย้อนกลับ&nbsp;</button>

                                <div className="pull-right">
                                    <button className="btn btn-warning btn-sm title" onClick={() => this.props.history.push('/setting/itemtype-edit/' + this.state.itemTypeId)}>&nbsp;&nbsp;&nbsp;&nbsp;แก้ไข&nbsp;&nbsp;&nbsp;&nbsp;</button>&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-danger btn-sm title" onClick={this.openModal}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ลบ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                </div>
                            </div>
                        </div>
                        
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            style={modalStyles}
                            contentLabel="Delete Type Modal"
                        >
                            <div className="alert alert-dismissible" style={{ width: 500, height: 100 }}>
                                <h4><i className="icon fa fa-warning"></i>ยืนยันการลบ</h4>
                                <span style={{ fontSize: 20 }}>ลบรายการชื่อพัสดุครุภัณฑ์ "</span>
                                <span style={{ fontSize: 30 }}>{this.state.detail.name}</span>
                                <span style={{ fontSize: 20 }}>" หรือไม่</span>
                            </div>

                            <div className="row">
                                <div className="col-xs-6">
                                    <button className="btn btn-block btn-primary title" onClick={this.closeModal}>ยกเลิก</button>
                                </div>
                                <div className="col-xs-6">
                                    <button className="btn btn-block btn-danger title" onClick={this.onDelete.bind(this)}>ยืนยัน</button>
                                </div>
                            </div>
                        </Modal>

                    </section>
                </div>
            </div>
        )
    }
}


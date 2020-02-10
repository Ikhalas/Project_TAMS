import React, { Component } from 'react'
import { db } from '../../../../common/firebaseConfig'

export default class DeactivateInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detail: []
        }
    }
    _isMounted = false

    componentDidMount() {
        this._isMounted = true
        this._isMounted && this.getDeactivateInfo()
    }

    getDeactivateInfo() {
        db.collection('itemDeactivation').where('itemCode', '==', this.props.itemCode).get().then(snapshot => {
            let detail
            snapshot.forEach(doc => {
                //console.log(doc.data())
                detail = doc.data()
            });
            this._isMounted && this.setState({ detail })
            //console.log(Object.entries(this.state.detail))
            //console.log(this.state.detail.itemCode)
        }).catch(error => console.log(error))
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const detail = this.state.detail
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="box box-danger">
                        <div className="box-header with-border">
                            <h1 className="box-title" style={{ fontSize: 25 }}>รายละเอียดการจำหน่าย</h1>
                        </div>
                        <div className="box-body no-padding" style={{ fontSize: 22 }}>
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <th style={{ width: "25%" }}></th>
                                        <th style={{ width: "15%" }}></th>
                                        <th style={{ width: "auto" }}></th>
                                    </tr>
                                    <tr>
                                        <td><b>วันที่จำหน่าย</b> :</td>
                                        <td>{detail.date}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><b>เลขที่หนังสืออนุมัติ</b> :</td>
                                        <td>{detail.docNo}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><b>วิธีจำหน่าย</b> :</td>
                                        <td>{detail.method}</td>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <td><b>ราคาจำหน่าย</b> :</td>
                                        <td>{detail.price}</td>
                                        <td>บาท</td>
                                    </tr>
                                    <tr>
                                        <td><b>กำไร/ขาดทุน</b> :</td>
                                        <td>{detail.profit}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{detail.amount}</td>
                                        <td>บาท</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

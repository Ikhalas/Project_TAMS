import React, { Component } from 'react'
import AddDepreciation from './AddDepreciation'
import { db } from '../../../../common/firebaseConfig'

export default class ItemDepreciation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            depreciationsSeq0: []
        }

    }
    _isMounted = false
    _getSuccess = false
    depreciations = []

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.getItemDepreciations()
    }

    getItemDepreciations() {
        db.collection('itemDepreciations').where('itemCode', '==', this.props.itemCode).where('seq', '==', 0)
            .get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.depreciations.push(doc.data())
                    this._getSuccess = true
                });
                this._isMounted && this.setState({ depreciationsSeq0: this.depreciations })
                // console.log(this.state.depreciationsSeq0);
            }).catch(error => console.log(error))
    }

    renderDetail() {
        return (
            this.state.depreciationsSeq0 && this.state.depreciationsSeq0.map(seq => (
                <div className="row" key={seq.seq}>
                    <div className="col-xs-4">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th style={{ width: "50%" }}></th>
                                    <th style={{ width: "50%" }}></th>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: 19 }}><b>วันที่ได้มา</b></td>
                                    <td style={{ fontSize: 19 }}>{seq.Year}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: 19 }}><b>ราคาทุน</b></td>
                                    <td style={{ fontSize: 19 }}>{seq.Balance}&nbsp;บาท</td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: 19 }}><b>อายุการใช้งาน</b></td>
                                    <td style={{ fontSize: 19 }}>{seq.lifeTime}&nbsp;ปี</td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: 19 }}><b>อัตราค่าเสื่อมสภาพ</b></td>
                                    <td style={{ fontSize: 19 }}>{seq.Percent}&nbsp;%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-xs-4">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th style={{ width: "50%" }}></th>
                                    <th style={{ width: "50%" }}></th>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: 19 }}><b>จำนวนปี</b></td>
                                    <td style={{ fontSize: 19 }}>{seq.yearRate}&nbsp;ปี</td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: 19 }}><b>จำนวนเดือน</b></td>
                                    <td style={{ fontSize: 19 }}>{seq.monthRate}&nbsp;เดือน</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-xs-4">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th style={{ width: "60%" }}></th>
                                    <th style={{ width: "40%" }}></th>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: 19 }}><b>ค่าเสื่อมราคา/ปี</b></td>
                                    <td style={{ fontSize: 19 }}>{seq.perYear}&nbsp;บาท</td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: 19 }}><b>ค่าเสื่อมราคา/{seq.monthRate}เดือน</b></td>
                                    <td style={{ fontSize: 19 }}>{seq.perMonth}&nbsp;บาท</td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: 19 }}><b>ค่าเสื่อมราคาสะสม</b></td>
                                    <td style={{ fontSize: 19 }}>{seq.Cumulative}&nbsp;บาท</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))
        )
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="title">

                <section className="content-header">
                    <h1>
                        <span style={{ fontSize: 35 }}>&nbsp;ค่าเสื่อมราคาของครุภัณฑ์</span>
                    </h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            {this._getSuccess &&
                                <div className="box box-warning" style={{ borderRadius: '5px' }}>
                                    <ul className="list-group">
                                        <li className="list-group-item title">
                                            <span style={{ fontSize: 20 }}><b>เลขรหัสพัสดุครุภัณฑ์&nbsp;:&nbsp;&nbsp; </b></span>
                                            <span style={{ fontSize: 30 }}>{this.props.itemCode}</span>
                                            {this.renderDetail()}
                                        </li>
                                    </ul>
                                    <div className="box-header with-border">
                                        <h1 className="box-title" style={{ fontSize: 25 }}>เพิ่มรายการค่าเสื่อมราคา</h1>
                                    </div>
                                    <div className="box-body">
                                        <AddDepreciation itemCode={this.props.itemCode} depreciations={this.props.depreciations} />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}




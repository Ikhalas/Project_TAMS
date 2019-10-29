import React, { Component } from 'react'
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

export default class Itemdepreciation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            depreciations: [],
            item: []
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        // console.log(id)
        axios.get('http://localhost:3001/Items/' + id).then(
            res => {
                this.setState({ item: res.data })
                console.log(this.state.item.itemCode)

                let itemCode = this.state.item.itemCode
                //console.log(itemCode)
                axios.get('http://localhost:3001/Depreciations?itemCode=' + itemCode).then(
                    res => {
                        this.setState({ depreciations: res.data })
                        console.log(this.state.depreciations)
                    }).catch(err => console.log(err))
            }).catch(err => console.log(err))
    }


    generateDepreciationsRows() {
        let depreciationCheck = this.state.depreciations.map(depreciation => {
            return depreciation
        })
        //console.log(depreciationCheck.length)
        if (!depreciationCheck.length) {
            return (
                <tr>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                    <td style={{ textAlign: 'center' }}><span className="label label-danger">--&nbsp;ยังไม่มีรายการ&nbsp;--</span></td>
                </tr>
            )
        }

        return (
            this.state.depreciations.map(depreciation => (
                <tr key={depreciation.id}>
                    <td style={{ textAlign: 'center' }}><b>{depreciation.Year}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{depreciation.Percent}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{depreciation.Balance}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{depreciation.note}</b></td>
                    <td style={{ textAlign: 'center' }}>
                        <Link to={'/depreciation/item-depreciation/edit/' + depreciation.id}>&nbsp;แก้ไข</Link>&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-box-tool" style={{ fontSize: 22 }}>ลบ</button>
                    </td>
                </tr>
            ))
        )
    }

    render() {

        return (
            <div>
                <div className="content-wrapper title">
                    <section className="content-header">
                        <h1>
                            <span style={{ fontSize: 50 }}>&nbsp;ค่าเสื่อมราคาของครุภัณฑ์</span>
                        </h1>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="box box-warning">
                                    <li className="list-group-item title">
                                        <span style={{ fontSize: 20 }}><b>เลขรหัสพัสดุ</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <span style={{ fontSize: 30 }}>{this.state.item.itemCode}</span>
                                        <br />
                                        <span style={{ fontSize: 20 }}><b>ชื่อพัสดุ</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <span style={{ fontSize: 30 }}>{this.state.item.itemName}</span>
                                        <br />
                                        <span style={{ fontSize: 20 }}><b>หน่วยงานที่รับผิดชอบ</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <span style={{ fontSize: 30 }}>{this.state.item.Department}</span>
                                    </li>

                                    <br/>

                                    <div className="box-header with-border">
                                        <h1 className="box-title" style={{ fontSize: 25 }}>ค่าเสื่อมราคา</h1>
                                    </div>
                                    <div className="box-body">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: '15%', textAlign: 'center' }}>ปีที่</td>
                                                    <td style={{ width: '15%', textAlign: 'center' }}>อัตราค่าเสื่อม (%)</td>
                                                    <td style={{ width: '15%', textAlign: 'center' }}>ราคาคงเหลือ</td>
                                                    <td style={{ width: '45%', textAlign: 'center' }}>หมายเหตุ</td>
                                                    <td style={{ width: '10%', textAlign: 'center' }}>หมายเหตุ</td>
                                                </tr>
                                                {this.generateDepreciationsRows()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br/>

                        <button className="btn btn-block btn-info title" type="submit" style={{ fontSize: 25 }}>
                            เพิ่มรายการ
                        </button>


                    </section>
                </div>
            </div>
        )
    }
}


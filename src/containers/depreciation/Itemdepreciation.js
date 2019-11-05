import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import AddDepreciation from './AddDepreciation'

class ItemDepreciation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            depreciations: [],
            item: [],
            seq0: [],
            displayCompenent: false
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        // console.log(id)
        axios.get('http://localhost:3001/Items/' + id).then(
            res => {
                this.setState({ item: res.data })
                //console.log(this.state.item.itemCode)

                let itemCode = this.state.item.itemCode
                //console.log(itemCode)
                axios.get('http://localhost:3001/Depreciations?itemCode=' + itemCode).then(
                    res => {
                        this.setState({ depreciations: res.data })
                        //console.log(this.state.depreciations[0])
                    }).catch(err => console.log(err))

                axios.get(`http://localhost:3001/Depreciations?itemCode=${itemCode}&seq=0`).then(
                    res => {
                        this.setState({ seq0: res.data })
                        //console.log(this.state.seq0)
                    }).catch(err => console.log(err))

            }).catch(err => {
                console.log(err)
                this.props.history.push('/NotFound')
            })
            
    }

    renderDetail() {
        return (
            this.state.seq0.map(seq => (
                <div key={seq.seq}>
                    <div className="row">
                        <div className="col-xs-4">
                            <span style={{ fontSize: 20 }}><b>วันที่ได้มา</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span style={{ fontSize: 30 }}>{seq.Year}</span>

                            <br />
                            <span style={{ fontSize: 20 }}><b>ราคาทุน</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span style={{ fontSize: 30 }}>{seq.Balance}&nbsp;&nbsp;บาท</span>

                            <br />
                            <span style={{ fontSize: 20 }}><b>อายุการใช้งาน</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span style={{ fontSize: 30 }}>{seq.lifeTime}&nbsp;&nbsp;ปี</span>

                            <br />
                            <span style={{ fontSize: 20 }}><b>อัตราค่าเสื่อมสภาพ</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span style={{ fontSize: 30 }}>{seq.Percent}&nbsp;&nbsp;%</span>
                        </div>
                        <div className="col-xs-4">
                            <span style={{ fontSize: 20 }}><b>จำนวนปี</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span style={{ fontSize: 30 }}>{seq.yearRate}&nbsp;&nbsp;ปี</span>

                            <br />
                            <span style={{ fontSize: 20 }}><b>จำนวนเดือน</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span style={{ fontSize: 30 }}>{seq.monthRate}&nbsp;&nbsp;เดือน</span>

                        </div>
                        <div className="col-xs-4">
                            <span style={{ fontSize: 20 }}><b>ค่าเสื่อมราคา/ปี</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span style={{ fontSize: 30 }}>{seq.perYear}&nbsp;&nbsp;บาท</span>

                            <br />
                            <span style={{ fontSize: 20 }}><b>ค่าเสื่อมราคา/{seq.monthRate}เดือน</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span style={{ fontSize: 30 }}>{seq.perMonth}&nbsp;&nbsp;บาท</span>

                            <br />
                            <span style={{ fontSize: 20 }}><b>ค่าเสื่อมราคาสะสม</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span style={{ fontSize: 30 }}>{seq.Cumulative}&nbsp;&nbsp;บาท</span>

                        </div>
                    </div>

                </div>
            ))
        )
    }


    generateDepreciationsRows() {
        return (
            this.state.depreciations.map(depreciation => (
                <tr key={depreciation.id}>
                    <td style={{ textAlign: 'center' }}><b>{depreciation.Year}</b></td>
                    
                    <td style={{ textAlign: 'center' }}><b>{depreciation.Balance}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{depreciation.Note}</b></td>
                    <td style={{ textAlign: 'center' }}>
                        <Link to={'/depreciation/item-depreciation/edit/' + depreciation.id}>&nbsp;แก้ไข</Link>&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-box-tool" style={{ fontSize: 22 }}>ลบ</button>
                    </td>
                </tr>
            ))
        )
    }


    displayCompenent = () => {
        this.setState({
            displayCompenent: !this.state.displayCompenent
        })

        //console.log(this.state.displayCompenent)
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
                                    <ul className="list-group">
                                        <li className="list-group-item title">
                                            <span style={{ fontSize: 20 }}><b>เลขรหัสพัสดุ</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                            <span style={{ fontSize: 30 }}>{this.state.item.itemCode}</span>
                                            <br />
                                            <span style={{ fontSize: 20 }}><b>ชื่อพัสดุ</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                            <span style={{ fontSize: 30 }}>{this.state.item.itemName}</span>
                                            <br />
                                            <span style={{ fontSize: 20 }}><b>หน่วยงานที่รับผิดชอบ</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                            <span style={{ fontSize: 30 }}>{this.state.item.Department}</span>
                                            <br />
                                            <br />
                                            {this.renderDetail()}
                                        </li>
                                    </ul>



                                    <div className="box-header with-border">
                                        <h1 className="box-title" style={{ fontSize: 25 }}>ค่าเสื่อมราคา</h1>
                                    </div>
                                    <div className="box-body">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: '15%', textAlign: 'center' }}>วันที่</td>
                                                    
                                                    <td style={{ width: '15%', textAlign: 'center' }}>ราคาคงเหลือ (บาท)</td>
                                                    <td style={{ width: '45%', textAlign: 'center' }}>หมายเหตุ</td>
                                                    <td style={{ width: '10%', textAlign: 'center' }}>อื่น ๆ</td>
                                                </tr>
                                                {this.generateDepreciationsRows()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br />

                        <button
                            className="btn btn-block btn-info title"
                            style={{ fontSize: 25 }}
                            onClick={this.displayCompenent}
                        >
                            เพิ่มรายการ
                        </button>


                    </section>

                    {this.state.displayCompenent && <AddDepreciation itemCode={this.state.item.itemCode} depreciations={this.state.depreciations} />}





                </div>
            </div>
        )
    }
}

export default withRouter(ItemDepreciation)


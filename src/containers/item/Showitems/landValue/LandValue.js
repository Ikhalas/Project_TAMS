import React, { Component } from 'react'
import axios from 'axios'
import AddLandValue from './AddLandValue'

class LandValue extends Component {
    constructor(props) {
        super(props)
        this.state = {
            landValue: [],
            item: [],
            displayCompenent: false
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        // console.log(id)
        axios.get('http://localhost:3001/Items/' + id).then(
            res => {
                this.setState({ item: res.data })
                //console.log(this.state.item)

                let itemCode = this.state.item.itemCode
                //console.log(itemCode)
                axios.get('http://localhost:3001/landValueIncreases4Years?itemCode=' + itemCode).then(
                    res => {
                        this.setState({ landValue: res.data })
                        //console.log(this.state.landValue[0])
                    }).catch(err => console.log(err))

            }).catch(err => {
                console.log(err)
                this.props.history.push('/NotFound')
            })

    }

    generateLandValueRow() {
        let valueIncreasesCheck = this.state.landValue.map(valueIncreases => {
            return valueIncreases
        })
        //console.log(valueIncreasesCheck.Year)

        if (!valueIncreasesCheck.length) {
            return (
                <tr>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                    <td style={{ textAlign: 'center' }}><span className="label label-danger">--&nbsp;ยังไม่มีรายการ&nbsp;--</span></td>
                </tr>
            )
        }
        return (
            this.state.landValue && this.state.landValue.map(LandValueIncreases4Year => (
                <tr key={LandValueIncreases4Year.id}>
                    <td style={{ textAlign: 'center' }}><b>{LandValueIncreases4Year.Year}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{LandValueIncreases4Year.Percent}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{LandValueIncreases4Year.Balance}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{LandValueIncreases4Year.Note}</b></td>
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
                            <span style={{ fontSize: 50 }}>&nbsp;มูลค่าเพิ่มขึ้น 4 ปี</span>
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
                                            <span style={{ fontSize: 20 }}><b>ราคาเริ่มต้น</b> &nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                            <span style={{ fontSize: 45 }}>{this.state.item.Price}</span>                                     
                                        </li>
                                    </ul>



                                    <div className="box-header with-border">
                                        <h1 className="box-title" style={{ fontSize: 25 }}>มูลค่าเพิ่มขึ้น 4 ปี</h1>
                                    </div>
                                    <div className="box-body">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: '15%', textAlign: 'center' }}>วันที่</td>
                                                    <td style={{ width: '15%', textAlign: 'center' }}>เปอร์เซ็นต์ (%)</td>
                                                    <td style={{ width: '15%', textAlign: 'center' }}>ราคาคงเหลือ (บาท)</td>
                                                    <td style={{ width: '35%', textAlign: 'center' }}>หมายเหตุ</td>
                                                </tr>
                                                {this.generateLandValueRow()}
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

                    {this.state.displayCompenent && <AddLandValue price={this.state.item.Price} itemCode={this.state.item.itemCode} landValue={this.state.landValue} />}

                    
                </div>
            </div>
        )
    }
}

export default LandValue

import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class GeneralDetail extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            item: [],

            Depreciations: [],
            Responsibility: [],
            Exploitation: [],
            Disposal: [],
            Maintenance: [],

            statusClass: ''
        }
    }

    componentDidMount() {
        this._isMounted = true;

        let id = this.props.itemId
        axios.get('http://localhost:3001/items/' + id).then(
            res => {
                if (this._isMounted) {
                    this.setState({ item: res.data })

                    //console.log("Gstatus|"+this.state.item.status)
                    if (this.state.item.status === 'ใช้งานได้ดี') this.setState({ statusClass: 'label label-success' })
                    else if (this.state.item.status === 'ชำรุด') this.setState({ statusClass: 'label label-warning' })
                    else if (this.state.item.status === 'เสื่อมสภาพ') this.setState({ statusClass: 'label label-warning' })
                    else if (this.state.item.status === 'สูญหาย') this.setState({ statusClass: 'label label-danger' })
                    else this.setState({ statusClass: 'label label-primary' })

                    //console.log(this.state.item)
                    let itemCode = this.state.item.itemCode;
                    //console.log(this.state.item.itemCode)
                    axios.get('http://localhost:3001/Depreciations?itemCode=' + itemCode).then(
                        res => {
                            this.setState({ Depreciations: res.data })
                            //console.log(this.state.Depreciations)
                        }).catch(err => console.log(err))

                    axios.get('http://localhost:3001/Maintenance?itemCode=' + itemCode).then(
                        res => {
                            this.setState({ itemMaintenance: res.data })
                            //console.log(this.state.LandValueIncreases4Years)
                        }).catch(err => console.log(err))

                    axios.get('http://localhost:3001/Responsibility?itemCode=' + itemCode).then(
                        res => {
                            this.setState({ Responsibility: res.data })
                            //console.log(this.state.Responsibility)
                        }).catch(err => console.log(err))

                    axios.get('http://localhost:3001/Exploitation?itemCode=' + itemCode).then(
                        res => {
                            this.setState({ Exploitation: res.data })
                            //console.log(this.state.Exploitation)
                        }).catch(err => console.log(err))

                    axios.get('http://localhost:3001/Disposal?itemCode=' + itemCode).then(
                        res => {
                            this.setState({ Disposal: res.data })
                            //console.log(this.state.Disposal)
                        }).catch(err => console.log(err))
                }

            }).catch(err => console.log(err))


    }

    generateDepreciationsRows() {
        let depreciationCheck = this.state.Depreciations.map(depreciation => {
            return depreciation
        })
        //console.log(depreciationCheck.length)
        if (!depreciationCheck.length) {
            return (
                <tr>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                    <td style={{ textAlign: 'center' }}><span className="label label-danger">--&nbsp;ยังไม่มีรายการ&nbsp;--</span></td>
                </tr>
            )
        }

        return (
            this.state.Depreciations.map(Depreciation => (
                <tr key={Depreciation.id}>
                    <td style={{ textAlign: 'center' }}><b>{Depreciation.Year}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{Depreciation.Balance}</b></td>
                </tr>
            ))
        )
    }

    generateResponsibilityRows() {
        let responsibilityCheck = this.state.Responsibility.map(responsibility => {
            return responsibility
        })

        //console.log(responsibilityCheck.Year)
        if (!responsibilityCheck.length) {
            return (
                <tr>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                    <td style={{ textAlign: 'center' }}><span className="label label-danger">--&nbsp;ยังไม่มีรายการ&nbsp;--</span></td>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                </tr>
            )
        }

        return (
            this.state.Responsibility && this.state.Responsibility.map(Responsibility => (
                <tr key={Responsibility.id}>
                    <td style={{ textAlign: 'center' }}><b>{Responsibility.Year}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{Responsibility.responsibilityDepartmentName}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{Responsibility.responsibilityDepartmentHead}</b></td>
                </tr>
            ))
        )
    }

    generateExploitationRows() {
        let exploitationCheck = this.state.Exploitation.map(exploitation => {
            return exploitation
        })
        //console.log(exploitationCheck.Year)

        if (!exploitationCheck.length) {
            return (
                <tr>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                    <td style={{ textAlign: 'center' }}><span className="label label-danger">--&nbsp;ยังไม่มีรายการ&nbsp;--</span></td>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                </tr>
            )
        }

        return (
            this.state.Exploitation && this.state.Exploitation.map(Exploitation => (
                <tr key={Exploitation.id}>
                    <td style={{ textAlign: 'center' }}><b>{Exploitation.Year}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{Exploitation.List}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{Exploitation.Benefits}</b></td>
                </tr>
            ))
        )
    }

    generateMaintenanceRows() {
        let maintenanceCheck = this.state.Maintenance.map(maintenance => {
            return maintenance
        })
        //console.log(exploitationCheck.length)

        if (!maintenanceCheck.length) {
            return (
                <tr>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                    <td style={{ textAlign: 'center' }}><span className="label label-danger">--&nbsp;ยังไม่มีรายการ&nbsp;--</span></td>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                </tr>
            )
        }

        return (
            this.state.Maintenance && this.state.Maintenance.map(maintenance => (
                <tr key={maintenance.id}>
                    <td style={{ textAlign: 'center' }}><b>{maintenance.No}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{maintenance.approvalLetter}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{maintenance.approvalDate}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{maintenance.List}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{maintenance.Amount}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{maintenance.Responsible}</b></td>
                </tr>
            ))
        )

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        //console.log(this.state.item)
        return (
            <div>
                <section className="content-header">
                    <span style={{ fontSize: 35 }}>รายละเอียดพัสดุครุภัณฑ์</span>
                    <span className="pull-right" style={{ marginTop: 10 }}>
                        <span className={this.state.statusClass} style={{ fontSize: 23 }}>{this.state.item.status}</span>&nbsp;&nbsp;
                </span>
                </section>

                <section className="content">
                    <span style={{ fontSize: 23 }}>ประเภท&nbsp;&nbsp;:&nbsp;&nbsp;<b>{this.state.item.itemType}</b></span>
                    <span className="pull-right" style={{ fontSize: 23 }}>
                        เลขรหัสพัสดุ&nbsp;&nbsp;:&nbsp;&nbsp;<b>{this.state.item.itemCode}</b>&nbsp;&nbsp;
                </span>


                    <div className="row">
                        <div className="col-md-6">
                            <div className="box box-success">
                                <div className="box-header with-border">
                                    <h1 className="box-title" style={{ fontSize: 25 }}>รายละเอียดครุภัณฑ์</h1>
                                    <div className="box-tools pull-right">
                                        <button
                                            type="button"
                                            className="btn btn-box-tool"
                                            style={{ fontSize: 20 }}
                                            onClick={() => this.props.history.push('/items/item-detail/general-edit/' + this.state.item.id)}>
                                            <i className="fa fa-edit" />แก้ไข&nbsp;&nbsp;
                                        </button>
                                    </div>
                                </div>

                                <div className="box-body no-padding">

                                    <div className="box-header" align="center" style={{ marginTop: 10 }}>
                                        <h1 className="box-title" style={{ fontSize: 22 }}><b>---------- ข้อมูลเบื่องต้นของพัสดุ ----------</b></h1>
                                    </div>

                                    <table className="table table-striped with-border">
                                        <tbody>
                                            <tr>
                                                <td>ชื่อพัสดุ : &nbsp;<b>{this.state.item.itemName}</b></td>
                                            </tr>
                                            <tr>
                                                <td>ใบส่งของที่ : &nbsp;<b>{this.state.item.waybillCode}</b></td>
                                            </tr>
                                            <tr>
                                                <td>ชื่อ/ยี่ห้อผู้ทำหรือผลิต : &nbsp;<b>{this.state.item.itemBrand}</b></td>
                                            </tr>
                                            <tr>
                                                <td>แบบ/ชนิด/ลักษณะ : &nbsp;<b>{this.state.item.itemStyle}</b></td>
                                            </tr>
                                            <tr>
                                                <td>หมายเลขลำดับ : &nbsp;<b>{this.state.item.orderNo}</b></td>
                                            </tr>
                                            <tr>
                                                <td>หมายเลขเครื่อง : &nbsp;<b>{this.state.item.bodyNo}</b></td>
                                            </tr>
                                            <tr>
                                                <td>หมายเลขกรอบ : &nbsp;<b>{this.state.item.frameNo}</b></td>
                                            </tr>
                                            <tr>
                                                <td>หมายเลขจดทะเบียน : &nbsp;<b>{this.state.item.regisNo}</b></td>
                                            </tr>
                                            <tr>
                                                <td>สีของพัสดุ : &nbsp;<b>{this.state.item.itemColor}</b></td>
                                            </tr>
                                            <tr>
                                                <td>อื่น ๆ : &nbsp;<b>{this.state.item.other}</b></td>
                                            </tr>
                                        </tbody>
                                    </table>


                                    <div className="box-header" align="center" style={{ marginTop: 10 }}>
                                        <h1 className="box-title" style={{ fontSize: 22 }}><b>---------- การประกันพัสดุ ----------</b></h1>
                                    </div>
                                    <table className="table table-striped with-border">
                                        <tbody>
                                            <tr>
                                                <td>เงือนไข - การประกัน : &nbsp;<b>{this.state.item.insuranceTerms}</b></td>
                                            </tr>
                                            <tr>
                                                <td>พัสดุรับประกันถึงวันที่ : &nbsp;<b>{this.state.item.insuranceExpDate}</b></td>
                                            </tr>
                                            <tr>
                                                <td>พัสดุรับประกันไว้ที่บริษัท : &nbsp;<b>{this.state.item.insuranceCompany}</b></td>
                                            </tr>
                                            <tr>
                                                <td>วันที่ประกันพัสดุ : &nbsp;<b>{this.state.item.insuranceDate}</b></td>
                                            </tr>
                                        </tbody>
                                    </table>


                                    <div className="box-header" align="center" style={{ marginTop: 10 }}>
                                        <h1 className="box-title" style={{ fontSize: 22 }}><b>---------- ที่มาของพัสดุ ----------</b></h1>
                                    </div>
                                    <table className="table table-striped with-border">
                                        <tbody>
                                            <tr>
                                                <td>ซื้อ/จ้าง/ได้มาจาก : &nbsp;<b>{this.state.item.derivedFrom}</b></td>
                                            </tr>
                                            <tr>
                                                <td>ซื้อ/จ้าง/ได้มา เมื่อวันที่ : &nbsp;<b>{this.state.item.derivedDate}</b></td>
                                            </tr>
                                            <tr>
                                                <td>ราคา : &nbsp;<b>{this.state.item.Price}<span className="pull-right" style={{ marginRight: 40 }}>บาท</span></b></td>
                                            </tr>
                                            <tr>
                                                <td>งบประมาณของ : &nbsp;<b>{this.state.item.budgetOf}</b></td>
                                            </tr>
                                        </tbody>
                                    </table>


                                    <div className="box-header" align="center" style={{ marginTop: 10 }}>
                                        <h1 className="box-title" style={{ fontSize: 22 }}><b>---------- หมายเหตุ ----------</b></h1>
                                    </div>

                                    <table className="table table-striped with-border">
                                        <tbody>
                                            <tr>
                                                <td>หมายเหตุ : &nbsp;<b>{this.state.item.Note}</b></td>
                                            </tr>
                                        </tbody>
                                    </table>


                                </div>
                                {/* /.box-body */}
                            </div>
                            {/* /.box */}
                        </div>
                        {/* /.col */}

                        <div className="col-md-6">
                            <div className="box box-danger">
                                <div className="box-header with-border">
                                    <h1 className="box-title" style={{ fontSize: 25 }}>ค่าเสื่อมราคา</h1>
                                    <div className="box-tools pull-right">
                                        <button
                                            type="button"
                                            className="btn btn-box-tool"
                                            style={{ fontSize: 20 }}
                                            onClick={() => this.props.history.push('/depreciation/item-depreciation/' + this.state.item.id)}>
                                            <i className="fa fa-info" />&nbsp;รายละเอียด&nbsp;&nbsp;
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '20%', textAlign: 'center' }}>วันที่</td>
                                                <td style={{ width: '80%', textAlign: 'center' }}>ราคาคงเหลือ</td>
                                            </tr>
                                            {this.generateDepreciationsRows()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <h1 className="box-title" style={{ fontSize: 25 }}>การหาผลประโยชน์ในพัสดุ</h1>
                                </div>
                                <div className="box-body">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td style={{ width: 50, textAlign: 'center' }}>พ.ศ.</td>
                                                <td style={{ width: 400, textAlign: 'center' }}>รายการ</td>
                                                <td style={{ width: 200, textAlign: 'center' }}>ผลประโยชน์ที่ได้รับเป็นรายเดือนหรือรายปี (บาท)</td>
                                            </tr>
                                            {this.generateExploitationRows()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* /.box */}

                        </div>


                    </div>
                    {/* /.row */}

                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <h1 className="box-title" style={{ fontSize: 25 }}>การเปลี่ยนแปลงส่วนราชการและผู้ดูแลรับผิดชอบ</h1>
                                </div>
                                <div className="box-body">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td style={{ width: 50, textAlign: 'center' }}>พ.ศ.</td>
                                                <td style={{ width: 300, textAlign: 'center' }}>ชื่อส่วนราชการ (สำนัก, กอง, ฝ่าย)</td>
                                                <td style={{ width: 300, textAlign: 'center' }}>ชื่อหัวหน้าส่วนราชการ</td>
                                            </tr>
                                            {this.generateResponsibilityRows()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* /.box */}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <h1 className="box-title" style={{ fontSize: 25 }}>บันทึกการซ่อม/ปรับปรุงแก้ไขพัสดุ</h1>
                                </div>
                                <div className="box-body">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td style={{ width: 50, textAlign: 'center' }}>ครั้งที่</td>
                                                <td style={{ width: 100, textAlign: 'center' }}>เลขที่หนังสือ</td>
                                                <td style={{ width: 100, textAlign: 'center' }}>ลงวันที่</td>
                                                <td style={{ width: 400, textAlign: 'center' }}>รายการซ่อม/ปรับปรุงแก้ไข</td>
                                                <td style={{ width: 100, textAlign: 'center' }}>จำนวนเงิน</td>
                                                <td style={{ width: 200, textAlign: 'center' }}>ชื่อบุคคล - บริษัทผู้ซ่อม/ปรังปรุง</td>
                                            </tr>
                                            {this.generateMaintenanceRows()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* /.box */}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="box box-danger">
                                <div className="box-header with-border">
                                    <h1 className="box-title" style={{ fontSize: 25 }}>รูปถ่ายหรือแผนผังที่ตั้ง</h1>
                                </div>
                                <div className="box-body">

                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="box box-danger">
                                <div className="box-header with-border">
                                    <h1 className="box-title" style={{ fontSize: 25 }}>การจำหน่าย</h1>
                                </div>
                                <div className="box-body no-padding">
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <td>วันที่จำหน่าย : &nbsp;<b>{this.state.Disposal.disposalDate}</b></td>
                                            </tr>
                                            <tr>
                                                <td>วิธีจำหน่าย : &nbsp;<b>{this.state.Disposal.disposalMethod}</b></td>
                                            </tr>
                                            <tr>
                                                <td>เลขที่หนังสืออนุมัติ : &nbsp;<b>{this.state.Disposal.disposalapprovalNo}</b></td>
                                            </tr>
                                            <tr>
                                                <td>ราคาจำหน่าย : &nbsp;<b>{this.state.Disposal.disposalPrice}<span className="pull-right">บาท&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></b></td>
                                            </tr>
                                            <tr>
                                                <td>กำไร/ขาดทุน : &nbsp;<b>{this.state.Disposal.profitOrLost}<span className="pull-right">บาท&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></b></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* /.box */}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default withRouter(GeneralDetail)

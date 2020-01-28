import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import { db } from '../../../../common/firebaseConfig'

class GeneralDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: '',
            Depreciations: [],
            Responsibility: [],
            Exploitation: [],
            Disposal: [],
            Maintenance: [],
            imageURL: [],

            statusClass: ''
        }
    }
    _isMounted = false

    depreciations = []
    responsibility = []
    imageURL = []

    componentDidMount() {
        //console.log("id |" + this.props.itemId)
        //console.log("code |" + this.props.itemCode)
        this._isMounted = true;

        this._isMounted && this.getItemDetail()
        this._isMounted && this.getItemDepreciations()
        this._isMounted && this.getResponsibility()
        this._isMounted && this.getImage()
    }

    getItemDetail() {
        db.collection('items').doc(this.props.itemId).get().then(doc => {
            this._isMounted && this.setState({ item: doc.data() })
            //console.log("item |" + this.state.item)
        }).catch(error => console.log(error))
    }

    getItemDepreciations() {
        db.collection('itemDepreciations').where('itemCode', '==', this.props.itemCode).get().then(snapshot => {
            snapshot.forEach(doc => {
                this.depreciations.push(doc.data())
            });
            this._isMounted && this.setState({ Depreciations: this.depreciations })
            //console.log(this.state.Depreciations);
        }).catch(error => console.log(error))
    }

    getResponsibility() {
        db.collection('itemResponsibility').where('itemCode', '==', this.props.itemCode).get().then(snapshot => {
            snapshot.forEach(doc => {
                this.responsibility.push(doc.data())
            });
            this._isMounted && this.setState({ Responsibility: this.responsibility })
            //console.log(this.state.Responsibility);
        }).catch(error => console.log(error))
    }

    async getImage() {
        await db.collection('itemURL').doc(this.props.itemCode).get().then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                this._isMounted && this.setState({ imageURL: doc.data() })
                //console.log('Image data:', typeof(this.state.imageURL));
            }
        }).catch(err => {
            console.log('Error getting document', err);
        });

    }

    generateDepreciationsRows() {
        let depreciationCheck = this.state.Depreciations.map(depreciation => {
            return depreciation
        })
        if (!depreciationCheck.length) {
            return (
                <tr>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                    <td style={{ textAlign: 'center' }}><span className="label label-danger">--&nbsp;ยังไม่มีรายการ&nbsp;--</span></td>
                </tr>
            )
        }
        return (
            this.state.Depreciations && this.state.Depreciations.map(depreciation => (
                <tr key={depreciation.seq}>
                    <td style={{ textAlign: 'center' }}><b>{depreciation.Year}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{depreciation.Balance}</b></td>
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
                <tr key={Responsibility.seq}>
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

    genImage() {
        if (!this.state.imageURL.url) {
            return (<p>ไม่มีรูปภาพ</p>)
        }

        return (
            this.state.imageURL.url && this.state.imageURL.url.map(img => (
                <img 
                    key={img}
                    src={img}
                    alt="img"
                    className="shadow-sm p-3 mb-5 bg-white rounded"
                    style={{
                        width: "23%", height: "23%", objectFit: "cover", marginLeft: "1%", marginRight: "1%", marginBottom: "2%",
                        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19)"
                    }}
                />
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

                    {/*รายละเอียดครุภัณฑ์*/}
                    <div className="row">
                        <div className="col-md-12">
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

                                <div className="box-body no-padding" style={{ fontSize: 19 }}>
                                    <table className="table table-striped with-border">
                                        <tbody>
                                            <tr>
                                                <th style={{ width: "30%" }}></th>
                                                <th style={{ width: "70%" }}></th>
                                            </tr>
                                            <tr>
                                                <td><b>ชื่อพัสดุ</b></td>
                                                <td>{this.state.item.itemName}</td>
                                            </tr>
                                            <tr>
                                                <td><b>ใบส่งของที่</b></td>
                                                <td>{this.state.item.waybillCode}</td>
                                            </tr>
                                            <tr>
                                                <td><b>ชื่อ/ยี่ห้อผู้ทำหรือผลิต</b></td>
                                                <td>{this.state.item.itemBrand}</td>
                                            </tr>
                                            <tr>
                                                <td><b>แบบ/ชนิด/ลักษณะ</b></td>
                                                <td>{this.state.item.itemStyle}</td>
                                            </tr>
                                            <tr>
                                                <td><b>หมายเลขลำดับ</b></td>
                                                <td>{this.state.item.orderNo}</td>
                                            </tr>
                                            <tr>
                                                <td><b>หมายเลขเครื่อง</b></td>
                                                <td>{this.state.item.bodyNo}</td>
                                            </tr>
                                            <tr>
                                                <td><b>หมายเลขกรอบ</b></td>
                                                <td>{this.state.item.frameNo}</td>
                                            </tr>
                                            <tr>
                                                <td><b>หมายเลขจดทะเบียน</b></td>
                                                <td>{this.state.item.regisNo}</td>
                                            </tr>
                                            <tr>
                                                <td><b>สีของพัสดุ</b></td>
                                                <td>{this.state.item.itemColor}</td>
                                            </tr>
                                            <tr>
                                                <td><b>อื่น ๆ</b></td>
                                                <td>{this.state.item.other}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table className="table table-striped with-border">
                                        <tbody>
                                            <tr>
                                                <th style={{ width: "30%" }}></th>
                                                <th style={{ width: "70%" }}></th>
                                            </tr>
                                            <tr>
                                                <td><b>เงือนไข-การประกัน</b></td>
                                                <td>{this.state.item.insuranceTerms}</td>
                                            </tr>
                                            <tr>
                                                <td><b>พัสดุรับประกันถึงวันที่</b></td>
                                                <td>{this.state.item.insuranceExpDate}</td>
                                            </tr>
                                            <tr>
                                                <td><b>พัสดุรับประกันไว้ที่บริษัท</b></td>
                                                <td>{this.state.item.insuranceCompany}</td>
                                            </tr>
                                            <tr>
                                                <td><b>วันที่ประกันพัสดุ</b></td>
                                                <td>{this.state.item.insuranceDate}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table className="table table-striped with-border">
                                        <tbody>
                                            <tr>
                                                <th style={{ width: "30%" }}></th>
                                                <th style={{ width: "70%" }}></th>
                                            </tr>
                                            <tr>
                                                <td><b>ซื้อ/จ้าง/ได้มาจาก</b></td>
                                                <td>{this.state.item.derivedFrom}</td>
                                            </tr>
                                            <tr>
                                                <td><b>ซื้อ/จ้าง/ได้มา เมื่อวันที่</b></td>
                                                <td>{this.state.item.derivedDate}</td>
                                            </tr>
                                            <tr>
                                                <td><b>ราคา</b></td>
                                                <td>{this.state.item.Price} &nbsp; บาท</td>
                                            </tr>
                                            <tr>
                                                <td><b>งบประมาณของ</b></td>
                                                <td>{this.state.item.budgetOf}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table className="table table-striped with-border">
                                        <tbody>
                                            <tr>
                                                <th style={{ width: "30%" }}></th>
                                                <th style={{ width: "70%" }}></th>
                                            </tr>
                                            <tr>
                                                <td><b>หมายเหตุ</b></td>
                                                <td>{this.state.item.Note}</td>
                                            </tr>
                                        </tbody>
                                    </table>


                                </div>
                                {/* /.box-body */}
                            </div>
                            {/* /.box */}
                        </div>




                    </div>

                    {/*ค่าเสื่อมราคา*/}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-danger">
                                <div className="box-header with-border">
                                    <h1 className="box-title" style={{ fontSize: 25 }}>ค่าเสื่อมราคา</h1>
                                    <div className="box-tools pull-right">
                                        <button
                                            type="button"
                                            className="btn btn-box-tool"
                                            style={{ fontSize: 20 }}
                                            onClick={() => this.props.history.push('/depreciation/item-depreciation/' + this.props.itemCode)}>
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
                        </div>
                    </div>

                    {/*ค่าเสื่อมราคา*/}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <h1 className="box-title" style={{ fontSize: 25 }}>การหาผลประโยชน์ในพัสดุ</h1>
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

                    {/*การเปลี่ยนแปลงส่วนราชการและผู้ดูแลรับผิดชอบ*/}
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

                    {/*บันทึกการซ่อม*/}
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

                    {/*รูปถ่ายหรือแผนผังที่ตั้ง*/}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-danger">
                                <div className="box-header with-border">
                                    <h1 className="box-title" style={{ fontSize: 25 }}>รูปถ่ายหรือแผนผังที่ตั้ง</h1>
                                </div>
                                <div className="box-body">
                                    {this.genImage()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*การจำหน่าย*/}
                    <div className="row">
                        <div className="col-md-12">
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

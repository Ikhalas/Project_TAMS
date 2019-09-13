import React, { Component } from 'react'
import axios from 'axios';


export default class LandDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Depreciations: [],
            LandValueIncreases4Years: [],
            Responsibility: [],
            Exploitation:[],
            Disposal:[],
            statusClass : ''
        }
        
    }

    componentDidMount(){
        //console.log(this.props.detail.status)
        if(this.props.detail.status === 'ใช้งานได้ดี') this.setState({statusClass : 'label label-success'})
        else if(this.props.detail.status === 'ชำรุด') this.setState({statusClass : 'label label-warning'})
        else if(this.props.detail.status === 'เสื่อมสภาพ') this.setState({statusClass : 'label label-warning'})
        else if(this.props.detail.status === 'สูญหาย') this.setState({statusClass : 'label label-danger'})
        else this.setState({statusClass : 'label label-primary'})

        let itemCode = this.props.detail.itemCode;
        axios.get('http://localhost:3001/Depreciations?itemCode=' + itemCode).then(
            res => {
                this.setState({ Depreciations: res.data })
                //console.log(this.state.Depreciations)
            }).catch(err => console.log(err))

         axios.get('http://localhost:3001/landValueIncreases4Years?itemCode=' + itemCode).then(
            res => {
                this.setState({ LandValueIncreases4Years: res.data })
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

    generateDepreciationsRows() {
        let depreciationCheck = this.state.Depreciations.map(depreciation => {
            return depreciation.Year
        })
        //console.log(depreciationCheck.length)
            if(!depreciationCheck.length){
                return(
                    <tr>
                        <td style={{textAlign: 'center'}}><b>-</b></td>
                        <td style={{textAlign: 'center'}}><b>-</b></td>
                        <td style={{textAlign: 'center'}}><b>-</b></td>
                        <td style={{textAlign: 'center'}}><span className="label label-danger">--&nbsp;ยังไม่มีรายการ&nbsp;--</span></td>
                    </tr>
                )  
            }

                return (
                    this.state.Depreciations.map(Depreciation => (
                        <tr key={Depreciation.id}>
                            <td style={{textAlign: 'center'}}><b>{Depreciation.Year}</b></td>
                            <td style={{textAlign: 'center'}}><b>{Depreciation.Percent}</b></td>
                            <td style={{textAlign: 'center'}}><b>{Depreciation.Balance}</b></td>
                            <td style={{textAlign: 'center'}}><b>{Depreciation.Note}</b></td>
                        </tr>
                    )) 
                )

    }

    generateResponsibilityRows(){
        let responsibilityCheck = this.state.Responsibility.map(responsibility => {
            return responsibility.Year
        })

        console.log(responsibilityCheck.length)
        if(!responsibilityCheck.length){
            return(
                <tr>
                    <td style={{textAlign: 'center'}}><b>-</b></td>
                    <td style={{textAlign: 'center'}}><b>-</b></td>
                    <td style={{textAlign: 'center'}}><b>-</b></td>
                    <td style={{textAlign: 'center'}}><span className="label label-danger">--&nbsp;ยังไม่มีรายการ&nbsp;--</span>></td>
                </tr>
            )  
        }

        return (
            this.state.Responsibility && this.state.Responsibility.map(Responsibility => (
                <tr key={Responsibility.id}>
                    <td style={{textAlign: 'center'}}><b>{Responsibility.Year}</b></td>
                    <td style={{textAlign: 'center'}}><b>{Responsibility.responsibilityDepartmentName}</b></td>
                    <td style={{textAlign: 'center'}}><b>{Responsibility.responsibilityDepartmentHead}</b></td>
                    <td style={{textAlign: 'center'}}><b>{Responsibility.Note}</b></td>
                </tr>
            )) 
        )
    }

    generateLandValueIncreases4YearsRows(){
        let valueIncreasesCheck = this.state.LandValueIncreases4Years.map(valueIncreases => {
            return valueIncreases.Year
        })
        //console.log(valueIncreasesCheck.length)

        if(!valueIncreasesCheck.length){
            return(
                <tr>
                    <td style={{textAlign: 'center'}}><b>-</b></td>
                    <td style={{textAlign: 'center'}}><b>-</b></td>
                    <td style={{textAlign: 'center'}}><b>-</b></td>
                    <td style={{textAlign: 'center'}}><span className="label label-danger">--&nbsp;ยังไม่มีรายการ&nbsp;--</span></td>
                </tr>
            )
        }
        return (
            this.state.LandValueIncreases4Years && this.state.LandValueIncreases4Years.map(LandValueIncreases4Year => (
                <tr key={LandValueIncreases4Year.id}>
                    <td style={{textAlign: 'center'}}><b>{LandValueIncreases4Year.Year}</b></td>
                    <td style={{textAlign: 'center'}}><b>{LandValueIncreases4Year.Percent}</b></td>
                    <td style={{textAlign: 'center'}}><b>{LandValueIncreases4Year.Balance}</b></td>
                    <td style={{textAlign: 'center'}}><b>{LandValueIncreases4Year.Note}</b></td>
                </tr>
            )) 
        )
    }

    generateExploitationRows(){
        let exploitationCheck = this.state.Exploitation.map(exploitation => {
            return exploitation.Year
        })
        console.log(exploitationCheck.length)

        if(!exploitationCheck.length){
            return(
                <tr>
                    <td style={{textAlign: 'center'}}><b>-</b></td>
                    <td style={{textAlign: 'center'}}><b>-</b></td>
                    <td style={{textAlign: 'center'}}><b>-</b></td>
                    <td style={{textAlign: 'center'}}><span className="label label-danger">--&nbsp;ยังไม่มีรายการ&nbsp;--</span></td>
                </tr>
            )
        }

            return (
                this.state.Exploitation && this.state.Exploitation.map(Exploitation => (
                    <tr key={Exploitation.id}>
                        <td style={{textAlign: 'center'}}><b>{Exploitation.Year}</b></td>
                        <td style={{textAlign: 'center'}}><b>{Exploitation.List}</b></td>
                        <td style={{textAlign: 'center'}}><b>{Exploitation.Benefits}</b></td>
                        <td style={{textAlign: 'center'}}><b>{Exploitation.Note}</b></td>
                    </tr>
                )) 
            )
        
    }

    render() {
        //console.log(this.state.statusClass)
        return (
            <div>
            <section className="content-header">
                <span style={{ fontSize: 35 }}>รายละเอียดพัสดุครุภัณฑ์</span> 
                <span className="pull-right" style={{marginTop:10}}>
                   <span className={this.state.statusClass} style={{fontSize:23}}>{this.props.detail.status}</span>&nbsp;&nbsp;
                </span>
            </section>
            
            <section className="content">
                <span style={{fontSize:23}}>ประเภท&nbsp;&nbsp;:&nbsp;&nbsp;<b>{this.props.detail.itemType}</b></span>
                <span className="pull-right" style={{fontSize:23}}>
                    เลขรหัสพัสดุ&nbsp;&nbsp;:&nbsp;&nbsp;<b>{this.props.detail.itemCode}</b>&nbsp;&nbsp;
                </span>
                
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="box box-success">
                            <div className="box-header with-border">
                                <h1 className="box-title" style={{fontSize:25}}>รายละเอียดครุภัณฑ์</h1>
                            </div>
                            <div className="box-body no-padding">
                                <table className="table table-striped ">
                                    <tbody>
                                        <tr>
                                            <td>ชื่อพัสดุ : &nbsp;<b>{this.props.detail.itemName}</b></td>
                                        </tr>
                                        <tr>
                                            <td>ที่ตั้งพัสดุ : &nbsp;<b>{this.props.detail.Location}</b></td>
                                        </tr>
                                        <tr>
                                            <td>ซื้อ/จ้าง/ได้มา เมื่อวันที่ : &nbsp;<b>{this.props.detail.derivedDate}</b></td>
                                        </tr>
                                        <tr>
                                            <td>เลขที่หนังสืออนุมัติ/ลงวันที่ : &nbsp;<b>{this.props.detail.approvalDate}</b></td>
                                        </tr>
                                        <tr>
                                            <td>ราคา : &nbsp;<b>{this.props.detail.Price}<span className="pull-right" style={{marginRight:40}}>บาท</span></b></td>
                                        </tr>
                                        <tr>
                                            <td>งบประมาณของ : &nbsp;<b>{this.props.detail.budgetOf}</b></td>
                                        </tr>
                                        <tr>
                                            <td>เอกสิทธิ์พัสดุ : &nbsp;<b>{this.props.detail.Certificate}</b></td>
                                        </tr>
                                        <tr>
                                            <td>ชื่อผู้รับจ้าง/ผู้ขาย/ผู้ให้ : &nbsp;<b>{this.props.detail.sellerName}</b></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                ที่ดิน<span style={{marginLeft:40}}>เนื้อที่ :</span>&nbsp;<b>{this.props.detail.Rai}<span className="pull-right" style={{marginRight:50}}>ไร่</span></b><br />
                                                <span style={{marginLeft:65}}>งาน</span> :&nbsp;<b>{this.props.detail.Ngan}<span className="pull-right" style={{marginRight:29}}>ตารางวา</span></b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                โรงเรือน  <span style={{marginLeft:20}}>อาคาร :</span>&nbsp;<b>{this.props.detail.buildingType}</b><br />
                                                <span style={{marginLeft:66}}>วัสดุที่ใช้ก่อสร้าง :</span>&nbsp;<b>{this.props.detail.Material}</b><br />
                                                <span style={{marginLeft:66}}>จำนวนชั้น :</span>&nbsp;<b>{this.props.detail.Floors}<span className="pull-right" style={{marginRight:50}}>ชั้น</span></b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                อื่น ๆ  <span style={{marginLeft:35}}>ลักษณะ/ชนิด :</span>&nbsp;<b>{this.props.detail.otherType}</b><br />
                                                <span style={{marginLeft:68}}>ขนาด :</span>&nbsp;<b>{this.props.detail.otherSize}</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>หมายเหตุ : &nbsp;<b>{this.props.detail.Note}</b></td>
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
                                <h1 className="box-title" style={{fontSize:25}}>ค่าเสื่อมราคา (ถ้ามี)</h1>
                            </div>
                            <div className="box-body">
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                        <td style={{width: 50, textAlign: 'center'}}>ปีที่</td>
                                        <td style={{width: 120, textAlign: 'center'}}>อัตราค่าเสื่อม (%)</td>
                                        <td style={{width: 200, textAlign: 'center'}}>ราคาคงเหลือ</td>
                                        <td style={{textAlign: 'center'}}>หมายเหตุ</td>
                                    </tr>
                                    {this.generateDepreciationsRows()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* /.box */}

                        <div className="box box-danger">
                            <div className="box-header with-border">
                                <h1 className="box-title" style={{fontSize:25}}>มูลค่าเพิ่มขึ้น 4 ปี</h1>
                            </div>
                            <div className="box-body">
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                        <td style={{width: 50, textAlign: 'center'}}>พ.ศ.</td>
                                        <td style={{width: 120, textAlign: 'center'}}>มูลค่าเพิ่มขึ้น (%)</td>
                                        <td style={{width: 200, textAlign: 'center'}}>ราคาคงเหลือ</td>
                                        <td style={{textAlign: 'center'}}>หมายเหตุ</td>
                                    </tr>
                                    {this.generateLandValueIncreases4YearsRows()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* /.box */}

                    </div>
                    {/* /.col */}
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h1 className="box-title" style={{fontSize:25}}>การเปลี่ยนแปลงส่วนราชการและผู้ดูแลรับผิดชอบ</h1>
                            </div>
                            <div className="box-body">
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                        <td style={{width: 50, textAlign: 'center'}}>พ.ศ.</td>
                                        <td style={{width: 300, textAlign: 'center'}}>ชื่อส่วนราชการ (สำนัก, กอง, ฝ่าย)</td>
                                        <td style={{width: 300, textAlign: 'center'}}>ชื่อหัวหน้าส่วนราชการ</td>
                                        <td style={{textAlign: 'center'}}>หมายเหตุ</td>
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
                                <h1 className="box-title" style={{fontSize:25}}>การหาผลประโยชน์ในพัสดุ</h1>
                            </div>
                            <div className="box-body">
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                        <td style={{width: 50, textAlign: 'center'}}>พ.ศ.</td>
                                        <td style={{width: 400, textAlign: 'center'}}>รายการ</td>
                                        <td style={{width: 300, textAlign: 'center'}}>ผลประโยชน์ที่ได้รับเป็นรายเดือนหรือรายปี (บาท)</td>
                                        <td style={{textAlign: 'center'}}>หมายเหตุ</td>
                                    </tr>
                                    {this.generateExploitationRows()}
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
                                <h1 className="box-title" style={{fontSize:25}}>รูปถ่ายหรือแผนผังที่ตั้ง</h1>
                            </div>
                            <div className="box-body">
                                
                            </div>
                        </div>
                    </div>
                        
                    <div className="col-md-6">
                        <div className="box box-danger">
                            <div className="box-header with-border">
                                <h1 className="box-title" style={{fontSize:25}}>การจำหน่าย</h1>
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

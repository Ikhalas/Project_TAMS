import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from "react-router";

class GeneralForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Departments: [],
            Itemtypes: [],
            check_1: false,
            check_2: false
       
        }
    }
    componentDidMount() {
        //console.log("componentDidMount"+this.props.type)
     
       

        const script = document.createElement('script')
        script.src = '/js/addform.js'
        script.async = true
        document.body.appendChild(script)

        axios.get('http://localhost:3001/Department').then(
            res => {
                //console.log(res)
                this.setState({ Departments: res.data })
            }).catch(err => console.log(err))

        
        axios.get('http://localhost:3001/itemType?type=' + this.props.type).then(
            res => {
                //console.log(res.data)
                this.setState({ Itemtypes: res.data })
            }).catch(err => console.log(err))

    }

    componentDidUpdate(prevProps){

        if(this.props.type !== prevProps.type){
            console.log("componentDidUpdate"+this.props.type)
            axios.get('http://localhost:3001/itemType?type=' + this.props.type).then(
                res => {
                    //console.log(res.data)
                    this.setState({ Itemtypes: res.data })
                }).catch(err => console.log(err))
        }
    }

    generateDepartmentOption() {
        return (
            this.state.Departments.map(Department => (
                <option key={Department.id}>{Department.name}</option>
            ))
        )
    }

    generateItemtypeOption() {
        let newItemtype = this.state.Itemtypes.filter(item => {
            return item.type !== "ที่ดิน"
        })
        return (
            newItemtype.map(Itemtype => (
                <option key={Itemtype.id}>{Itemtype.name}</option>
            ))
        )

    }

    onSubmit = (e) => {
        const newItem = {
            "status": "ใช้งานได้ดี",
            "itemType": this.refs.itemType.value,                       //ประเภท
            "Department": this.refs.Department.value,                   //หน่วยงาน      
            "itemCode": this.refs.itemCode.value,                       //เลขรหัส
            "itemName": this.refs.itemName.value,                       //ชื่อ
            "waybillCode": this.refs.waybillCode.value,                 //ใบส่งของ
            "itemBrand": this.refs.itemBrand.value,                     //ยี่ห้อ
            "itemStyle": this.refs.itemStyle.value,                     //แบบ/ชนิด
            "orderNo": this.refs.orderNo.value,                         //เลขลำดับ
            "bodyNo": this.refs.bodyNo.value,                           //เลขเครื่อง
            "frameNo": this.refs.frameNo.value,                         //เลขกรอบ
            "regisNo": this.refs.regisNo.value,                         //เลขจดทะเบียน
            "itemColor": this.refs.itemColor.value,                     //สี
            "other": this.refs.other.value,                             //อื่นๆ
            "insuranceTerms": this.refs.insuranceTerms.value,           //เงื่อนไขประกัน
            "insuranceExpDate": this.refs.insuranceExpDate.value,       //วันหมดประกัน
            "insuranceCompany": this.refs.insuranceCompany.value,       //บริษัทประกัน
            "insuranceDate": this.refs.insuranceDate.value,             //วันที่ประกัน
            "derivedFrom": this.refs.derivedFrom.value,                 //ได้มาจาก               
            "derivedDate": this.refs.derivedDate.value,                 //ได้มาวันที่
            "Price": this.refs.Price.value,                             //ราคา
            "budgetOf": this.refs.budgetOf.value,                       //งบของ
            "Note": this.refs.Note.value,                               //หมายเหตุ
            "thumbnail": ""                                              //รูป
        }

        const ItemResponsibility = {
            "itemCode": this.refs.itemCode.value,
            "itemName": this.refs.itemName.value,
            "itemType": this.refs.itemType.value, 
            "Department": this.refs.Department.value, 
            "Year": this.refs.Year.value,
            "responsibilityDepartmentName": this.refs.responsibilityDepartmentName.value,
            "responsibilityDepartmentHead": this.refs.responsibilityDepartmentHead.value,
            "responsibilityUserName": this.refs.responsibilityUserName.value,
            "Note": ""
        }

        /*const ItemDepreciations = {
            "itemCode": this.refs.itemCode.value,
            "itemName": this.refs.itemName.value,
            "itemType": this.refs.itemType.value, 
            "Department": this.refs.Department.value, 
            "Year": "",
            "Percent": "",
            "Balance": "",
            "Note": ""
        }*/


        /*const ItemExploitation = {
            "itemCode": this.refs.itemCode.value,
            "itemName": this.refs.itemName.value,
            "itemType": this.refs.itemType.value, 
            "Department": this.refs.Department.value, 
            "Year": "",
            "List": "",
            "Benefits": "",
            "Note": ""
        }*/

        /*const ItemMaintenance = {
            "itemCode": this.refs.itemCode.value,
            "itemName": this.refs.itemName.value,
            "itemType": this.refs.itemType.value, 
            "Department": this.refs.Department.value, 
            "No": "",
            "approvalLetter": "",
            "approvalDate": "",
            "List": "",
            "Amount": "",
            "Responsible": ""
        }*/

        /*const Disposal = {
            "itemCode": this.refs.itemCode.value,
            "itemName": this.refs.itemName.value,
            "itemType": this.refs.itemType.value, 
            "Department": this.refs.Department.value,
            "disposalDate": "",                                         //วันที่จำหน่าย
            "disposalMethod": "",                                       //วิธีจำหน่าย
            "disposalapprovalNo": "",                                   //เลขที่หนังสืออนุมัติ
            "disposalPrice": "",                                        //ราคาจำหน่าย
            "profitOrLost": "",                                         //กำไร/ขาดทุน
            "disposalNote": "",                                         //หมายเหตุจการจำหน่าย
        }*/

        this.addItem(newItem)
        this.addItemResponsibility(ItemResponsibility)
        //this.addItemDepreciations(ItemDepreciations)
        //this.addItemMaintenance(ItemMaintenance)
        //this.addItemExploitation(ItemExploitation)
        //this.addItemDisposal(Disposal)

        e.preventDefault();
    }

    addItem(newItem) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Items',
            data: newItem
        }).then(res => {
            this.setState({check_1:true})
        }).catch(err => console.log(err));
    }

    /*******************************************************/
    
    addItemResponsibility(ItemResponsibility) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Responsibility',
            data: ItemResponsibility
        }).then(res => {
            this.setState({check_2:true})
            this.confirmAdd()
        }).catch(err => console.log(err));
    }

    /*******************************************************/
    /*addItemDepreciations(ItemDepreciations) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Depreciations',
            data: ItemDepreciations
        }).then(res => {
            //console.log(res.data)
        }).catch(err => console.log(err));
    }*/

    /*******************************************************/

    /*addItemMaintenance(itemMaintenance) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/itemMaintenance',
            data: itemMaintenance
        }).then(res => {
            //console.log(res.data)
        }).catch(err => console.log(err));
    }*/

    
    /*******************************************************/

    /*addItemExploitation(ItemExploitation) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Exploitation',
            data: ItemExploitation
        }).then(res => {
            
        }).catch(err => console.log(err));
    }*/

    /*******************************************************/

    /*addItemDisposal(Disposal) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Disposaln',
            data: Disposal
        }).then(res => {
            this.props.history.push('/items');
            alert("เพิ่มข้อมูลสำเร็จ")
        }).catch(err => console.log(err));
    }*/

    /*******************************************************/

    confirmAdd(){
        if(this.state.check_1 && this.state.check_2){
            this.props.history.push('/items')
            alert("เพิ่มข้อมูลสำเร็จ")
        }
        else{
            alert("ผิดพลาด")
        }
    }


    render() {
        //console.log(this.props.type)
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>

                    <input
                        type="hidden"
                        name="itemType" /******/
                        ref="itemType"  /******/
                        value={this.props.type}

                    />

                    <div className="box box-success">
                        {/* /.box-header */}
                        <div className="box-body">
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>หน่วยงานที่รับผิดชอบ</label>
                                        <select
                                            className="form-control select2"
                                            style={{ width: '100%' }}
                                            required
                                            name="Department" /******/
                                            ref="Department" /******/
                                        >
                                            <option disabled selected="selected" value="" >-- โปรดเลือกหน่วยงานที่รับผิดชอบ --</option>
                                            {this.generateDepartmentOption()}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>หมายเลขกรอบ (ถ้ามี)</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-calendar" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="frameNo" /*****/
                                                ref="frameNo"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>


                            </div>
                            {/*---------------------------------------------------------------------------------------------------*/}

                            <div className="row">

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>ชื่อพัสดุ</label>
                                        <select
                                            className="form-control select2"
                                            style={{ width: '100%' }}
                                            required
                                            name="itemName" /******/
                                            ref="itemName" /******/
                                        >
                                            <option disabled selected="selected" value="" >-- โปรดเลือกรายการพัสดุครุภัณฑ์ --</option>
                                            {this.generateItemtypeOption()}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>หมายเลขจดทะเบียน (ถ้ามี)</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-compass" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="regisNo" /*****/
                                                ref="regisNo"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/*---------------------------------------------------------------------------------------------------*/}
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>เลขรหัสพัสดุ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-hashtag" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                data-inputmask="'mask': ['999-99-9999']"
                                                data-mask
                                                required
                                                name="itemCode" /*****/
                                                ref="itemCode"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>



                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>สีของพัสดุ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-book" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="itemColor" /*****/
                                                ref="itemColor"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*---------------------------------------------------------------------------------------------------*/}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>ใบส่งของที่</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-money" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="บาท"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="waybillCode" /*****/
                                                ref="waybillCode"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>อื่นๆ (ถ้ามีระบุ)</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-money" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="บาท"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="other" /*****/
                                                ref="other"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*---------------------------------------------------------------------------------------------------*/}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>ชื่อ/ยี่ห้อผู้ทำหรือผลิต</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-certificate" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="itemBrand" /*****/
                                                ref="itemBrand"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>เงื่อนไข - การรับประกัน</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-user" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="insuranceTerms" /*****/
                                                ref="insuranceTerms"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/*---------------------------------------------------------------------------------------------------*/}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>แบบ/ชนิด/ลักษณะ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-certificate" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="itemStyle" /*****/
                                                ref="itemStyle"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>พัสดุรับประกันถึงวันที่</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-user" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="insuranceExpDate" /*****/
                                                ref="insuranceExpDate"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/*---------------------------------------------------------------------------------------------------*/}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>หมายเลขลำดับ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-certificate" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="orderNo" /*****/
                                                ref="orderNo"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>พัสดุรับประกันไว้ที่บริษัท</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-user" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="insuranceCompany" /*****/
                                                ref="insuranceCompany"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/*---------------------------------------------------------------------------------------------------*/}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>หมายเลขเครื่อง (ถ้ามี)</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-certificate" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="bodyNo" /*****/
                                                ref="bodyNo"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>วันที่ประกันพัสดุ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-certificate" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="insuranceDate" /*****/
                                                ref="insuranceDate"  /*****/
                                            />
                                        </div>
                                    </div>
                                </div>


                            </div>
                            {/*---------------------------------------------------------------------------------------------------*/}
                        </div>
                        {/* /.box-body */}
                    </div>
                    {/* /.box box-default */}


                    <div className="row">
                        <div className="col-md-6">
                            <div className="box box-danger">
                                <div className="box-body">
                                    <br/>
                                    <div className="form-group">
                                        <label>ซื้อ/จ้าง/ได้มา จาก</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-arrows-alt" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="derivedFrom" /*****/
                                                ref="derivedFrom"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>ซื้อ/จ้าง/ได้มา เมื่อวันที่</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-arrows-alt" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="derivedDate" /*****/
                                                ref="derivedDate"  /*****/
                                            />
                                        </div>
                                    </div>



                                    <div className="form-group">
                                        <label>ราคา</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-arrows-alt" />
                                            </div>
                                            <input
                                                type="number"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="Price" /*****/
                                                ref="Price"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>งบประมาณของ</label>
                                        <select
                                            className="form-control select2"
                                            style={{ width: '100%' }}
                                            name="budgetOf" /******/
                                            ref="budgetOf" /******/
                                        >
                                            <option disabled selected="selected" value="ยังไม่ได้เลือก" >-- โปรดเลือกหน่วยงานที่รับผิดชอบ --</option>
                                            {this.generateDepartmentOption()}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>หมายเหตุเพิ่มเติม</label>

                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            style={{ fontSize: 20 }}
                                            placeholder="หมายเหตุ ..."
                                            name="Note" /*****/
                                            ref="Note"  /*****/
                                        >
                                        </textarea>

                                    </div>
                                </div>

                            </div>
                            {/* /.box */}

                        </div>
                        {/* /.col (left) */}


                        <div className="col-md-6">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title" style={{ fontSize: 30, marginTop: 10 }}><b>ชื่อผู้ใช้ - ดูแล - รับผิดชอบพัสดุ</b></h3>
                                </div>
                                <div className="box-body">

                                    <div className="form-group">
                                        <label>พ.ศ.</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-calendar" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="Year" /*****/
                                                ref="Year"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>ชื่อส่วนราชการ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-home" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="responsibilityDepartmentName" /*****/
                                                ref="responsibilityDepartmentName"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>ชื่อผู้ใช้พัสดุ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-address-card" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="responsibilityUserName" /*****/
                                                ref="responsibilityUserName"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>ชื่อหัวหน้าส่วนราชการ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-address-card" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="responsibilityDepartmentHead" /*****/
                                                ref="responsibilityDepartmentHead"  /*****/
                                            />
                                        </div>
                                    </div>

                                </div>
                                {/* /.box-body */}
                            </div>
                            {/* /.box */}


                        </div>
                        {/* /.col (right) */}
                    </div>


                    <button className="btn btn-block btn-info title" type="submit" style={{ fontSize: 25 }}>
                        บันทึก
                    </button>

                </form>

            </div >
        )
    }
}

export default withRouter(GeneralForm)

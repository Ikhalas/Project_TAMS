import React, { Component } from 'react'
import { withRouter } from 'react-router';
import axios from 'axios';
import Select from 'react-select';


class GeneralForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Departments: [],
            Itemtypes: [],
            departmentsOption1: null,
            departmentsOption2: null,
            itemNameOption: null,
            check_1: false,
            check_2: false,
            check_3: false
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

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
            console.log("componentDidUpdate" + this.props.type)
            axios.get('http://localhost:3001/itemType?type=' + this.props.type).then(
                res => {
                    //console.log(res.data)
                    this.setState({ Itemtypes: res.data })
                }).catch(err => console.log(err))
        }
    }

  
    onSubmit = (e) => {

        const newItem = {
            "status": "ใช้งานได้ดี",
            "itemType": this.refs.itemType.value,                       //ประเภท
            "Department": this.state.departmentsOption1.value,              //หน่วยงาน      
            "itemCode": this.refs.itemCode.value,                       //เลขรหัส
            "itemName": this.state.itemNameOption.value,                       //ชื่อ
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
            "budgetOf": this.state.departmentsOption2.value,            //งบของ
            "Note": this.refs.Note.value,                               //หมายเหตุ
            "thumbnail": ""                                             //รูป
        }

        console.log(newItem)

        const ItemResponsibility = {
            "itemCode": this.refs.itemCode.value,
            "Year": this.refs.derivedDate.value.substring(6, 10),
            "responsibilityDepartmentName": this.refs.responsibilityDepartmentName.value,
            "responsibilityDepartmentHead": this.refs.responsibilityDepartmentHead.value,
            "responsibilityUserName": this.refs.responsibilityUserName.value,
            "Note": ""
        }

        var price, per, valueYear, perYear, month, valueMonth, perMonth, C, Cumulative

        if (this.refs.yearRate.value > 0) {
            price = this.refs.Price.value
            per = this.refs.Percent.value
            valueYear = (price * per) / 100
            perYear = valueYear.toFixed(2)

            month = this.refs.monthRate.value
            valueMonth = (month * valueYear) / 12
            perMonth = valueMonth.toFixed(2)

            C = valueYear + valueMonth
            Cumulative = C.toFixed(2)
        }
        else {
            price = this.refs.Price.value
            per = this.refs.Percent.value
            valueYear = (price * per) / 100
            perYear = 0

            month = this.refs.monthRate.value
            valueMonth = (month * valueYear) / 12
            perMonth = valueMonth.toFixed(2)

            C = valueMonth
            Cumulative = C.toFixed(2)
        }

        const ItemDepreciations = {
            "itemCode": this.refs.itemCode.value,
            "seq": 0,
            "Year": this.refs.derivedDate.value,
            "Percent": this.refs.Percent.value,
            "lifeTime": this.refs.Percent.value,
            "monthRate": this.refs.monthRate.value,
            "yearRate": this.refs.yearRate.value,
            "Balance": this.refs.Price.value,
            "perYear": perYear,
            "perMonth": perMonth,
            "Cumulative": Cumulative,
            "dNote": this.refs.dNote.value
        }


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
        this.addItemDepreciations(ItemDepreciations)

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
            this.setState({ check_1: true })
        }).catch(err => console.log(err));
    }

    /*******************************************************/

    addItemResponsibility(ItemResponsibility) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Responsibility',
            data: ItemResponsibility
        }).then(res => {
            this.setState({ check_2: true })
        }).catch(err => console.log(err));
    }

    /*******************************************************/
    addItemDepreciations(ItemDepreciations) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Depreciations',
            data: ItemDepreciations
        }).then(res => {
            this.setState({ check_3: true })
            this.confirmAdd()
        }).catch(err => console.log(err));
    }

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
    confirmAdd() {
        if (this.state.check_1 && this.state.check_2 && this.state.check_3) {
            //this.props.history.push('/items')
            alert("เพิ่มข้อมูลสำเร็จ")
        }
        else {
            //this.props.history.push('/items')
            alert("ผิดพลาด")
        }
    }



    handleChange = departmentsOption1 => {
        this.setState(
            { departmentsOption1 },
            //() => console.log(`Option selected:`, this.state.departmentsOption1.value)
        );
    };


    handleChange2 = departmentsOption2 => {
        this.setState(
            { departmentsOption2 },
            //() => console.log(`Option selected2:`, this.state.departmentsOption2.value)
        );
    };

    handleChangeCode = itemNameOption => {
        this.setState(
            { itemNameOption },
            //() => console.log(`Option selected3:`, this.state.itemNameOption.value)
        );
    };


    render() {
        //console.log(this.state.Itemtypes)
        const { departmentsOption1,departmentsOption2,itemNameOption } = this.state;

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
                        <div className="box-header">
                            <h1 className="box-title title" style={{ fontSize: 30, marginTop: 10 }}><b>ข้อมูลเบื่องต้นของพัสดุ</b></h1>
                        </div>
                        <div className="box-body">
                            <div className="row">

                                <div className="col-md-6">


                                    <div>
                                        <div className="form-group">
                                            <label>หน่วยงานที่รับผิดชอบ</label>
                                            <Select
                                                required
                                                options={this.state.Departments}
                                                value={departmentsOption1}
                                                onChange={this.handleChange}
                                                placeholder="--- โปรดเลือกหน่วยงานที่รับผิดชอบ ---"
                                            />
                                        </div>
                                    </div>


                                    <div>
                                        <div className="form-group">
                                            <label>ชื่อพัสดุ</label>
                                            <Select
                                                required
                                                options={this.state.Itemtypes}
                                                value={itemNameOption}
                                                onChange={this.handleChangeCode}
                                                placeholder="--- โปรดเลือกรายการพัสดุครุภัณฑ์ ---"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>เลขรหัสพัสดุ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-hashtag" />
                                            </div>
                                            <input
                                           
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 30, zIndex:0  }}
                                                data-inputmask="'mask': ['999-99-9999']"
                                                data-mask
                                                required
                                                name="itemCode" /*****/
                                                ref="itemCode"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>ใบส่งของที่</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-money" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20, zIndex:0 }}
                                                name="waybillCode" /*****/
                                                ref="waybillCode"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>ชื่อ/ยี่ห้อผู้ทำหรือผลิต</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-certificate" />
                                            </div>
                                            <input

                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20, zIndex:0 }}
                                                name="itemBrand" /*****/
                                                ref="itemBrand"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>แบบ/ชนิด/ลักษณะ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-certificate" />
                                            </div>
                                            <input

                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20, zIndex:0 }}
                                                name="itemStyle" /*****/
                                                ref="itemStyle"  /*****/
                                            />
                                        </div>
                                    </div>

                                </div> {/*col-md-6*/}

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

                                    <div className="form-group">
                                        <label>อื่นๆ (ถ้ามี)</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-money" />
                                            </div>
                                            <input

                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="other" /*****/
                                                ref="other"  /*****/
                                            />
                                        </div>
                                    </div>

                                </div> {/*col-md-6*/}
                            </div> {/*row*/}

                        </div>
                        {/* /.box-body */}
                    </div>
                    {/* /.box box-default */}


                    <div className="row">
                        <div className="col-md-6">
                            {/* ที่มาของพัสดุ */}
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h1 className="box-title title" style={{ fontSize: 30, marginTop: 10 }}><b>ที่มาของพัสดุ</b></h1>
                                </div>
                                <div className="box-body">
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
                                                className="form-control datepicker"
                                                id="inputdatepicker"
                                                data-date-format="dd/mm/yyyy"
                                                placeholder="วัน/เดือน/ปี"
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
                                                min="0"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="Price" /*****/
                                                ref="Price"  /*****/
                                            />
                                            <span className="input-group-addon" style={{ fontSize: 20 }}>บาท</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>งบประมาณของ</label>
                                        <Select
                                            required
                                            options={this.state.Departments}
                                            value={departmentsOption2}
                                            onChange={this.handleChange2}
                                            placeholder="--- โปรดเลือกหน่วยงานที่รับผิดชอบ ---"
                                        />
                                        <br />
                                    </div>

                                </div>

                                <div className="box-header">
                                    <h1 className="box-title title" style={{ fontSize: 30, marginTop: 10 }}><b>การประกันพัสดุ</b></h1>
                                </div>
                                <div className="box-body">
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

                                    <div className="form-group">
                                        <label>วันที่ประกันพัสดุ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-certificate" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control datepicker"
                                                id="inputdatepicker"
                                                data-date-format="dd/mm/yyyy"
                                                placeholder="วัน/เดือน/ปี"
                                                style={{ fontSize: 20 }}
                                                name="insuranceDate" /*****/
                                                ref="insuranceDate"  /*****/
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>พัสดุรับประกันถึงวันที่</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-user" />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control datepicker"
                                                id="inputdatepicker"
                                                data-date-format="dd/mm/yyyy"
                                                placeholder="วัน/เดือน/ปี"
                                                style={{ fontSize: 20 }}
                                                name="insuranceExpDate" /*****/
                                                ref="insuranceExpDate"  /*****/
                                            />
                                        </div>
                                    </div>





                                </div>
                            </div>
                            {/* /.box */}
                            <div className="box box-default">
                                <div className="box-body">
                                    <div className="form-group">
                                        <label>หมายเหตุเพิ่มเติม(ของพัสดุชิ้นนี้)</label>

                                        <textarea
                                            component="textarea"
                                            className="form-control"
                                            rows="3"
                                            style={{ fontSize: 20 }}
                                            placeholder="หมายเหตุ ..."
                                            name="Note" /*****/
                                            ref="Note"  /*****/
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /.col (left) */}


                        <div className="col-md-6">
                            {/* ชื่อผู้ใช้ - ดูแล - รับผิดชอบพัสดุ */}
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title" style={{ fontSize: 30, marginTop: 10 }}><b>ชื่อผู้ใช้ - ดูแล - รับผิดชอบพัสดุ</b></h3>
                                </div>
                                <div className="box-body">
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


                            {/* อัตราค่าเสื่อมราคา */}
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title" style={{ fontSize: 30, marginTop: 10 }}><b>อัตราค่าเสื่อมราคา</b></h3>
                                </div>
                                <div className="box-body">

                                    <div className="form-group">
                                        <label>อัตราค่าเสื่อมสภาพ</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-calendar" />
                                            </div>
                                            <input
                                                type="number"
                                                min="0"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="Percent" /*****/
                                                ref="Percent"  /*****/
                                            />
                                            <span className="input-group-addon" style={{ fontSize: 20 }}>%</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>อายุการใช้งาน</label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-home" />
                                            </div>
                                            <input
                                                type="number"
                                                min="0"
                                                className="form-control"
                                                style={{ fontSize: 20 }}
                                                name="lifeTime" /*****/
                                                ref="lifeTime"  /*****/
                                            />
                                            <span className="input-group-addon" style={{ fontSize: 20 }}>ปี</span>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-xs-6">
                                            <div className="form-group">
                                                <label>รายปี</label>
                                                <div className="input-group">
                                                    <div className="input-group-addon">
                                                        <i className="fa fa-address-card" />
                                                    </div>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        className="form-control"
                                                        style={{ fontSize: 20 }}
                                                        name="yearRate" /*****/
                                                        ref="yearRate"  /*****/
                                                    />
                                                    <span className="input-group-addon" style={{ fontSize: 20 }}>ปี</span>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="col-xs-6">
                                            <div className="form-group">
                                                <label>รายเดือน</label>
                                                <div className="input-group">
                                                    <div className="input-group-addon">
                                                        <i className="fa fa-address-card" />
                                                    </div>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        className="form-control"
                                                        style={{ fontSize: 20 }}
                                                        name="monthRate" /*****/
                                                        ref="monthRate"  /*****/
                                                    />
                                                    <span className="input-group-addon" style={{ fontSize: 20 }}>เดือน</span>
                                                </div>
                                            </div>

                                        </div>


                                    </div>

                                    <div className="form-group">
                                        <label>หมายเหตุ</label>
                                        <textarea
                                            component="textarea"
                                            className="form-control"
                                            rows="2"
                                            style={{ fontSize: 20 }}
                                            placeholder="หมายเหตุ ..."
                                            name="dNote" /*****/
                                            ref="dNote"  /*****/
                                        />
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

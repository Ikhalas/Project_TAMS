import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import ItemDepreciation from '../depreciation/ItemDepreciation'
import AddResponsibility from '../responsibility/AddResponsibility'
import AddBenefit from '../benefit/AddBenefit'
import AddMaintenance from '../maintenance/AddMaintenance'

import { db } from '../../../../common/firebaseConfig'

const modalStyles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f9f9f9',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '25px'

    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000
    },
};

class GeneralDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: '',
            Depreciations: [],
            Responsibility: [],
            Benefit: [],
            Disposal: [],
            Maintenance: [],
            imageURL: [],

            opacity: 0.2,

            statusClass: '',

            depModalIsOpen: false,
            editModalIsOpen: false,
            resModalIsOpen: false,
            beModalIsOpen: false,
            mainModalIsOpen: false,
        }

        this.DepOpenModal = this.DepOpenModal.bind(this);
        this.DepCloseModal = this.DepCloseModal.bind(this);

        this.editOpenModal = this.editOpenModal.bind(this);
        this.editCloseModal = this.editCloseModal.bind(this);

        this.resOpenModal = this.resOpenModal.bind(this);
        this.resCloseModal = this.resCloseModal.bind(this);

        this.benefitOpenModal = this.benefitOpenModal.bind(this);
        this.benefitCloseModal = this.benefitCloseModal.bind(this);

        this.mainOpenModal = this.mainOpenModal.bind(this);
        this.mainCloseModal = this.mainCloseModal.bind(this);
    }
    _isMounted = false
   
    depreciations = []
    responsibility = []
    benefit = []
    maintenance = []
    imageURL = []

    componentDidMount() {
        //console.log("id |" + this.props.itemId)
        //console.log("code |" + this.props.itemCode)
        this._isMounted = true;
        this._isMounted && this.getItemDetail()
        this._isMounted && this.getItemDepreciations()
        this._isMounted && this.getResponsibility()
        this._isMounted && this.getBenefit()
        this._isMounted && this.getMaintenance()
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

    getBenefit() {
        db.collection('itemBenefit').where('itemCode', '==', this.props.itemCode).get().then(snapshot => {
            snapshot.forEach(doc => {
                this.benefit.push(doc.data())
            });
            this._isMounted && this.setState({ Benefit: this.benefit })
            //console.log(this.state.Benefit);
        }).catch(error => console.log(error))
    }

    getMaintenance() {
        db.collection('itemMaintenance').where('itemCode', '==', this.props.itemCode).get().then(snapshot => {
            snapshot.forEach(doc => {
                this.maintenance.push(doc.data())
            });
            this._isMounted && this.setState({ Maintenance: this.maintenance })
            //console.log(this.state.Maintenance);
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
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                </tr>
            )
        }
        const sorted = this.state.Depreciations
        this.state.Depreciations && sorted.sort((a, b) => (a.seq > b.seq) ? 1 : -1) //sort seq
        return (
            sorted && sorted.map(depreciation => (
                <tr key={depreciation.seq}>
                    <td style={{ textAlign: 'center' }}><b>{depreciation.Year}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{depreciation.Balance}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{depreciation.dNote}</b></td>
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
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                </tr>
            )
        }
        const sorted = this.state.Responsibility
        this.state.Responsibility && sorted.sort((a, b) => (a.seq > b.seq) ? 1 : -1) //sort seq
        return (
            sorted && sorted.map(Responsibility => (
                <tr key={Responsibility.seq}>
                    <td style={{ textAlign: 'center' }}><b>{Responsibility.Year}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{Responsibility.responsibilityDepartmentName}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{Responsibility.responsibilityDepartmentHead}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{Responsibility.responsibilityUserName}</b></td>
                </tr>
            ))
        )
    }

    generateBenefitRows() {
        let benefitCheck = this.state.Benefit.map(benefit => {
            return benefit
        })
        //console.log(benefitCheck.length)

        if (!benefitCheck.length) {
            return (
                <tr>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                    <td style={{ textAlign: 'center' }}><span className="label label-danger">--&nbsp;ยังไม่มีรายการ&nbsp;--</span></td>
                    <td style={{ textAlign: 'center' }}><b>-</b></td>
                </tr>
            )
        }
        const sorted = this.state.Benefit
        this.state.Benefit && sorted.sort((a, b) => (a.seq > b.seq) ? 1 : -1) //sort seq
        return (
            sorted && sorted.map(benefit => (
                <tr key={benefit.seq}>
                    <td style={{ textAlign: 'center' }}><b>{benefit.date}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{benefit.detail}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{benefit.total}</b></td>
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
        const sorted = this.state.Maintenance
        this.state.Maintenance && sorted.sort((a, b) => (a.seq > b.seq) ? 1 : -1) //sort seq
        return (
            sorted && sorted.map(maintenance => (
                <tr key={maintenance.seq}>
                    <td style={{ textAlign: 'center' }}><b>{maintenance.No}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{maintenance.docNo}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{maintenance.date}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{maintenance.detail}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{maintenance.amount}</b></td>
                    <td style={{ textAlign: 'center' }}><b>{maintenance.responsible}</b></td>
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

    DepOpenModal() {
        this.setState({ depModalIsOpen: true });
        document.body.style.overflow = 'hidden';
    }

    DepCloseModal() {
        this.setState({ depModalIsOpen: false });
        document.body.style.overflow = 'unset';
    }

    editOpenModal() {
        this.setState({ editModalIsOpen: true });
        document.body.style.overflow = 'hidden'
    }

    editCloseModal() {
        this.setState({ editModalIsOpen: false });
        document.body.style.overflow = 'unset';
    }

    resOpenModal() {
        this.setState({ resModalIsOpen: true });
        document.body.style.overflow = 'hidden'
    }

    resCloseModal() {
        this.setState({ resModalIsOpen: false });
        document.body.style.overflow = 'unset';
    }

    benefitOpenModal() {
        this.setState({ beModalIsOpen: true });
        document.body.style.overflow = 'hidden'
    }

    benefitCloseModal() {
        this.setState({ beModalIsOpen: false });
        document.body.style.overflow = 'unset';
    }

    mainOpenModal() {
        this.setState({ mainModalIsOpen: true });
        document.body.style.overflow = 'hidden'
    }

    mainCloseModal() {
        this.setState({ mainModalIsOpen: false });
        document.body.style.overflow = 'unset';
    }

    mouseEnter = () => {
        //console.log('mouse enter')
        this.setState({ opacity: 1 })
    }

    mouseLeave = () => {
        //console.log('mouse leave')
        this.setState({ opacity: 0.2 })
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

                            <div className="box box-success" style={{ borderRadius: '10px' }}>
                                <div className="box-header with-border">
                                    <h1 className="box-title" style={{ fontSize: 25 }}>รายละเอียดครุภัณฑ์</h1>
                                    <div className="box-tools pull-right">

                                    </div>
                                </div>

                                <div className="box-body no-padding" style={{ fontSize: 19 }}>
                                    <table className="table table-striped with-border">
                                        <tbody>
                                            <tr>
                                                <th style={{ width: "25%" }}></th>
                                                <th style={{ width: "65%" }}></th>
                                                <th style={{ width: "10%" }}></th>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} >
                                                <td><b>ชื่อพัสดุ</b></td>
                                                <td>{this.state.item.itemName}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>ใบส่งของที่</b></td>
                                                <td>{this.state.item.waybillCode}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>ชื่อ/ยี่ห้อผู้ทำหรือผลิต</b></td>
                                                <td>{this.state.item.itemBrand}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>แบบ/ชนิด/ลักษณะ</b></td>
                                                <td>{this.state.item.itemStyle}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>หมายเลขลำดับ</b></td>
                                                <td>{this.state.item.orderNo}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>หมายเลขเครื่อง</b></td>
                                                <td>{this.state.item.bodyNo}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>หมายเลขกรอบ</b></td>
                                                <td>{this.state.item.frameNo}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>หมายเลขจดทะเบียน</b></td>
                                                <td>{this.state.item.regisNo}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>สีของพัสดุ</b></td>
                                                <td>{this.state.item.itemColor}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>อื่น ๆ</b></td>
                                                <td>{this.state.item.other}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table className="table table-striped with-border">
                                        <tbody>
                                            <tr>
                                                <th style={{ width: "25%", backgroundColor: '#f0f0f0' }}></th>
                                                <th style={{ width: "65%", backgroundColor: '#f0f0f0' }}></th>
                                                <th style={{ width: "10%", backgroundColor: '#f0f0f0' }}></th>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>เงือนไข-การประกัน</b></td>
                                                <td>{this.state.item.insuranceTerms}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>พัสดุรับประกันถึงวันที่</b></td>
                                                <td>{this.state.item.insuranceExpDate}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>พัสดุรับประกันไว้ที่บริษัท</b></td>
                                                <td>{this.state.item.insuranceCompany}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>วันที่ประกันพัสดุ</b></td>
                                                <td>{this.state.item.insuranceDate}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table className="table table-striped with-border">
                                        <tbody>
                                            <tr>
                                                <th style={{ width: "25%", backgroundColor: '#f0f0f0' }}></th>
                                                <th style={{ width: "65%", backgroundColor: '#f0f0f0' }}></th>
                                                <th style={{ width: "10%", backgroundColor: '#f0f0f0' }}></th>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>ซื้อ/จ้าง/ได้มาจาก</b></td>
                                                <td>{this.state.item.derivedFrom}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>ซื้อ/จ้าง/ได้มา เมื่อวันที่</b></td>
                                                <td>{this.state.item.derivedDate}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>ราคา</b></td>
                                                <td>{this.state.item.Price} &nbsp; บาท</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>งบประมาณของ</b></td>
                                                <td>{this.state.item.budgetOf}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table className="table table-striped with-border">
                                        <tbody>
                                            <tr>
                                                <th style={{ width: "25%", backgroundColor: '#f0f0f0' }}></th>
                                                <th style={{ width: "65%", backgroundColor: '#f0f0f0' }}></th>
                                                <th style={{ width: "10%", backgroundColor: '#f0f0f0' }}></th>
                                            </tr>
                                            <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                <td><b>หมายเหตุ</b></td>
                                                <td>{this.state.item.Note}</td>
                                                <td>
                                                    <a style={{ color: '#7c7c7c', opacity: this.state.opacity }} href="#edit" onClick={this.editOpenModal}>
                                                        &nbsp;<i className="fa fa-pencil" />
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*ส่วนราชการและผู้ดูแลรับผิดชอบ*/}
                    <div className="row" style={{ fontSize: 19 }}>
                        <div className="col-md-12">
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <h1 className="box-title" style={{ fontSize: 25 }}>ส่วนราชการและผู้ดูแลรับผิดชอบ</h1>
                                    <div className="box-tools pull-right">
                                        <button
                                            type="button"
                                            className="btn btn-box-tool"
                                            style={{ fontSize: 20 }}
                                            onClick={this.resOpenModal}
                                        >
                                            <i className="fa fa-plus" />
                                            <span>&nbsp;เพิ่มรายการ&nbsp;&nbsp;</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '10%', textAlign: 'center' }}>พ.ศ.</td>
                                                <td style={{ width: '30%', textAlign: 'center' }}>ชื่อส่วนราชการ</td>
                                                <td style={{ width: '30%', textAlign: 'center' }}>ชื่อหัวหน้าส่วนราชการ</td>
                                                <td style={{ width: '30%', textAlign: 'center' }}>ชื่อผู้ใช้</td>
                                            </tr>
                                            {this.generateResponsibilityRows()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* /.box */}
                        </div>
                    </div>

                    {/*ค่าเสื่อมราคา*/}
                    <div className="row" style={{ fontSize: 19 }}>
                        <div className="col-md-12">
                                <div className="box box-success" style={{ borderRadius: '10px' }}>
                                    <div className="box-header with-border">
                                        <h1 className="box-title" style={{ fontSize: 25 }}>ค่าเสื่อมราคา</h1>
                                        <div className="box-tools pull-right">
                                            <button
                                                type="button"
                                                className="btn btn-box-tool"
                                                style={{ fontSize: 20 }}
                                                onClick={this.DepOpenModal}
                                            >
                                                <i className="fa fa-plus" />
                                                <span>&nbsp;รายละเอียด/เพิ่มรายการ&nbsp;&nbsp;</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: '15%', textAlign: 'center' }}>วันที่</td>
                                                    <td style={{ width: '55%', textAlign: 'center' }}>ราคาคงเหลือ</td>
                                                    <td style={{ width: '30%', textAlign: 'center' }}>หมายเหตุ</td>
                                                </tr>
                                                {this.generateDepreciationsRows()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        </div>
                    </div>

                    {/*การหาผลประโยชน์ในพัสดุ*/}
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
                                            onClick={this.benefitOpenModal}
                                        >
                                            <i className="fa fa-plus" />&nbsp;เพิ่มรายการ&nbsp;&nbsp;
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%', textAlign: 'center' }}>พ.ศ.</td>
                                                <td style={{ width: '55%', textAlign: 'center' }}>รายการ</td>
                                                <td style={{ width: '30%', textAlign: 'center' }}>ผลประโยชน์ที่ได้รับ (บาท)</td>
                                            </tr>
                                            {this.generateBenefitRows()}
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
                                    <div className="box-tools pull-right">
                                        <button
                                            type="button"
                                            className="btn btn-box-tool"
                                            style={{ fontSize: 20 }}
                                            onClick={this.mainOpenModal}
                                        >
                                            <i className="fa fa-plus" />&nbsp;เพิ่มรายการ&nbsp;&nbsp;
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '5%', textAlign: 'center' }}>ครั้งที่</td>
                                                <td style={{ width: '8%', textAlign: 'center' }}>เลขที่หนังสือ</td>
                                                <td style={{ width: '9%', textAlign: 'center' }}>ลงวันที่</td>
                                                <td style={{ width: '38%', textAlign: 'center' }}>รายการซ่อม/ปรับปรุงแก้ไข</td>
                                                <td style={{ width: '10%', textAlign: 'center' }}>จำนวนเงิน(บาท)</td>
                                                <td style={{ width: '30%', textAlign: 'center' }}>ชื่อบุคคล-บริษัทผู้ซ่อม/ปรังปรุง</td>
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
                                    <h1 className="box-title" style={{ fontSize: 25 }}>รูปถ่ายพัสดุครุภัณฑ์</h1>
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

                    {/*Edit Modal*/}
                    <Modal
                        isOpen={this.state.editModalIsOpen}
                        closeTimeoutMS={500}
                        onRequestClose={this.editCloseModal}
                        style={modalStyles}
                        contentLabel="Edit Modal"
                    >
                        <div style={{ width: 500, height: 100 }}>

                        </div>
                    </Modal>

                    {/*Responsibility Modal*/}
                    <Modal
                        isOpen={this.state.resModalIsOpen}
                        closeTimeoutMS={500}
                        onRequestClose={this.resCloseModal}
                        style={modalStyles}
                        contentLabel="Responsibility Modal"
                    >
                        <div style={{ width: 1000 }}>

                            <AddResponsibility itemCode={this.props.itemCode} responsibility={this.state.Responsibility} />
                        </div>
                    </Modal>

                    {/*Depreciations Modal*/}
                    <Modal
                        isOpen={this.state.depModalIsOpen}
                        closeTimeoutMS={500}
                        onRequestClose={this.DepCloseModal}
                        style={modalStyles}
                        contentLabel="Depreciations Modal"
                    >
                        <div style={{ width: 1000 }}>

                            <ItemDepreciation itemCode={this.props.itemCode} depreciations={this.state.Depreciations} />
                        </div>
                    </Modal>

                    {/*Benefit Modal*/}
                    <Modal
                        isOpen={this.state.beModalIsOpen}
                        closeTimeoutMS={500}
                        onRequestClose={this.benefitCloseModal}
                        style={modalStyles}
                        contentLabel="benefit Modal"
                    >
                        <div style={{ width: 1000 }}>
                            <AddBenefit itemCode={this.props.itemCode} benefit={this.state.Benefit} />
                        </div>
                    </Modal>

                    {/*Maintenance Modal*/}
                    <Modal
                        isOpen={this.state.mainModalIsOpen}
                        closeTimeoutMS={500}
                        onRequestClose={this.mainCloseModal}
                        style={modalStyles}
                        contentLabel="Maintenance Modal"
                    >
                        <div style={{ width: 1000 }}>
                            <AddMaintenance itemCode={this.props.itemCode} maintenance={this.state.Maintenance} />
                        </div>
                    </Modal>

                </section>
            </div>
        )
    }
}

export default withRouter(GeneralDetail)

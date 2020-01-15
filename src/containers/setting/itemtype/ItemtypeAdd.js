import React, { Component } from 'react'
import Select from 'react-select';
import { db } from '../../../common/firebaseConfig'

export default class ItemtypeAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            codeCheck: true,  //false = Duplicate
            types: [],
            selectedOption: null
        }
        this._isMounted = false;

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.getTypeData()
    }

    getTypeData() {
        db.collection('types').orderBy('label').get().then(snapshot => {
            let types = []
            snapshot.forEach(doc => {
                let data = doc.data()
                types.push(data)
            })
            this._isMounted && this.setState({ types: types })
            //console.log(this.state.types)
        }).catch(error => console.log(error))
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        //console.log(`Option selected:`, this.state.selectedOption);  
    };


    async onSubmit(e) {
        e.preventDefault();

        await db.collection('itemTypes').get().then(snapshot => {
            snapshot.forEach(doc => {
                let data = doc.data()
                if (this.refs.code.value === data.code) {
                    console.log("Duplicate name")
                    this.setState({ codeCheck: false })
                    //console.log(this.state.codeCheck)
                }
                else {
                    this.setState({ codeCheck: true })
                    //console.log(this.state.codeCheck) 
                }
            })
        }).catch(error => console.log(error))

        if (this.state.codeCheck === true) {
            this.addItemtype()
        }
    }

    addItemtype() {
        const newItemtype = {
            code: this.refs.code.value,
            type: this.state.selectedOption.value,
            name: this.refs.name.value,
            note: this.refs.note.value
        }

        let result = "itemType"
        db.collection('itemTypes').add(newItemtype).then(() => {
            console.log("add complete !!")
            this.props.history.push('/resetting/' + result)
        })

    }

    componentWillUnmount() {  //cancel subscriptions and asynchronous tasks
        this._isMounted = false;
    }

    render() {
        const { selectedOption } = this.state;
        return (
            <div>
                <div className="content-wrapper title">
                    <section className="content-header">
                        <h1>
                            <span style={{ fontSize: 35 }}>&nbsp;เพิ่มรายการประเภทพัสดุครุภัณฑ์</span>
                        </h1>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="col-xs-12">

                                <form onSubmit={this.onSubmit}>

                                    <label className="title" style={{ fontSize: 20 }}>ประเภทพัสดุครุภัณฑ์</label>

                                    <Select
                                        value={selectedOption}
                                        onChange={this.handleChange}
                                        options={this.state.types}
                                    />


                                    <label className="title" style={{ fontSize: 20, marginTop: 10 }}>เลขรหัสพัสดุครุภัณฑ์</label>
                                    <input
                                        type="text"
                                        name="code"
                                        ref="code"
                                        className="form-control"
                                        data-inputmask="'mask': ['999']"
                                        data-mask
                                        style={{ fontSize: 20 }}
                                        required
                                    />

                                    {!this.state.codeCheck &&
                                        <div style={{ marginTop: 10 }} className="callout callout-warning">
                                            <p style={{ fontSize: 17 }}>เลขรหัสพัสดุครุภัณฑ์มีอยู่ในระบบแล้ว</p>
                                        </div>
                                    }

                                    <label className="title" style={{ fontSize: 20, marginTop: 10 }}>ชื่อพัสดุครุภัณฑ์</label>
                                    <input
                                        type="text"
                                        name="name"
                                        ref="name"
                                        className="form-control"
                                        style={{ fontSize: 20 }}
                                        required
                                    />

                                    <label className="title" style={{ fontSize: 20, marginTop: 10 }}>รายละเอียดอื่น ๆ</label>
                                    <input
                                        type="text"
                                        name="note"
                                        ref="note"
                                        className="form-control"
                                        style={{ fontSize: 20 }}
                                    />
                                    <br />

                                    <div className="row">
                                        <div className="col-xs-12">
                                            <button className="btn btn-primary btn-sm title pull-left" onClick={() => this.props.history.push('/setting')}>&nbsp;ย้อนกลับ&nbsp;</button>

                                            <div className="pull-right">
                                                <button className="btn btn-success btn-sm title" type="submit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;บันทึก&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

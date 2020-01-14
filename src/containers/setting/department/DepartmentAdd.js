import React, { Component } from 'react'
import { db } from '../../../common/firebaseConfig'

export default class DepartmentAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            codeCheck: true,   //false = Duplicate
            labelCheck: true
        }
        //console.log("con|" + this.state.codeCheck)
    }

    async onSubmit(e) {
        e.preventDefault();
        await db.collection('departments').get().then(snapshot => {
            snapshot.forEach(doc => {
                let data = doc.data()
                if (this.refs.code.value === data.code) {
                    console.log("Duplicate code")
                    this.setState({ codeCheck: false })
                    //console.log(this.state.codeCheck)
                }
                else {
                    this.setState({ codeCheck: true })
                    //console.log(this.state.codeCheck)
                }
                if (this.refs.name.value === data.label) {
                    console.log("Duplicate name")
                    this.setState({ labelCheck: false })
                    //console.log(this.state.codeCheck)
                }
                else {
                    this.setState({ labelCheck: true })
                    //console.log(this.state.codeCheck)    
                }
            })
        }).catch(error => console.log(error))

        if (this.state.codeCheck === true) {
            const newDepartment = {
                code: this.refs.code.value,
                value: this.refs.name.value,
                label: this.refs.name.value,
                address: this.refs.address.value,
                note: this.refs.note.value,
            }
            this.addDepartment(newDepartment)
        }
    }

    addDepartment(newDepartment) {
        let result = "department"
        db.collection('departments').add(newDepartment).then(() => {
            console.log("add complete !!")
            this.props.history.push('/resetting/' + result)
        })

    }

    render() {
        return (
            <div>
                <div className="content-wrapper title">
                    <section className="content-header">
                        <h1>
                            <span style={{ fontSize: 35 }}>&nbsp;เพิ่มรายการชื่อหน่วยงาน</span>
                        </h1>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="col-xs-12">
                                <form onSubmit={this.onSubmit.bind(this)}>
                                    <label className="title" style={{ fontSize: 20 }}>เลขรหัสหน่วยงาน</label>
                                    <input
                                        type="text"
                                        name="code"
                                        ref="code"
                                        className="form-control"
                                        style={{ fontSize: 20 }}
                                        required
                                    />
                                    {!this.state.codeCheck &&
                                        <div style={{ marginTop: 10 }} className="callout callout-warning">
                                            <p style={{ fontSize: 17 }}>เลขรหัสหน่วยงานมีอยู่ในระบบแล้ว</p>
                                        </div>
                                    }

                                    <label className="title" style={{ fontSize: 20, marginTop: 10 }}>ชื่อหน่วยงาน</label>
                                    <input
                                        type="text"
                                        name="name"
                                        ref="name"
                                        className="form-control"
                                        style={{ fontSize: 20 }}
                                        required
                                    />
                                    {!this.state.labelCheck &&
                                        <div style={{ marginTop: 10 }} className="callout callout-warning">
                                            <p style={{ fontSize: 17 }}>ชื่อหน่วยงานมีอยู่ในระบบแล้ว</p>
                                        </div>
                                    }

                                    <label className="title" style={{ fontSize: 20, marginTop: 10 }}>ที่อยู่หน่วยงาน</label>
                                    <input
                                        type="text"
                                        name="address"
                                        ref="address"
                                        className="form-control"
                                        style={{ fontSize: 20 }}
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

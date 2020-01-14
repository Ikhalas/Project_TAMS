import React, { Component } from 'react'
import { db } from '../../../common/firebaseConfig'

export default class TypeAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labelCheck: true  //false = Duplicate
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    async onSubmit(e) {
        //console.log("onSubmit| " + this.state.labelCheck)
        e.preventDefault();

        await db.collection('types').get().then(snapshot => {
            snapshot.forEach(doc => {
                let data = doc.data()

                console.log(this.refs.name.value + "|" + data.label)

                if (this.refs.name.value === data.label) {
                    console.log("Duplicate name")
                    this.setState({ labelCheck: false })
                    //console.log(this.state.labelCheck)
                }
                else {
                    this.setState({ labelCheck: true })
                    //console.log(this.state.labelCheck)
                }
            })
        }).catch(error => console.log(error))

        if (this.state.labelCheck === true) {
            var name = this.refs.name.value
            const newType = {
                label: name,
                value: name,
                note: this.refs.note.value,
            }
            this.addType(newType)
        }
    }

    addType(newType) {
        let result = "type"
        db.collection('types').add(newType).then(() => {
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
                            <span style={{ fontSize: 35 }}>&nbsp;เพิ่มรายการประเภทพัสดุครุภัณฑ์</span>
                        </h1>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="col-xs-12">

                                <form onSubmit={this.onSubmit}>
                                    <label className="title" style={{ fontSize: 20 }}>ประเภท</label>
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
                                            <p style={{ fontSize: 17 }}>รายการประเภทมีอยู่ในระบบแล้ว</p>
                                        </div>
                                    }

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

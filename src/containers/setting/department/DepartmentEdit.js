import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { db } from '../../../common/firebaseConfig'

class DepartmentEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: '',
            label: '',
            address: '',
            note: '',

            departmentId: this.props.match.params.id
        }
    }

    componentDidMount() {
        this.getDepartmentData()
    }

    getDepartmentData() {
        db.collection('departments').doc(this.state.departmentId).get().then(doc => {
            //console.log('Document data:', doc.data());
            this.setState({
                code: doc.data().code,
                label: doc.data().label,
                address: doc.data().address,
                note: doc.data().note
            })
        }).catch(err => console.log('Error getting document', err))
    }

    handleInputChange(e) {
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        let departmentName = this.refs.label.value
        db.collection("departments").doc(this.state.departmentId).update({
            code: this.refs.code.value,
            value: departmentName,
            label: departmentName,
            address: this.refs.address.value,
            note: this.refs.note.value,
        }).then(() => {
            this.props.history.push('/setting/department-detail/' + this.state.departmentId)
        })
    }

    render() {

        return (
            <div>
                <div className="content-wrapper title">
                    <section className="content-header">
                        <h1>
                            <span style={{ fontSize: 35 }}>&nbsp;แก้ไขรายการชื่อหน่วยงาน</span>
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
                                        value={this.state.code}
                                        onChange={this.handleInputChange.bind(this)}
                                        style={{ fontSize: 20 }}
                                        required
                                    />
                                    <label className="title" style={{ fontSize: 20, marginTop: 10 }}>ชื่อหน่วยงาน</label>
                                    <input
                                        type="text"
                                        name="label"
                                        ref="label"
                                        className="form-control"
                                        value={this.state.label}
                                        onChange={this.handleInputChange.bind(this)}
                                        style={{ fontSize: 20 }}
                                        required
                                    />
                                    <label className="title" style={{ fontSize: 20, marginTop: 10 }}>ที่อยู่หน่วยงาน</label>
                                    <input
                                        type="text"
                                        name="address"
                                        ref="address"
                                        className="form-control"
                                        value={this.state.address}
                                        onChange={this.handleInputChange.bind(this)}
                                        style={{ fontSize: 20 }}
                                    />
                                    <label className="title" style={{ fontSize: 20, marginTop: 10 }}>รายละเอียดอื่น ๆ</label>
                                    <input
                                        type="text"
                                        name="note"
                                        ref="note"
                                        className="form-control"
                                        value={this.state.note}
                                        onChange={this.handleInputChange.bind(this)}
                                        style={{ fontSize: 20 }}
                                    />

                                    <br />

                                    <div className="row">
                                        <div className="col-xs-12">
                                            <button
                                                className="btn btn-primary btn-sm title pull-left"
                                                onClick={() => this.props.history.push('/setting/department-detail/'+ this.state.departmentId)}>
                                                &nbsp;ย้อนกลับ&nbsp;
                                            </button>

                                            <div className="pull-right">
                                                <button
                                                    className="btn btn btn-block btn-success btn-lg title"
                                                    type="submit">
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;บันทึก&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    </button>
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

export default withRouter(DepartmentEdit)
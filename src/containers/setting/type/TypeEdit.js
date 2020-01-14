import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { db } from '../../../common/firebaseConfig'

class TypeEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            label: '',
            note: '',

            labelCheck: true, //false = Duplicate
            typeId: this.props.match.params.id
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.getType()
    }

    getType() {
        db.collection('types').doc(this.state.typeId).get().then(doc => {
            //console.log('Document data:', doc.data());
            this.setState({
                label: doc.data().label,
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

    async onSubmit(e) {
        e.preventDefault();

        console.log(this.refs.label.value)
        await db.collection('types').get().then(snapshot => {
            snapshot.forEach(doc => {
                let data = doc.data()

                if (this.refs.label.value === data.name) {
                    console.log("Duplicate name")
                    this.setState({ labelCheck: false })
                    console.log(this.state.labelCheck)
                }
            })
        }).catch(error => console.log(error))

        if (this.state.labelCheck === true) {
            db.collection("types").doc(this.state.typeId).update({
                label: this.refs.label.value,
                value: this.refs.label.value,
                note: this.refs.note.value
            }).then(() => {
                this.props.history.push('/setting/type-detail/' + this.state.typeId)
            })
        }
    }

    render() {
        return (
            <div>
                <div className="content-wrapper title">
                    <section className="content-header">
                        <h1>
                            <span style={{ fontSize: 35 }}>&nbsp;แก้ไขประเภทพัสดุครุภัณฑ์</span>
                        </h1>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="col-xs-12">

                                <form onSubmit={this.onSubmit}>
                                    <label className="title" style={{ fontSize: 20 }}>ประเภท</label>
                                    <input
                                        type="text"
                                        name="label"
                                        ref="label"
                                        className="form-control"
                                        value={this.state.label}
                                        onChange={this.handleInputChange}
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
                                        value={this.state.note}
                                        onChange={this.handleInputChange}
                                        style={{ fontSize: 20 }}

                                    />
                                    <br />

                                    <div className="row">
                                        <div className="col-xs-12">
                                            <button
                                                className="btn btn-primary btn-sm title pull-left"
                                                onClick={() => this.props.history.push('/setting/type-detail/' + this.state.typeId)}>
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

export default withRouter(TypeEdit)

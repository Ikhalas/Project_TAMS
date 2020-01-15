import React, { Component } from 'react'
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { db } from '../../../common/firebaseConfig'

class ItemtypeEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemTypeId: this.props.match.params.id,

            code: '',
            type: '',
            name: '',
            note: '',
            itemTypes: [],

            types: [],
            currentObject: [],
            selectedOption: [],
            codeCheck: true
        }
        this._isMounted = false;

        this.handleInputChange = this.handleInputChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.getItemType()
        this._isMounted && this.getTypeData()
    }

    getTypeData() {  //for option
        db.collection('types').orderBy('label').get().then(snapshot => {
            let types = []
            snapshot.forEach(doc => {
                let data = doc.data()
                types.push(data)
            })
            this._isMounted && this.setState({ types: types })
            console.log(this.state.types)
        }).catch(error => console.log(error))
    }

    async getItemType() {
        await db.collection('itemTypes').doc(this.state.itemTypeId).get().then(doc => {
            //console.log('Document data:', doc.data());
            this.setState({
                code: doc.data().code,
                type: doc.data().type,
                name: doc.data().name,
                note: doc.data().note,
                currentObject: { value: doc.data().type, label: doc.data().type } //old type
            })
        }).catch(err => console.log('Error getting document', err))
        console.log("currentObject| " + this.state.currentObject)
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

        db.collection('itemTypes').orderBy('code').get().then(snapshot => {
            snapshot.forEach(doc => {
                let data = doc.data()

                if (this.refs.code.value === data.code) {
                    console.log("Duplicate name")
                    this.setState({ codeCheck: false })
                    console.log(this.state.codeCheck)
                }
                else {
                    this.setState({ codeCheck: true })
                    console.log("pass")
                    console.log(this.state.codeCheck)
                }
            })
        }).catch(error => console.log(error))

        if (this.state.codeCheck === true) {
            db.collection("itemTypes").doc(this.state.itemTypeId).update({
                code: this.refs.code.value,
                type: this.state.currentObject.value,
                name: this.refs.name.value,
                note: this.refs.note.value
            }).then(() => {
                this.props.history.push('/setting/itemtype-detail/' + this.state.itemTypeId)
            })
        }

        else {
            console.log("fail to upload")
        }
    }

    addNewValue(value) {
        this.setState({
            currentObject: value
        })
    }

    componentWillUnmount() {  //cancel subscriptions and asynchronous tasks
        this._isMounted = false;
    }

    render() {

        return (
            <div>
                <div className="content-wrapper title">
                    <section className="content-header">
                        <h1>
                            <span style={{ fontSize: 35 }}>&nbsp;แก้ไขรายการประเภทพัสดุครุภัณฑ์</span>
                        </h1>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="col-xs-12">

                                <form onSubmit={this.onSubmit}>

                                    <label className="title" style={{ fontSize: 20 }}>ประเภทพัสดุครุภัณฑ์</label>

                                    <Select
                                        value={this.state.currentObject}
                                        onChange={newValue => this.addNewValue(newValue)}
                                        options={this.state.types}
                                        autoFocus={true}
                                    />

                                    <label className="title" style={{ fontSize: 20, marginTop: 10 }}>เลขรหัสพัสดุครุภัณฑ์</label>
                                    <input
                                        type="text"
                                        name="code"
                                        ref="code"
                                        className="form-control"
                                        data-inputmask="'mask': ['999']"
                                        data-mask
                                        value={this.state.code}
                                        onChange={this.handleInputChange}
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
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                        style={{ fontSize: 20 }}
                                        required
                                    />

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
                                    <button className="btn btn-info title" type="submit">
                                        &nbsp;&nbsp;&nbsp;&nbsp;บันทึก&nbsp;&nbsp;&nbsp;&nbsp;
                                    </button>
                                </form>

                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default withRouter(ItemtypeEdit)


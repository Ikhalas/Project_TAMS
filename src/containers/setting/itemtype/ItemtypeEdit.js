import React, { Component } from 'react'
import axios from 'axios';
import { ITEMTYPE, TYPES } from '../../../common/APIutl'

export default class ItemtypeEdit extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : '',
            code : '',
            type : '',
            name : '',
            other : '',
            types : []
        }
    }

    componentDidMount(){
        const script = document.createElement('script')
        script.src = '/js/addform.js'
        script.async = true
        document.body.appendChild(script)

        this.getItemtype()
        
        axios.get(TYPES).then(
            res => {
                //console.log(res)
                this.setState({ types: res.data })
            }
        )
            .catch(err => console.log(err))
    }

    generateTypeRows() {
        //console.log(this.state.types)
        return (
            this.state.types.map(typeI => (
                <option key={typeI.id}>{typeI.name}</option>
            ))
        )
    }

    handleInputChange(e){
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState({
            [name] : value
        })
    }

    getItemtype(){
        let itemtypeId = this.props.match.params.id;
        axios.get(ITEMTYPE + '/' + itemtypeId ).then(
            res => {
                this.setState({
                    id : res.data.id,
                    code : res.data.code,
                    type : res.data.type,
                    name : res.data.name,
                    other : res.data.other
                }, () => console.log(this.state))
            
            })
        .catch(err => console.log(err))
    }

    editDepartment(newItemtype){
        axios.request({
            method: 'put',
            url: ITEMTYPE + '/' + this.state.id,
            data: newItemtype
        }).then(res => {
            this.props.history.push('/setting/itemtype-detail/'+ this.state.id);
        }).catch(err => console.log(err));
    }

    onSubmit = (e) => {
        //console.log(this.refs.name.value)
        const newItemtype = {
            code: this.refs.code.value,
            type: this.refs.type.value,
            name: this.refs.name.value,
            other: this.refs.other.value
        }
        this.editDepartment(newItemtype)
        e.preventDefault();
    }

    render() {
     
        //console.log(this.props.itemtype)
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


                                <form onSubmit={this.onSubmit.bind(this)}>

                                    <label className="title" style={{fontSize:20}}>ประเภทพัสดุครุภัณฑ์</label>
                                    <select name="type" ref="type" className="form-control selectpicker" style={{ fontSize: 20 }} required>
                                            <option value={this.state.type}>&nbsp;{this.state.type} (เดิม)</option>
                                            {this.generateTypeRows()}
                                    </select>
                                    <br />
                                    <label className="title" style={{fontSize:20}}>เลขรหัสพัสดุครุภัณฑ์</label>
                                    <input
                                        type="text"
                                        name="code"
                                        ref="code"
                                        className="form-control"
                                        data-inputmask="'mask': ['999']"
                                        data-mask
                                        value={this.state.code}
                                        onChange={this.handleInputChange.bind(this)}
                                        style={{ fontSize: 20 }}
                                        required
                                    />
                                    <br />
                                    <label className="title" style={{fontSize:20}}>ชื่อพัสดุครุภัณฑ์</label>
                                    <input
                                        type="text"
                                        name="name"
                                        ref="name"
                                        className="form-control"
                                        value={this.state.name}
                                        onChange={this.handleInputChange.bind(this)}
                                        style={{ fontSize: 20 }}
                                        required
                                    />
                                    <br />
                                    <label className="title" style={{fontSize:20}}>รายละเอียดอื่น ๆ</label>
                                    <input
                                        type="text"
                                        name="other"
                                        ref="other"
                                        className="form-control"
                                        value={this.state.other}
                                        onChange={this.handleInputChange.bind(this)}
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


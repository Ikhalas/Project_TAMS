import React, { Component } from 'react'
import axios from 'axios';
import { ITEMTYPE } from '../../../common/APIutl'

export default class ItemtypeEdit extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : '',
            code : '',
            typeI : '',
            other : ''
        }
    }

    componentDidMount(){
        this.getItemtype()
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
                    typeI : res.data.typeI,
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
            this.props.history.push('/setting');
        }).catch(err => console.log(err));
    }

    onSubmit = (e) => {
        //console.log(this.refs.name.value)
        const newItemtype = {
            code: this.refs.code.value,
            typeI: this.refs.typeI.value,
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
                                    <label className="title" style={{fontSize:20}}>เลขรหัสพัสดุครุภัณฑ์</label>
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
                                    <br />
                                    <label className="title" style={{fontSize:20}}>ประเภทพัสดุครุภัณฑ์</label>
                                    <input
                                        type="text"
                                        name="typeI"
                                        ref="typeI"
                                        className="form-control"
                                        value={this.state.typeI}
                                        onChange={this.handleInputChange.bind(this)}
                                        style={{ fontSize: 20 }}
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


import React, { Component } from 'react'
import axios from 'axios';
import {  TYPES } from '../../../common/APIutl'

export default class TypeEdit extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : '',
            name : '',
            other : ''
        }
    }

    componentDidMount(){
        this.getType()
    }

    handleInputChange(e){
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState({
            [name] : value
        })
    }

    getType(){
        let typetId = this.props.match.params.id;
        axios.get( TYPES + '/' + typetId ).then(
            res => {
                this.setState({
                    id : res.data.id,
                    name : res.data.name,
                    other : res.data.other
                }, () => console.log(this.state))
            
            })
        .catch(err => console.log(err))
    }

    editType(newType){
        axios.request({
            method: 'put',
            url: TYPES + '/' + this.state.id,
            data: newType
        }).then(res => {
            this.props.history.push('/setting/type-detail/'+ this.state.id);
        }).catch(err => console.log(err));
    }

    onSubmit = (e) => {
        //console.log(this.refs.name.value)
        const newType = {
            name: this.refs.name.value,
            other: this.refs.other.value
        }
        this.editType(newType)
        e.preventDefault();
    }

    render() {
     
        console.log(this.props.department)
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


                                <form onSubmit={this.onSubmit.bind(this)}>
                                    <label className="title" style={{fontSize:25}}>ประเภท</label>
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
                                    <label className="title" style={{fontSize:25}}>รายละเอียดอื่น ๆ</label>
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

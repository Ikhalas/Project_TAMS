import React, { Component } from 'react'
import axios from 'axios';
import {  DEPARTMENT } from '../../../common/APIutl'

export default class DepartmentEdit extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : '',
            name : '',
            address : '',
            other : ''
        }
    }

    componentDidMount(){
        this.getDepartment()
    }

    handleInputChange(e){
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState({
            [name] : value
        })
    }

    getDepartment(){
        let departmentId = this.props.match.params.id;
        axios.get( DEPARTMENT + '/' + departmentId ).then(
            res => {
                this.setState({
                    id : res.data.id,
                    name : res.data.name,
                    address : res.data.address,
                    other : res.data.other
                }, () => console.log(this.state))
            
            })
        .catch(err => console.log(err))
    }

    editDepartment(newDepartment){
        axios.request({
            method: 'put',
            url: DEPARTMENT + '/' + this.state.id,
            data: newDepartment
        }).then(res => {
            this.props.history.push('/setting/department-detail/'+ this.state.id)
        }).catch(err => console.log(err));
    }

    onSubmit = (e) => {
        //console.log(this.refs.name.value)
        const newDepartment = {
            name: this.refs.name.value,
            address: this.refs.address.value,
            other: this.refs.other.value,
        }
        this.editDepartment(newDepartment)
        e.preventDefault();
    }

    render() {
     
        console.log(this.props.department)
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
                                    <label className="title" style={{fontSize:25}}>ชื่อหน่วยงาน</label>
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
                                    <label className="title" style={{fontSize:25}}>ที่อยู่หน่วยงาน</label>
                                    <input
                                        type="text"
                                        name="address"
                                        ref="address"
                                        className="form-control"
                                        value={this.state.address}
                                        onChange={this.handleInputChange.bind(this)}
                                        style={{ fontSize: 20 }}
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

import React, { Component } from 'react'
import axios from 'axios';
import {  DEPARTMENT } from '../../../common/APIutl'

export default class DepartmentAdd extends Component {

    addDepartment(newDepartment) {
        //console.log(newDepartment)
        axios.request({
            method: 'post',
            url: DEPARTMENT,
            data: newDepartment
        }).then(res => {
            this.props.history.push('/setting');
        }).catch(err => console.log(err));
    }

    onSubmit = (e) => {
        //console.log(this.refs.name.value)
        const newDepartment = {
            name: this.refs.name.value,
            address: this.refs.address.value,
            other: this.refs.other.value,
        }
        this.addDepartment(newDepartment)
        e.preventDefault();
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
                                    <label className="title" style={{fontSize:20}}>ชื่อหน่วยงาน</label>
                                    <input
                                        type="text"
                                        name="name"
                                        ref="name"
                                        className="form-control"
                                        style={{ fontSize: 20 }}
                                        required
                                    />
                                    <br />
                                    <label className="title" style={{fontSize:20}}>ที่อยู่หน่วยงาน</label>
                                    <input
                                        type="text"
                                        name="address"
                                        ref="address"
                                        className="form-control"
                                        style={{ fontSize: 20 }}
                                    />
                                    <br />
                                    <label className="title" style={{fontSize:20}}>รายละเอียดอื่น ๆ</label>
                                    <input
                                        type="text"
                                        name="other"
                                        ref="other"
                                        className="form-control"
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

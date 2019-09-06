import React, { Component } from 'react'
import axios from 'axios';
import { ITEMTYPE } from '../../../common/APIutl'

export default class ItemtypeAdd extends Component {

    addDepartment(newItemtype) {
        //console.log(newItemtype)
        axios.request({
            method: 'post',
            url: ITEMTYPE,
            data: newItemtype
        }).then(res => {
            this.props.history.push('/setting');
        }).catch(err => console.log(err));
    }

    onSubmit = (e) => {
        //console.log(this.refs.code.value)
        const newItemtype = {
            code: this.refs.code.value,
            typeI: this.refs.typeI.value,
            other: this.refs.other.value
        }
        this.addDepartment(newItemtype)
        e.preventDefault();
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


                                <form onSubmit={this.onSubmit.bind(this)}>
                                    <label className="title" style={{fontSize:20}}>เลขรหัสพัสดุครุภัณฑ์</label>
                                    <input
                                        type="text"
                                        name="code"
                                        ref="code"
                                        className="form-control"
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

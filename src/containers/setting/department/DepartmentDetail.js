import React, { Component } from 'react'
import axios from 'axios';
import {  DEPARTMENT } from '../../../common/APIutl'


export default class DepartmentDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detail: ''
        }
    }

    componentDidMount(){
       
        this.getDepartment()
    }

    getDepartment(){
        let departmentId = this.props.match.params.id;
        axios.get( DEPARTMENT + '/' + departmentId ).then(
            res => {
                //console.log(res)
                this.setState({detail : res.data}, () => {
                    //console.log(this.state)
                })
            })
        .catch(err => console.log(err))
    }

    onDelete(){
        let departmentId = this.state.detail.id;
        axios.delete( DEPARTMENT + '/' + departmentId ).then(
            res => {
                this.props.history.push('/setting');
            })
        .catch(err => console.log(err))
    }


    render() {
        return (
            <div>
                <div className="content-wrapper title">
                    <section className="content-header">
                        <h1>
                            <span style={{ fontSize: 35 }}>&nbsp;รายละเอียดหน่วยงาน&nbsp;<strong>{this.state.detail.name}</strong></span>
                        </h1>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="col-xs-12">
                                <ul className="list-group">
                                    <li className="list-group-item title"><span style={{fontSize:20}}><b>ชื่อหน่วยงาน</b> &nbsp; : &nbsp;</span>
                                        {this.state.detail.name}
                                    </li>
                                    <li className="list-group-item title"><span style={{fontSize:20}}><b>ที่อยู่หน่วยงาน</b> &nbsp; : &nbsp;</span>
                                        {this.state.detail.address}
                                    </li>
                                    <li className="list-group-item title"><span style={{fontSize:20}}><b>รายละเอียดอื่น ๆ</b> &nbsp;: &nbsp;</span>
                                        {this.state.detail.other}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12">
                                <button className="btn btn-info btn-sm title pull-left" onClick={() => this.props.history.push('/setting')}>&nbsp;ย้อนกลับ&nbsp;</button>
                            
                                <div className="pull-right">
                                    <button className="btn btn-warning btn-sm title" onClick={() => this.props.history.push('/setting/Department-edit/'+ this.state.detail.id)}>&nbsp;&nbsp;&nbsp;&nbsp;แก้ไข&nbsp;&nbsp;&nbsp;&nbsp;</button>&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-danger btn-sm title" onClick={this.onDelete.bind(this)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ลบ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                
            </div>
        )
    }
}

import React, { Component } from 'react'

export default class DepartmentsList extends Component {
    render() {
        const {  name } = this.props.department
        return (
            <tr>
                <td>{name}</td>
                <td>
                    <button className="btn btn-danger title col-5 float-right" onClick={() => this.props.onDelDepartment(this.props.department)}>ลบ</button>
                    &nbsp;&nbsp;
                    <button className="btn btn-warning title col-5 float-right" onClick={() => this.props.onEditDepartment(this.props.department)}>แก้ไข</button>
                </td>
            </tr>
        )
    }
}

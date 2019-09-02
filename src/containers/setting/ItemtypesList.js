import React, { Component } from 'react'

export default class ItemtypesList extends Component {
    render() {
        //console.log (this.props.itemType)
        const { code, type, name } = this.props.itemType
        return (
            <tr>
                <td>{code}</td>
                <td>{type}</td>
                <td>{name}</td>
                <td>
                    <button className="btn btn-danger title col-5 float-right" onClick={() => this.props.onDelItemtype(this.props.itemType)}>ลบ</button>
                    &nbsp;&nbsp;
                    <button className="btn btn-warning title col-5 float-right">แก้ไข</button>
                </td>
            </tr>
            )
        }
}

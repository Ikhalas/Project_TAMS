import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';


class SettingContainer extends Component {

    componentDidMount() {
        const script = document.createElement('script')
        script.src = 'js/itemlist.js'
        script.async = true
        document.body.appendChild(script)


    }

    generateDepartmentRows() {
        return (
            this.props.departments.map(department => (
                <tr key={department.id}>
                    <td style={{ fontSize: 20 }}>
                        <Link to={'/setting/department-detail/' + department.id}>
                            &nbsp;{department.name}
                        </Link>
                    </td>
                </tr>
            ))
        )
    }

    render() {
        return (
            <div>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title" style={{fontSize:30}}>รายการชื่อหน่วยงาน</h3>
                                    <button
                                        className="btn btn-success btn-sm title pull-right"
                                        onClick={() => this.props.history.push('/setting/department-add')}
                                    >
                                        &nbsp;&nbsp;เพิ่มรายการ&nbsp;&nbsp;
                                    </button>
                                </div>
                                {/* /.box-header */}
                                <div className="box-body">
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>&nbsp;ชื่อหน่วยงาน</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.generateDepartmentRows()}
                                        </tbody>
                                    </table>
                                </div>
                                {/* /.box-body */}
                            </div>
                            {/* /.box */}
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </section>
            </div>
        )
    }
}

export default withRouter(SettingContainer)
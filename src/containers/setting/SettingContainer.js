import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import ItemtypesList from './ItemtypesList'
import DepartmentsList from './DepartmentsList'

class SettingContainer extends Component {

    componentDidMount() {
        const script = document.createElement('script')
        script.src = 'js/itemlist.js'
        script.async = true
        document.body.appendChild(script)
    }

    showDepartment() {
        return this.props.departments && this.props.departments.map(department => (
            <DepartmentsList key={department.id} department={department} onDelDepartment={this.props.onDelDepartment} onEditDepartment={this.props.onEditDepartment}/>
        ))
    }

    showItemtypes() {
        return this.props.itemTypes && this.props.itemTypes.map(itemType => (
            <ItemtypesList key={itemType.id} itemType={itemType} onDelItemtype={this.props.onDelItemtype}/>
        ))
    }

    
    render() {
        //console.log(this.props.itemTypes)
        const font30 = { fontSize: 30 }
        const font35 = { fontSize: 35 }
        return (
            <div className="content-wrapper title">
                
                    <section className="content-header">
                        <h1>
                            <span style={font35}>&nbsp;การตั้งค่า</span>
                        </h1>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="box">
                                    <div className="box-header">
                                        <h3 className="box-title" style={font30}>รายการชื่อหน่วยงาน</h3>
                                        <button className="btn btn-success title pull-right" onClick={() => this.props.history.push('/setting/add-department')}>เพิ่มรายการ</button>
                                    </div>
                                    {/* /.box-header */}
                                    <div className="box-body">
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>ชื่อหน่วยงาน</th>
                                                    <th>การจัดการ</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {this.showDepartment()}
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
            
                    <section className="content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="box">
                                    <div className="box-header">
                                        <h3 className="box-title" style={font30}>รายการเลขรหัสพัสดุ</h3>
                                        <button className="btn btn-success title pull-right">เพิ่มรายการ</button>
                                    </div>
                                    {/* /.box-header */}
                                    <div className="box-body">
                                        <table id="table1" className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>เลขรหัสพัสดุ</th>
                                                    <th>ประเภท</th>
                                                    <th>ชื่อพัสดุ</th>
                                                    <th>การจัดการ</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {this.showItemtypes()}
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

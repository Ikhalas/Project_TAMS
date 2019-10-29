import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';

class Itemlist extends Component {

    generateItemRows() {
        //console.log(this.props.items)
        return (
            this.props.items && this.props.items.map(item => (
                <tr key={item.id}>
                    <td style={{ fontSize: 20 }}>
                        <Link to={'/depreciation/item-depreciation/' + item.id}>
                            &nbsp;{item.itemCode}
                        </Link>
                    </td>
                    <td style={{ fontSize: 20 }}>
                        &nbsp;{item.itemType}
                    </td>
                    <td style={{ fontSize: 20 }}>
                        &nbsp;{item.itemName}
                    </td>
                    <td style={{ fontSize: 20 }}>
                        &nbsp;{item.Department}
                    </td>
                    <td style={{ fontSize: 20 }}>
                        &nbsp;{item.status}
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
                                    <h3 className="box-title" style={{ fontSize: 30 }}>รายการครุภัณฑ์ทั้งหมด</h3>
                                    
                                </div>
                                <div className="box-body">
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>&nbsp;เลขรหัสพัสดุ</th>
                                                <th>&nbsp;ประเภทพัสดุ</th>
                                                <th>&nbsp;ชื่อพัสดุ</th>
                                                <th>&nbsp;หน่วยงาน</th>
                                                <th>&nbsp;สถานะ</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.generateItemRows()}
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

export default withRouter(Itemlist)
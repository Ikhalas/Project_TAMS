import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';


class ItemtypeContainer extends Component {

    componentDidMount() {
        const script = document.createElement('script')
        script.src = 'js/itemlist.js'
        script.async = true
        document.body.appendChild(script)


    }

    generateItemtypeRows() {
        return (
            this.props.itemtypes.map(itemtype => (
                <tr key={itemtype.id}>
                    <td style={{ fontSize: 20 }}>
                        <Link to={'/setting/itemtype-detail/' + itemtype.id}>
                            &nbsp;{itemtype.code}
                        </Link>
                    </td>
                    <td style={{ fontSize: 20 }}>
                        <Link to={'/setting/itemtype-detail/' + itemtype.id}>
                            &nbsp;{itemtype.typeI}
                        </Link>
                    </td>
                    <td style={{ fontSize: 20 }}>
                        <Link to={'/setting/itemtype-detail/' + itemtype.id}>
                            &nbsp;{itemtype.typeII}
                        </Link>
                    </td>
                </tr>
            ))

        )
    }


    render() {
        //console.log(this.props.itemTypes)
        return (
            <div>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title" style={{fontSize:30}}>รายการเลขรหัสครุภัณฑ์</h3>
                                    <button
                                        className="btn btn-success btn-sm title pull-right"
                                        onClick={() => this.props.history.push('/setting/itemtype-add')}
                                    >
                                        &nbsp;&nbsp;เพิ่มรายการ&nbsp;&nbsp;
                                    </button>
                                </div>
                                {/* /.box-header */}
                                <div className="box-body">
                                    <table id="table1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>เลขรหัสครุภัณฑ์</th>
                                                <th>ประเภทครุภัณฑ์ (หลัก)</th>
                                                <th>ประเภทครุภัณฑ์ (รอง)</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.generateItemtypeRows()}
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

export default withRouter(ItemtypeContainer)
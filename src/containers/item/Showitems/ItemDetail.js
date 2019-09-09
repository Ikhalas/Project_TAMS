import React, { Component } from 'react'
import axios from 'axios';
import { ITEMS } from '../../../common/APIutl'

export default class ItemDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detail: ''
        }
    }

    componentDidMount(){
        this.getItemtype()
    }

    getItemtype(){
        let itemId = this.props.match.params.id;
        axios.get(ITEMS + '/' + itemId ).then(
            res => {
                //console.log(res)
                this.setState({detail : res.data}, () => {
                    //console.log(this.state)
                })
            })
        .catch(err => console.log(err))
    }


    render() {
        return (
            <div>
                <div className="content-wrapper title">
                    <section className="content-header">
                        <h1>
                            <span style={{ fontSize: 35 }}>&nbsp;รายละเอียดพัสดุครุภัณฑ์&nbsp;|&nbsp;<b>{this.state.detail.itemName}&nbsp;</b>{this.state.detail.itemCode}</span>
                        </h1>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="block-example border border-primary">
                                    <ul className="list-group">
                                        <li className="list-group-item title"><span style={{fontSize:20}}><b>ชื่อพัสดุครุภัณฑ์</b> &nbsp;: &nbsp;</span>
                                            {this.state.detail.itemName}
                                        </li>
                                        <li className="list-group-item title"><span style={{fontSize:20}}><b>เลขรหัสพัสดุครุภัณฑ์</b> &nbsp;: &nbsp;</span>
                                            {this.state.detail.itemCode}
                                        </li>
                                        <li className="list-group-item title"><span style={{fontSize:20}}><b>ประเภทพัสดุครุภัณฑ์</b> &nbsp; : &nbsp;</span>
                                            {this.state.detail.itemType}
                                        </li>
                                        <li className="list-group-item title"><span style={{fontSize:20}}><b>หน่วยงานที่รับผิดชอบ</b> &nbsp; : &nbsp;</span>
                                            {this.state.detail.Department}
                                        </li>
                                        
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>

                        
                    </section>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios';
import LandForm from './LandForm'
import AssetForm from './AssetForm'
import { TYPES } from '../../../common/APIutl'


export default class ItemAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Types: [],
            formType: "",
            typeProps: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get(TYPES).then(
            res => {
                //console.log(res)
                this.setState({ Types: res.data })
            }
        )
            .catch(err => console.log(err))
    }

    generateItemtypeRows() {
        //console.log(this.state.itemTypes)
        return (
            this.state.Types.map(Type => (
                <option key={Type.id} value={Type.name}>{Type.name}</option>
            ))
        )
    }

    handleChange(event) {
        //console.log(event.target.value)
        this.setState({ typeProps : event.target.value})
        if (event.target.value === 'ที่ดิน') {
            this.setState({ formType: 'land' })
        }

        else if (event.target.value === 'none'){
            this.setState({ formType: 'none' })
        }

        else {
            this.setState({ formType: 'asset' })
        }
    }

    showForm() {
        if (this.state.formType === 'land') {
            return (
                <LandForm type={this.state.typeProps} />
            )
        }

        else if (this.state.formType === "asset") {
            return (
                <AssetForm type={this.state.typeProps} />
            )
        }

        else {
            return (
                <p>กรุณาเลือกประเภท</p>
            )
        }

    }

    render() {
        return (
            <div>
                <div className="content-wrapper title">
                    <section className="content-header">
                        <h1>
                            <span style={{ fontSize: 35 }}>&nbsp;เพิ่มรายการพัสดุครุภัณฑ์</span>
                        </h1>
                    </section>
                    <section className="content">
                       
                            <div className="selectContainer">
                                <div className="input-group">
                                    <span style={{ fontSize: 20 }} className="input-group-addon "><b>ประเภท</b></span>
                                    <select  className="form-control selectpicker" style={{ fontSize: 20 }} onChange={this.handleChange}  >
                                        <option value="none" >&nbsp;-- โปรดเลือกประเภทของพัสดุครุภัณฑ์ --</option>
                                        {this.generateItemtypeRows()}
                                    </select>
                                </div>
                            </div>
                            <hr />
                           
                            {this.showForm()}
                    
                        
                    </section>

                </div>
            </div>
        )
    }
}

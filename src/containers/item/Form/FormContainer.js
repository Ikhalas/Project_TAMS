import React, { Component } from 'react'
import Select from 'react-select';
import LandForm from './LandForm'
import AssetForm from './GeneralForm'
import { db } from '../../../common/firebaseConfig'

export default class ItemAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            types: [],
            formType: "",
            selectedOption: null,

        }

        this._isMounted = false
        this._getSuccess = false
        this.currentOption = null

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true
        this._isMounted && this.getTypeData()
    }

    getTypeData() {
        db.collection('types').orderBy('label').get().then(snapshot => {
            let types = []
            snapshot.forEach(doc => {
                let data = doc.data()
                types.push(data)
                this._getSuccess = true
            })
            this._isMounted && this.setState({ types: types })
            //console.log(this.state.types)
        }).catch(error => console.log(error))

    }

    handleChange(selectedOption) {
        this.setState({ selectedOption })
        this.selectForm(selectedOption.value)
    }

    selectForm(selectedType) {
        //console.log("selectedType| " + selectedType)
        if (selectedType === 'ที่ดิน') this.setState({ formType: 'land' })
        else if (selectedType === 'none') this.setState({ formType: 'none' })
        else this.setState({ formType: 'asset' })

        this.currentOption = selectedType
    }

    showForm() {
        //console.log("currentOption |"+this.currentOption)
        if (this.state.formType === 'land') return (<LandForm type={this.currentOption} />)
        else if (this.state.formType === "asset") return (<AssetForm type={this.currentOption} />)
        else return (<p>กรุณาเลือกประเภท</p>)
    }

    componentWillUnmount() {  //cancel subscriptions and asynchronous tasks
        this._isMounted = false;
    }

    render() {
        const { selectedOption } = this.state;
        return (
            <div className="content-wrapper title">
                <section className="content-header">
                    <h1>
                        <span style={{ fontSize: 35 }}>&nbsp;เพิ่มรายการพัสดุครุภัณฑ์</span>
                    </h1>
                </section>

                {this._getSuccess &&   //get data from DB success before render
                    <section className="content">
                            <div className="input-group">
                                <span style={{ fontSize: 20 }} className="input-group-addon "><b>ประเภท</b></span>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.types}
                                    placeholder=" โปรดเลือกประเภทของพัสดุครุภัณฑ์ "
                                />
                            </div>            
                        <hr />
                        {this.showForm()}
                    </section>
                }
                
            </div>
        )
    }
}

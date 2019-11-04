import React, { Component } from 'react'
import axios from 'axios';

export default class AddDepreciation extends Component {
    componentDidMount() {
        const script = document.createElement('script')
        script.src = '/js/addform.js'
        script.async = true
        document.body.appendChild(script)
    }

    onSubmit = (e) => {
        const newVal = {
            "itemCode": this.refs.itemCode.value,
            "seq": this.refs.seq.value+1,
            "Year": this.refs.Year.value,
            "Balance": this.refs.Balance.value,
            "Note": this.refs.Note.value
        }
        //console.log(newVal)
        e.preventDefault()

        this.addDepreciation(newVal)
    }

    addDepreciation(newVal) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/Depreciations',
            data: newVal
        }).then(res => {
            alert("เพิ่มข้อมูลสำเร็จ")
            window.location.reload();
        }).catch(err => console.log(err));
    }


    renderList() {
        console.log(this.props.depreciations)
        if (this.props.depreciations) {
            var depreciation = this.props.depreciations.map(depreciation => (depreciation))
            var maxIndex = depreciation.length - 1

            var seq = this.props.depreciations.map(depreciation => (depreciation.seq))
            var Cumulative = this.props.depreciations.map(depreciation => (depreciation.Cumulative))
            var lastBalance = this.props.depreciations.map(depreciation => (depreciation.Balance))

            var B = lastBalance[maxIndex]-Cumulative[0] 
            var Balance = B.toFixed(2)

            console.log(Cumulative[0])
            return (
                <div>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td style={{ width: '15%', textAlign: 'center' }}>
                                        <input type="hidden" name="itemCode" ref="itemCode" value={this.props.itemCode} readOnly />
                                        <input type="hidden" name="seq" ref="seq" value={seq[maxIndex]} readOnly />
                                        <input
                                            type="text"
                                            className="form-control datepicker"
                                            id="inputdatepicker"
                                            data-date-format="dd/mm/yyyy"
                                            style={{ fontSize: 20 }}
                                            name="Year"
                                            ref="Year" />
                                    </td>
                                    
                                    <td style={{ width: '15%', textAlign: 'center' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            style={{ fontSize: 20 }}
                                          
                                            defaultValue={Balance}
                                            name="Balance"
                                            ref="Balance" />
                                    </td>
                                    <td style={{ width: '55%', textAlign: 'center' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            style={{ fontSize: 20 }}
                                            placeholder="เพิ่มหมายเหตุ"
                                            name="Note"
                                            ref="Note" />
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <div className="box-tools pull-right">
                            <button className="btn btn-success title" type="submit" style={{ fontSize: 20 }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;บันทึก&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </button>
                        </div>
                    </form>

                </div>
            )
        }
       
    }



    render() {
        return (
            <div>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-warning">
                                <div className="box-header with-border">
                                    <h1 className="box-title" style={{ fontSize: 20 }}>รายการใหม่</h1>
                                </div>
                                <div className="box-body">
                                    {this.renderList()}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios';


export default class AddLandValue extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            total: '',
        };
    }

    componentDidMount() {
        const script = document.createElement('script')
        script.src = '/js/thaidate.js'
        script.async = true
        document.body.appendChild(script)
    }

    onSubmit = (e) => {
        const newVal = {
            "itemCode": this.refs.itemCode.value,
            "seq": this.refs.seq.value + 1,
            "Year": this.refs.Year.value,
            "Percent": this.refs.Percent.value,
            "Balance": this.refs.Balance.value,
            "Note": this.refs.Note.value
        }
        //console.log(newVal)
        e.preventDefault()

        this.landValueIncreases4Years(newVal)
    }

    landValueIncreases4Years(newVal) {
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/landValueIncreases4Years',
            data: newVal
        }).then(res => {
            alert("เพิ่มข้อมูลสำเร็จ")
            window.location.reload();
        }).catch(err => console.log(err));
    }

    calBalance = (e) => {
        let landValue = this.props.landValue.map(landValue => (landValue))
        let maxIndex = landValue.length - 1

        let B = this.props.landValue.map(landValue => (landValue.Balance))
        let Balance = B[maxIndex]
        //console.log("Balance| "+Balance[maxIndex])
        //console.log(e.target.value)
        let percent = e.target.value

        let b = (Number(Balance) * Number(percent)) / 100
        let balance = Number(Balance) + b
        //console.log(balance)
        this.setState({ total: balance })

        if(!percent){
            this.setState({ total: 0 })
        }

    }

    renderList() {

        if (this.props.landValue.length) {

            var landValue = this.props.landValue.map(landValue => (landValue))
            var maxIndex = landValue.length - 1
            //console.log(maxIndex)
            var seq = this.props.landValue.map(landValue => (landValue.seq))
            //console.log("seq| "+seq[maxIndex])

         
          

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
                                            type="number"                                            
                                            className="form-control"
                                            style={{ fontSize: 20 }}
                                            placeholder="%"
                                            name="Percent"
                                            ref="Percent"
                                            onChange={this.calBalance.bind(this)}
                                        />
                                    </td>

                                    <td style={{ width: '15%', textAlign: 'center' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            style={{ fontSize: 20 }}
                                            placeholder="คงเหลือ"
                                            defaultValue={this.state.total}
                                            name="Balance"
                                            ref="Balance" />
                                    </td>

                                    <td style={{ width: '45%', textAlign: 'center' }}>
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

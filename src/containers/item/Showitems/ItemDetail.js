import React, { Component } from 'react'
import LandDetail from './Land/LandDetail'
import GeneralDetail from './General/GeneralDetail'

export default class ItemDetail extends Component {

    _type = this.props.match.params.type
    _code = this.props.match.params.code
    _id = this.props.match.params.id

    renderDetail() {
        if (this._type === 'ที่ดิน') return (<LandDetail itemId={this._id} itemCode={this._code} />)
        else return (<GeneralDetail itemId={this._id} itemCode={this._code} />)
    }
    
    render() {
        return (
            <div className="content-wrapper title">
                {this.renderDetail()}
            </div>
        )
    }
}

import React, { Component } from 'react'

export default class AssetForm extends Component {
    
    render() {
        console.log(this.props.type)
        return (
            <div>
                <div className="col-md-5 input-group">
                    <span className="input-group-addon" id="basic-addon1">ASSET</span>
                    <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1" />
                </div>
            </div>
        )
    }
}

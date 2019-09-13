import React, { Component } from 'react'
import axios from 'axios';
import LandDetail from './LandDetail'


export default class ItemDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detail: []
        }
    }

    componentDidMount() {
        let itemId = this.props.match.params.id;
        axios.get('http://localhost:3001/Items/' + itemId).then(
            res => {
                this.setState({ detail: res.data })
                //console.log(this.state.detail.itemType)
                this.renderDetail()
            }).catch(err => console.log(err))
    }

    renderDetail() {
        //console.log(this.state.detail.itemType)
        if (this.state.detail.itemType === 'ที่ดิน') {
            return(
                <LandDetail detail={this.state.detail} />
            )
        }

        else {
            return (
                <p>eiei</p>
            )
        }

    }

    render() {
        return (
            <div>
                <div className="content-wrapper title">
                    {this.renderDetail()}
                </div>
            </div>
        )
    }
}

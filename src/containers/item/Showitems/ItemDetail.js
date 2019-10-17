import React, { Component } from 'react'
import axios from 'axios';
import LandDetail from './LandDetail'
import GeneralDetail from './GeneralDetail'


export default class ItemDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detail: [],
        }
    }

    componentDidMount() {
        let itemId = this.props.match.params.id;
        axios.get('http://localhost:3001/Items/' + itemId).then(
            res => {
                this.setState({ detail: res.data })
            }).catch(err => console.log(err))
    }

    renderDetail() {

        if (this.state.detail.itemType === 'ที่ดิน') {
            let itemId = this.props.match.params.id;
            return( <LandDetail itemId={itemId} /> )
        }
        else {
            let itemId = this.props.match.params.id;
            return ( <GeneralDetail itemId={itemId} /> )
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

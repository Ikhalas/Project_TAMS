import React, { Component } from 'react'
import Itemlist from './Itemlist'
import { connect } from 'react-redux'
import { itemFetch } from '../../../redux/actions'

class Items extends Component {
    
    componentDidMount(){
        this.props.itemFetch()
    }

    render() {
        return (
            <div>
                <div className="content-wrapper title">
                    <section className="content-header">
                        <h1>
                            <span style={{ fontSize: 35 }}>&nbsp;รายการครุภัณฑ์ทั้งหมด</span>
                        </h1>
                    </section>
                    <section className="content">
                       <Itemlist items={this.props.items} />
                    </section>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { items: state.items }
}

export default  connect(mapStateToProps, { itemFetch }) (Items)

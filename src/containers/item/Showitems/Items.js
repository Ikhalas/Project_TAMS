import React, { Component } from 'react'
import Itemlist from './Itemlist'



class Items extends Component {
    
    componentDidMount(){
        //this.props.itemFetch()
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


export default Items

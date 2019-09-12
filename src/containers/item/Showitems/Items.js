import React, { Component } from 'react'
import axios from 'axios'
import { ITEMS } from '../../../common/APIutl'
import Itemlist from './Itemlist'

export default class Items extends Component {
    constructor(props){
        super(props)
        this.state = {
            items : []
        }
      
    }

    componentDidMount(){
        axios.get( ITEMS ).then(
            res => {
               
                this.setState({items : res.data})
                //console.log(this.state.items)
            } )
        .catch(err => console.log(err))
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
                       <Itemlist items={this.state.items} />
                      
                    </section>
                </div>
                <button onClick={() => this.testPost()}>test</button>
            </div>
        )
    }
}

import React, { Component } from 'react'
import Itemlist from './Itemlist'
import { db } from '../../../common/firebaseConfig'

class Items extends Component {
    constructor(props){
        super(props)
        this.state = {
            items : []
        }

        this._isMounted = false
    }
    
    componentDidMount(){
        this._isMounted = true
        this._isMounted && this.getItemsData();
    }

    getItemsData(){
        db.collection('items').orderBy('itemCode').get().then(snapshot => {
            let items = []
            snapshot.forEach(doc => {
                //let data = doc.data()
                items.push(doc)
            })
            this._isMounted && this.setState({ items })
            //console.log("items |" + this.state.items)
        }).catch(error => console.log(error))
    }

    componentWillUnmount() {  //cancel subscriptions and asynchronous tasks
        this._isMounted = false;
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
            </div>
        )
    }
}


export default Items

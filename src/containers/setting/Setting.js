import React, { Component } from 'react'
import { db } from '../../common/firebaseConfig'

import DepartmentContainer from './department/DepartmentContainer'
import ItemtypeContainer from './itemtype/ItemtypeContainer'
import TypeContainer from './type/TypeContainer'


export default class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addResult: false,
            departments: ''
        }

        this._isMounted = false;
    }

    componentDidMount() {
        this.setState({ addResult: this.props.match.params.result })

        this._isMounted = true;  //for cancel subscriptions and asynchronous tasks
        this._isMounted && this.getDepartmentData()

        setTimeout(() => this.setState({ addResult: null }), 3000)
        this.props.history.push('/setting')
    }

    getDepartmentData() {
        db.collection('departments').orderBy('code').get().then(snapshot => {
            let departments = []
            snapshot.forEach(doc => {
                //let data = doc.data()
                departments.push(doc)
            })
            this._isMounted && this.setState({ departments: departments })
            //console.log(this.state.departments)
        }).catch(error => console.log(error))
    }

    componentWillUnmount() {  //cancel subscriptions and asynchronous tasks
        this._isMounted = false;
    }


    render() {
        //console.log(this.props.itemTypes)
        return (
            <div>
                
                <div className="content-wrapper title">

                    {this.state.addResult &&

                        <div style={{ backgroundColor: "#5cb85c", paddingTop: 1, paddingBottom: 1 }}>
                            <h4 style={{ color: 'white', fontSize: 23 }}>&nbsp;&nbsp;<i className="icon fa fa-check"></i>&nbsp;เพิ่มรายการสำเร็จ</h4>
                        </div>
                    }

                    <section className="content-header">
                        <h1> <span style={{ fontSize: 35 }}>&nbsp;การตั้งค่า</span> </h1>
                    </section>

                    <DepartmentContainer departments={this.state.departments} />
                    
                    
                </div>
            </div>
        )
    }
}

/*
<TypeContainer types={this.props.types} />
<ItemtypeContainer itemtypes={this.props.itemTypes} />
*/
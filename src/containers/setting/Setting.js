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
            departments: '',
            types: '',
            itemTypes: ''
        }

        this._isMounted = false;
    }

    componentDidMount() {
        this.setState({ addResult: this.props.match.params.result })

        this._isMounted = true;  //for cancel subscriptions and asynchronous tasks
        this._isMounted && this.getDepartmentData()
        this._isMounted && this.getTypeData()
        this._isMounted && this.getitemTypeData()

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

    getTypeData() {
        db.collection('types').orderBy('label').get().then(snapshot => {
            let types = []
            snapshot.forEach(doc => {
                //let data = doc.data()
                types.push(doc)
            })
            this._isMounted && this.setState({ types: types })
            //console.log(this.state.types)
        }).catch(error => console.log(error))
    }

    getitemTypeData() {
        db.collection('itemTypes').orderBy('code').get().then(snapshot => {
            let itemTypes = []
            snapshot.forEach(doc => {
                //let data = doc.data()
                itemTypes.push(doc)
            })
            this._isMounted && this.setState({ itemTypes: itemTypes })
            //console.log("State"+this.state.types)
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


                    <section className="content-header">
                        <h1> <span style={{ fontSize: 35 }}>&nbsp;การตั้งค่า</span> </h1>
                    </section>

                    <DepartmentContainer departments={this.state.departments} addResult={this.state.addResult} />
                    <TypeContainer types={this.state.types} addResult={this.state.addResult} />
                    <ItemtypeContainer itemtypes={this.state.itemTypes} addResult={this.state.addResult} />

                </div>
            </div>
        )
    }
}


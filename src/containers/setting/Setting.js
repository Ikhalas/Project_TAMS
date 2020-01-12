import React, { Component } from 'react'
import DepartmentContainer from './department/DepartmentContainer'
import ItemtypeContainer from './itemtype/ItemtypeContainer'
import TypeContainer from './type/TypeContainer'
import { connect } from 'react-redux'
import { departmentFetch, itemtypeFetch, typeFetch } from '../../redux/actions'

import { db } from '../../common/firebaseConfig'

class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addResult: false,
            departments: null
        }
    }

    componentDidMount() {
        this.setState({ addResult: this.props.match.params.result })
        console.log("addResult|" + this.state.addResult)
        //this.props.itemtypeFetch()
        //this.props.typeFetch()

        db.collection('departments').orderBy('code').get().then(snapshot => {
            let departments = []
            snapshot.forEach(doc => {
                //let data = doc.data()
                departments.push(doc)
            })
            this.setState({ departments: departments })
            //console.log(this.state.departments)
        }).catch(error => console.log(error))


        setTimeout(() => this.setState({ addResult : null}), 3000)
        this.props.history.push('/setting')
        
    }

   
    render() {
        //console.log(this.props.itemTypes)
        return (
            <div>
                <div className="content-wrapper title">

                    {this.state.addResult && 
                    
                    <div style={{ backgroundColor : "#5cb85c", paddingTop : 1 , paddingBottom : 1 }}>
                        <h4 style={{ color : 'white', fontSize : 23 }}>&nbsp;&nbsp;<i className="icon fa fa-check"></i>&nbsp;เพิ่มรายการสำเร็จ</h4>
                    </div> 
                    }
                    

                    <section className="content-header">
                        <h1> <span style={{ fontSize: 35 }}>&nbsp;การตั้งค่า</span> </h1>
                    </section>
                    <DepartmentContainer departments={this.state.departments} />
                    <TypeContainer types={this.props.types} />
                    <ItemtypeContainer itemtypes={this.props.itemTypes} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        departments: state.departments,
        itemTypes: state.itemTypes,
        types: state.types
    }
}

export default connect(mapStateToProps, { departmentFetch, itemtypeFetch, typeFetch })(Setting)

//mapStateToProps ฟังก์ชั่นสำหรับนำค่า State ใน store มาเก็บไว้ใน props ของ component Setting
//Action ทีใช่
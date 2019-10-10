import React, { Component } from 'react'
import DepartmentContainer from './department/DepartmentContainer'
import ItemtypeContainer from './itemtype/ItemtypeContainer'
import TypeContainer from './type/TypeContainer'
import { connect } from 'react-redux'
import { departmentFetch, itemtypeFetch, typeFetch } from '../../redux/actions'


class Setting extends Component {
   
    componentDidMount(){
        this.props.departmentFetch()
        this.props.itemtypeFetch()
        this.props.typeFetch()
    }
    
    render() {
        //console.log(this.props.itemTypes)
        return (
            <div>
                <div className="content-wrapper title">
                    <section className="content-header">
                        <h1> <span style={{fontSize:35}}>&nbsp;การตั้งค่า</span> </h1>
                    </section>
                    <DepartmentContainer departments={this.props.departments} />
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

export default connect(mapStateToProps, { departmentFetch,itemtypeFetch,typeFetch })(Setting)

//mapStateToProps ฟังก์ชั่นสำหรับนำค่า State ใน store มาเก็บไว้ใน props ของ component Setting
//Action ทีใช่
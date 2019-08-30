import React, { Component } from 'react'
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import SettingContainer from './SettingContainer';
import { connect } from 'react-redux';
import { itemtypesFetch, itemtypeDelete, departmentFetch, departmentDelete } from '../../redux/actions'

class Setting extends Component {
    constructor(props){
        super(props)
        this.delDepartment = this.delDepartment.bind(this)
        this.delItemtype = this.delItemtype.bind(this)
    }

    componentDidMount(){
        this.props.itemtypesFetch()  //action จะอยู่ใน props ของ componennt แล้ว เรียกใช้ได้เลย
        this.props.departmentFetch()
    }

    delDepartment(department){
        this.props.departmentDelete(department.id)
    }

    editDepartment(){

    }

    delItemtype(itemTypes){
        this.props.itemtypeDelete(itemTypes.id)
    }

    render() {
        //console.log(this.props.itemTypes)
        return (
            <div>
                <Header/>
                <Menu/>
                <SettingContainer 
                    itemTypes={this.props.itemTypes} departments={this.props.departments} 
                    onDelDepartment={this.delDepartment} onDelItemtype={this.delItemtype}
                />
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state){
    //console.log(state.departments)
    return { itemTypes: state.itemtypes, departments: state.departments }
}

export default connect(mapStateToProps, { itemtypesFetch, departmentFetch, itemtypeDelete, departmentDelete  }) (Setting)

//mapStateToProps ฟังก์ชั่นสำหรับนำค่า State ใน store มาเก็บไว้ใน props ของ component Setting
//Action ทีใช่
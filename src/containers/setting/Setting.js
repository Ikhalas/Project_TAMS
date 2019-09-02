import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import SettingContainer from './SettingContainer';
import { connect } from 'react-redux';
import { itemtypesFetch, itemtypeDelete, departmentsFetch, departmentDelete } from '../../redux/actions'

class Setting extends Component {
    constructor(props){
        super(props)
        this.delDepartment = this.delDepartment.bind(this)
        this.delItemtype = this.delItemtype.bind(this)
        this.editDepartment = this.editDepartment.bind(this)
    }

    componentDidMount(){
        this.props.itemtypesFetch()  //action จะอยู่ใน props ของ componennt แล้ว เรียกใช้ได้เลย
        this.props.departmentsFetch()
    }

    delDepartment(department){
        this.props.departmentDelete(department.id)
    }

    editDepartment(department){
        this.props.history.push('/setting/edit-department/' + department.id)
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

                {this.props.departments && Array.isArray(this.props.departments) && (
                    <SettingContainer 
                        itemTypes={this.props.itemTypes} departments={this.props.departments} 
                        onDelDepartment={this.delDepartment} onDelItemtype={this.delItemtype}
                        onEditDepartment={this.editDepartment}
                    />
                )}
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state){
    //console.log(state.departments)
    return { itemTypes: state.itemtypes, departments: state.departments }
}

export default withRouter(connect(mapStateToProps, { itemtypesFetch, departmentsFetch, itemtypeDelete, departmentDelete  }) (Setting))

//mapStateToProps ฟังก์ชั่นสำหรับนำค่า State ใน store มาเก็บไว้ใน props ของ component Setting
//Action ทีใช่
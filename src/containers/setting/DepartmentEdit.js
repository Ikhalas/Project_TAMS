import React, { Component } from 'react'
import { connect } from 'react-redux';
import { departmentFetch, depaetmentUpdate, departmentCreate } from '../../redux/actions'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import Footer from '../../components/Footer'
import DepartmentForm from './DepartmentForm'

class DepartmentEdit extends Component {

    componentDidMount(){
        if(this.props.match.params.id) {
            //console.log(this.props.match.params.id)
            this.props.departmentFetch(this.props.match.params.id)
        }
    }

    render() {
        const { match, formValues, departments, depaetmentUpdate, departmentCreate  } = this.props
        return (
            <div>
                <Header/>
                <Menu/>
                <div className="content-wrapper title">
                    {match.path.indexOf("add") > 0 && (
                        <div>
                            {departments.saved && (
                                <div className="alert alert-secondary title" role="alert">
                                    {departments.msg}
                                </div>
                            )}
                            <DepartmentForm title="เพิ่มรายการชื่อหน่วยงาน" onDepartmentSubmit={() => departmentCreate(formValues)}/>
                        </div>
                        
                    )}
                    {match.path.indexOf("edit") > 0 && (
                        <div>
                        {departments.saved && (
                            <div className="alert alert-secondary title" role="alert">
                                {departments.msg}
                            </div>
                        )}
                        <DepartmentForm title="แก้ไขรายการชื่อหน่วยงาน" onDepartmentSubmit={() => depaetmentUpdate(departments.id,formValues)}/>
                        </div>
                    )}
                </div>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps ({ form, departments}){
    return { formValues: form.departmentForm ? form.departmentForm.valuse : null, departments }
}

export default connect(mapStateToProps, {departmentFetch, depaetmentUpdate, departmentCreate}) (DepartmentEdit)
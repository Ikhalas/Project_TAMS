import React, { Component } from 'react'
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form'
import FromFeildDepartment from './common/FormFieldDepartment'

class DepartmentForm extends Component {

    renderField () {
        const fromFeild = [
            {name: "departmentName", type: "text", label: "ชื่อหน่วยงาน", required: true}
        ]
        return fromFeild.map(( {name, type, label, required} ) => {
            return (
                <Field key={name} name={name} type={type} label={label} required={required} component={FromFeildDepartment} />
            )
        })
    }


    render() {
        console.log(this.props.initialValues)
        const { onDepartmentSubmit } = this.props
        return (
            <div>
                <section className="content-header">
                    <h1>
                        <span style={{ fontSize: 35 }}>&nbsp;{this.props.title}</span>
                    </h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <form onSubmit= {this.props.handleSubmit(onDepartmentSubmit)}>
                                {this.renderField()}
                                <button className="btn btn-info title" type="submit">
                                &nbsp;&nbsp;&nbsp;&nbsp;บันทึก&nbsp;&nbsp;&nbsp;&nbsp;
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

function mapStateToProps({ departments }){
    if(departments && departments.id){
        return { initialValues : departments }
    }else{
        return {}
    }
}

DepartmentForm = reduxForm({ form: "departmentForm" })(DepartmentForm);

export default connect(mapStateToProps)(DepartmentForm)

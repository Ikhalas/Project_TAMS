import React, { Component } from 'react'
import { auth } from './common/firebaseConfig'


export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            currentUser: null,
            message: ''
        }
    }

    onChange = e => {
        const { name, value } = e.target

        this.setState({
            [name]: value
        })
    }

    onSubmit = e => {
        e.preventDefault()
        const { email, password } = this.state

        auth.signInWithEmailAndPassword(email, password).then(response => {
            this.setState({ currentUser: response.user })
        }).catch(error => {
            console.log(error)
            if(error.code === 'auth/user-not-found'){
                this.setState({ message: "ไม่มีรายการที่ตรงกับบัญชีผู้ใช้ที่กับที่ระบุ บัญชีผู้ใช้อาจถูกลบออกจากระบบแล้ว" })
            }
        })
    }

    render() {
        const message = this.state.message
        return (
            <div className="hold-transition login-page" style={{ height: '100vh' }}>
                <div className="login-box" style={{ marginTop: '0' }}>
                    <div style={{ marginTop: '100' }}>
                        <div className="login-logo">
                            <br />
                            <img src={require('./common/image/logo.png')} alt="logo" />
                            <br />
                            <b>TAM</b>s
                        </div>
                        {/* /.login-logo */}
                        <div className="login-box-body" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                            <p className="login-box-msg">Sign in to start your session</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group has-feedback">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        name="email"
                                        onChange={this.onChange}
                                    />
                                    <span className="glyphicon glyphicon-envelope form-control-feedback" />
                                </div>
                                <div className="form-group has-feedback">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        name="password"
                                        onChange={this.onChange}
                                    />
                                    <span className="glyphicon glyphicon-lock form-control-feedback" />
                                </div>
                                <div className="row">
                                    <div className="col-xs-8" style={{fontSize:'15px'}}>
                                    {message ? <p className="text-danger">{message}</p> : null}
                                    </div>
                                    {/* /.col */}
                                    <div className="col-xs-4">
                                        <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                                    </div>
                                    {/* /.col */}
                                </div>
                            </form>

                        </div>
                        {/* /.login-box-body */}
                    </div>
                </div>
                {/* /.login-box */}
            </div>


        )
    }
}

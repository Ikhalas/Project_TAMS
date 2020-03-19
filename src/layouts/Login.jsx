import React from "react";
import "assets/css/Login.css";
import { auth } from "../api/firebase";
import { Alert } from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      currentUser: null,
      message: ""
    };
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.checkSession();
  }

  checkSession() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this._isMounted && this.setState({ currentUser: user });
        this.props.history.push("/admin/dashboard");
      } else {
        this._isMounted && this.setState({ currentUser: null });
      }
    });
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    this._isMounted &&
      auth
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          this._isMounted && this.setState({ currentUser: response.user });
          this.props.history.push("/admin/dashboard");
        })
        .catch(error => {
          console.log(error);
          if (error.code === "auth/user-not-found") {
            this.setState({
              message:
                "ไม่มีรายการที่ตรงกับบัญชีผู้ใช้ที่กับที่ระบุ บัญชีผู้ใช้อาจถูกลบออกจากระบบแล้ว"
            });
          }
          if (error.code === "auth/invalid-email") {
            this.setState({ message: "รูปแบบอีเมลไม่ถูกต้อง" });
          }
        });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const message = this.state.message;
    return (
      <div className="full-height regular-th">
        <br/>
        <h2 className="title">
          {" "}
          องค์การบริหารส่วนตำบลท่าข้าม อำเภอหาดใหญ่ จังหวัดสงขลา{" "}
        </h2>

        <div className="cont">
          <div className="form">
            <form onSubmit={this.onSubmit}>
              <h1 className="label">ลงชื่อเข้าใช้</h1>
              <input
                type="email"
                className="user regular-th"
                style={{ fontSize: "25px" }}
                placeholder="email"
                name="email"
                autoComplete="on"
                onChange={this.onChange}
              />
              <input
                type="password"
                className="pass regular-th"
                style={{ fontSize: "25px" }}
                placeholder="Password"
                name="password"
                autoComplete="on"
                onChange={this.onChange}
              />
              <div style={{ fontSize: "20px", textAlign: "center" }}>
                {message ? <p className="text-danger">{message}</p> : null}
              </div>
              <button
                className="login regular-th"
                style={{ fontSize: "25px" }}
                type="submit"
              >
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            width: "300px",
            right: "5px",
            top: "550px"
          }}
        >
          <Alert
            color="primary"
            className="regular-th"
            style={{ textAlign: "center", lineHeight: "150%" }}
          >
            ท่านสามารถเข้าชมระบบการจัดการโดยใช้ <br />
            E-mail :
            <span style={{ fontSize: "30px" }}>
              <b className="text-light" style={{ fontSize: "30px" }}> test@example.com</b>
            </span>{" "}
            <br /> Password :
            <span style={{ fontSize: "30px" }}>
              <b className="text-light" style={{ fontSize: "30px" }}> 123456</b>
            </span>{" "}
          </Alert>
        </div>
      </div>
    );
  }
}

export default Login;

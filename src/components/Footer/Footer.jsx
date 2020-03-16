import React from "react";

export default class Myfooter extends React.Component {
    render() {
        return (
            <div style={{ width: '100%', height: '35px', backgroundColor: '#3c3c3c' }} >
                <div className="text-right regular-th" style={{ color: 'white', paddingTop:'5px' }}>
                    &copy; {1900 + new Date().getYear()}, made with{" "}
                    <i className="fa fa-heart heart" /> by IKHALAS CoE PSU
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </div>
            </div>
        )
    }
}

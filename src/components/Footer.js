import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="main-footer">
                    <div className="pull-right hidden-xs">
                        <b className="title">เวอร์ชั่น</b> 0.1.0
                    </div>
                    <strong className="title">Copyright © 2019   Ikhalas Mannoon.</strong> <span className="title">All rights reserved.</span>
                </footer>
            </div>
        )
    }
}

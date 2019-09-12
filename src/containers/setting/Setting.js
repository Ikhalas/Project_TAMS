import React, { Component } from 'react'
import axios from 'axios';
import DepartmentContainer from './department/DepartmentContainer'
import ItemtypeContainer from './itemtype/ItemtypeContainer'
import TypeContainer from './type/TypeContainer'


class Setting extends Component {
    constructor(props){
        super(props)
        this.state = {
            departments : [],
            itemTypes : [],
            types : []
        }
    }

    componentDidMount(){
        axios.get( 'http://localhost:3001/Department' ).then(
            res => {
                this.setState({departments : res.data})
            }).catch(err => console.log(err))


        axios.get( 'http://localhost:3001/Type' ).then(
            res => {
                this.setState({types : res.data})
            }).catch(err => console.log(err))


        axios.get( 'http://localhost:3001/itemType' ).then(
            res => {
                this.setState({itemTypes : res.data})
            }).catch(err => console.log(err))
        
    }
    

    render() {
        //console.log(this.props.itemTypes)
        return (
            <div>
                <div className="content-wrapper title">
                    <section className="content-header">
                        <h1> <span style={{fontSize:35}}>&nbsp;การตั้งค่า</span> </h1>
                    </section>
                    <DepartmentContainer departments={this.state.departments} />
                    <TypeContainer types={this.state.types} />
                    <ItemtypeContainer itemtypes={this.state.itemTypes} />
                </div>
            </div>
        )
    }
}



export default Setting

//mapStateToProps ฟังก์ชั่นสำหรับนำค่า State ใน store มาเก็บไว้ใน props ของ component Setting
//Action ทีใช่
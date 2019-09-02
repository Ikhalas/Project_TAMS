import React from "react"

export default ({ input, type, label, required }) => {
    return (
        <div className="form-group">
            <label className="title">
                {label}
            </label>
            <input className="form-control" style={{fontSize:20}} {...input} type={type} required={required}/>
        </div>
    )
}
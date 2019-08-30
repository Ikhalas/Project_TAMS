import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from "./redux/reducers";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))  // reducers & {} ค่าเริ่มต้นของ state 

// reducer คือฟังก์ชันที่รับเขช้ามาแล้วทำการเปลี่ยนแปลงข้อมูล state ที่อยู่ใน store 
// reduxThunk ทำให้เราสามารถ return ผลจาก action เป้น function ได้ (เดิมๆ เป็น obj)


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    
    , document.getElementById('root'));



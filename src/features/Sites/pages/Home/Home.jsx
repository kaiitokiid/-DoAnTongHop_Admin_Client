import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import './Home.css'
import ProfileTab from '../../../../components/ProfileTab/ProfileTab';
import { useSelector } from 'react-redux';

function Home(props) {
    document.title = 'ToMe - Trang chủ cửa hàng';

    const user = useSelector(state => state.user)

    const [todos, setTodos] = useState({
        title: "Những việc cần làm:",
        items: [
            {
                name: "Bạn có 3 đơn hàng cần được xác nhận",
                value: <Link to="/order">Danh sách đơn hàng</Link>
            },
            {
                name: "Bạn có 10 đơn hàng cần được giao",
                value: ""
            },
        ]
    })

    const month = new Date().getMonth() + 1;

    const [orders, setOrders] = useState({
        title: `Hiệu quả kinh doanh tháng ${month}:`,
        items: [
            {
                name: "Doanh thu tháng này",
                value: "30.500.000 đ"
            },
            {
                name: "Đơn hàng",
                value: "27 đơn"
            },
        ]
    })

    
    return (
        <Fragment>

        </Fragment>
    );
}

export default Home;
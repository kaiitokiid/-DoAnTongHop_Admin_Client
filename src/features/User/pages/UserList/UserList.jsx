import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import './UserList.css';

function UserList() {
    document.title = 'ToMe - Danh sách người dùng'
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        keyword: '',
        isLock: '',
    });
    const [users, setUsers] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [isSubmit, setIsSubmit] = useState(false);

    const handleReset = () => {
        setParam({...param, keyword: '',minPrice: '',maxPrice: '',priceOrder: 0,categoryId: 0,isLock: ''});
        setIsSubmit(!isSubmit);
    }

    const handlePage = (n) => {
        if(param.page + n !== 0 && param.page + n <= totalPage) {
            setParam({...param, page: param.page + n});
            setIsSubmit(!isSubmit);
        }
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('/');
    }

    useEffect(() => {
        const url = `http://localhost:5000/api/user/user?page=${param.page}&pageSize=${param.pageSize}&keyword=${param.keyword}&isLock=${param.isLock}`;
        var token = JSON.parse(localStorage.getItem('TOKEN'));
        
        axios.get(url,{
            headers: {
                token
            }
        })
        .then(res => {
            console.log(res.data);
            if(res.data.isToken === false){
                navigate("/");
            }
            if(res.data.isSuccess){
                setUsers(res.data.data)
                setTotalPage(res.data.totalPage)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [isSubmit])

    return (
        <div className="product-list">
            <h1 className='title'>Danh sách người dùng</h1>
            <div className="row no-gutters control-group">
                <div className="col l-2 search-input-wrap">
                    <input value={param.keyword} onChange={(e) => setParam({...param, keyword: e.target.value})} type="text" className="search-input form-control" placeholder="Nhập thông tin cần tìm..." />
                </div>

                <div className="col l-1 isblock-filter">
                    <select value={param.isLock} onChange={(e) => setParam({...param, isLock: e.target.value})} className="price-order form-control">
                        <option value="">--Khóa--</option>
                        <option value="true">Khóa</option>
                        <option value="false">Không khóa</option>
                    </select>
                </div>
                <button onClick={() => setIsSubmit(!isSubmit)} className="btn form-submit" type="button">Tìm kiếm</button>
                <button 
                    onClick={handleReset} 
                    className="btn reset-button form-submit" type="button"
                >
                    Làm mới
                </button>
            </div>

            <div className="row no-gutters page-control">
                <span onClick={() => handlePage(-1)} className="btn-page">
                    <i className="fas fa-angle-left"></i>
                </span>
                <span className="page">{param.page}/{totalPage}</span>
                <span onClick={() => handlePage(1)} className="btn-page">
                    <i className="fas fa-angle-right"></i>
                </span>
            </div>

            <div className="row no-gutters product-table">
                <table id="customers">
                    <thead>
                        <tr>
                            <th style={{width: "180px"}}>Mã tài khoản</th>
                            <th style={{width: "230px"}}>Tên khách hàng</th>
                            <th style={{width: "230px"}}>Số điện thoại</th>
                            <th style={{width: "300px"}}>Email</th>
                            <th className="align-right">Ngày tạo</th>
                            <th className="align-right">Khóa</th>
                            <th style={{width: "150px"}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        !users || Object.keys(users).length === 0 ? (
                            <tr>
                                <td colSpan="9">
                                    <i className="fas fa-box-open"></i>
                                    Không có dữ liệu
                                </td>
                            </tr>
                        ) : users.map(user => {
                            return (
                                <tr key={user._id}>
                                    <td className='user-list-padding order-list-padding'>{user._id}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.email}</td>
                                    <td className="align-right">{formatDate(user.createdAt)}</td>
                                    <td className="align-right">{ !user.isLock ? '' : 'Đã bị khóa'}</td>
                                    <td className='text-center'>
                                        <Link to={`/user/${user._id}` }className="btn my-btn btn_info">Chi tiết</Link>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
                <div className="row no-gutters page-control">
                    <span onClick={() => handlePage(-1)} className="btn-page">
                        <i className="fas fa-angle-left"></i>
                    </span>
                    <span className="page">{param.page}/{totalPage}</span>
                    <span onClick={() => handlePage(1)} className="btn-page">
                        <i className="fas fa-angle-right"></i>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default UserList;
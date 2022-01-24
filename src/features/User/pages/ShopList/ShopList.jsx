import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import './ShopList.css';

function ShopList() {
    document.title = 'ToMe - Danh sách người dùng'
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        keyword: '',
        isLock: '',
        isApprove: '',
    });
    const [shops, setShops] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [isSubmit, setIsSubmit] = useState(false);

    const handleReset = () => {
        setParam({...param, keyword: '', isLock: '', isApprove: ''});
        setIsSubmit(!isSubmit);
    }

    const handlePage = (n) => {
        if(param.page + n !== 0 && param.page + n <= totalPage) {
            setParam({...param, page: param.page + n});
            setIsSubmit(!isSubmit);
        }
    }

    useEffect(() => {
        const url = `http://localhost:5000/api/user/shop?page=${param.page}&pageSize=${param.pageSize}&keyword=${param.keyword}&isLock=${param.isLock}&isApprove=${param.isApprove}`;
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
                setShops(res.data.data)
                setTotalPage(res.data.totalPage)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [isSubmit])

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

    return (
        <div className="product-list">
            <h1 className='title'>Danh sách cửa hàng</h1>
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

                <div className="col l-2 isblock-filter">
                    <select value={param.isApprove} onChange={(e) => setParam({...param, isApprove: e.target.value})} className="price-order form-control">
                        <option value="">--Xác nhận tài khoản--</option>
                        <option value="true">Đã xác nhận</option>
                        <option value="false">Chưa xác nhận</option>
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
                            <th style={{width: "180px"}}>ID tài khoản</th>
                            <th style={{width: "200px"}}>Tên cửa hàng</th>
                            <th style={{width: "200px"}}>Chủ cửa hàng</th>
                            <th style={{width: "150px"}}>Số điện thoại</th>
                            <th style={{width: "230px"}}>Email</th>
                            <th style={{width: "120px"}}  className="align-right">Ngày tạo</th>
                            <th style={{width: "115px"}} className="align-right">Xác nhận</th>
                            <th style={{width: "115px"}} className="align-right">Khóa</th>
                            <th style={{width: "110px"}}></th>
                            <th style={{width: "130px"}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        !shops || Object.keys(shops).length === 0 ? (
                            <tr>
                                <td colSpan="9">
                                    <i className="fas fa-box-open"></i>
                                    Không có dữ liệu
                                </td>
                            </tr>
                        ) : shops.map(shop => {
                            return (
                                <tr key={shop._id}>
                                    <td className='shop-list-padding order-list-padding'>{shop._id}</td>
                                    <td>{shop.shopName}</td>
                                    <td>{shop.fullname}</td>
                                    <td>{shop.phoneNumber}</td>
                                    <td>{shop.email}</td>
                                    <td className="align-right">{formatDate(shop.createdAt)}</td>
                                    <td className="align-right">{!shop.isApprove ? 'Chưa' : ''}</td>
                                    <td className="align-right">{shop.isLock}</td>
                                    <td className='text-center'>
                                        <Link to={`/shop/${shop._id}` }className="btn my-btn btn_info">Chi tiết</Link>
                                    </td>
                                    <td className='text-center'>
                                        <Link to={`/turnover/${shop._id}` }className="btn my-btn btn_info">Doanh thu</Link>
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

export default ShopList;
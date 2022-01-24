import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { Route, Routes } from 'react-router-dom'

import './TemplateHome.css'
import HomePage from '../Home/Home';
import NotFound from '../../../../components/NotFound';
import Header from '../../../../components/Header/Header';
import ProductList from '../../../Product/pages/ProductList/ProductList';
import ProductInfo from '../../../Product/pages/ProductInfo/ProductInfo';
import OrderList from '../../../Order/pages/OrderList/OrderList';
import OrderDetail from '../../../Order/pages/OrderDetail/OrderDetail';
import Turnover from '../../../Transaction/pages/Turnover/Turnover';
import UserList from '../../../User/pages/UserList/UserList';
import UserInfo from '../../../User/pages/UserInfo/UserInfo';
import ShopList from '../../../User/pages/ShopList/ShopList';
import ShopInfo from '../../../User/pages/ShopInfo/ShopInfo';


function TemplateHome(props) {
    // Lấy ra thẻ cha           
    const getParent= (element, selector) => {
        while (element.parentElement) {
            if(element.matches(selector))
                return element

            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }

            element = element.parentElement;
        }
    }

    const handleToggle = (e) => {
        var dropdown = getParent(e.target, '.dropdown-btn');

        // dropdown.classList.toggle("active");
        var dropdownContent = dropdown.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
            dropdownContent.style.transform  = 'translateY(0)';
        }
    }

    return (
        <Fragment>
            <Header />


            <div className="sidenav">
                <div className="sidenav-item nav-logo">
                    <p>ToMe: Admin</p>
                </div>
               
                <button className="dropdown-btn">
                    <div>
                        <Link to='/home'>
                            <i className="icon-start fas fa-chart-line"></i>
                            Trang chủ
                        </Link>
                    </div>
                </button>

                <button onClick={handleToggle} className="dropdown-btn">
                    <div>
                        <i className="icon-start far fa-user"></i>
                        <span>Người dùng</span>
                    </div>
                    <i className="icon-end fa fa-caret-down"></i>
                </button>
                <div className="dropdown-container">
                    <Link to="/user">Danh sách người dùng</Link>
                    <Link to="/shop">Danh sách cửa hàng</Link>
                </div>

                <button onClick={handleToggle} className="dropdown-btn">
                    <div>
                        <i className="icon-start fab fa-product-hunt"></i>
                        <span>Sản phẩm</span>
                    </div>
                    <i className="icon-end fa fa-caret-down"></i>
                </button>
                <div className="dropdown-container">
                    <Link to="/product">Danh sách sản phẩm</Link>
                </div>

                <button onClick={handleToggle} className="dropdown-btn">
                    <div>
                        <i className="icon-start fas fa-shopping-cart"></i>
                        <span>Đơn hàng</span>
                    </div>
                    <i className="icon-end fa fa-caret-down"></i>
                </button>
                <div className="dropdown-container">
                    <Link to="/order">Danh sách đơn hàng</Link>
                </div>

                

                <button onClick={handleToggle} className="dropdown-btn">
                    <div>
                        <i className="icon-start fas fa-coins"></i>
                        <span>Doanh thu</span>
                    </div>
                    <i className="icon-end fa fa-caret-down"></i>
                </button>
                <div className="dropdown-container">
                    <Link to="/turnover">Doanh thu</Link>
                </div>

                {/* <button onClick={handleToggle} className="dropdown-btn">
                    <div>
                    <i className="icon-start fas fa-info-circle"></i>
                        <span>Thông tin cửa hàng</span>
                    </div>
                    <i className="icon-end fa fa-caret-down"></i>
                </button>
                <div className="dropdown-container">
                    <Link to="/user">Thông tin cửa hàng</Link>
                    <Link to="/user/edit">Chỉnh sửa thông tin</Link>
                    <Link to="/user/change-password">Đổi mật khẩu</Link>
                </div> */}
            </div>

            <div className="grid">
                <div className="row no-gutters">
                    <div className="content col l-10 l-o-2">
                        <Routes>
                            <Route path="home" element={<HomePage />} />
                            <Route path="product/:id" element={<ProductInfo />} />
                            <Route path="product" element={<ProductList />} />
                            <Route path="order/:id" element={<OrderDetail />} />
                            <Route path="order" element={<OrderList />} />
                            <Route path="turnover" element={<Turnover />} />
                            <Route path="user" element={<UserList />} />
                            <Route path="user/:id" element={<UserInfo />} />
                            <Route path="shop" element={<ShopList />} />
                            <Route path="shop/:id" element={<ShopInfo />} />
                            <Route path="turnover/:id" element={<Turnover />} />
                            <Route path="turnover" element={<Turnover />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default TemplateHome;
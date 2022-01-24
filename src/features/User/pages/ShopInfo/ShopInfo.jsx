import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

import './ShopInfo.css';
import ProfileTab from '../../../../components/ProfileTab/ProfileTab';

function UserInfo(props) {
    document.title = 'ToMe - Chi tiết cửa hàng'
    const params = useParams();
    const [user, setUser] = useState({});
    const [isLock, setIsLock] = useState(false);
    const [notice, setNotice] = useState();
    const [serverError, setServerError] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');

    useEffect(() => {
        
        axios.get(`http://localhost:5000/api/user/${params.id}`
        )
        .then(res => {
            if(res.data.isSuccess){
                console.log("res.data", res.data);
                document.title= 'ToMe - ' + res.data.data.name;
                setUser({...res.data.data})
                setIsLock(res.data.data.isLock);
                setNotice(res.data.data.notice);
            }
        })
        .catch(err => {
            console.log(err);
            // navigate("/not-found")
        })
    }, [])


    let userInfo;
    let userDesc;
    let userStatus;
    let shopInfo;

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

    if (user.length  !== 0)
    {
        shopInfo = {
            title: "Thông tin tài khoản",
            items: [
                {
                    name: "Mã cửa hàng",
                    value: user.shopId
                },
                {
                    name: "Tên cửa hàng",
                    value: user.shopName
                },
            ]
        }

        userInfo = {
            title: "Thông tin tài khoản",
            items: [
                {
                    name: "Mã tài khoản",
                    value: user._id
                },
                {
                    name: "Tài khoản",
                    value: user.username
                },
                {
                    name: "Chủ cửa hàng",
                    value: user.fullname
                },
                {
                    name: "Tên cửa hàng",
                    value: user.shopName
                },
                {
                    name: "Số điện thoại",
                    value: user.phoneNumber
                },
                {
                    name: "email",
                    value: user.email
                },
                {
                    name: "Tỉnh/Thành phố",
                    value: user.address?.provinceName
                },
                {
                    name: "Quận/Huyện",
                    value: user.address?.districtName
                },
                {
                    name: "Phường/Xã",
                    value: user.address?.wardName
                },
                {
                    name: "Địa chỉ",
                    value: user.address?.addressInfo
                },
                {
                    name: "Ngày tạo tài khoản",
                    value: formatDate(user.createdAt)
                },
            ]
        }
    
        userStatus = {
            title: "Trạng thái sản phẩm",
            items: [
                {
                    name: "Khóa",
                    value: user.isLock ? 'Đã bị khóa' : 'Không khóa'
                },
                {
                    name: "Ghi chú",
                    value: user.notice
                },

            ]
        }
    }

    const editProduct = (id) => {
        setServerError('');
        setServerSuccess('');
        const token = JSON.parse(localStorage.getItem('TOKEN'));

        axios.put(`http://localhost:5000/api/user/is-lock/${params.id}`,
            {
                isLock,
                notice
            },
            {
                headers: {
                    token
                }
            }
        )
        .then(res => {
            if(res.data.isSuccess){
                console.log("res.data", res.data);
                setServerSuccess(res.data.message)
            }
            else {
                setServerError(res.data.message)
            }
        })
        .catch(err => {
            console.log(err);
            // navigate("/not-found")
        })
    }

    return (
        <div className="user-profile mb-40">
            <div className="title-2 mb-20">Thông tin cửa hàng</div>
                <div className="row no-gutters">
                    <div className="col l-3">
                        <img className="user-profile-image" src={user?.image?.path} alt="hình ảnh sản phẩm" />
                        {/* <div className="user-profile__btn-change-image">
                            <button to="/user/edit" className=" form-submit">Chỉnh sửa logo cửa hàng</button>
                        </div> */}
                    </div>
                    <div className="col l-9">
                        {/* <ProfileTab profileTab={shopInfo}/> */}
                        <ProfileTab profileTab={userInfo}/>
                        {/* <ProfileTab profileTab={userDesc}/> */}
                        {/* <ProfileTab profileTab={userStatus}/> */}
                        <div className="profileTab">
                            <div className="profileTab__title">
                                Trạng thái sản phẩm
                            </div>
                            
                            <div  className="profileTab__item">
                                <span className="profileTab__item-name">{userStatus.items[0].name}</span>
                                <select value={isLock} onChange={(e) => setIsLock(e.target.value)} className="price-order form-control">
                                    <option value={false}>Không khóa</option>
                                    <option value={true}>Khóa</option>
                                </select>
                            </div>
                            <div  className="profileTab__item">
                                <span className="profileTab__item-name">{userStatus.items[1].name}</span>
                                <textarea 
                                value={notice}
                                onChange={(e) => setNotice(e.target.value)}
                                autoComplete="off" id="addressInfo" name="addressInfo" type="text" 
                                className="form-control"
                                style={{ resize: "none", width: '500px',height: "60px"}}
                            />
                            </div>
                                
                        </div>
                        <span className="form-message font-2 form-message__server form-message--error">{serverError}</span>
                        <span className="form-message font-2 form-message__server form-message--success">{serverSuccess}</span>

                        <div className="row no-gutters">
                            <div className="col l-4">
                                <button type="button" onClick={() => editProduct(user._id)} className="form-submit">Lưu lại</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default UserInfo;
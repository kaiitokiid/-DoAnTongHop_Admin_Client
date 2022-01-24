import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

import './ProductInfo.css';
import ProfileTab from '../../../../components/ProfileTab/ProfileTab';
import { useSelector } from 'react-redux';

function ProductInfo(props) {
    document.title = 'ToMe - Chi tiết sản phẩm'
    const params = useParams();

    const [product, setProduct] = useState({});
    const [isLock, setIsLock] = useState(false);
    const [notice, setNotice] = useState();
    const [serverError, setServerError] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');
    console.log(product);

    useEffect(() => {
        
        axios.get(`http://localhost:5000/api/products/${params.id}`
        )
        .then(res => {
            if(res.data.isSuccess){
                console.log("res.data", res.data);
                document.title= 'ToMe - ' + res.data.data.name;
                setProduct({...res.data.data})
                setIsLock(res.data.data.isLock);
                setNotice(res.data.data.notice);
            }
        })
        .catch(err => {
            console.log(err);
            // navigate("/not-found")
        })
    }, [])


    let productInfo;
    let productDesc;
    let productStatus;
    let shopInfo;

    if (product.length  !== 0)
    {
        shopInfo = {
            title: "Thông tin cửa hàng",
            items: [
                {
                    name: "Mã cửa hàng",
                    value: product.shopId
                },
                {
                    name: "Tên cửa hàng",
                    value: product.shopName
                },
            ]
        }

        productInfo = {
            title: "Thông tin sản phẩm",
            items: [
                {
                    name: "Mã sản phẩm",
                    value: product._id
                },
                {
                    name: "Tên sản phẩm",
                    value: product.name
                },
                {
                    name: "Loại sản phẩm",
                    value: "Giày dép - nữ"
                },
                {
                    name: "Giá nhập hàng",
                    value: product?.originalPrice?.toLocaleString("vi") + " đ"
                },
                {
                    name: "Giá bán hàng",
                    value: product?.salePrice?.toLocaleString("vi") + " đ"
                },
                {
                    name: "Số lượng sản phẩm còn",
                    value: product.stock + " sản phẩm"
                },
            ]
        }
    
        productDesc = {
            title: "Mô tả sản phẩm",
            items: [
                {
                    name: "Thương hiệu",
                    value: product.branch
                },
                {
                    name: "Xuất xứ",
                    value: product.originCountry
                },
                {
                    name: "Mô tả thêm",
                    value: product.otherInfo
                },
            ]
        }
        productStatus = {
            title: "Trạng thái sản phẩm",
            items: [
                {
                    name: "Khóa",
                    value: product.isLock ? 'Đã bị khóa' : 'Không khóa'
                },
                {
                    name: "Ghi chú",
                    value: product.notice
                },

            ]
        }
    }

    const editProduct = (id) => {
        setServerError('');
        setServerSuccess('');
        const token = JSON.parse(localStorage.getItem('TOKEN'));

        axios.put(`http://localhost:5000/api/products/is-lock/${params.id}`,
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
            <div className="title-2 mb-20">Thông tin sản phẩm</div>
            <div className="row no-gutters">
                <div className="col l-3">
                    <img className="user-profile-image" src={product?.image?.path} alt="hình ảnh sản phẩm" />
                    {/* <div className="user-profile__btn-change-image">
                        <button to="/user/edit" className=" form-submit">Chỉnh sửa logo cửa hàng</button>
                    </div> */}
                </div>
                <div className="col l-9">
                    <ProfileTab profileTab={shopInfo}/>
                    <ProfileTab profileTab={productInfo}/>
                    <ProfileTab profileTab={productDesc}/>
                    {/* <ProfileTab profileTab={productStatus}/> */}
                    <div className="profileTab">
                        <div className="profileTab__title">
                            Trạng thái sản phẩm
                        </div>
                        
                        <div  className="profileTab__item">
                            <span className="profileTab__item-name">{productStatus.items[0].name}</span>
                            <select value={isLock} onChange={(e) => setIsLock(e.target.value)} className="price-order form-control">
                                <option value={false}>Không khóa</option>
                                <option value={true}>Khóa</option>
                            </select>
                        </div>
                        <div  className="profileTab__item">
                            <span className="profileTab__item-name">{productStatus.items[1].name}</span>
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
                            <button type="button" onClick={() => editProduct(product._id)} className="form-submit">Lưu lại</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductInfo;
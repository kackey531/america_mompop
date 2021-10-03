import React from 'react';

import apps from './../../assets/images/social/app.png'
import googlePlay from './../../assets/images/social/google-play.png'
import './Customer-business-app.css';

const CustomerBusinessApp = () => {
    return (
        <section className="customer-business-container container p-0">
            <div className="col-lg-10 mx-auto text-center">
                <h1 className="customer-business-container__title">Customer & Business App</h1>
                <p className="customer-business-container__desc">We have single app for both small business owners
                    <span>AND</span> the customers who buy from small businesses.
                    Download the app from app store to advertise your small business and its's deal for
                    <span>FREE.</span> If you're a
                    customer, use the same app redeem deal at a small business nearby or nationally for
                    <span>FREE.</span></p>
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-center">
                    <div className=" mx-2  mb-3">
                        <a href="" className="d-block">
                            <img src={apps} alt=""/>
                        </a>
                    </div>
                    <div className=" mx-2  mb-3">
                        <a href="" className="d-block mb-0">
                            <img src={googlePlay} alt=""/>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CustomerBusinessApp;
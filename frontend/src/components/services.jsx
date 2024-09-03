import React from 'react';
import { Link } from "react-router-dom";

function Services() {
    return (
        <div id='services' className='py-10'>
            <h1 className='title'>Our Services</h1>
            <div className=" mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row justify-between items-center lg:space-x-8">
                <div className="left lg:w-1/2">
                    <h4 className="text-2xl font-semibold text-cyan-500 mb-4">
                        Best Selling Products
                    </h4>
                    <p className="text-gray-400 mb-6">
                        We sell products to customers all around the world in a fast and efficient way. 
                        Our extensive range of products and marketplaces ensures you find what you need. 
                        We are committed to providing you with the best service.
                    </p>
                    <Link to="/products" className="btn-lightgreen">
                        Show More
                    </Link>
                </div>
                <div className="right lg:w-1/2 my-8 lg:mt-0">
                    <img 
                        style={{ width: "100%" }} 
                        src="https://cdn-prd-strapi.debutify.com/m_D6n6r07_W_Mj_CGI_21_Upf_Z_Baqt_OT_05lo_Yv_ZR_As_Dp_S2_2ff0ee71e2.jpg" 
                        alt="Best Selling Products" 
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
}

export default Services;

import React from "react";

function About() {
    return (
        <div id="about" className="container mx-auto p-8">
            <div className="text-center">
                <h2 className="title">About Our Store</h2>
                <p className="text-ms text-gray-400 mb-8">Welcome to Sham Store, your destination for quality products and excellent service. Founded in [year], Sham Store aims to provide [brief description of your store’s mission].</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <div className="card bg-yellow-100 p-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-lightbulb mb-4 text-yellow-500" viewBox="0 0 16 16">
                            <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1" />
                        </svg>
                        <h4 className="text-2xl font-semibold mb-2">Our Mission</h4>
                        <p className="text-base">At Sham Store, we are committed to [briefly state your mission or vision].</p>
                    </div>
                    <div className="card bg-blue-100 p-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-book mb-4 text-blue-500" viewBox="0 0 16 16">
                            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                        </svg>
                        <h4 className="text-2xl font-semibold mb-2">Our Story</h4>
                        <p className="text-base">Sham Store was founded by [founder’s name] in [year]. Inspired by [inspiration behind starting the store], we started this journey to [goal or purpose of the store]. Since then, Sham Store has grown to become a trusted name in [your niche or industry].</p>
                    </div>
                    <div className="card bg-green-100 p-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-cart3 mb-4 text-green-500" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                        <h4 className="text-2xl font-semibold mb-2">What We Offer</h4>
                        <p className="text-base">Sham Store specializes in [mention your main products or services]. Whether you’re looking for [specific product], [specific product], or [specific service], we have something for everyone.</p>
                    </div>
                    <div className="card bg-red-100 p-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-heart mb-4 text-red-500" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                        <h4 className="text-2xl font-semibold mb-2">Why Choose Us</h4>
                        <p className="text-base">At Sham Store, we pride ourselves on [unique selling points such as quality products, competitive pricing, excellent customer service, etc.]. Our customers choose us because [mention customer benefits like reliability, convenience, etc.].</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;

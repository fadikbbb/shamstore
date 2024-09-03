import { Link } from "react-router-dom";
import React from 'react';
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  return (
    <footer className="bg-cyan-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 items-center p-3 md:grid-cols-3 gap-8">
        <div>
          <h5 className="text-xl font-bold mb-2">About Market Sham</h5>
          <p className="text-white">Market Sham is your one-stop shop for all your needs.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
          <div>
            <h5 className="text-xl font-bold mb-2">Links</h5>
            <ul>
              <li className="mb-1"><HashLink to={"/#"} className="text-white hover:text-white">Home</HashLink></li>
              <li className="mb-1"><Link to={"/products"} className="text-white hover:text-white">Products</Link></li>
              <li className="mb-1"><HashLink to={"/#contact"} className="text-white hover:text-white">Contact</HashLink></li>
              <li className="mb-1"><HashLink to={"/#services"} className="text-white hover:text-white">services</HashLink></li>
              <li className="mb-1"><HashLink to={"/#about"} className="text-white hover:text-white">about</HashLink></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xl font-bold mb-2">Social</h5>
            <ul>
              <li className="mb-1"><Link to={""} className="text-white hover:text-white">Instagram</Link></li>
              <li className="mb-1"><Link to={""} className="text-white hover:text-white">LinkedIn</Link></li>
              <li className="mb-1"><Link to={""} className="text-white hover:text-white">TikTok</Link></li>
              <li className="mb-1"><Link to={""} className="text-white hover:text-white">facebook</Link></li>
              <li className="mb-1"><Link to={""} className="text-white hover:text-white">tiwitter</Link></li>
            </ul>
          </div>
        </div>

        <div>
          <h5 className="text-xl font-bold mb-2">Contact Us</h5>
          <address className="text-white">
            Email: <a href="mailto:info@shamstore.com" className="hover:text-white">info@shamstore.com</a>
            <br />
            Phone: <a href="tel:123-456-7890" className="hover:text-white">123-456-7890</a>
            <br />
            Fax: 123-456-7890
            <br />
            Address: 123 Main Street, Anytown, USA
            <br />
            WhatsApp: 123-456-7890
          </address>
        </div>
      </div>
      <div className="mt-8 border-t border-white pt-4 text-center">
        <p>&copy; {new Date().getFullYear()} Shamstore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

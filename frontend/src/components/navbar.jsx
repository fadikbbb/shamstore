import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
// import { CartContext } from '../contexts/CartContext'; // Import CartContext

function Navbars() {
  const [role, setRole] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const { cart } = useContext(CartContext); // Access cart from CartContext
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/api/v1/products?category=category");
console.log(response)
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  
  useEffect(() => {
    const extractedCategories = [...new Set(products.map(product => product.category))];
    setCategories(extractedCategories);
  }, [products]);

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    if (user) {
      setRole(JSON.parse(user).role);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const toggleDropDown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const renderNavLinks = () => (
    <>
      <NavLink to={"/"} className="lg:border-0 lg:p-0 nav-link">Home</NavLink>
      <NavLink to={"/products"} className="lg:border-0 lg:p-0 nav-link">Products</NavLink>
      <HashLink to={"/#about"} className="lg:border-0 lg:p-0 nav-link">About</HashLink>
      <HashLink to={"/#services"} className="lg:border-0 lg:p-0 nav-link">Services</HashLink>
      <HashLink to={"/#contact"} className="lg:border-0 lg:p-0 nav-link">Contact Us</HashLink>
      {window.localStorage.getItem("login") === "true" ? (
        role === "admin" ? (
          <NavLink to={"/dashboard"} className="lg:border-0 lg:p-0 nav-link">Dashboard</NavLink>
        ) : (
          <NavLink to={"/logout"} className="lg:border-0 lg:p-0 nav-link">Logout</NavLink>
        )
      ) : (
        <>
          <NavLink to={"/login"} className="lg:border-0 lg:p-0 nav-link">Login</NavLink>
          <NavLink to={"/signup"} className="lg:border-0 lg:p-0 nav-link">Signup</NavLink>
        </>
      )}
      {/* <NavLink to={"/cart"} className="lg:border-0 lg:p-0 nav-link">Cart {cart.length > 0 && `(${cart.length})`}</NavLink> Display cart count */}
    </>
  );

  const renderCategories = () => (
    <div className="relative">
      <button
        onClick={toggleDropDown}
        className="lg:border-0 lg:p-0 nav-link group/edit  flex items-center"
      >
        Categories
        <svg className="ml-2 group-hover/edit:text-cyan-500   h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      <ul className={`absolute left-0 mt-2 w-48 bg-white shadow-lg ${isDropdownOpen ? 'block' : 'hidden'}`}>
        {categories.map((category, index) => (
          <NavLink key={index} to={`/categories/${category}`} className="flex w-full hover:bg-gray-100 p-2">
            <li className="  text-gray-800 ">
              {category}
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );

  return (
    <nav className="flex items-center relative z-50 justify-between p-4 bg-white-800 text-black">
      <div className="flex items-center">
        <button className="mr-4 lg:hidden" type="button" onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
          </svg>
        </button>
        <Link className="text-xl font-bold" to={"/"}><img width={100} src='../../لقطة الشاشة 2024-06-28 020339.png'  alt=''/></Link>
      </div>
      <div className="hidden lg:flex lg:items-center lg:space-x-4">
        {renderNavLinks()}
        {renderCategories()}
      </div>
      <SearchForm products={products} />
      <div className={`fixed top-0 left-0 w-64 h-full bg-white z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden transition-transform duration-300`}>
        <ul className="flex flex-col mt-4">
          <li className="p-4">
            <button onClick={closeSidebar} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </button>
          </li>
          {renderNavLinks()}
          <li className="relative p-4 border-b">
            <button
              onClick={toggleDropDown}
              className="flex justify-between group/edit items-center text-gray-800 duration-200 hover:text-cyan-500"
            >
              Categories
              <svg className="ml-2 h-5 w-5 group-hover/edit:text-cyan-500 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" fill='currentColor' d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            <ul className={`absolute left-0 mt-2 w-full bg-white shadow-lg ${isDropdownOpen ? 'block' : 'hidden'}`}>
              {categories.map((category, index) => (
                <NavLink key={index} to={`/categories/${category}`} className="text-gray-800">
                  <li  className="p-2 hover:bg-gray-100">
                    {category}
                  </li>
                </NavLink>
              ))}
            </ul>
          </li>
        </ul>
      </div>

    </nav>
  );
}




function SearchForm({ products }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Set to empty array when search query is empty
    }
  }, [searchQuery, products]); // Dependency array ensures effect runs when searchQuery or products change

  function searchQ(e) {
    e.preventDefault();
    // If you want to navigate to the first matching product's details on form submit
    if (filteredProducts.length > 0) {
      navigator(`/products/${filteredProducts[0].id}`);
    }
  }

  return (
    <div>
      <form className="ml-auto flex lg:ml-0" onSubmit={searchQ}>
        <input
          className="form-control me-2 p-2 rounded-md outline-none focus:border-b-2 focus:border-cyan-500"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="p-2 ml-2 rounded-md" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </form>

      <ul className={`outline ${searchQuery && searchQuery.length > 0 ? 'outline-1 outline-cyan-500' : 'outline-none'}  scrollbar-none bg-white h-fit max-h-[300px] overflow-y-auto absolute top-[72px]`}>
        {filteredProducts.map(product => (
          <li key={product.id} className='p-4 border-cyan-500 border-b'>
            <Link to={`/products/${product.id}`} className='flex grid-col-3 justify-between items-center'>
              <img src={product.image} width={16} alt={product.title} />
              <h2 className='max-h-[20px] text-center overflow-hidden text-xs'>
                {product.title}
              </h2>
              <h4>${product.price}</h4>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Navbars;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbars from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";

function Products() {
  const URL = process.env.REACT_APP_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${URL}products`);
        setProducts(response.data.data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [URL]);

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const { category } = product;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  if (loading) {
    return (
      <img
        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
        src="../../../Bean Eater@1x-1.0s-200px-200px.svg"
        alt="Loading"
      />
    );
  }

  if (error) {
    return <p>Error fetching products: {error.message}</p>;
  }

  const scrollLeft = (category) => {
    document.querySelector(`.${category}`).scrollBy({
      top: 0,
      left: -(window.innerWidth * 0.5),
      behavior: "smooth",
    });
  };

  const scrollRight = (category) => {
    document.querySelector(`.${category}`).scrollBy({
      top: 0,
      left: window.innerWidth * 0.5,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Navbars />
      <h1 className="title">Products</h1>
      {/* Render each category and its products */}
      {Object.keys(groupedProducts).map((category) => (
        <div key={category}>
          <h2 className="title text-5xl">{category}</h2>
          <div className="flex items-center">
            <svg
              className="arrow cursor-pointer"
              onClick={() => scrollLeft(category)}
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "rotate(180deg)" }}
              width={50}
              height={50}
              viewBox="0 0 25 25"
            >
              <path
                fill="currentColor"
                d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
                data-name="Left"
              />
            </svg>
            <div
              className={`${category} scrollbar-none overflow-x-auto flex w-full`}
            >
              {groupedProducts[category].map((product) => (
                <div
                  key={product._id}
                  className="product shadow-lg shadow-cyan-100 rounded-[25px] p-4 min-w-[400px] mx-4 my-8 flex flex-col justify-between items-center"
                >
                  <div>
                    <img
                      src={product.image}
                      className="m-[auto] min-h-[150px] max-h-[150px]"
                      alt={product.title}
                    />
                  </div>
                  <h2 className="max-h-[40px] text-cyan-500 text-2xl my-4 text-ellipsis overflow-hidden">
                    {product.title}
                  </h2>
                  <p className="max-h-[100px] text-center text-xs text-gray-500 text-ellipsis overflow-hidden">
                    {product.description}
                  </p>
                  <p className="text-2xl my-4">${product.price}</p>
                  <Link
                    className="btn-lightgreen"
                    to={`/products/${product._id}`}
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
            <svg
              className="arrow cursor-pointer"
              onClick={() => scrollRight(category)}
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
              viewBox="0 0 25 25"
            >
              <path
                fill="currentColor"
                d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
                data-name="Right"
              />
            </svg>
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Products;

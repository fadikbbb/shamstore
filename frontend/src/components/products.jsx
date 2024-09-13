import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
function Products({ right, left }) {
  const URL = process.env.REACT_APP_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${URL}products`);
        setProducts(response.data.data);
       
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [URL]);
  // Check if products[0] exists before assigning to firstProduct
  let firstProduct = products.length > 0 ? products[0] : "";
  return (
    <div className="products">
      <h1 className="title" id="products">
        Products
      </h1>
      {!loading ? (
        <div className="flex justify-center items-center md:flex-row flex-col-reverse my-6">
          <div className="my-6">
            <h2 className="text-3xl font-bold mb-4">{firstProduct.title}</h2>
            <p className="text-xs text-gray-400">{firstProduct.description}</p>
            <p className="text-2xl my-4">${firstProduct.price}</p>
            <Link
              className="btn-lightgreen"
              to={`/products/${firstProduct._id}`}
            >
              View Details
            </Link>
          </div>
          <img src={firstProduct.image} width={400} alt={firstProduct.title} />
        </div>
      ) : (
        <div className="flex justify-center items-center bg-white">
          <img
            className=""
            src="../../../Bean Eater@1x-1.0s-200px-200px.svg"
            alt=""
          />
        </div>
      )}
      <div className="flex items-center">
        <svg
          className="arrow"
          onClick={() => left("products-list")}
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "rotate(180deg)" }}
          width={50}
          height={300}
          viewBox="0 0 25 25"
        >
          <path
            fill="currentColor"
            d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
            data-name="Right"
          />
        </svg>
        <div className="products-list scrollbar-none overflow-x-auto flex w-full">
          {products.map((product) => (
            <div
              className="product  p-4 shadow-lg shadow-cyan-100 rounded-[25px] shadow-cyan-1 00 min-w-[400px] mx-4 my-8 flex flex-col justify-between items-center"
              key={product._id}
            >
              <div>
                <img
                  src={product.image}
                  className="m-[auto] min-h-[150px] max-h-[150px]"
                  alt={product.title}
                />
              </div>
              <h2 className="max-h-[40px] text-cyan-500 text-2xl my-4  overflow-hidden">
                {product.title}
              </h2>
              <p className="max-h-[100px] text-center text-xs text-gray-500  overflow-hidden">
                {product.description}
              </p>
              <p className="text-2xl my-4">${product.price}</p>
              <Link className="btn-lightgreen" to={`/products/${product._id}`}>
                View Details
              </Link>
            </div>
          ))}
        </div>
        <svg
          className="arrow"
          onClick={() => right("products-list")}
          xmlns="http://www.w3.org/2000/svg"
          width={50}
          height={300}
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
  );
}

export default Products;

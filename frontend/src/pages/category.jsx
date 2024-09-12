import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";
function Categories() {
  const URL = process.env.REACT_APP_URL;
  const categoryName = useParams().id;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${URL}products/category/${categoryName}`
        );
        setProducts(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [categoryName, URL]);

  if (loading) {
    return (
      <img
        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
        src="../../Bean Eater@1x-1.0s-200px-200px.svg"
        alt=""
      />
    ); // Add a loading indicator
  }

  if (error) {
    return <p>Error fetching products: {error.message}</p>; // Display error message
  }

  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <h1 className="title">{categoryName}</h1>
      <div className="flex flex-wrap justify-evenly w-full my-[60px]">
        {products &&
          products.map((product) => (
            <div
              className="product border-x-2 p-4 border-cyan-500  lg:w-1/3 md:w-1/2 w-full  my-8 flex flex-col justify-between items-center"
              key={product._id}
            >
              <div>
                <img
                  className="m-[auto] min-h-[150px] max-h-[150px]"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <h2 className="font-bold text-2xl mb-2 my-5 text-cyan-500">
                {product.title}
              </h2>
              <p className="text-gray-400 text-xs my-2">
                {product.description}
              </p>
              <p className="my-2 text-2xl">${product.price}</p>
              <Link
                className="btn-lightgreen my-2"
                to={`/products/${product._id}`}
              >
                View Details
              </Link>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default Categories;

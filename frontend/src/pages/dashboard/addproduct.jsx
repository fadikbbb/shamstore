import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoryList from "../../components/categorylist";
function Addproduct() {
  const URL = process.env.REACT_APP_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const title = event.target.title.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const image = event.target.image.value;
    const category = event.target.category.value;
    const quantity = event.target.quantity.value;
    const formData = {
      title: title,
      description: description,
      price: parseFloat(price), // Ensure price is parsed as a number
      image: image,
      category: category,
      quantity: quantity,
    };

    try {
      await axios.post(
        `${URL}products`,
        formData, // Pass form data here as the second argument
        {
          headers: {
            Authorization: `Bearer ${token}`, // Headers go in the third argument
          },
        }
      );
      navigate("/dashboard");
      console.log(token);
      // Optionally, you can redirect or display a success message here
    } catch (error) {
      setError(error.response.data.message);
      // Handle errors as needed
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1 className="title">Add Product</h1>
      {error && (
        <p className="text-red-500 text-center bg-red-300 border-2 border-red-700 p-4 rounded">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="relative my-5">
          <input
            type="text"
            className="input-des"
            name="title"
            id="title"
            required
            placeholder="Title"
          />
          <label htmlFor="title" className="label-des">
            Title
          </label>
        </div>
        <div className="relative my-5">
          <input
            type="text"
            className="input-des"
            name="description"
            id="description"
            required
            placeholder="Description"
          />
          <label className="label-des" htmlFor="description">
            Description
          </label>
        </div>
        <div className="relative my-5">
          <input
            type="number"
            className="input-des up-down"
            name="price"
            id="price"
            required
            placeholder="Price"
          />
          <label className="label-des" htmlFor="price">
            Price
          </label>
        </div>
        <div className="relative my-5">
          <input
            type="number"
            className="input-des up-down"
            name="quantity"
            id="quantity"
            required
            placeholder="quantity"
          />
          <label className="label-des" htmlFor="quantity">
            quantity
          </label>
        </div>
        <div className="relative my-5">
          <input
            type="text"
            className="input-des"
            name="image"
            id="image"
            required
            placeholder="Image URL"
          />
          <label className="label-des" htmlFor="image">
            Image
          </label>
        </div>
        <CategoryList />
        <button
          type="submit"
          className={`btn-lightgreen m-auto ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
        <Link
          to={"/dashboard"}
          className="m-4 text-blue-500 hover:text-blue-700"
        >
          Go back
        </Link>
      </form>
    </div>
  );
}

export default Addproduct;

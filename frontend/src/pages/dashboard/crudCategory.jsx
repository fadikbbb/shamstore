import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Category() {
  const [categories, setCategories] = useState([]); // Store list of categories
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: "",
    description: "",
  }); // Input for new category
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const URL = process.env.REACT_APP_URL; // Your API URL
  const token = useSelector((state) => state.user.token);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${URL}products/categories`);
        setCategories(response.data.data); // Assuming response structure
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [URL]);

  // Handle adding a new category
  const handleAddCategory = async () => {
    const { name, image, description } = newCategory;
    if (!name.trim() || !image.trim() || !description.trim()) return; // Prevent adding empty category fields

    try {
      const response = await axios.post(
        `${URL}products/categories`,
        { name, image, description }, // Assuming category structure
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories([...categories, response.data.data]); // Add new category to the list
      setNewCategory({ name: "", image: "", description: "" }); // Reset input
      console.log("Category added successfully");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Handle deleting a category with confirmation
  const handleDeleteCategory = async (categoryId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category? All associated products will also be deleted."
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${URL}products/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(
        categories.filter((category) => category._id !== categoryId)
      ); // Remove from list
      console.log("Category and its products deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="title">Manage Categories</h1>

      {/* Add new category */}
      <div className="mb-6">
        <input
          type="text"
          className="input-des my-4"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          placeholder="Enter category name"
        />
        <input
          type="text"
          className="input-des my-4"
          value={newCategory.image}
          onChange={(e) =>
            setNewCategory({ ...newCategory, image: e.target.value })
          }
          placeholder="Enter category image URL"
        />
        <input
          type="text"
          className="input-des my-4"
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory({ ...newCategory, description: e.target.value })
          }
          placeholder="Enter category description"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-600"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>

      {/* Display categories in a table */}
      {isLoading ? (
        <p>Loading categories...</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-cyan-500 text-white">
              <th className=" px-4 py-2">#</th>
              <th className=" px-4 py-2">Category Name</th>
              <th className=" px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id} className="text-center odd:bg-gray-200">
                <td className=" px-4 py-2">{index + 1}</td>
                <td className=" px-4 py-2">{category.name}</td>
                <td className=" px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Category;

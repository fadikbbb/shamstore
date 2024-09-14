import { useEffect, useState } from "react";
import axios from "axios";

function CategoryList() {
  const [categories, setCategories] = useState([]); // Store categories
  const [selectedCategory, setSelectedCategory] = useState(""); // Store selected category
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const URL = process.env.REACT_APP_URL;

  // Fetch categories on component mount
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
  }, [URL]); // Runs only once when the component mounts
  return (
    <div className="flex flex-col">
      {/* Display loading state */}
      {isLoading ? (
        <p>Loading categories...</p>
      ) : (
        <>
          {/* Select dropdown for categories */}
          <div className="relative my-5">
            <label htmlFor="category" className="label-des">
              Select Category
            </label>
            <select
              id="category"
              className="input-des"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)} // Set selected category
            >
              <option value="" disabled>
                -- Select a Category --
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}{" "}
                  {/* Adjust based on actual category structure */}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryList;

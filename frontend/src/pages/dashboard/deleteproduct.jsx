import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Deleteproduct() {
  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const handleDelete = async () => {
      try {
        await axios.delete(`${URL}/products/${id}`);
        navigator("/dashboard");
        console.log("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error.message);
        // Handle errors as needed
      }
    };

    handleDelete();
  }, [id, navigator]);
}
export default Deleteproduct;

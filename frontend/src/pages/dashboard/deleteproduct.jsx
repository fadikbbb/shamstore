import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
function Deleteproduct() {
  
  const token = useSelector((state) => state.user.token);
  const navigator = useNavigate();
  const { id } = useParams();
  const URL = process.env.REACT_APP_URL;
  useEffect(() => {
    const handleDelete = async () => {
   
      try {
        await axios.delete(`${URL}products/${id}`,{
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        navigator("/dashboard");
        console.log("Product deleted successfully");
      } catch (error) {
        console.log(error);
        console.error("Error deleting product:", error.message);
        // Handle errors as needed
      }
    };

    handleDelete();
  }, [id, URL, navigator, token]);
}
export default Deleteproduct;

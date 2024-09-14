import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardNav from "./dashboardNav.jsx";
import Navbars from "../../components/navbar.jsx";
function DetailProduct() {
  const URL = process.env.REACT_APP_URL;
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${URL}products`);
        setTableData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false); // Set loading to false in case of error
      }
    }

    fetchData();
  }, [URL]);

  if (loading) {
    return (
      <img
        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
        src="../../../Bean Eater@1x-1.0s-200px-200px.svg"
        alt=""
      />
    ); // Render loading message while fetching data
  }

  if (error) {
    console.log(error);
    return <div>Error: {error}</div>; // Render error message if there's an error
  }
  return (
    <div>
      <Navbars />
      <div className="container">
        <div className="flex md:flex-nowrap flex-wrap ">
          <DashboardNav />
          <main
            className={`col-span-12 w-full relative md:col-span-9 lg:col-span-10 px-4  lg:px-8 ms:h-48 py-6`}
          >
            <div>
              <h2 className="title">Products</h2>
              <div className="flex flex-wrap justify-evenly ">
              <Link
                to={"/dashboard/addproduct"}
                className="md:w-1/3 w-full  text-center text-white hover:bg-cyan-600 duration-200 flex justify-center bg-cyan-500 rounded-lg p-3  md:my-8"
              >
                Add Product
              </Link>
              <Link
                to={"/dashboard/category"}
                className="md:w-1/3 w-full text-center text-white hover:bg-cyan-400 duration-200 flex justify-center bg-cyan-700 rounded-lg p-3 my-4 md:my-8"
                >
                Add category
              </Link>
                </div>
              <div className="table-responsive">
                <table className="table-fixed w-full">
                  <thead>
                    <tr className="text-center text-white bg-cyan-500">
                      <th className="table-th" scope="col">
                        ID
                      </th>
                      <th className="table-th" scope="col">
                        Title
                      </th>
                      <th className="table-th" scope="col">
                        Price
                      </th>
                      <th className="table-th" scope="col">
                        Description
                      </th>
                      <th className="table-th" scope="col">
                        Category
                      </th>
                      <th className="table-th md:w-[250px]" scope="col">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map(
                      ({ _id, title, price, description, category },i) => (
                        <tr
                          key={_id}
                          className="text-center align-middle odd:bg-slate-100"
                        >
                          <td>{1+i}</td>
                          <td className="text-ellipsis whitespace-nowrap overflow-hidden">
                            {title}
                          </td>
                          <td>${price}</td>
                          <td className="text-ellipsis whitespace-nowrap overflow-hidden">
                            {description}
                          </td>
                          <td>{category}</td>
                          <td className="flex lg:flex-row flex-col p-2 justify-center align-middle">
                            <Link
                              to={`/products/${_id}`}
                              className="table-link bg-blue-500 hover:bg-blue-700"
                            >
                              View
                            </Link>
                            <Link
                              to={`/dashboard/editproduct/${_id}`}
                              className="table-link bg-green-500 hover:bg-green-700"
                            >
                              Update
                            </Link>
                            <Link
                              to={`/dashboard/deleteproduct/${_id}`}
                              className="table-link bg-red-500 hover:bg-red-700"
                            >
                              Delete
                            </Link>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;

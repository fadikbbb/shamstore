import React, { useState, useEffect } from "react";
import Navbars from "../../components/navbar";
import DashboardNav from "./dashboardNav";
import axios from "axios";
import { useSelector } from "react-redux";
function Customer() {
  const URL = process.env.REACT_APP_URL;
  const token = useSelector((state) => state.user.token);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const customerResponse = await axios.get(`${URL}users`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        setCustomers(customerResponse.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <img
        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
        src="../../../Bean Eater@1x-1.0s-200px-200px.svg"
        alt=""
      />
    );
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div>
      <Navbars />
      <div className="container">
        <div className="flex md:flex-nowrap flex-wrap ">
          <DashboardNav />
          <main>
            <h1 className="title">Customers</h1>
            <table className="table-fixed w-full">
              <thead>
                <tr className="text-white h-16 bg-cyan-500">
                  <th className="text-center align-middle mx-4">first Name</th>
                  <th className="text-center align-middle mx-4">last Name</th>
                  <th className="text-center align-middle mx-4">Email</th>

                  <th className="text-center align-middle mx-4">type</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="text-center h-16 align-middle even:bg-gray-300 even:text-white"
                  >
                    <td className="text-center align-middle mx-4">
                      {customer.firstName}
                    </td>
                    <td className="text-center align-middle mx-4">
                      {customer.lastName}
                    </td>
                    <td className="text-center align-middle mx-4">
                      {customer.email}
                    </td>
                    <td className="text-center align-middle mx-4">
                      {customer.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Customer;

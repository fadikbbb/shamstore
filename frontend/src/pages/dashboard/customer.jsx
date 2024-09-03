import React, { useState, useEffect } from 'react';

function Customer() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const customerResponse = await fetch('https://666da7c37a3738f7caccf44a.mockapi.io/shamstore/user');
                if (!customerResponse.ok) {
                    throw new Error('Failed to fetch customers');
                }
                const customersData = await customerResponse.json();

                const messageResponse = await fetch('https://666da7c37a3738f7caccf44a.mockapi.io/shamstore/message');
                if (!messageResponse.ok) {
                    throw new Error('Failed to fetch messages');
                }
                const messagesData = await messageResponse.json();

                const customersWithMessages = customersData.map(customer => {
                    const customerMessage = messagesData.find(msg => msg.email === customer.email);
                    return { ...customer, message: customerMessage ? customerMessage.message : 'No message' };
                });

                setCustomers(customersWithMessages);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCustomers();
    }, []);

    if (loading) {
        return <img className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]' src='../../../Bean Eater@1x-1.0s-200px-200px.svg' alt=''/>;
    }

    if (error) {
        return <p>Error fetching data: {error.message}</p>;
    }

    return (
        <div>
            <h1 className='title'>Customers</h1>
            <table className="table-fixed w-full">
                <thead>
                    <tr className='text-white h-16 bg-cyan-500'>
                        <th className='text-center align-middle mx-4'>Name</th>
                        <th className='text-center align-middle mx-4'>Email</th>
                        <th className='text-center align-middle mx-4'>first Message</th>
                        <th className='text-center align-middle mx-4'>type</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr  key={customer.id} className='text-center h-16 align-middle even:bg-gray-300 even:text-white'>
                            <td className='text-center align-middle mx-4'>{customer.name}</td>
                            <td className='text-center align-middle mx-4'>{customer.email}</td>
                            <td className='text-center align-middle mx-4'>{customer.message}</td>
                            <td className='text-center align-middle mx-4'>{customer.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Customer;

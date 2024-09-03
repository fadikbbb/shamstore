import React, { useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
function Deleteproduct() {

    const navigator = useNavigate();
    const { id } = useParams();

    const handleDelete = async () => {
        try {
                const response = await fetch(`https://6672c0d76ca902ae11b1a226.mockapi.io/shamstore/products/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                navigator('/dashboard');
                console.log('Product deleted successfully');
                // Optionally, you can redirect or display a success message here
            } catch (error) {
                console.error('Error deleting product:', error.message);
                // Handle errors as needed
            }
        };

    useEffect(() => {
        handleDelete();
    }, []);
    }


export default Deleteproduct
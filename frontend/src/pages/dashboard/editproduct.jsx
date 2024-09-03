import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'
function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
        category: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`https://6672c0d76ca902ae11b1a226.mockapi.io/shamstore/products/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const product = await response.json();
                setFormData({
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    category: product.category
                });
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(`https://6672c0d76ca902ae11b1a226.mockapi.io/shamstore/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Product updated successfully:', formData);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error updating product:', error.message);
            setError(error.message);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    if (loading) {
        return <img className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]' src='../../Animation - 1719504658142.gif' alt=''/>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1 className='title'>edit product </h1>
            <form onSubmit={handleSubmit}>
                <div className="relative mb-3">
                    <input type="text" className="input-des" name="title" id="titleInput" placeholder="Title" value={formData.title} onChange={handleChange} />
                    <label className='label-des' htmlFor="titleInput">Title</label>
                </div>
                <div className="relative mb-3">
                    <input type="text" className="input-des" name="description" id="descriptionInput" placeholder="Description" value={formData.description} onChange={handleChange} />
                    <label className='label-des' htmlFor="descriptionInput">Description</label>
                </div>
                <div className="relative mb-3">
                    <input type="number" className="input-des" name="price" id="priceInput" placeholder="Price" value={formData.price} onChange={handleChange} />
                    <label className='label-des' htmlFor="priceInput">Price</label>
                </div>
                <div className="relative mb-3">
                    <input type="text" className="input-des" name="image" id="imageInput" placeholder="Image URL" value={formData.image} onChange={handleChange} />
                    <label className='label-des' htmlFor="imageInput">Image</label>
                </div>
                <div className="relative mb-3">
                    <input type="text" className="input-des" name="category" id="categoryInput" placeholder="Category" value={formData.category} onChange={handleChange} />
                    <label className='label-des' htmlFor="categoryInput">Category</label>
                </div>
                <button type="submit" className="btn-lightgreen">Submit</button>
         <Link to={"/dashboard"} className="text-blue-500 hover:text-blue-700 mx-4">go back</Link>
            </form>
        </div>
    );
}

export default EditProduct;

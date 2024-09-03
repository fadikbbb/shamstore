import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Addproduct() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        const title = event.target.title.value;
        const description = event.target.description.value;
        const price = event.target.price.value;
        const image = event.target.image.value;
        const category = event.target.category.value;
        
        const formData = {
            title: title,
            description: description,
            price: parseFloat(price), // Ensure price is parsed as a number
            image: image,
            category: category
        };

        try {
            const response = await fetch('https://6672c0d76ca902ae11b1a226.mockapi.io/shamstore/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Product added successfully:', formData);

            // Optionally, you can redirect or display a success message here
        } catch (error) {
            console.error('Error adding product:', error.message);
            // Handle errors as needed
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h1 className='title'>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="relative my-5">
                    <input type="text" className="input-des" name="title" id="title" required placeholder="Title" />
                    <label htmlFor="title" className="label-des">Title</label>
                </div>
                <div className="relative my-5">
                    <input type="text" className="input-des" name="description" id="description" required placeholder="Description" />
                    <label className="label-des" htmlFor="description">Description</label>
                </div>
                <div className="relative my-5">
                    <input type="number" className="input-des up-down" name="price" id="price" required placeholder="Price" />
                    <label className="label-des" htmlFor="price">Price</label>
                </div>
                <div className="relative my-5">
                    <input type="text" className="input-des" name="image" id="image" required placeholder="Image URL" />
                    <label className="label-des" htmlFor="image">Image</label>
                </div>
                <div className="relative my-5">
                    <input type="text" className="input-des" name="category" id="category" required placeholder="Category" />
                    <label className="label-des" htmlFor="category">Category</label>
                </div>
                <button type="submit" className={`btn-lightgreen m-auto ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
                <Link to={"/dashboard"} className='m-4 text-blue-500 hover:text-blue-700'>Go back</Link>
            </form>
        </div>
    );
}

export default Addproduct;

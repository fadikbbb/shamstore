import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
function Categories() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://6672c0d76ca902ae11b1a226.mockapi.io/shamstore/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <img className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]' src='../../Bean Eater@1x-1.0s-200px-200px.svg' alt=''/>; // Add a loading indicator
    }

    if (error) {
        return <p>Error fetching products: {error.message}</p>; // Display error message
    }

    return (
        <div style={{ height: '100vh' }}>
            <Navbar  />
            <h1 className='title'>Category {id}</h1>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    width: '100%',
                    margin: '60px auto',
                }}
            >
                {products && products.map((product) => (
                    product.category === id && (
                        <div
                            className="product border-x-2 p-4 border-cyan-500  lg:w-1/3 md:w-1/2 w-full  my-8 flex flex-col justify-between items-center"
                            key={product.id}
                        >
                            <div>

                            <img className='m-[auto] min-h-[150px] max-h-[150px]' src={product.image}  alt={product.title} />
                            </div>
                            <h2 className='font-bold text-2xl mb-2 my-5 text-cyan-500'>
                                {product.title}
                            </h2>
                            <p className="text-gray-400 text-xs my-2">
                                {product.description}
                            </p>
                            <p className='my-2 text-2xl'>${product.price}</p>
                            <Link className='btn-lightgreen my-2' to={`/products/${product.id}`}>View Details</Link>
                        </div>
                    )
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Categories;

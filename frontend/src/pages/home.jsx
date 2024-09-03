import { useEffect, useState, useRef } from "react";
import Navbars from "../components/navbar";
import Products from "../components/products";
import Services from "../components/services";
import About from "../components/about";
import CategoriesCo from "../components/categoriesCo";
import Contact from "../components/contact";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Feedback from "../components/feedback";
function Home() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const categoriesRef = useRef(null);
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
    useEffect(() => {
        const extractedCategories = [...new Set(products.map(product => product.category))];
        setCategories(extractedCategories);
    }, [products]);

    if (loading) {
        return <img className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]' src='../../../Bean Eater@1x-1.0s-200px-200px.svg' alt=''/>;// Add a loading indicator
    }

    if (error) {
        return <p>Error fetching products: {error.message}</p>; // Display error message
    }



    const getOneProductFromCategory = (category) => {
        return products.find(product => product.category === category);
    };

    // Check if products[0] exists before assigning to firstProduct
    let firstProduct = products.length > 0 ? products[0] : "";
    const scrollLeft = (element) => {
        document.querySelector(`.${element}`).scrollBy({
            top: 0,
            left: -(window.innerWidth * 0.5),
            behavior: 'smooth'
        });
    };

    const scrollRight = (element) => {

        document.querySelector(`.${element}`).scrollBy({
            top: 0,
            left: window.innerWidth * 0.5,
            behavior: 'smooth'
        });
        console.log(element)
        console.log("clicked")
    };
    return (
        <div>

            <Navbars />
            <Hero/>
            <Products right={scrollRight} left={scrollLeft} data={products} firstProduct={firstProduct} />
            <Services />
            <CategoriesCo right={scrollRight} left={scrollLeft}  getOneProductFromCategory={getOneProductFromCategory} categories={categories} categoriesRef={categoriesRef} />
            <About />
            <Feedback right={scrollRight} left={scrollLeft}/>
            <Contact />
            <Footer />
        </div>
    );
}




export default Home
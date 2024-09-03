import { Link } from "react-router-dom";

function CategoriesCo({right,left, categories, getOneProductFromCategory, categoriesRef }) {
    

    return (
        <div id="categories">
            <h1 className='title'>Categories</h1>
            <div className="flex " >
                <svg
                    onClick={() => left("categories")}
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotate(180deg)" }}
                    className="arrow"
                    width={50}

                    viewBox="0 0 25 25"
                >
                    <path fill="currentColor" d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" />
                </svg>
                <div className="categories flex flex-row w-full" ref={categoriesRef} style={{ scrollbarWidth: "none", overflowX: "auto" }}>
                    {categories.length > 0 && categories.map((category, index) => (
                        <Link to={`/categories/${category}`} key={index} className="flex  border-x border-cyan-500 justify-center items-center mx-4 rounded-lg hover:bg-[rgba(6,182,212,0.5)] text-cyan-500 hover:text-white duration-200 relative min-h-[300px] min-w-[300px]">
                            <img className="absolute max-h-full -z-10" src={getOneProductFromCategory(category).image} alt="category" />
                            <h2 className="text-currentColor  font-bold text-3xl">{category}</h2>
                        </Link>
                    ))}
                </div>
                <svg
                  onClick={() => right("categories")}
                    xmlns="http://www.w3.org/2000/svg"
                    className="arrow "
                    width={50}

                    viewBox="0 0 25 25"
                >
                    <path fill="currentColor" d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" />
                </svg>
            </div>
        </div>
    );
}

export default CategoriesCo;

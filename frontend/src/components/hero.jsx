import { HashLink } from "react-router-hash-link"

function Hero() {

    return (
        <div className="hero flex md:flex-row flex-col-reverse items-center w-full">
            <div className="hero-text   md:w-1/2 w-full">
                <h1 className="text-5xl font-bold my-4 text-cyan-500">Sham Store</h1>
                <p className="text-ms text-gray-400"> is your ultimate destination. Explore our wide range of products including:</p>
                <ol className="">
                    <li className="my-4 text-gray-400"><b className="text-cyan-500">Groceries:</b> Fresh produce, pantry staples</li>
                    <li className="my-4 text-gray-400"><b className="text-cyan-500">Home Essentials:</b> From kitchenware to bedding,
                    </li>
                    <li className="my-4 text-gray-400"><b className="text-cyan-500">Electronics:</b> Stay connected with the latest gadgets and tech accessories.</li>
                    <li className="my-4 text-gray-400"><b className="text-cyan-500">Fashion:</b> Trendy clothing, footwear, and accessories for all ages.</li>
                    <li className="my-4 text-gray-400"><b className="text-cyan-500">Toys and Games:</b> Keep the kids entertained with our diverse selection.</li>
                    <li className="my-4 text-gray-400"><b className="text-cyan-500">Sports:</b> Gear up for your next adventure with our sports equipment and outdoor essentials.
                    </li>
                </ol>
                <div className="m-8 text-center">

                <HashLink className="btn-lightgreen" to={"#about"}>lrean more</HashLink>
                </div>
            </div>
            <div className="hero-img relative md:w-1/2 w-full">
                <div className="absolute top-0 left-0 w-full h-full md:bg-gradient-to-r from-white via-white via-10% to-transparent"></div>
                <img className="w-full left-0 z-0 rounded-lg" src="../../pixlr-image-generator-4f135984-c14d-4a4c-960a-f4d048b8f4ac.png" alt="" />
            </div>
        </div>
    )
}

export default Hero
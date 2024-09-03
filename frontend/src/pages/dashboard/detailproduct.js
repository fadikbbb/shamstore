
import { Link } from 'react-router-dom';

function DetailProduct({data}) {
    
    return (
        <main className={`col-span-12 w-full relative md:col-span-9 lg:col-span-10 px-4  lg:px-8 ms:h-48 py-6`}>

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <div className="btn-group">
                    <button className="btn btn-sm btn-outline-primary">Export</button>
                </div>
            </div>
            <div>

                <h2 className='title'>Products</h2>
                <Link to={"/dashboard/addproduct"} className='text-center text-white hover:bg-cyan-600 duration-200 flex justify-center bg-cyan-500 rounded-lg p-3 my-8'>Add Product</Link>
                <div className="table-responsive">
                    <table className="table-fixed w-full">
                        <thead>
                            <tr className="text-center text-white bg-cyan-500">
                                <th className='text-ellipsis overflow-hidden' scope="col">ID</th>
                                <th className='text-ellipsis overflow-hidden' scope="col">Title</th>
                                <th className='text-ellipsis overflow-hidden' scope="col">Price</th>
                                <th className='text-ellipsis overflow-hidden' scope="col">Description</th>
                                <th className='text-ellipsis overflow-hidden' scope="col">Category</th>
                                <th className='text-ellipsis overflow-hidden md:w-[250px]' scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(({ id, title, price, description, category }) => (
                                <tr key={id} className="text-center align-middle odd:bg-slate-100">
                                    <td>{id}</td>
                                    <td className="text-ellipsis whitespace-nowrap overflow-hidden">{title}</td>
                                    <td>${price}</td>
                                    <td className="text-ellipsis whitespace-nowrap overflow-hidden">{description}</td>
                                    <td>{category}</td>
                                    <td className="flex lg:flex-row flex-col p-2 justify-center align-middle">
                                        <Link to={`/products/${id}`} className="text-white py-2 md:px-4 rounded m-1 bg-blue-500 hover:bg-blue-700">View</Link>
                                        <Link to={`/dashboard/editproduct/${id}`} className="text-white py-2 md:px-4 rounded m-1 bg-green-500 hover:bg-green-700">Update</Link>
                                        <Link to={`/dashboard/deleteproduct/${id}`} className="text-white py-2 md:px-4 rounded m-1 bg-red-500 hover:bg-red-700">Delete</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>);
}

export default DetailProduct;

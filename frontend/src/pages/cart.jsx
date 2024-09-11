// // Cart.js

// import React, { useContext } from 'react';
// import { CartContext } from '../contexts/CartContext';
// import { Link } from 'react-router-dom';

// function Cart() {
//     const { cart, clearCart, removeFromCart, total } = useContext(CartContext);

//     const handleBuyClick = () => {
//         // Perform actions related to buying (e.g., payment processing)
//         // Clear the cart after buying
//         clearCart();
//         alert('Thank you for your purchase! Your cart has been cleared.');
//     };

//     return (
//         <div>
//             <h1 className="title">Cart</h1>
//             <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
//                 {cart.length === 0 ? (
//                     <p className="text-center text-gray-400 ">Your cart is empty</p>
//                 ) : (
//                     <div>
//                         {cart.map((item, index) => (
//                             <div key={index} className="flex justify-between items-center mb-4">
//                                 <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
//                                 <div className="flex-1 ml-4">
//                                     <h2 className="text-xl font-bold">{item.title}</h2>
//                                     <p>Quantity: {item.quantity}</p>
//                                     <p>Total Price: ${item.totalPrice.toFixed(2)}</p>
//                                     <div className="flex mt-2">
//                                         <button
//                                             className="bg-red-500 text-white px-3 py-1 rounded-md mr-2"
//                                             onClick={() => removeFromCart(item.id)}
//                                         >
//                                             Remove
//                                         </button>
//                                         {/* Link to view details */}
//                                         <Link to={`/products/${item.id}`} className="bg-blue-500 text-white px-3 py-1 rounded-md">
//                                             View
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                         <div className="flex justify-between items-center mt-4">
//                             <h3 className="text-xl font-bold">Total:</h3>
//                             <p className="text-xl font-bold">${total.toFixed(2)}</p>
//                         </div>
//                         <div className='w-full flex justify-start items-center'>
//                             <button onClick={handleBuyClick} className="btn-lightgreen px-12 my-4">
//                                 Buy
//                             </button>
//                             <Link className='text-blue-500 hover:text-blue-700 duration-200 mx-4' to={"/"}>go back to home</Link>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Cart;

function Cart() {
    return <div>Cart</div>;
}   

export default Cart;
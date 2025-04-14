import React, { useState, useEffect } from 'react';
import './App.css';

// Product data
const initialProducts = [
  { id: 1, name: 'Wireless Headphones', price: 129.99, image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhAVFhEQFhYXFRYVEBIVGBUVFxYWFxcTFxUYHSkgGBolGxUVITIhJyorLy4uFx8zODMtNygtLisBCgoKDQUNFQUPGjcZGhkrKystKysrKys3KysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcEBQIDCAH/xABCEAACAQIDBAYGCAQEBwAAAAAAAQIDEQQhMQUSQVEGB2FxgZETIjKhscEUI0JygpLR8DNSYqIkNHOyQ1Rjg7PC4f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC6gAAAAAAAAAAAAAAAAAAAsLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1fSPbdPCUJVqmfCEb2c5vSK+LfBJgctubco4Sn6StO1/Zis5zfKMePfouLKv271kYmo2qNqFPhZKU2u2bVl4Jd7Ij0i2/Ur1ZVa07zl5RjwhFcIq/z1dyO19ogSWvtyvJ3liKsn/VWqP4s+0NuVo6Yir41JP3N2IfLHy4HxY2S4MCz9m9KZN2q1asf64VqtvGO9715Enw+Lqq0oYqq080/TTkmudm2mUnh9rW1JVsLbjgrJ3pvVX9l/wAy+a8e8LcwPSWpHKqlNc0lGX6P3EmweMhVjvQldceafJrgVAtqdp34DpBOjNThLNarhJcmuKAt8Gv2JtaniaSqU32SjfOEuMX+vFM2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKA6yulyxFeW7K9KleFJc1xqfidn3KJZXWj0leFw/ooNKpiIyu8/UpWtKStxd7J955vxFVzk5cZP8AaA5VcQ5PvMnZ+zZ1ZxhCMpTm7RjFXcm+CSOmnS3Ve2fcX71O9Go0cLDF1IL6Rik5RbWcKL9hLlvJbz+8lwA1XRTqggoqeOk3J5+hpysl2TqLNvsjbvZYOB6L4KkrU8FQXb6GEpeMpJt+ZtwBpNo9EcBXVquBoSvxVGMJLunC0l4Mr3pH1ROners2o3bN4arJPe7KdV6Psn+ZFugDzRCvOO9GcZQlTk4yhJNSg19mSen6NHL6Yy0et3o8qlFYuCtUo2jVaWcqUnaMnz3JNdylLkUviYuMmrt8n2PNe4Ca9DOlTwmIUpP6ipaNVf08J98W7911xL2i0807p6NcVzPKG8y3upvpXOrvYKtPedOG9Qk9dyNoypN8bXi1xtvcEgLSAAAAAAAAAAAAAAAAAAAAAAAAAAAAx8fiVSpVKj0pQlP8sW/kBQPW/tf0uLqpP1YyVKP3aftec2yD4ChvS7jJ2/iHOs23dpXf3pPefxMvYdD1WwO3ZGyHi8Zh8KtK1SMZWytTV5VHlx3IzZ6jhBRSUVaMUkktElkkilepTZ2/j69drLDUlCP360te9RpyX4i7AAAAAADqxeGjUhOnNXhUjKElzjJNNeTPNm39nSo1ZUp+3QnKm3b2rN7su52k+5o9MFN9bmztzF+kSyxNJSf36Voy/sVPzArr0JndH8e8LiqOIX/BmnLtg/VqLxg5LxPsKR8q0QPTUZJ5p3TzT5rmfSPdX+O9Ns/Dyb9aEPRyvrek3C771FPxJCAAAAAAAAAAAAAAAAAAAAAAAAAI51h4jc2fXtrOMYL8coxfubJGQnrcrbuBiv560F5RnL5AedMbPeqTfOTXyJNs2nal4EXo5vvfzJelFUO2y/fkBZ3UdhN3B1qr1r4mVvu04Qgv7t8sYiHVLQ3NlYbnP0s/z1qkl7miXgAAAAAAgPXBhL4ehVt/CrbrfKFSLb99OC8SfEX6y6G/s6vzj6OXlVhf3XApmhTyRyq0sjvwcbq/O/xZ3zpZAT/qexF6Felf+HVU12KpBL402T8rDqknavXh/PSjL8krf+5Z4AAAAAAAAAAAAAAAAAAAAAAAAAgHXLL/AAlP/Ub8qcv1J+V/1zr/AAcHyqP305/oB59wOq7yUVpfV+BD6dbdsbOjUp7rl9IrXWkJyVnfLhqB6U6uI22Xgu3D035q/wAyRlUdG+tDB4bBYWhKFaVSjQpQnuwgkpRglJXlJN58bG1w3W/gJO0qeIh2unCS/tlf3AWEDUbE6TYTF/5fEwnK19y7jNLm6crS9xtwAAAGl6axvgMV2UKj/LFy+R24rpLg6btPGUFJar0sG13pPI1W3+keDrYPEwp4yjKc8PWSiqsN5t05ZKLd2BVmyqfqLs/RGbOkcNh0700/3ojZVKWQGb1Zq2NdtHQqL++m/kWoVh1d0/8AGf8AaqfGJZ4AAAAAAAAAAAAAAAAAAAAAAAAAhXXBhFPZlSXpIwlRlCcXN2UnfddNf1SUnZc7d5NSheufpBKvjVhIP6rCJXXB1pK8pPnZNRXJqfMCsY4BuSz78tDKlSUWorNrVm3oYTdhfiaik7yk+0DKpQilect1Hb6fD8Jo0uMpyqS1yWSXzMGrQce7sAlG7G6lCpZxd4tOzTWjTWaZZHQbrRqUpRobQk50nlHEPOdPl6X+eH9Wq1d9VRtOq1ozd7JlOpdWyWr/AHxA9I9M+nuHwMVFWrYicd6FKElbdfszqTz3Ivhq3wVrtUv0g6a4vFt+mrPcelKF4U0uW6n63fK7NTKhZZfu2Rr8TkBsaWO7TvlWv2tcFmyPwnf9DOwUa9SSpUtXydrLm3wQFl9GpKWHhJaS3vdJr5GxmjRbC2LWw9Lc+lXTblb0Se65Zuzbu888zYPDVf8AmZeFKl84sCUdAMLbETkllGk14ynFr/ayfFX9E9uvB1XCvV3qGIkk5SjCLpT0UrxSvB8b6a872gAAAAAAAAAAAAAAAAAAAAAAAAB116yhGU5ezCLk+6Ku/geXae9Vq1K0/brTlOX3pNt+9s9H9L52wOKa1+j1UvGDXzPP1KnZAfcTD6t9xFqD17yX1leLIha05IDhDTxfxZxqI5LV9/xzPkgMGOEcpqMVnJ27u0m2DwUacFGPD3vma/o5g9aj7o/Nm7n+/wBAMKpSbdks3+7vsMDF4Dgldv3kro4NQg3K12ryfBJcL8l+pg4uUacHVmtcoR0eei737l4gR/6EqaS1qS/fl8SY9FtmqCvbN6viyM7PSblWrO0Vm3y5RS9yRsp4qpWVm5UqPCnF2lJc6klp91PvbAleM27hqb3ZVo761jG9SS74wTa8TDfSjDcZTXbLD10vPdyNHSpxgkoxUUuCSXwE5AbTaGJp1oN05xnHnGSa7nbQs7qw228Tgkpu9XCydGbd7tRScJZ6+pKKb4tMo3FUlffg92otJLj2SX2l2MsPqHxTlPGx0i44eduUm68ZfBL8IFugAAAAAAAAAAAAAAAAAAAAAAA1PSynvYLEr/oVX5Qb+RQkl6vc38Wj0biKKnCUHpOLi+6SafxPOtSk4pwftRyd9d5c+26A6JzyIxtKNp34G9nVyNRj1cDBnrfn8V+/cfNcuZwi/svhodlB+tG/MCV4OO7CKXBGz2XQ3pbz0hp2y/8Aiz72uRqaNTL959hIsHHdio8te1vNvzA5VbTlb7FOznyctVF9iVpP8PNkP2ji/pFa97Uqd92+SstZvvt5Iz9s7T/w9OnF+vXipVOaTzknybldW7GjUwpaU+GUqndrGn46vsS5gZeFjvtSf8OP8OL/API1/M+HJd7NipHTTRzbA5uR1TmcZTOipMDhiauRafUPgbUMTXa/i1YwT5qmpTuvGs/IqDETbdkm23ZJJttvsWp6W6HbG+h4Khh7etCF5/6kvWnny3m13JAboAAAAAAAAAAAAAAAAAAAAAAAAozrFwP0fG1Va0a31sO6d97+9T9xeZC+tPo3LF4XfoxviMNeUEtZwdvSU1zdkmlzjbiBQ+Iq5vzNfXmfZTvmdc4sDHnG5xUnG11x1MpUTvpQ5oDYbNrXcezPy099iSUsSkrt5JXfciF0nuStw4dxn4rG/VNJ+1ZeHH3Aa3EScpVK0Xu5uW61eLu8o24Nt8OLNrg6bSu/ak96Xe/ksl4Gupxu4R4Xc3+HKK837jbQA70zlGOjbSi97NtapXs/cdG8dGITkrb1lysmuGdn3ID7i8ZNpwTfq7rtfVX0V9NDpq1cuR8Stdt3k9XpporcBgMDUxNaFCjHeq1XaK5c5PkkrtvkgJj1P9HPpOL+k1I/UYNqSuspVvsLw9rwXMvs1XRjYdPBYanh6aVqcVvyz+sqWW/Ud+LavbhklkjagAAAAAAAAAAAAAAAAAAAAAAAAAABVHWL1ZupOWKwMVvTblWoKy3pPN1KXDeerjx1WeTrCOEabjKLTTs00001waeaZ6mNRtvozhcVnWopz4VI3jNcvWWbXY7oDzjLZ/J+DOuWFkvs+TTLg2l1Twlf0WMnFcpw3n+eDjbyNVT6osQn/nYNdsZyt4WXxAq6rQfGL8mdVTCzjuqUZLeipxvFrei7pTjfVZPNcmXpsbqowtNqWJnLEyWe616OnfthFty7m2uwkfSforQxlFUpRUJUl9TOMUnSytZJfYsknHSyWjSaDzRRjapn/IkvCUr/ABRnqZtuknRivhJ7tanbP1Z5unPtjO3u17DQWktYy8rrzV0BkOZ1zqHTvt6JvuTZuNgdE8ZjGlRovc41J+rBc7t8ezUDTRjKclCEXKc2lGMU25N5JJcWX11adB1gKfpayTxlZes9VSjr6KL583+meR0I6BUMAt9/W4prOq17N9Y019ldur7NCXgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHGpBSTUknF6ppNPvTNNX6IYCbu8FRv8A001D/bY3YA0+H6K4KDTjg6N1o3TjNp805XsbdK2S0Wh9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//2Q==', description: 'Premium wireless headphones with noise cancellation' },
  { id: 2, name: 'Smart Watch', price: 249.99, image: 'data:image/jpeg;base64,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', description: 'Fitness and health tracking with smartphone notifications' },
  { id: 3, name: 'Portable Speaker', price: 79.99, image: 'https://www.boat-lifestyle.com/cdn/shop/files/Stone_SpinXPro_1_b3503890-50f6-4cd1-9138-0bd90874391e.png?v=1709717442', description: 'Waterproof Bluetooth speaker with 12-hour battery life' },
  { id: 4, name: 'Laptop Backpack', price: 59.99, image: 'data:image/jpeg;base64,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', description: 'Durable backpack with padded laptop compartment' },
  { id: 5, name: 'Coffee Maker', price: 89.99, image: 'data:image/jpeg;base64,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', description: 'Programmable coffee maker with thermal carafe' },
  { id: 6, name: 'Wireless Charger', price: 34.99, image: 'https://m.media-amazon.com/images/I/51pbKzrAd9L.jpg', description: 'Fast wireless charging pad for compatible devices' },
];

function App() {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('products');
  const [orderComplete, setOrderComplete] = useState(false);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    // In a real app, this would process payment and send order to a backend
    setOrderComplete(true);
    setCart([]);
  };

  const startNewOrder = () => {
    setOrderComplete(false);
    setCurrentView('products');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header cart={cart} setCurrentView={setCurrentView} />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'products' && (
          <ProductList products={products} addToCart={addToCart} />
        )}
        
        {currentView === 'cart' && !orderComplete && (
          <Cart 
            cart={cart} 
            updateQuantity={updateQuantity} 
            removeFromCart={removeFromCart} 
            getTotalPrice={getTotalPrice}
            setCurrentView={setCurrentView}
          />
        )}
        
        {currentView === 'checkout' && !orderComplete && (
          <Checkout 
            cart={cart} 
            getTotalPrice={getTotalPrice} 
            handleCheckout={handleCheckout}
            setCurrentView={setCurrentView}
          />
        )}
        
        {orderComplete && (
          <OrderConfirmation startNewOrder={startNewOrder} />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

function Header({ cart, setCurrentView }) {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => setCurrentView('products')}>
          ShopReact
        </h1>
        <div className="flex items-center space-x-4">
          <button 
            className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
            onClick={() => setCurrentView('cart')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <span>Cart ({itemCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function ProductList({ products, addToCart }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function Cart({ cart, updateQuantity, removeFromCart, getTotalPrice, setCurrentView }) {
  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-600 mb-6">Your cart is empty</p>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          onClick={() => setCurrentView('products')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-center">Price</th>
              <th className="py-2 px-4 text-center">Quantity</th>
              <th className="py-2 px-4 text-right">Total</th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id} className="border-t border-gray-200">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover mr-4" />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">${item.price.toFixed(2)}</td>
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center">
                    <button 
                      className="bg-gray-200 px-2 rounded-l"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button 
                      className="bg-gray-200 px-2 rounded-r"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="py-4 px-4 text-center">
                  <button 
                    className="text-red-600 hover:text-red-800"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <button 
          className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded"
          onClick={() => setCurrentView('products')}
        >
          Continue Shopping
        </button>
        <div className="text-right">
          <div className="text-lg">Subtotal: <span className="font-bold">${getTotalPrice().toFixed(2)}</span></div>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded mt-2"
            onClick={() => setCurrentView('checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

function Checkout({ cart, getTotalPrice, handleCheckout, setCurrentView }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCheckout();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">City</label>
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">ZIP / Postal Code</label>
                <input 
                  type="text" 
                  name="zip" 
                  value={formData.zip} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-4 mt-6">Payment Information</h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Card Number</label>
              <input 
                type="text" 
                name="cardNumber" 
                value={formData.cardNumber} 
                onChange={handleChange} 
                placeholder="XXXX XXXX XXXX XXXX"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-1">Expiration Date</label>
                <input 
                  type="text" 
                  name="cardExpiry" 
                  value={formData.cardExpiry} 
                  onChange={handleChange} 
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">CVC</label>
                <input 
                  type="text" 
                  name="cardCvc" 
                  value={formData.cardCvc} 
                  onChange={handleChange} 
                  placeholder="123"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                type="button" 
                className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded"
                onClick={() => setCurrentView('cart')}
              >
                Back to Cart
              </button>
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Complete Order
              </button>
            </div>
          </form>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="bg-white rounded-lg shadow-md p-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b">
                <div className="flex items-center">
                  <span className="font-semibold mr-2">{item.quantity}x</span>
                  <span>{item.name}</span>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$5.99</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                <span>Total</span>
                <span>${(getTotalPrice() + 5.99).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderConfirmation({ startNewOrder }) {
  return (
    <div className="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
      <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been received.</p>
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        onClick={startNewOrder}
      >
        Continue Shopping
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ShopReact</h3>
            <p className="text-gray-400">Your one-stop shop for the best products online.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="#" className="hover:text-white">Home</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">Products</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-white">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">1234 Market Street</p>
            <p className="text-gray-400 mb-2">San Francisco, CA 94103</p>
            <p className="text-gray-400">info@shopreact.com</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ShopReact. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default App;
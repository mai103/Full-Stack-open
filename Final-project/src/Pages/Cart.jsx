import { Link } from 'react-router-dom';

function Cart({ cart, updateQuantity }) {
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <div className='cart-controls'>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <Link to={`/product/${item.id}`}>
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.title}
                />
              </Link>
              <span>{item.title}</span>
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
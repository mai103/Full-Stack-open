import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <h2>My Store</h2>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">
          Cart 
          {cartCount > 0 && <span className="cart-icon">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
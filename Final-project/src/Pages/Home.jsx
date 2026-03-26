import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <div className="home-hero">
        <h1>Welcome to Our Store</h1>
        <p>Discover the latest and best products.</p>
        <Link to="/shop">
          <button className="checkout-btn" >Shop Now</button>
        </Link>
      </div>

      <div className="home-features">
        <button className="feature-card">
          <h3>High Quality</h3>
        </button>
        <button className="feature-card">
          <h3>Fast Delivery</h3>
        </button>
        <button className="feature-card">
          <h3>Best Prices</h3>
        </button>
      </div>
    </div>
  );
}
export default Home;
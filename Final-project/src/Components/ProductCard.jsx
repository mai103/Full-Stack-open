import { useState } from "react";

function ProductCard({ product, addToCart }) {
  const [count, setCount] = useState(1);

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value);
    setCount(isNaN(val) ? 0 : val);
  };

  return (
    <div className="card">
      <img src={product.image} alt={product.title} style={{ width: "100px" }} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      
      <div className="controls">
        <button onClick={() => setCount((prev) => Math.max(1, prev - 1))}>-</button>
        <input type="number" value={count} onChange={handleInputChange} />
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>

      <button onClick={() => addToCart(product, count)}>Add To Cart</button>
    </div>
  );
}

export default ProductCard;
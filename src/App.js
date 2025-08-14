import './App.css';
import { ProductList } from './Components/ProductList';
import { ProductCard } from './Components/ProductCard';
import { Navbar } from './Components/Navbar'; // Assuming you have a Navbar component
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductService  from './Service/ProductService';
import React, { useState, useEffect } from 'react';
// Main App component
function App() {
  /*const [products, setProducts] = useState([]);
  useEffect(() => 
    { const fetchProducts= async () => {
      try{
          const products= ProductService.getAll()
          setProducts(products);
      }catch(error){
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  */
  const location = window.location.pathname;
  // Array of background colors for different cards
  const cardBackgrounds = [
    "#f0f9ff",  // Light blue
    "#fff7ed",  // Light orange
    "#f0fdf4"   // Light green
  ];

   
  // Define products array outside of JSX
  const products = [
    {
      title: "iPhone 15 Pro",
      imgSrc: "images/iphone.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 999
    },
    {
      title: "Airpods Pro 2",
      imgSrc: "images/earbuds.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 249
    },
    {
      title: "Apple Watch 9",
      imgSrc: "images/apple_watch.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 300
    },
     {
      title: "Whiteboard Pencil",
      imgSrc: "images/whiteboard_pencil.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 150
    }
  ]; 
  const handleClick = (product) => {
    alert(`The product ${product.title} has cost $${product.price}`);
  };
  return (
    <>
      {location !== "/about" && (location !== "/contact") && (
          <div className="App">
            <Navbar />
            <h1>Product Catalog</h1>
            {/* Render ProductList component with children as ProductCard components */}
            <ProductList>
            {/* Map through products array to render ProductCard components */}
            {products.map((product, index) => (
              <ProductCard 
                key={product.title}
                product={product}
                onClick={handleClick}
                background={cardBackgrounds[index % 3]}  // Here each card gets its background color,  index % 3 to repeat colors
                width="128px"
                height="128px"
              />
            ))}
            {}
          </ProductList>
        </div>)
      }
      </>
  );
}
export default App;

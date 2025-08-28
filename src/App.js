import './App.css';
import { ProductList } from './Components/ProductList';
import { ProductCard } from './Components/ProductCard';
import { Navbar } from './Components/Navbar'; // Navbar
import 'bootstrap/dist/css/bootstrap.min.css';
// import ProductService from './Service/ProductService';
import React, { useState } from 'react';
// Main App component
function App() {
  // All products defined locally
  const [filters, setFilters] = useState({ category: '', price: 0, searchTerm: '', inStock: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [purchaseStatus, setPurchaseStatus] = useState(null);
  /*
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await ProductService.getAll();
        setProducts(products);
      } catch (error) {
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
    "#f0fdf4",   // Light green
    "#fef3c7"   // Light yellow --- IGNORE ---
  ];



   
  // Define initial products and keep products in React state
  const initialProducts = [
    {
      title: "iPhone 15 Pro",
      imgSrc: "images/iphone.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      category: "iPhone",
      price: 999,
      inStock: true,
      stockCount: 10
    },
    {
      title: "Airpods Pro 2",
      imgSrc: "images/earbuds.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 24,
      category: "Airpods",
      inStock: true,
      stockCount: 10
    },
     {
      title: "Airpods 1",
      imgSrc: "images/earbuds_1.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 22,
      category: "Airpods",
      inStock: true,
      stockCount: 10
    },
     {
      title: "Airpods 2",
      imgSrc: "images/earbuds_2.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 20,
      category: "Airpods",
      inStock: false,
      stockCount: 0
    },
     {
      title: "Airpods 3",
      imgSrc: "images/earbuds_3.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 18,
      category: "Airpods",
      inStock: false,
      stockCount: 0
    },
    {
      title: "Apple Watch 9",
      imgSrc: "images/apple_watch.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 100,
      category: "Watch",
      inStock: true,
      stockCount: 10
    },
    {
      title: "Smart Watch",
      imgSrc: "images/smart-watch.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 25,
      category: "Watch",
      inStock: true,
      stockCount: 10
    },
    {
      title: "Smart Watch 1",
      imgSrc: "images/smart-watch_1.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 22,
      category: "Watch",
      inStock: true,
      stockCount: 10
    },
    {
      title: "Headphones 1",
      imgSrc: "images/headphone.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 70,
      category: "Headphones",
      inStock: true,
      stockCount: 10
    },
    {
      title: "Headphones 2",
      imgSrc: "images/headphone_1.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A1,7 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 75,
      category: "Headphones",
      inStock: false,
      stockCount: 0
    },
    {
      title: "Headphones 3",
      imgSrc: "images/headphone_2.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 80,
      category: "Headphones",
      inStock: false,
      stockCount: 0
    },
    {
      title: "Headphones 4",
      imgSrc: "images/headphone_3.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 100,
      category: "Headphones",
      inStock: true,
      stockCount: 10
    },
    {
      title: "Headphones 5",
      imgSrc: "images/headphone_4.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 120,
      category: "Headphones",
      inStock: true,
      stockCount: 10
    },
     {
      title: "Whiteboard Pencil",
      imgSrc: "images/whiteboard_pencil.png",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x A17 Telephoto camera",
        "UP to 29 hours video playback"
      ],
      price: 15,
      category: "Pencil",
      inStock: true,
      stockCount: 10
    }
  ];

  const [products, setProducts] = useState(initialProducts);

  function handlePurchase(product) {
    if (!product.inStock || product.stockCount <= 0) {
      alert(`The product ${product.title} is out of stock`);
      return;
    }

    alert(`The product ${product.title} has cost $${product.price}`);
    setProducts(prev =>
    prev.map(p =>
      p.title === product.title
        ? {
            ...p,
            stockCount: Math.max(0, p.stockCount - 1),
            inStock: Math.max(0, p.stockCount - 1) > 0
          }
        : p
    )
  );
  setPurchaseStatus({ type: 'success', text: `Bought ${product.title}` });
   setTimeout(() => setPurchaseStatus(null), 3000);
}

  // Compute filtered list
  const filtered = products.filter(p => {
    //in case no filtering happened all products true so the list will be displayed sa it is
    const matchCat = filters.category ? p.category.toLowerCase() === filters.category.toLowerCase() : true;
    const matchPrice = filters.price ? Number(p.price) <= Number(filters.price) : true;
    const matchSearch = filters.searchTerm ? p.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) : true;
    const matchStock = filters.inStock ? p.inStock === true : true;
    return matchCat && matchPrice && matchSearch && matchStock;
  });

  const totalPages= Math.ceil(filtered.length / 12) || 1; // Assuming 12 products per page
  const startIdx = (currentPage - 1) * 12;
  const endIdx = startIdx + 12;
  const paged = filtered.slice(startIdx, endIdx);

      //inStock: newNb > 0 means instock true if nb >0 and false else
    // p.title === product.title ? { ...p, nb_items: newNb, inStock: newNb > 0 } : p
    //if the product is correct replace in list with copy with new values
  /*{...product}
    This is the spread operator (...)
    It creates a shallow copy of the original product object
    Example: If product = {id: 1, name: "Shirt", nb_items: 5}
    Then {...product} becomes {id: 1, name: "Shirt", nb_items: 5}
    2. {...product, nb_items: product.nb_items - 1}
    This overrides the nb_items property in the copied object
    It takes the current nb_items value and subtracts 1
    Example: If product.nb_items was 5, it becomes 4
    Result: {id: 1, name: "Shirt", nb_items: 4}
  */
  return (
    <>
      {location !== "/about" && (location !== "/contact") && (
          <div className="App">
            {/* app comp says to navbar that I need filters, so navbar sends onApplyFilters to ProductFilter */}
            <Navbar onApplyFilters={(f) => { setFilters(f); setCurrentPage(1); }} />
            <h1>Product Catalog</h1>
            {/* Filters */}
            <div style={{ marginBottom: '1rem' }}>
              {/* ProductFilter lives inside Navbar in your setup; if you prefer here, we could move it */}
            </div>
            {/* Render ProductList component with children as ProductCard components */}
            <ProductList>
            {/* Map through products array to render ProductCard components */}
            { paged.map((product, index) => (
              <ProductCard 
                key={product.title}
                product={product}
                onClick={handlePurchase}
                background={cardBackgrounds[index % 4]}  // Here each card gets its background color,  index % 4 to repeat colors
                width="128px"
                height="128px"
              />
            ))}
          </ProductList>
           <br />
           <section className="pager">
              <div className="pager-buttons">
                <button onClick={() => setCurrentPage((prev) => Math.max(prev-1, 1))} disabled={currentPage === 1}>
                  Previous
                </button>
                 <h3 className="px-5">{currentPage} / {totalPages}</h3>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev+1, totalPages))} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
             
           </section>
         </div>
      )}
      </>
  );
}



export default App;

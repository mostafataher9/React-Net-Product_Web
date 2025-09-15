import './App.css';
import { ProductList } from './Components/ProductList';
import { ProductCard } from './Components/ProductCard';
import { Navbar } from './Components/Navbar'; // Navbar
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductService from './Service/ProductService';
import React, { useState, useEffect } from 'react';
import { products as initialProducts } from './Data/product';
import {Helmet} from 'react-helmet';
// Define initial products and keep products in React state


// Main App component
function App({ page }) {
  // All products defined locally
  
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

  const [filters, setFilters] = useState({ category: '', minprice: 0, maxprice: 999, searchTerm: '', inStock: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [purchaseStatus, setPurchaseStatus] = useState(null);

  const location = window.location.pathname;
  // Array of background colors for different cards
  const cardBackgrounds = [
    "#f0f9ff",  // Light blue
    "#fff7ed",  // Light orange
    "#f0fdf4",   // Light green
    "#fef3c7"   // Light yellow --- IGNORE ---
  ];

  //list contains favorite products
  const [Favorites, setFavorites] = useState([]);

  const [products, setProducts] = useState(initialProducts);
  //here we can filter products based on different criteria minprice,maxprice....
  function handleFilter(key,value) {
    setFilters(filter => ({
      ...filter,
      [key]: value
    }));
    setCurrentPage(1); 
  }

  function handleFavorite(productId){
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(productId)) {
        // If already favorite, remove it
        return prevFavorites.filter(id => id !== productId);
      } else {
        // If not favorite, add it
        return [...prevFavorites, productId];
      }
    });
  }
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
 


  function handleTwoPurchase(product) {
    if (!product.inStock || product.stockCount <= 1) {
      alert(`The product ${product.title} is out of stock`);
      return;
    }

    alert(`The product ${product.title} costs of 2 items is $${product.price * 1.8}`);
    setProducts(prev =>
    prev.map(p =>
      p.title === product.title
        ? {
            ...p,
            stockCount: Math.max(0, p.stockCount - 2),
            inStock: Math.max(0, p.stockCount - 2) > 0
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
    const matchMinPrice = filters.minprice ? Number(p.price) >= Number(filters.minprice) : true;
    const matchMaxPrice = filters.maxprice ? Number(p.price) <= Number(filters.maxprice) : true;
    const matchSearch = filters.searchTerm ? p.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) : true;
    const matchStock = filters.inStock ? p.inStock === true : true;
    return matchCat && matchMinPrice && matchMaxPrice && matchSearch && matchStock;
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
            <Helmet>
              <title>{page?.titleTag || 'Product Catalog'}</title>
              <meta name="description" content={page?.metaDescription || 'Browse our amazing product collection'} />
              <meta name="keywords" content={page?.metaKeywords || 'products, shop, catalog'} />
              {/* app comp says to navbar that I need filters, so navbar sends onApplyFilters to ProductFilter */}
              <h1>{page?.title || 'Product Catalog'}</h1>
            </Helmet>

             <Navbar onApplyFilters={(key,value) => { handleFilter(key,value) }} />

            {/* Filters */}
            <div style={{ marginBottom: '1rem' }}>
              {/* ProductFilter lives inside Navbar in your setup; if you prefer here, we could move it */}
            </div>
            {/* Render ProductList component with children as ProductCard components */}
            <ProductList>
            {/* Map through products array to render ProductCard components */}
            {/*onOffer={handleTwoPurchase} here buying 2 with offer*/}
            {/* includes return true or false to distinguish in favorite or not isFavorite={Favorites.includes(product.id)}*/}
            { paged.map((product, index) => (
              <ProductCard 
                key={product.title}
                product={product}
                onClick={handlePurchase}
                onOffer={handleTwoPurchase} 
                onFavorite={handleFavorite}
                isFavorite={Favorites.includes(product.id)}
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
export { initialProducts as products };

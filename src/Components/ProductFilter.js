import {useState} from 'react';
export function ProductFilter({ onApply }) {
  // Controls only; parent provides products and does the filtering
  const [inStock, SetInStock] = useState(false);
  const [minprice, SetMinPrice] = useState(0);
  const [maxprice, SetMaxPrice] = useState(999);
  const [selectedCategory, SetSelectedCategory] = useState("");
  const [searchTerm, SetSearchTerm] = useState("");
  const categories=["iPhone", "Watch", "Airpods", "Headphones", "Pencil"];

  const applyFilters = () => {
    const filters = {
      // || used in case if user did\n't use this filter like category, price..
      category: selectedCategory || "",
      minprice:  minprice || 0,
      maxprice:  maxprice || 999,
      searchTerm: searchTerm || "",
      inStock: Boolean(inStock)
    };
    
    if (typeof onApply === 'function') onApply(filters);
  };

  return (
    //to separate them we used margin-right 
    <div className="product-filter">
  <select placeholder="By Category" value={selectedCategory} onChange={(e) => SetSelectedCategory(e.target.value)} style={{ marginRight: '12px' }}>
        <option value=""> All categories </option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

  {/* Price Range Inputs by defaultValue={minprice}*/}
  <input type="number" defaultValue={minprice} min="0" step="1" onChange={(e) => SetMinPrice(e.target.value)} placeholder="Min price" style={{ marginRight: '12px' }} />

  <input type="number" defaultValue={maxprice} min="0" step="1" onChange={(e) => SetMaxPrice(e.target.value)} placeholder="Max price" style={{ marginRight: '12px' }} />

      <input type="text" value={searchTerm} onChange={(e) => SetSearchTerm(e.target.value)} placeholder="Search products..." style={{ marginRight: '12px' }} />
      {/* Checkbox: wrap input in label so clicking text toggles */}
      <label htmlFor="inStockCheckbox" style={{ marginRight: '12px' }}>
        <input
          type="checkbox"
          id="inStockCheckbox"
          checked={inStock}
          onChange={(e) => SetInStock(e.target.checked)}
          style={{ marginRight: '6px' }}
        />
        Show only products in stock
      </label>
  <button onClick={applyFilters}> Apply Filters </button>
    </div>
  );
}

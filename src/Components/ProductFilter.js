import {useState} from 'react';
export function ProductFilter({ onApply }) {
  // Controls only; parent provides products and does the filtering
  const [inStock, SetInStock] = useState(false);
  const [price, SetPrice] = useState(0);
  const [selectedCategory, SetSelectedCategory] = useState("");
  const [searchTerm, SetSearchTerm] = useState("");
  const categories=["iPhone", "Watch", "Airpods", "Headphones", "Pencil"];

  const applyFilters = () => {
    const filters = {
      // || used in case if user did\n't use this filter like category, price..
      category: selectedCategory || "",
      price: Number(price) || 0,
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

  <input type="number" min="0" step="1" value={price} onChange={(e) => SetPrice(e.target.value)} placeholder="Max price" style={{ marginRight: '12px' }} />

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

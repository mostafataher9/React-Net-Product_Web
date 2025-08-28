export function ProductCard({ product, onClick,  background, ...restprops }) {
    const style={
        listStyleType: 'none',
        padding: 0,
         
         //or background word only if you want to use the prop
    }

    function handleClick() {
        product.stockCount -= 1;
        onClick(product);
    }

    return (
        <div style={{ background }} className="product-card">
            <h2>{product.title}</h2>
            <img src={product.imgSrc} alt={product.title} className="product-image" {...restprops} />
            <ul style={style}>
                {product.specification.map((spec, index) => (
                    <li key={index}>{spec}</li>
                ))}
            </ul>
            {product.stockCount > 0 ? (
                <p style={{ color: 'light green', display: 'flex', textAlign: 'center', alignItems: 'center' }}>
                    {product.stockCount} items available </p>) :
                <p style={{ color: 'light red', display: 'flex', textAlign: 'center', alignItems: 'center' }}> Not available</p>}
                    <span>${product.price}</span>
                {product.stockCount > 0 ? (<button onClick={handleClick}>
                        Buy for ${product.price}
                    </button>
                
            ) : (
                <button disabled style={{ textAlign: 'center', color: 'red' }}>Out of stock</button>
            )}
        </div>
    );
}
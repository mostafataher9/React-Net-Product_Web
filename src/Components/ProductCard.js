export function ProductCard({ product, onClick,  background, ...restprops }) {
    const style={
        listStyleType: 'none',
        padding: 0,
         
         //or background word only if you want to use the prop
    }
    return (
        <div style={{ background, paddingBottom: '20px'}} className="product-card">
            <h2>{product.title}</h2>
            <img src={product.imgSrc} alt={product.title} className="product-image" {...restprops} />
            <ul style={style}>
                {product.specification.map((spec, index) => (
                    <li key={index}>{spec}</li>
                ))}
            </ul>
            <span>${product.price}</span>
            <button onClick={() => onClick(product)}>
                Buy for ${product.price}
            </button>
        </div>
    );
}
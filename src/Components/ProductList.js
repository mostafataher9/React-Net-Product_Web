export function ProductList({ children }) {
   
    return (
        <div className="product-list">
              {/*here when I write ProductList({ props })} and {props.children} in return */}
            {children}
        </div>
    );
}
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './ProductCard.module.css';

export function ProductCard({ product, onClick, onOffer, isFavorite, onFavorite, background, ...restprops }) {
    const [stockCount,setStockCount] = useState(product.stockCount);
    const [showMore, setShowMore] = useState(false);
    const style={
        listStyleType: 'none',
        padding: 0,
        background: background || 'transparent',
    }

    function handleClick() {
        setStockCount(prevstockCount => prevstockCount - 1);
        //the above command is more safer than  setStockCount(stockCount - 1); especially when working with api or in dynamic locations
        onClick(product);
    }

    function handleTwoClicks() {
        /*here we see in browser that value decreased 1 bcz react render at end of function for performance optimization
        setStockCount(stockCount - 1);
        setStockCount(stockCount - 1);
        */
       /*we can correct above issue USING callable ftn to handle multiple state updates in React to ensure that they are correct
       setStockCount((prevstockCount)=> prevstockCount - 1);
       setStockCount((prevstockCount)=> prevstockCount - 1); */
       /*2nd method: */
       setStockCount((prevstockCount)=> prevstockCount - 2);
        //the above command is more safer than  setStockCount(stockCount - 2);
        onOffer(product);
    }

    return (
        <div style={{ background }} className="product-card">
            <h2>{product.title}</h2>
            {/* if we have the item in favorites we highlight the star */}
            {/*we need inFavorite in order to distinguiosh if ele in favorites or not*/}
            {/* if not favorite color white, favorite black 8
            <button className={styles.Favorite} onClick={() => onFavorite(product.id)}> {isFavorite ? <FontAwesomeIcon icon={faStar} /> : <FontAwesomeIcon icon={faStar} style={{  color: 'white',
  fontSize: '20px', opacity: 0.5 }} />}</button> */}
            <button className={styles.Favorite} onClick={() => onFavorite(product)}>
                <FontAwesomeIcon icon={faStar} color={isFavorite ? 'gold' : 'gray'} />
            </button>
            <img src={product.imgSrc} alt={product.title} className="product-image" {...restprops} />
            {/*by default it is showMore false when we click we make it true, !showMore is negation of showMore*/}
            <p> Specification <button style={{ marginLeft: '8px', width: '80px', height: '30px' }} onClick={() => setShowMore(!showMore)}>{showMore ? 'hide' : 'Show'}</button> </p>
            {/*only if showMore is true we show the specification list*/}
            {showMore && (
                <ul style={style}>
                    {product.specification.map((spec, index) => (
                        <li key={index}>{spec}</li>
                    ))}
                </ul>
            )}
            {product.stockCount > 0 ? (
                <p style={{ color: '#4ade80', display: 'flex', textAlign: 'center', alignItems: 'center' }}>
                    {product.stockCount} items available </p>) :
                <p style={{ color: '#f87171', display: 'flex', textAlign: 'center', alignItems: 'center' }}> Not available</p>}
                 
           <span>${product.price}</span>
          <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', gap: '8px' }}>
            {product.stockCount > 0 ? (<button style={{ marginLeft: '8px', width: '120px', height: '50px' }} onClick={handleClick}>
                        Buy for ${product.price}
                    </button>
                
            ) : (
                <button disabled style={{ textAlign: 'center', color: 'red' }}>Out of stock</button>
            )}
            {product.stockCount > 1 && (
                <button style={{ marginLeft: '8px', width: '150px', height: '50px' }} onClick={handleTwoClicks}>
                    Buy 2
                <br /> (offer 20% off)
                </button>
            )}
            </div>
        </div>
    );
}
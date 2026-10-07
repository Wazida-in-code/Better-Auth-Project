import React from 'react';
import MarqueeText from 'react-marquee-text';

const Marquee = ({allProduct}) => {
    console.log(allProduct);
    return (
        <div className='bg-mist-100'>
            <MarqueeText direction='right' duration={10}>
                {
                    allProduct.map(product => (
                    <div className='mr-7' key={product._id}>
                        <p>●  {product.name}</p>
                    </div>
                    ))
                }
            </MarqueeText>
        </div>
    );
};

export default Marquee;
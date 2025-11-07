import { useState, useEffect } from "react";
import axios from "axios";
import image from "../assets/images.jpg";
export function HomePage({ setCart }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function ProductData() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/products`);
        if (res.status === 200) {
          setProduct(res.data);
        } else {
          alert("Can't get Products data!!!");
        }
      } catch (err) {
        console.log(err);
      }
    }
    ProductData();
  }, []);
  async function addToCart(id) {
    try {
      // Optimistic local update
      // setCart((prevCart) => ({
      //   product: [...(prevCart.product || []), { _id: id }],
      // }));

      // Send to server
      const res = await axios.post(`${import.meta.env.VITE_API}/api/cart`, {
        id,
      });
      setCart({product: res.data});
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <section className="productGrid">
        {product?.map((data, index) => (
          <div key={index} className="productCard">
            <img src={image} alt="" />
            <div className="productText">
              <h4> {data.product_name}</h4>
              <h6>₹{data.product_price}</h6>
              <p>{data.product_description}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  addToCart(data._id);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

import axios from "axios";
import image from "../assets/images.jpg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export function CartPage({ cart, setCart }) {
  const totalPrice = cart?.product?.reduce(
    (total, p) => total + (p?.item?.product_price || 0) * (p.quantity || 1),
    0
  );
  const navigate = useNavigate();
  async function addQty(id) {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API}/api/cart/addQty`,
        { id }
      );
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function reduceQty(id) {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API}/api/cart/reduceQty`,
        { id }
      );
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function removeItem(id) {
    // console.log(id)
    const res = await axios.patch(
      `${import.meta.env.VITE_API}/api/cart/remove`,
      { id }
    );
    setCart(res.data);
  }
  function checkOut(e) {
    e.preventDefault();
    navigate("/checkout");
  }
  return (
    <>
      <section className="cartPage">
        <section className="cartSection">
          {cart?.product?.length > 0 ? (
            cart.product.map((item, index) => (
              <div key={index} className="cartCard">
                <div>
                  <img src={image} alt="" />
                  <div className="text">
                    <h5>{item.item?.product_name}</h5>
                    <h6>₹{item.item?.product_price}</h6>
                  </div>
                </div>
                <div>
                  <div className="qualtity">
                    <button onClick={() => reduceQty(item._id)}>-</button>
                    <p>{item?.quantity}</p>
                    <button onClick={() => addQty(item._id)}>+</button>
                  </div>
                  <div className="total">
                    <h6>Amount</h6>
                    <p>₹{item.item?.product_price * item.quantity}</p>
                  </div>

                  <button
                    className="removeBtn"
                    onClick={() => removeItem(item._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1>CART IS EMPTY</h1>
          )}
        </section>
        <section className="checkOut">
          <p>
            Total Amount <span>₹{totalPrice}</span>
          </p>
          <button
            onClick={() => navigate("/checkout")}
            style={{ display: totalPrice > 0 ? "flex" : "none" }}
          >
            Checkout
          </button>
        </section>
      </section>
    </>
  );
}

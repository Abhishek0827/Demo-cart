import { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";

export function CheckoutPage({ cart, setCart }) {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const navigate = useNavigate();
  const totalPrice = cart?.product?.reduce(
    (total, p) => total + (p?.item?.product_price || 0) * (p.quantity || 1),
    0
  );

  // Handle form submission
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!name || !mail) {
      alert("Please fill in your name and email.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/api/checkout`, {
        cartItems: cart,
      });

      const receipt = res.data;
      setCart({ product: [] });
      navigate("/");
      const doc = new jsPDF();

      let y = 10; // vertical position

      doc.setFontSize(16);
      doc.text("Receipt", 105, y, { align: "center" });
      y += 10;

      doc.setFontSize(12);
      doc.text(`Name: ${name}`, 10, y);
      y += 7;
      doc.text(`Email: ${mail}`, 10, y);
      y += 7;
      doc.text(
        `Timestamp: ${new Date(receipt.timestamp).toLocaleString()}`,
        10,
        y
      );
      y += 7;
      doc.text(`Total:  ${receipt.total}(In rupee)`, 10, y);
      y += 10;

      doc.text("Items:", 10, y);
      y += 7;

      receipt.items.forEach((item) => {
        doc.text(
          `${item.product_name} -  ${item.price}(In rupee) x ${item.quantity}`,
          10,
          y
        );
        y += 7;
      });
      const pdfUrl = doc.output("bloburl"); // create blob URL
      window.open(pdfUrl, "_blank");
      //   doc.save(`receipt_${Date.now()}.pdf`);
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  return (
    <>
      <section id="checkOut">
        <form onSubmit={handleCheckout}>
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
            />
          </div>

          <div className="desc">
            {cart?.product?.length > 0 ? (
              cart.product.map((item, index) => (
                <div key={index} className="info">
                  <div>
                    <h5>{item.item?.product_name}</h5>
                    <h6>₹{item.item?.product_price}</h6>
                  </div>
                  <p>
                    Quantity <span>{item?.quantity}</span>
                  </p>
                </div>
              ))
            ) : (
              <h1>CART IS EMPTY</h1>
            )}
          </div>

          <p>
            Total Amount: <span>₹{totalPrice}</span>
          </p>
          <button type="submit">Checkout</button>
        </form>
      </section>
    </>
  );
}

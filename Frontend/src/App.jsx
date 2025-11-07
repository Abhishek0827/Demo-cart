import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "./layout";
import { HomePage } from "./pages/home";
import { CartPage } from "./pages/cart";
import { CheckoutPage } from "./pages/checkout";

function App() {
  const [cart, setCart] = useState({ product: [] });
  useEffect(() => {
    async function getCart() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/cart`);
        if (res.status === 200) {
          const serverCart = res.data[0]?.product
            ? { product: res.data[0].product }
            : { product: [] };
          setCart(serverCart);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getCart();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout cart={cart} setCart={setCart} />}>
            <Route path="/" element={<HomePage setCart={setCart} />} />
            <Route
              path="/cart"
              element={<CartPage cart={cart} setCart={setCart} />}
            />
            <Route
              path="/checkout"
              element={<CheckoutPage cart={cart} setCart={setCart}/>}
            ></Route>
            <Route
              path="*"
              element={
                <h1 style={{ margin: "50px auto", width: "fit-content" }}>
                  404 page not found
                </h1>
              }
            ></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

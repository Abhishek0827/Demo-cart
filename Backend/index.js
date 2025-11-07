import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Product from "./models/product.js";
import Cart from "./models/cart.js";

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/Abhishek_kuliyal_CART")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("ok");
});

app.get("/api/products", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
});
app.get("/api/cart", async (req, res) => {
  try {
    let cartData = await Cart.find({}).populate("product.item");
    if (cartData) {
      // console.log(cartData);
      res.status(200).json(cartData);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/api/cart", async (req, res) => {
  try {
    const { id } = req.body;
    let cart = await Cart.findOne();

    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({
        product: [{ item: id, quantity: 1 }],
      });

      await cart.save();
      return res.status(200).json(cart);
    }
    cart.product.push({ item: id, quantity: 1 });
    await cart.save();

    cart = await cart.populate({ path: "product.item" });
    // console.log(JSON.stringify(cart, null, 2));

    // console.log(cart.product);
    return res.status(200).json(cart.product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

app.patch("/api/cart/addQty", async (req, res) => {
  try {
    const { id } = req.body; // product ID

    let cartData = await Cart.findOne();
    if (!cartData) return res.status(404).json({ message: "Cart not found" });

    // Find all entries matching the product id
    const matchedProducts = cartData.product.filter(
      (p) => p._id.toString() === id
    );
    // console.log(matchedProducts);
    if (matchedProducts.length === 0) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Increase quantity of **first matching entry** (or whichever one user clicked)
    matchedProducts[0].quantity += 1;

    await cartData.save();
    cartData = await cartData.populate("product.item");
    res.status(200).json(cartData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.patch("/api/cart/reduceQty", async (req, res) => {
  try {
    const { id } = req.body; // product ID

    let cartData = await Cart.findOne();
    if (!cartData) return res.status(404).json({ message: "Cart not found" });

    // Find all entries matching the product id
    const matchedProducts = cartData.product.filter(
      (p) => p._id.toString() === id
    );
    // console.log(matchedProducts);
    if (matchedProducts.length === 0) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Increase quantity of **first matching entry** (or whichever one user clicked)
    if (matchedProducts[0].quantity > 1) {
      matchedProducts[0].quantity -= 1;
    }

    await cartData.save();
    cartData = await cartData.populate("product.item");
    res.status(200).json(cartData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.patch("/api/cart/remove", async (req, res) => {
  try {
    const { id } = req.body; // item/product ID to remove

    // Find cart & populate product details
    let cart = await Cart.findOne().populate("product.item");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Filter out the product
    cart.product = cart.product.filter((p) => p._id.toString() !== id);

    // Save updated cart
    await cart.save();

    // Re-populate to return latest cart with product details
    cart = await cart.populate("product.item");

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
});

app.delete("/api/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCart = await Cart.findOneAndUpdate(
      {},
      {
        $pull: {
          product: { item: id },
        },
      },
      { new: true } // return updated cart
    );
    return res.status(200).json(updatedCart);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/checkout", async (req, res) => {
  try {
    const { cartItems } = req.body; // expect an array of cart items

    if (
      !cartItems.product ||
      !Array.isArray(cartItems.product) ||
      cartItems.product.length === 0
    ) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const total = cartItems.product.reduce((sum, item) => {
      const price = item.item?.product_price || 0;
      const quantity = item.quantity || 1;
      return sum + price * quantity;
    }, 0);

    // Generate mock receipt
    const receipt = {
      total,
      timestamp: new Date(),
      items: cartItems.product.map((item) => ({
        product_name: item.item?.product_name,
        price: item.item?.product_price,
        quantity: item.quantity,
      })),
      message: "Checkout successful (mock)",
    };
    await Cart.deleteOne();
    res.status(200).json(receipt);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

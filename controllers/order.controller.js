import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.images[0],
      price: item.product.price,
      quantity: item.quantity,
      seller: item.product.seller,
    }));

    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const taxPrice = 0;
    const shippingPrice = 0;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "orderItems.seller": req.user._id,
    }).sort("-createdAt");

    const sellerOrders = orders.map((order) => {
      const filteredItems = order.orderItems.filter(
        (item) =>
          item.seller.toString() ===
          req.user._id.toString()
      );

      return {
        ...order._doc,
        orderItems: filteredItems,
      };
    });

    res.json(sellerOrders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
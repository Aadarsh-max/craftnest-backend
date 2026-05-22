import Order from "../models/Order.js";

import { createStripeSession } from "../services/stripe.service.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const session = await createStripeSession(
      order.orderItems,
      order._id.toString(),
    );

    res.json({
      url: session.url,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.isPaid = true;

    order.paidAt = Date.now();

    order.paymentResult = {
      id: req.body.id || "stripe-session",

      status: req.body.status || "COMPLETED",

      update_time: new Date().toISOString(),

      email_address: req.body.email_address || "customer@craftnest.com",
    };

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

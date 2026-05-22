import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripeSession = async (orderItems, orderId) => {
  const line_items = orderItems.map((item) => ({
    price_data: {
      currency: "inr",

      product_data: {
        name: item.name,

        images: item.image ? [item.image] : [],
      },

      unit_amount: item.price * 100,
    },

    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items,

    mode: "payment",

    client_reference_id: orderId,

    success_url: `${process.env.CLIENT_URL}/order-success?orderId=${orderId}`,

    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  return session;
};

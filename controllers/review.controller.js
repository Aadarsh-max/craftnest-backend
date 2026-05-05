import Review from "../models/Review.js";
import Product from "../models/Product.js";

export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;

    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      product: productId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Already reviewed" });
    }

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      comment,
    });

    const reviews = await Review.find({ product: productId });

    const numReviews = reviews.length;
    const ratings =
      reviews.reduce((acc, item) => acc + item.rating, 0) / numReviews;

    await Product.findByIdAndUpdate(productId, {
      numReviews,
      ratings,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.id,
    }).populate("user", "name");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

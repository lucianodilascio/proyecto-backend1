import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
});

// Middleware pre para hacer populate en findOne
cartSchema.pre("findOne", function(next) {
    this.populate("products.product");
    next();
});

// Middleware pre para hacer populate en find
cartSchema.pre("find", function(next) {
    this.populate("products.product");
    next();
});

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;


import express from "express"
import { addWishlistReq, getUserWishlistReq, deleteFromWishlistReq } from "../methods/wishlist";

const wishlistRoutes = express.Router()

wishlistRoutes.put("/add", addWishlistReq )
wishlistRoutes.post("/list", getUserWishlistReq );
wishlistRoutes.delete("/delete", deleteFromWishlistReq );

export default wishlistRoutes

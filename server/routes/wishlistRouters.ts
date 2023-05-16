import express from "express"
import { addWishlistReq, getUserWishlistReq, deleteFromWishlistReq, getAllWishlistReq } from "../methods/wishlist";

const wishlistRoutes = express.Router()

wishlistRoutes.put("/add", addWishlistReq )
wishlistRoutes.post("/list", getUserWishlistReq );
wishlistRoutes.post("/listall", getAllWishlistReq );
wishlistRoutes.delete("/delete", deleteFromWishlistReq );

export default wishlistRoutes

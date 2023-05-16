import mongoose from 'mongoose';

export interface WishlistInterface {
    idUtente: string;
    isbn: string;
}

const wishlistSchema = new mongoose.Schema({
    idUtente: { type: String, required: true },
    isbn: { type: String, required: true },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
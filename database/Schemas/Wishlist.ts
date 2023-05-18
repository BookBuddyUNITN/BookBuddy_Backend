import mongoose from 'mongoose';

export interface WishlistInterface {
    idUtente: string;
    isbn: string;
}

const wishlistSchema = new mongoose.Schema({
    idUtente: { type: String, required: true },
    isbn: { type: String, required: true },
});

wishlistSchema.index({ idUtente: 1, isbn: 1 }, { unique: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
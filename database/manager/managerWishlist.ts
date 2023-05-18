import Wishlist from "../Schemas/Wishlist";

export async function addWishlist(idUtente: string, isbn: string) {
    const wishlist = new Wishlist({ idUtente: idUtente, isbn: isbn });
    return await wishlist.save();
}

export async function getWishlistByUserID(idUtente: string) {
    return await Wishlist.find({ idUtente: idUtente });
}

export async function getAllWishlist() {
    return await Wishlist.find({});
}

export async function deleteFromWishlist(idUtente: string, isbn: string) {
    return await Wishlist.deleteOne({ idUtente: idUtente, isbn: isbn });
}

// for notifications
export async function getWishlistByISBN(isbn: string) {
    return await Wishlist.find({ isbn: isbn });
}



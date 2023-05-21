import { addWishlist, getWishlistByUserID, deleteFromWishlist, getAllWishlist } from "../../database/manager/managerWishlist";

interface wishlistElement {
    idUtente: NonNullable<string>,
    isbn: NonNullable<string>,
}

export async function addWishlistReq(req, res) {
    try {
        const result = req.body as wishlistElement;
        if (!Object.keys(result).length) throw new Error("userID e isbn sono richiesti");
        await addWishlist(result.idUtente, result.isbn);
        res.status(201).send({
            success: true,
            message: "Elemento aggiunto alla wishlist",
            data: { idUtente: result.idUtente, isbn: result.isbn }
        });
    }
    catch (e) {
        res.status(400).send({
            error: e.message
        });
    }
}

export async function getUserWishlistReq(req, res) {
    try {
        const idUtente = req.query.idUtente;
        if (!idUtente) throw new Error("idUtente is required");
        const wishlist = await getWishlistByUserID(idUtente);
        res.status(200).send({
            success: true,
            message: "User's wishlist",
            data: {
                wishlist: wishlist
            }
        });
    } catch (e) {
        res.status(400).send({
            error: e.message
        });
    }
}

export async function getAllWishlistReq(req, res) {
    try {
        const wishlist = await getAllWishlist();
        res.status(200).send({
            success: true,
            message: "Wishlist di tutti gli utenti",
            data: {
                wishlist: wishlist
            }
        });
    }
    catch (e) {
        res.status(400).send({
            error: e.message
        });
    }
}

export async function deleteFromWishlistReq(req, res) {
    try {
        const result = req.body as wishlistElement;
        if (!Object.keys(result).length) throw new Error("userID e isbn sono richiesti");
        await deleteFromWishlist(result.idUtente, result.isbn);
        res.status(200).send({
            success: true,
            message: "Elemento eliminato dalla wishlist",
            data: {}
        });
    } catch (e) {
        res.status(400).send({
            error: e.message
        });
    }
}
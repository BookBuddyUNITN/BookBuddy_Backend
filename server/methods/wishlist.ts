import { addWishlist, getWishlistByUserID, deleteFromWishlist, getAllWishlist } from "../../database/manager/managerWishlist";
import { addLibroByISBN, getLibriByISBNs } from "../../database/manager/managerLibri";
import { getPayload } from "../../database/manager/managerLogin";

interface wishlistElement {
    isbn: NonNullable<string>,
}

export async function addWishlistReq(req, res) {
    const result = req.body as wishlistElement;
    const decoded = getPayload(req.header('x-access-token'));
    if (!Object.keys(result).length) throw new Error("userID e isbn sono richiesti");
    Promise.all([addLibroByISBN(result.isbn), addWishlist(decoded.id, result.isbn)]).then(( results : any[] ) => {
        res.status(201).send({
            success: true,
            message: "Elemento aggiunto alla wishlist",
            data: { idUtente: decoded.id, isbn: result.isbn, libro: results[0] }
        });
    }).catch((e) => {
        console.log(e);
        res.status(400).send({
            error: e.message
        });
    });
}

export async function getUserWishlistReq(req, res) {
    try {
        const decoded = getPayload(req.header('x-access-token'));
        if (!decoded.id) throw new Error("idUtente is required");
        const wishlist = await getWishlistByUserID(decoded.id);
        const libri = await getLibriByISBNs(wishlist.map((element) => element.isbn));
        res.status(200).send({
            success: true,
            message: "User's wishlist",
            data: {
                wishlist: libri
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
        const isbn = req.query.isbn as string;
        console.log(isbn);
        const decoded = getPayload(req.header('x-access-token'));
        if (!isbn) throw new Error("isbn non trovato");
        await deleteFromWishlist(decoded.id, isbn);
        res.status(200).send({
            success: true,
            message: "Elemento eliminato dalla wishlist",
            data: {
                isbn: isbn
            }
        });
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        });
    }
}
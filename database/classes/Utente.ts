import Credenziali from "./Credenziali";
import {Whishlist} from "./Whishlist"; // da implementare
import {LibreriaPersonale} from "./LibreriaPersonale"; // da implementare
import {RecensioneUtente} from "./RecensioniUtente"; // da implementare
import {Impostazioni} from "./Impostazioni"
import InfoPagamento from "./InfoPagamento"

class Utente {
    nickname: string;
    userID : string;
    credenziali: Credenziali;
    authID: string;
    banned: boolean;
    wishlist: Whishlist;
    libri: LibreriaPersonale;
    recensioni: RecensioneUtente[];
    premium: boolean;
    impostazioni: Impostazioni;
    pagamento: InfoPagamento;
    accordi: string[];
    
    constructor(nickname: string, credenziali: Credenziali) {
        this.nickname = nickname;
        this.credenziali = credenziali;
        this.banned = false;
        // aggiungere logica per assegnare authID
    }

    setAuthID(authID: string) {
        this.authID = authID;
    }

    addAccordo(accordoID: string) {
        this.accordi.push(accordoID);
    }

    removeAccordo(accordoID: string) {
        this.accordi = this.accordi.filter(accordo => accordo != accordoID);
    }
}

export {Utente};
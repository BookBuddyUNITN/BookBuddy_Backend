import {Chat} from "./Chat"

class Segnalazione{
    ID_segnalazione: number;
    utenteSegnalato: string;
    chatSegnalata: Chat;
    descrizioneSegnalata: string;

    constructor(ID, userID, chat, descrizione) {
        this.ID_segnalazione = ID;
        this.utenteSegnalato = userID;
        this.chatSegnalata = chat;
        this.descrizioneSegnalata = descrizione;
    }
}

export {Segnalazione}
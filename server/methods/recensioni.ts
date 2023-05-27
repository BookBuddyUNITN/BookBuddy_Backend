import {recensioneLibroInterface } from "../../database/models/Libro";
import { Libro } from "../../database/models/Libro";
import {v4 as uuidv4} from 'uuid'
import UtenteModel from "../../database/models/Utente";

interface lasciaRecensioneLibroInterface {
    recensione: recensioneLibroInterface,
    ISBN: string,
}

interface rimuoviRecensioneLibroInterface {
    recensioneID: string,
    ISBN: string
}

interface lasciaRecensioneUtenteInterface {
    to: String,
    voto: Number
}

interface rimuoviRecensioneUtenteInterface {
    to: String,
    recensioneID: String
}

interface ISBNinterface {
    ISBN: string
}

interface usernameinterface {
    username: string
}

export async function lasciaRecensioneLibro(req, res) {
    try {
        let body = req.body as lasciaRecensioneLibroInterface;
        if(!Object.keys(body).length) 
            throw new Error("bad request");
        if(body.recensione.voto as number > 5 || body.recensione.voto as number < 0) throw new Error("recensione non valida");
        let book = await Libro.findOne({ISBN: body.ISBN}).exec();
        if(!book) {
            // libro non ancora inserito nel database
            throw new Error("libro not found");
        }

        let uniqueID = uuidv4();
        book.recensioni.push({testo: body.recensione.testo, voto: body.recensione.voto, recensioneID: uniqueID.toString()});
        book.save()
        .catch(err => {throw new Error(err.message)});

        res.status(200).send({
            success: true,
            message: "recensione lasciata con successo",
            data: uniqueID
        })


    } catch(e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function eliminaRecensioneLibro(req, res) {
    try{
        let body = req.body as rimuoviRecensioneLibroInterface;
        if(!Object.keys(body).length)
            throw new Error("bad request");
        let book = await Libro.findOne({ISBN: body.ISBN}).exec();
        if(!book) throw new Error("ISBN is incorrect");

        book.recensioni.pull({recensioneID: body.recensioneID});

        await book.save()
            .catch(e => {throw new Error(e.message)});

        res.status(200).send({
            success: true,
            message: "recensione rimossa correttamente",
            data: {}
        })

    } catch(e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function getRecensioniLibro(req, res) {
    try {
        let body = req.body as ISBNinterface;
        if(!Object.keys(body).length) throw new Error("bad request");
        let book = await Libro.findOne({ISBN: body});
        if(!book) throw new Error("book not found");
        let recensioni = book.recensioni;
        // ordina le recensioni per rating

        res.status(200).send({
            success: true,
            message: "",
            data: recensioni
        })

    } catch(e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function lasciaRecensioneUtente(req, res) {
    try {
        let body = req.body as lasciaRecensioneUtenteInterface
        if(!Object.keys(body).length) 
            throw new Error("bad request body")
        if(body.voto as number > 5 || body.voto as number < 0) throw new Error("voto out of bounds");

        let utente = await UtenteModel.findOne({username: body.to}).exec();
        if(!utente) throw new Error("utente non trovato");

        let uniqueID = uuidv4().toString();
        utente.recensioni.push({voto: body.voto, recensioneID: uniqueID});

        await utente.save().catch(e => {throw new Error(e.message)});

        res.status(200).send({
            success: true,
            message: "OK",
            data: {to: body.to, voto: body.voto, recensioneID: uniqueID}
        })

    } catch(e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function rimuoviRecensioneUtente(req, res) {
    try {
        let body = req.body as rimuoviRecensioneUtenteInterface;
        if(!Object.keys(body).length) 
            throw new Error("bad request body")
        let utente = await UtenteModel.findOne({username: body.to}).exec();
        if(!utente) throw new Error("utente not found")
        utente.recensioni.pull({recensioneID: body.recensioneID});

        await utente.save().catch(e => {throw new Error(e.message)})

        res.status(400).send({
            success: true,
            message: "recensione eliminata",
            data: {}
        })
        
    } catch(e) {
        res.status(400).send({
            success: false, 
            error: e.message
        })
    }
}

export async function getRecensioniUtente(req, res) {
    try {
        let body = req.body as usernameinterface;
        console.log(req.body)
        if(!Object.keys(body).length) throw new Error("bad request");
        let user = await UtenteModel.findOne({username: body}).exec();
        let recensioni = user.recensioni

        res.status(200).send({
            success: true,
            message: "",
            data: recensioni
        })

    } catch(e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}
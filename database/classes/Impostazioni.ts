// import {Location} from "./Location" // da implementare

export default class Impostazioni {
    nome: string;
    location: [number, number];
    searchDistance: number;
    description: string;
    profilePicURL: string;

    constructor(nome: string, location: [number, number], searchDistance: number, description: string, profilePicURL: string ) {
        
        this.nome = nome;
        this.location = location;
        this.searchDistance = searchDistance;
        this.description = description;
        this.profilePicURL = profilePicURL;
    }

}
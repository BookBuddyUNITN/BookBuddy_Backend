
//molto sospetto
export default class Credenziali {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    cambioEmail(newEmail: string) {
        if(!this.emailValida(newEmail)) {
            return;
        }
        this.email = newEmail;
    } 

    resetPassword(email: string) {
        if(!this.emailValida(email)) {
            return;
        }
        /*
            check mail
            send mail
        */ 
    }

    emailValida(email: string) : boolean {
        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexp.test(email);
    }
}
import emailjs from '@emailjs/nodejs';
// import * as dotenv from 'dotenv'

export function emailValida(email: string): boolean {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email);
}

// const envs = dotenv.config()

emailjs.init({
    publicKey: process.env.EMAILJS_PUBLIC,
    privateKey: process.env.EMAILJS_PRIVATE, // optional, highly recommended for security reasons
});


export default async function sendMail(to: string, to_name: string, token: string, from_name: string) {
    try {
        const response = await emailjs.send('verify_account', 'template_k68v69f',
            {
                to: to,
                to_name: to_name,
                token: token,
                from_name: from_name,
            }
        )
    } catch (e) {
        console.log(e)
    }
}


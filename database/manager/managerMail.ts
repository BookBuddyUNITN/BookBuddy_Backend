import emailjs from '@emailjs/nodejs';
import * as dotenv from 'dotenv'

const envs = dotenv.config()

emailjs.init({
    publicKey: envs.parsed.EMAILJS_PUBLIC,
    privateKey: envs.parsed.EMAILJS_PRIVATE, // optional, highly recommended for security reasons
});

export default function sendMail( to: string, to_name: string, token: string, from_name: string ) {
    emailjs.send('verify_account', 'template_k68v69f',
        {
            to: to,
            to_name: to_name,
            token: token,
            from_name: from_name,
        }
    ).then(
        (response) => {
            console.log('SUCCESS!', response.status, response.text);
        },
        (err) => {
            console.log('FAILED...', err);
        },
    );
}


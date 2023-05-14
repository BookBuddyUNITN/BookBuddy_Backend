import axios from 'axios';

export default async function ricercaGlobale(keywords: string) {
    axios.get("http://openlibrary.org/search.json?q=" + keywords.replace(" ", "+"))
        .then(response => {
            const books = response.data.docs;
            const books_info = []
            books.map((book : any) => {
                const title = book.title ? book.title : '';
                const author = book.author_name ? book.author_name[0] : '';
                const isbn = book.isbn ? book.isbn[0] : '';
                if(title && author && isbn){
                    books_info.push({
                        title: title,
                        author: author,
                        isbn: isbn
                    });
                }
            });
            console.log(books_info);
        })
        .catch(error => {
            console.log(error);
        });
}


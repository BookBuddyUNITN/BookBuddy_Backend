import axios from 'axios';

export async function ricercaGlobaleReq(req, res) {
    let keywords = req.body.keywords;
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
            res.status(200).send({
                success: true,
                message: "Libri trovati",
                data: {
                    libri: books_info
                }
            });
        })
        .catch(error => {
            console.log(error);
            res.status(400).send({
                success: false,
                error: error.message
            });
        });
}


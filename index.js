import express from 'express';
import pg from 'pg';

const db = new pg.Client({
  user: 'postgres',
  password: '24685',
  host: 'localhost',
  port: 5432,
  database: 'library',
})

/* inside pgAdmin:
CREATE TABLE books(
	id SERIAL PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
    details VARCHAR(200),
    rating smallint
)
INSERT INTO books (title, details, rating)
VALUES ('harry potter', 'an excellent book', 10), 
		('a Tale Of Two Cities', 'very good book', 8)
*/

await db.connect();

async function updatebooklist(){
    const books = await db.query(`SELECT * FROM books`);
    let bookitems = []

    books.rows.forEach(book => {
    bookitems.push(book);
});

    return bookitems;
}


const app = express();
const port = 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());     
app.use(express.static("public"));

app.get('/', async (req, res) => {
    const bookitems = await updatebooklist();
    res.render('index.ejs', {
        books:bookitems
    });
});

app.post('/add', async (req, res)=>{
    const newbook = req.body['newbook'];
    const details = req.body['details'];
    const rating = req.body['rating'];
    try{
        await db.query(`INSERT INTO books(title, details, rating) 
            VALUES ($1,$2,$3)`, [newbook, details, rating]);
    }catch(err){
        console.log(err);
    }
    res.redirect('/');
});

app.post('/delete', async (req, res)=>{
    const deletedbook = req.body["deleteBookId"];
    try{
        await db.query(`DELETE FROM books WHERE id = $1`, [deletedbook]);
    }
    catch(err){
        console.log(err);
        console.log(deletedbook);
    }
    res.redirect('/');
})




















app.listen(port, ()=>{
    console.log(`server running on port: ${port}`);
});
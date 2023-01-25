//IMPORT EXPRESS
const express = require('express');


//IMPORT MIDDLEWARES
const morgan = require('morgan');


//IMPORT MONOGOOSE
const mongoose = require('mongoose');

//IMPORT BLOG MODEL THAT WE CREATED
const Blog = require('./models/blog');
const { render } = require('ejs');

//CREATE AN INSTANCE OF EXPRESS APP
const app = express();

//INSERT DATABASE CONNECTION (MONGODB)
const dbURI = 'mongodb+srv://fluff:1111@test.icygyc6.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true  }) //async task - can take methods like then, catch...
    .then((result) => app.listen(3000))
    .catch((err) => console.log('error is: ', err));


// const dbURI = 'mongodb+srv://fluff:1111@test.icygyc6.mongodb.net/?retryWrites=true&w=majority';
// async function connect() {
//     try {
//         await mongoose.connect(dbURI)
//         console.log('connected to MongoDB')
//         app.listen(3000);
//     } catch(error) {
//         console.log('error with connecting to db: ', error);
//     }
// };
// connect();

//REGISTER VIEW ENGINE
app.set('view engine', 'ejs'); //set() method allows to configure some settings in the application, like a view-templating engine, in this case we use EJS engine

//ejs automatically looks into a "views" folder (views is a default name value); but if we want to put our html files in a different folder then we have to tell EJS where to look into with a following command:
app.set('views', 'myviews'); //first parameter is by default 'views' and second parameter is the name of the folder that we chose for our project to put html into 'myviews'


//LISTEN TO REQUESTS
//app.listen(3000); //this instantly returns an instance of a server. AFTER WE ESTABLISH DB CONNECTION, WE PUT THIS INTO THE THEN METHOD WITHING MONGOOSE CONNECT, BECAUSE WE DONT WANT USERS TO BE ABLE TO SEND REQUESTS AND OUR SERVER TO LISTEN TO THEM BEFORE THE CONNECTION TO DB HAS BEEN MADE.


//MIDDLEWARE AND STATIC FILES
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); //middleware for accepting form data
app.use(morgan('dev'));


/*/MONGOOSE AND MONGODB SANDBOX ROUTES
//1.CREATE BLOG
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2222',
        snippet: 'thingy',
        body: 'thingy thingy thingy thingggg'
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log('Error with saving a blog instance is: ', err);
        });
});

//2.RETRIEVE ALL BLOGS FROM DB
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log('Error with retrieving all the blogs from db: ', err)
        });
});

//3.RETRIEVE SINGLE BLOG
app.get('/single-blog', (req, res) => {
    Blog.findById('63c71be5d0d6811792bdf3c9')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log('Error with retrieving a single blog is: ', err);
        });
});*/


//REQUEST-RESPONSE FOR HOMEPAGE
app.get('/', (req, res) => {
    //res.send('<p>Homepage</p>'); //automatically sets the content-type (header) and status codes
    //res.sendFile('./views/index.html', { root: __dirname });

    res.redirect('/blogs');    
});


//REQUEST-RESPONSE FOR ABOUT PAGE
app.get('/about', (req, res) => {
    //res.send('<p>About page</p>'); 
    //res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});


//REQUEST-RESPONSE FOR ALL BLOGS PAGE
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/blogs', (req, res) => {
    const body = req.body
    const blog = new Blog({body}); //we can do it in this way (req.body) thanks to the middleware
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { title: 'Blog Details', blog: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.delete('blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.log(err);
        });
});

//REQUEST-RESPONSE FOR CREATE BLOG PAGE
app.get('/blogs/create', (req, res) => {
    res.render('create.ejs', { title: 'Create Blog' });
});

//REDIRECTS
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});


//404 PAGE -- has to go to the bottom of the routes; express reads line by line
app.use((req, res) => { //method use() in express is used to created middleware and middleware functions
    res.status(404).render('404', { title: '404' });
});
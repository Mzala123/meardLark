const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express();
const port = process.env.PORT ||  3000

const hbs = expressHandlebars.create({
    helpers: {
    },
    defaultLayout: 'main'
})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')


app.get('/home', (req, res) => res.render('home'))

const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.", 
    "Do not fear what you don't know.", 
    "You will have a pleasant surprise.",  
    "Whenever possible, keep it simple.",
]

app.get('/About', (req, res) => {

    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about', {fortune: randomFortune})
})



app.use((req, res) =>{

    res.type('text/plain')
    res.status(404)
    res.send('404 - not found')
});

app.use((err, req, res, next) =>{
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server error')
});



app.use(express.static(__dirname +'/public'))

app.listen(port, () => console.log(`express started on ${port}` +' ctrl + c to terminate'));
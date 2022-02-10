const express = require('express')
const  handlers = require('./lib/handlers')
const expressHandlebars = require('express-handlebars')


const app = express();
const port = process.env.PORT ||  3000

const hbs = expressHandlebars.create({
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        }
    },
    defaultLayout: 'main'
})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')


app.get('/', handlers.home)
app.get('/about', handlers.about)
//custom 404 page
app.use(handlers.notFound)
//internal server error 
app.use(handlers.serverError) 



app.use(express.static(__dirname +'/public'))

app.listen(port, () => console.log(`express started on ${port}` +' ctrl + c to terminate'));
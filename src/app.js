const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = 8000;

app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Akash Karnatak'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Akash Karnatak'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Akash Karnatak'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide address.'
        })
    }
    geocode(req.query.address, (error, {lat, lon, name} = {}) => {
        if(error){
            return res.send({
                error
            });
        }
        forecast(lat, lon, name, (error, message) => {
            if(error){
                return res.send({
                    error
                });
            }
            res.send({
                forecast: message
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akash Karnatak',
        error: 'Looking for help page?'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akash Karnatak',
        error: 'Sorry the page you are looking for does not exists!'
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
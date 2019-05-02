const express = require('express');
//const ejs = require('ejs');
const bp = require('body-parser');

const app = express()
const port = 3000
const login = require("./loginOps")

app.set('view engine', 'ejs')
app.use(bp.urlencoded({ extended: true }));

app.get('/', login.userLogin);

app.get('/kayit', login.kayit);

app.post('/kayit', login.insert);
app.get('/MuzikTurEkle', login.MuzikTur);
app.post('/MuzikTurEkle', login.MuzikTurinsert);

app.get('/AlbumEkle',login.Album);
app.post('/AlbumEkle', login.Albuminsert);

app.get('/guncelle/:id',login.guncelle);

app.post('/guncelle', login.update);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
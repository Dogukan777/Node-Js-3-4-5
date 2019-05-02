const sql = require('mssql')
var webconfig = {
    user: 'dogukan',
    password: 'kalem1505',
    server: '192.168.0.27',
    database: 'MEDIPILIMDB'
};

module.exports.userLogin = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select s.SanatciId,SanatciAdi,SanatciDogumTarihi,(case SanatciYasiyormu when 1 then 'Evet' when 0 then 'Hayır' end) as SanatciYasiyormu,MuzikTur,AlbumAdi,CikisTarihi,EklenmeTarihi from Sanatci s,Album a,MuzikTur m where m.MuzikTurId=a.MuzikTurId and s.SanatciId=a.SanatciId", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            res.render('home', { veri: verisonucu.recordset });
            sql.close();
        });

    });
}

module.exports.kayit = function (req, res) {


    res.render('kayit');


}
module.exports.insert = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into Sanatci(SanatciAdi,SanatciYasiyormu,SanatciDogumTarihi,EklenmeTarihi)VALUES('" + req.body.ad + "'," + req.body.hayattami + "," + req.body.dogumtarihi + " ,GETDATE())", function (err, recordset) {
            if (err) {
                console.log(err);
            }

            res.render('AlbumGecis');
            sql.close();

        });


    });
}
module.exports.MuzikTur = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from MuzikTur", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            res.render('MuzikTurEkle', { veri: verisonucu.recordset });
            sql.close();
        });

    });

}
module.exports.MuzikTurinsert = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into MuzikTur(MuzikTur) values ('" + req.body.muzikturinsert + "')", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            res.render('MuzikTurGecis');
            sql.close();
        });

    });

}

module.exports.Album = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from MuzikTur", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            res.render('AlbumEkle', { veri: verisonucu.recordset });
            sql.close();
        });

    });

}

module.exports.Albuminsert = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into Album(AlbumAdi,CikisTarihi,SanatciId,MuzikTurId) values('" + req.body.albumadi + "','" + req.body.cikistarihi + "',(select Top(1) SanatciId from Sanatci order by SanatciId desc),(select MuzikTurId from MuzikTur where MuzikTur='" + req.body.muzikTur + "')) ", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }

            sql.close();
            res.render('Anasayfa');
        });




    });

}

module.exports.guncelle = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from Sanatci where SanatciId="+req.params.id+"", function (err, verisonucu) {
            if (err) {
                console.log(err);
                return req.next(err);
            }//Node 3-4-5
         
        sql.close();
        const id = req.params.id;
        res.render('guncelle',{veri:verisonucu.recordset, id:id});
        
            


        });

    });
}

module.exports.update = function (req, res, ) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("UPDATE Sanatci SET SanatciAdi='"+req.body.sanatciAdi+"' where SanatciId="+req.params.id+"  ", function (err, verisonucu) {
            if (err) {
                console.log(err);
                return req.next(err);

            }//Node 3-4-5
      
          sql.close();
        res.render('Anasayfa');
      
            


        });

    });
}



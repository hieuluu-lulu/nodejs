class siteController {
    //[GET]/home
    index(req, res) {
        res.render('home');
    }
}

module.exports = new siteController();

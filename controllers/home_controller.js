



module.exports.home = async function(req, res) {
    
    return res.render('home.ejs', {
        title: 'NodeJs Authentication',
        name: 'World!',
    })
}
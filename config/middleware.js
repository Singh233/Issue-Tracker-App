module.exports.setFlash = function(request, response, next) {
    response.locals.flash = {
        'success': request.flash('success'),
        'error': request.flash('error'),
        'info': request.flash('info'),
        'warning': request.flash('warning'),
    }
    next();
}
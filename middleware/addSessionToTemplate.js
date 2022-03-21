function addSessionToTemplate(req,res,next){
    //locals son propiedad disponibles en la respuesta, para cuando el template quiera usar los datos, lo pueda usar, se asigna a los locals de la sesion
    res.locals.session = req.session

    //decirle que pase a lo siguiente
    next()
}

module.exports = addSessionToTemplate
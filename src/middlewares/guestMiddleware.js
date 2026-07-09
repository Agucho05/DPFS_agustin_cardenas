function guestMiddleware(req, res, next) {
  // Si el usuario YA tiene una sesión activa, lo pateamos a la home
  if (req.session.userLogged) {
    return res.redirect("/");
  }
  // Si no está logueado, lo dejamos pasar a la vista (login/registro)
  next();
}

module.exports = guestMiddleware;

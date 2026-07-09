function authMiddleware(req, res, next) {
  // Si el usuario NO tiene una sesión activa, lo mandamos a loguearse
  if (!req.session.userLogged) {
    return res.redirect("/login");
  }
  // Si está logueado, lo dejamos pasar a la vista privada
  next();
}

module.exports = authMiddleware;

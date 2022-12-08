const { Router } = require("express");
const register = Router();
const {saveUser} = require("../controllers/register");

register.get("/", (req, res) => {
    res.render('pages/register');
});

register.post("/", (req, res) => {
  const {username, password, email} = req.body 
  saveUser({username, password, email}) 
    .then (user => {
      if (user) {
        return res.render('pages/succes')
      } else {
        res.render('pages/error', { error: 'Usuario ya registrado', url: 'register' }) 
      }      
    })
});

module.exports = register;
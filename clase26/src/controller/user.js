import passport from 'passport';

const passportOptions = { badRequestMessage: 'falta usuario/pass' };

export const signUp = (req, res, next) => {
    passport.authenticate('signup', passportOptions, (err, user, info) => {
        if(err) {
            return next(err)
        }
        if(!user) return res.status(401).json(info);
        res.json({msg: 'signup OK'})
    })(req, res, next);
}

export const login = (req, res, next) => {
    passport.authenticate("login", passportOptions, (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) return res.status(401).json(info);
        res.json({ msg: "bienvenido", user: req.user });
      })(req, res, next);
};


export const getHome = (req, res) => {
    res.json(req.session)
} 


  export const logout = (req, res) => {
       req.session.destroy((err) => {
      if (!err) res.send('Nos vemos');
      else res.send({ status: 'Logout ERROR', body: err });
    });
}
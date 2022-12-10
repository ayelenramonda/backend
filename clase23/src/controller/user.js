const users = [
    {
      username: 'juan',
      password : '1234',
      admin: true,
    },
    {
      username: 'jose',
      password : '123456',
      admin: false,
    }
]

export const login = (req, res) => {
    const { username } = req.body;
   
	const index = users.findIndex((aUser) => aUser.username === username );

	if(index < 0)
	  res.status(401).json({ msg: 'no estas autorizado' });
	else {
	  const user = users[index];
	  req.session.info = {
		loggedIn: true,
		contador : 1,
		username : user.username,
		admin : user.admin,
	  };
	  res.json({msg:  `Bienvenido ${req.session.info.username}`})
	}
  };


export const visit = (req, res) => {
    req.session.info.contador++;
    res.json({
      msg: `${req.session.info.username} visitaste el sitio ${req.session.info.contador} veces`,
    });
}

export const logout = (req, res) => {
		const { username } = req.session?.info
		req.session.destroy((err) => {
		  if (!err) res.json({msg:  `Hasta luego ${username}`});
		  else res.send({ status: 'Logout ERROR', body: err });
		});
	  
}



export const infoSession = (req, res) => {
    res.send({
      session: req.session,
      sessionId: req.sessionID,
      cookies: req.cookies,
    });
}
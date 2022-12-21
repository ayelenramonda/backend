import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../models/user.js';

const strategyOptions = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
};

const signup = async (req, username, password, done) => {
  console.log('SIGNUP!');
  try {
  
    const user = await UserModel.findOne({ username });
  
    if (user) {
       return done(null, false, { message: "usuario resgistrado" });
   }
  const newUser = await UserModel.create({username, password});
	newUser.password = await newUser.encryptPassword(password)
	await newUser.save()
    return done(null, newUser);
  } catch (error) {
    console.log(error);
    return done(null, false, { message: 'Error inesperado' });
  }
};

const login = async (req, username, password, done) => {
	console.log("LOGINNN")
	const user = await UserModel.findOne({ username });
  
	if (!user || !user.isValidPassword(password)) {
	  return done(null, false, { message: 'Invalid Username/Password' });
	}
	console.log('SALIO TODO BIEN');
	return done(null, user);
  };

export const loginFunc = new LocalStrategy(strategyOptions, login);
export const signUpFunc = new LocalStrategy(strategyOptions, signup);

passport.serializeUser((user, done)=>{
   done(null, user._id);
});

passport.deserializeUser( async(userId, done)=>{
  const user = await UserModel.findById(userId);
  return done(null, user);
});


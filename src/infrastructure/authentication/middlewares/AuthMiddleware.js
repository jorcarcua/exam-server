const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt        = require('passport-jwt').ExtractJwt;
const LocalStrategy     = require('passport-local').Strategy;
const bcrypt            = require('bcrypt'); 
 
 
const AuthMiddleware = ({config, checkCredentials, findUser}) => {  
    passport.use(new LocalStrategy(async (username, password, done) => { 
        
            const result = await checkCredentials(username, password) 
            done(null,  result)
       
    }))

   /* let customExtractor = function(req) {
        let token = null;
        if (req )
        {
            console.log(req.headers.authorization)
        }
        return 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU0NTExNjEzNDN9.fmw0-VhzRtqZ5wq-tdHUwMvp0FUzrrWRRCZqfKnQ35o'
    };*/

    let opts = {} 
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  //  opts.jwtFromRequest = customExtractor
    opts.secretOrKey = config.JWT_SECRET
    opts.algorithms = [config.JWT_ALGORITHM] 
 
 
    passport.use(new JwtStrategy(opts,  async (jwt_payload, done) =>{ 
       // try{ 
           
            const user = await findUser({_id: jwt_payload.sub})
            
            if(user){
                done(null, user)
            }
            else{ 
                done(null, false)
            } 
      //  }
      //  catch(error){
      //      done(error, null)
     //   } 
    }))

    return passport.initialize()
} 

module.exports = AuthMiddleware


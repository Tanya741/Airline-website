const express=require("express")

const app=express();

const cors=require("cors");

const { default: mongoose, isObjectIdOrHexString } = require("mongoose");

dotenv=require("dotenv")

dotenv.config()

const session=require("express-session")

const book=require('./booking.js')
const mongoStore=require("connect-mongo")

app.use(express.urlencoded({extended:true}))

const Flight = require('./Schema.js');

const bodyParser=require("body-parser")

app.use(bodyParser.json())

app.use(cors())






const dburl=process.env.ATLAS_URL

const connectdb=async()=>{

    try{

        const conn=await mongoose.connect(dburl)

        console.log("connected to db")

        

    }

    catch(e){

        console.log(e)

    }

}

connectdb()

const Store=mongoStore.create({

    mongoUrl:dburl,

    crypto:{

        secret:process.env.SECRET,

        touchAfter:24*3600

    }

})

app.use(session({

    Store,

    resave:false,

    saveUninitialized:false,

    secret:process.env.SECRET

}))










const User=require('./UserSchema.js')
const reviews=require('./review.js');

const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'No user with that email' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Password incorrect' });
        }
    } catch (err) {
        return done(err);
    }
}));
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.post('/register', async (req, res) => {

    const { name, email, password, phoneNumber } = req.body;
    // console.log(email, password);
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("already")
            return res.send("err");
        }
        const newUser = new User({ name, email, password, phoneNumber });
        await newUser.save();
        res.json("OK");
        console.log('User registered successfully');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Server error' });
    }

});
app.post('/login', async (req, res, next) => {
    try {

      passport.authenticate('local', async (err, user, info) => {

        if (err) {
          return res.send("err");
        }
        if (!user) {
          return res.send("err");
        }
        console.log(user);

        req.logIn(user, async (err) => {
          if (err) {
            return res.send("err");
          }
          return res.json(user);
        });
      })(req, res, next);
    } catch (error) {
    console.error('Error:', error);
    res.send("err");
    }
  });

app.get('/logout', (req, res) => {

    req.logout();

    res.send('Logged out');

});

app.post('/reviews' ,async(req,res)=>{
    const crtd=await reviews.create({
        comment:req.body.comment,
        author:req.body.name,
        rating:req.body.rating,
        airline:req.body.airline

    })
    console.log(crtd);
})


app.post('/find',async(req,res)=> {

    const { from, to } = req.body;
    try {

        const flights = await Flight.find({

            origin:from,

            destination:to

        });

        console.log(flights) 

        if(flights.length==0){

            res.json("ERROR");

        }

        else{

            res.json(flights);

        }

        

    } catch (error) {

        

        res.json("ERROR");

    }

}

)

app.post("/booking",async(req,res)=>{

    console.log('hfddf');

    const crtd=await book.create({

        flight_date:req.body.date,

        user:req.body.email,

        airLine:req.body.airLine

    })

    console.log(crtd)

    

})
app.post("/getReviews",async(req,res)=>{
    console.log(req.body.airline)
    const ans=await reviews.find({airline:req.body.airline})
    console.log(ans)
    res.json(ans);
    

})
app.post("/myFlights",async(req,res)=>{

    const ans=await book.find({user:req.body.email})
    console.log((ans))
    res.json(ans);

})




// module.exports = { searchFlights };






app.listen(8000 , ()=>{

    console.log("Listening to port 8000");

})
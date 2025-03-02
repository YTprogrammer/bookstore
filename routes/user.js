const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");

router.post('/sign-up', async(req,res) => {

    try {
        const {username,email,password,address} = req.body;

         if(username.length < 4)
         {
            return res.status(400).json({message:"Username length should be greather than 3"});
         }

       const existingUsername = await User.findOne({username: username});
       if(existingUsername)
         {
        return res.status(400).json({message:"Username already exixts"});
       }

       const existingEmail = await User.findOne({email: email});
       if(existingEmail)
         {
        return res.status(400).json({message:"Email already exixts"});
       }

     if(password.length <= 5)
        {
            return res.status(400).json({message:"Password should be greather than 5"});
     }
     const hashPass = await bcrypt.hash(password, 10);

      const newUser = new User({
        username:username,
        email:email,
        password: hashPass,
        address:address
    });
     await newUser.save();
     return res.status(200).json({message: "SignUp Successfully"});
    } catch (error) {
        console.error("Sign-Up Error:", error);
       return  res.status(500).json({message:"internal server error"});
        
    }
});

//sign in
router.post("/sign-in", async (req,res) => {
    try {
        const {username, password} = req.body;
       
        const existingUser = await User.findOne({username});
        if(!existingUser)
        {
           return res.status(400).json({message: "Invalid credentials"}); 
        }

        const isPasswordInvalid = await bcrypt.compare(password, existingUser.password);
           if(isPasswordInvalid) {
            const authClaims = [ 
                {name: existingUser.username},
                {role: existingUser.role}
            ];

            const token = jwt.sign({authClaims},"bookStore123",{
                expiresIn: "30d",
            });
             return res.status(200).json({
                id: existingUser._id, 
                role: existingUser.role, 
                token: token,
             });
           }
           else{
            return res.status(400).json({message: "Invalid Credentials"});
           } 
        

    } catch (error) {
        console.error("Sign-In Error:", error);
        return res.status(500).json({message: "Internal server error"});
    }
});

router.get("/get-user-information", authenticateToken, async (req,res) =>{
    try {
      const {id} = req.headers;
      const data = await User.findById(id).select('-password');
      return res.status(200).json(data);  
        
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
});

router.put("/update-address", authenticateToken, async (req, res) =>{
    try {
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id, {address:address});
        return res.status(200).json({message: "Address updated successfully"});

    } catch (error) {
      return res.status(500).json({message: " Internal server error"});  
    }
})

module.exports = router;
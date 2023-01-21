import bcrypt from 'bcrypt';
import  Jwt  from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
    try {
        const {firstName,
                lastName,
                email,
                password,
                picturePath,
                occupation,
                friends,
                location
            } = req.body ;
        {/*here we will hash the passwordwe have got so as to protect the password */}


        const Salt  = await bcrypt.genSalt() ;
        const passwrd = await bcrypt.hash(password,Salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:passwrd,
            picturePath,
            occupation,
            friends,
            location,
            viewedPofile: Math.floor(Math.random() *1000),
            impression: Math.floor(Math.random() *1000)
        })
        const savedUser = newUser.save() ;
        res.status(201).json(savedUser);



    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}
export const login = async (req, res) => {
    try {

        const { email, password } = req.body
        const user  = await User.findOne({email:email})
        if(!user){
            res.status(400).json({message:'User does not exist'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(400).json({message:'Password is incorrect'})
        }
        const token = Jwt.sign({id:user._id},process.env.JWT_SECRET)
        delete user.password
 
        res.status(200).json({token,user})

    } catch (error) {
        res.status(404).json({message:error.message})
        console.log({message: error.message}) ;
    }
}
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");

const index = async (req, res) => {
    try {
        const usersData = await knex("users");
        res.status(200).json(usersData);
    }
    catch (error) {
        res.status(400).send("Error retrieving users' data")
    }

}


const signup = async (req, res) => {
    const {first_name, last_name, username, email, password} = req.body;
    console.log(typeof password);
    
    if (!first_name || !last_name || !username || !email || !password) {
        return res.status(400).send("Please provide all user info");
    }

    const hashedPassword = bcrypt.hashSync(password, 5);

    try {
        await knex("users").insert({first_name, last_name, username, email, password: hashedPassword});
        res.status(201).send("Signed up successfully!");
    } 
    catch (error) {
        res.status(400).send("Sign up failed!");
    }


}

const login = (req, res) => {

}







module.exports = {
    index,
    signup, 
    login
}
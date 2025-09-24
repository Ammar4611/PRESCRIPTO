import jwt from "jsonwebtoken";
import PatientModel from "../Models/PatientModel.js";

export const checkAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){ return res.status(401).json({ errors: [{ msg: "Not authorized" }] })};

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await PatientModel.findById(decoded.id).select("-password");
        req.user = user;
        next();
        
    } catch (error) {

        console.log(error)
        res.status(500).json({ errors: [{ msg: error.message }] })
        
    }

}
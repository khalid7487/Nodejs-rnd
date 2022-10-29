import express from "express";
import { saveUser, getAllUsers, update, deleteById, getUserById } from "../services/userService";
import validators from "../models/request-models";
import { handleValidation } from "../middlewares/index"


const router = express.Router();

const getHandler = async (req, res, next) => {
    
    try {
        const users = await getAllUsers();
        return res.status(200).json({ data: users});
    } catch (err) {
       return next(err, req, res);   
    }
};

const getByHandler = async (req, res, next) =>{

    try {
        const id = req.params.id;        
        const user = await getUserById(id);
        res.status(200).json({user});
    } catch (error) {
        return next(error, req, res);
    }
}



const postHandler = async (req, res, next) => {
    
    try {
        const body = req.body;
        const user = await saveUser(body);
        return res.status(201).json({data: user});   
    } catch (err) {
        return next(err, req, res);
    }
};

const putHandler = async (req, res, next) => {
    try {
        const body = req.body;    
        const user = await update(body);
        return res.status(200).json({data: user});

    } catch (err) {
        return next(err, req, res);
    }
}

const deleteHandler = async (req, res, next) => {

    try {
        const id = req.params.id;
        await deleteById(id);
        return res.status(200).json({message: "User deleted"});
    } catch (err) {
        return next(err, req, res);
    }
}

router.get('/', getHandler);
router.get('/:id', getByHandler);
router.post('/',handleValidation(validators.userSchemaValidate), postHandler);
router.put('/', putHandler);
router.delete('/:id', deleteHandler);


export default router;
import express from "express";
import { saveUser, getAllUsers, update, deleteById } from "../services/userService";
import validators from "../models/view-models";
import { handleValidation } from "../middlewares/handleValidations"


const router = express.Router();

const getHandler = async (req, res, next) => {
    
    try {
        const users = await getAllUsers();
        return res.status(200).json({ data: users});
    } catch (err) {
       return next(err, req, res);   
    }
};

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
router.post('/',handleValidation(validators.userSchemaValidate), postHandler);
router.put('/', putHandler);
router.delete('/:id', deleteHandler);


const configure = (app) => {
    app.use('/users', router);
}

export default configure;
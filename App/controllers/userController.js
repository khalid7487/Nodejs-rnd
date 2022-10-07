import express from "express";
import { saveUser, getAllUsers, update, deleteById } from "../services/userService";

const router = express.Router();

const getHandler = async (req, res) => {
    
    try {
        const users = await getAllUsers();
        res.status(200).json({ data: users});
    } catch (err) {
       res.status(500).json({message: "Something went wrong."});   
    }
};

const postHandler = async (req, res) => {
    
    try {
        const body = req.body;
        const user = await saveUser(body);
        res.status(201).json({data: user});   
    } catch (err) {
        res.status(500).json({message: "Something went wrong."})
    }
};

const putHandler = async (req, res) => {
    try {
        const body = req.body;    
        const user = await update(body);
        res.status(200).json({data: user});

    } catch (err) {
        res.status(500).json({message: "Something went wrong."});
    }
}

const deleteHandler = async (req, res) => {

    try {
        const id = req.params.id;
        await deleteById(id);
        res.status(200).json({message: "User deleted"});
    } catch (err) {
        res.status(500).json({message: "Something went wrong."});
    }
}

router.get('/', getHandler);
router.post('/', postHandler);
router.put('/', putHandler);
router.delete('/:id', deleteHandler);


const configure = (app) => {
    app.use('/users', router);
}

export default configure;
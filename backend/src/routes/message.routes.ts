import express from "express";
import { MessageModel } from "../models/message.model";
import { UserModel } from "../models/user.model";
import userRouter from "../routes/user.routes";
import jwt from "jsonwebtoken";

const messageRouter = express.Router();
    messageRouter.post('/', (req, res) => {
        const message = new MessageModel ({
            content: req.body.content,
            user: req.body.username
        });

        message.save()
            .then(savedMessage => res.send(savedMessage))
            .catch(err => {
                console.error(err);
                res.status(500).send(err);
            });
    });

messageRouter.get('/', (req, res) => {
    var emailBody = req.body.email;
    console.log(emailBody)
    MessageModel.find({})
        .then(messages => res.send(messages))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        }) 
});

messageRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    const newContent = req.body.content;

    MessageModel.findByIdAndUpdate(id, {content: newContent }, { new: true })
        .then(updatedMessage => res.json(updatedMessage))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

messageRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    MessageModel.findByIdAndDelete(id)
        .then(deletedMessage => res.send(deletedMessage))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

export default messageRouter;
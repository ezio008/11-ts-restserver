import { Request, Response } from "express";
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {

    const users = await User.findAll({
        where: {
            state: true
        }
    });

    res.json({
        users
    });
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if(!user) {
        return res.status(404).json({
            msg: `No existe el usuario con id ${id}`
        });
    }

    res.json({
        user
    });
}

export const postUser = async (req: Request, res: Response) => {

    const { body } = req;
    try {
        const userExist = await User.findOne({where: {email: body.email}});
        if (userExist) {
            return res.status(400).json({
                msg: `El usuario con correo ${body.email} ya existe`
            });
        }

        const user = User.build(body);

        await user.save();

        res.json({
            user
        });

    } catch(err) {
        console.log(err);        
        res.status(500).json({
            msg: 'Fallo en el servidor',            
        });
    }
}

export const putUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    try {
        

        const user = await User.findByPk(id);
        if(!user) {
            return res.status(404).json({
                msg: `No existe el usuario con id ${id}`
            });
        }
        
        await user.update(body);

        res.json({
            user
        });

    } catch(err) {
        console.log(err);        
        res.status(500).json({
            msg: 'Fallo en el servidor',            
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        

        const user = await User.findByPk(id);
        if(!user) {
            return res.status(404).json({
                msg: `No existe el usuario con id ${id}`
            });
        }
        
        await user.update({state: false});

        res.json({
            user
        });

    } catch(err) {
        console.log(err);        
        res.status(500).json({
            msg: 'Fallo en el servidor',            
        })
    }
}
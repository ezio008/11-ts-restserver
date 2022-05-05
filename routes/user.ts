import { Router } from "express";
import { check } from "express-validator";
import { getUsers, getUser, postUser, putUser, deleteUser } from '../controllers/user';
import { validateFields } from '../middlewares/validate-fields';


const router = Router();

router.get('/', getUsers);

router.get('/:id', [
    check('id', 'El id tiene que ser númerico').isNumeric(),
    check('name', 'El nombre no puede estar vacio').notEmpty(),
    check('email', 'El correo tiene un formato incorrecto').isEmail(),
    validateFields
], getUser);

router.post('/', [
    check('name', 'El nombre no puede estar vacio').notEmpty(),
    check('email', 'El correo tiene un formato incorrecto').isEmail(),
    validateFields
], postUser);

router.put('/:id', [
    check('id', 'El id tiene que ser númerico').isNumeric(),
    check('name', 'El nombre no puede estar vacio').notEmpty(),
    validateFields
], putUser);

router.delete('/:id',[
    check('id', 'El id tiene que ser númerico').isNumeric(),
    validateFields
], deleteUser);

export default router;
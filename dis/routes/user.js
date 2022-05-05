"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../controllers/user");
const validate_fields_1 = require("../middlewares/validate-fields");
const router = (0, express_1.Router)();
router.get('/', user_1.getUsers);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser númerico').isNumeric(),
    (0, express_validator_1.check)('name', 'El nombre no puede estar vacio').notEmpty(),
    (0, express_validator_1.check)('email', 'El correo tiene un formato incorrecto').isEmail(),
    validate_fields_1.validateFields
], user_1.getUser);
router.post('/', [
    (0, express_validator_1.check)('name', 'El nombre no puede estar vacio').notEmpty(),
    (0, express_validator_1.check)('email', 'El correo tiene un formato incorrecto').isEmail(),
    validate_fields_1.validateFields
], user_1.postUser);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser númerico').isNumeric(),
    (0, express_validator_1.check)('name', 'El nombre no puede estar vacio').notEmpty(),
    validate_fields_1.validateFields
], user_1.putUser);
router.delete('/:id', [
    (0, express_validator_1.check)('id', 'El id tiene que ser númerico').isNumeric(),
    validate_fields_1.validateFields
], user_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map
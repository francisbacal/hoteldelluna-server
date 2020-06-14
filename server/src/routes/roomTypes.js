import express from 'express'
import Joi from '@hapi/joi'
import multer from 'multer'
import storage from './../lib/multer-setup'

import authorize from './../_middleware/authorize'
import validateRequest from './../_middleware/validateRequest'

import Role from '../_helpers/role'
import roomTypeService from './../_services/roomTypes.services'

const router = express.Router();
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png"    ||
            file.mimetype == "image/PNG"    ||
            file.mimetype == "image/jpg"    ||
            file.mimetype == "image/jpeg"   ||
            file.mimetype == "image/JPG"    
        ) {
            cb(null, true)
        } else {
            req.fileValidationError = {message: "Validation Error: image: Invalid image type. Allowed types are jpg and png."}
            return cb(null, false, req.fileValidationError)
        }
    }
});


/* ========================
| ROUTES
--------------------------*/

router.post('/', authorize(Role.Admin), upload.array('images', 10), addSchema, add);
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(Role.Admin), getOne);
router.put('/:id', authorize(Role.Admin), upload.array('images', 10), updateSchema, update);
router.delete('/:id', authorize(Role.Admin), _delete)


export default router

/* ========================
| FUNCTIONS
--------------------------*/

function addSchema(req, res, next){
    
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
    })

    validateRequest(req, next, schema)
}

function add(req,res,next) {
    if (req.fileValidationError) {
        let err = req.fileValidationError;
        next(err)
    }
    let images = [];

    req.files.map(img => {
        let image = {}
        image.name = img.filename
        images.push(image)
    })

    req.body.images = images

    roomTypeService.add(req)
        .then(roomType => res.json(roomType))
        .catch(next)
}

function getAll(req,res,next){
    roomTypeService.getAll()
        .then(roomTypes => res.json(roomTypes))
        .catch(next)
}

function getOne(req,res,next){
    if (req.params.id == 'null') {
        next('Invalid Room Type')
    }
    roomTypeService.getOne(req.params.id)
        .then(roomType => {
            if (roomType) {
                res.json(roomType)
            } else {
                next(`Room type not found`)
            }
        })
        .catch(next)
}

function updateSchema(req, res, next) {
    const updateSchemaRules = Joi.object().keys({
        name: Joi.string().allow('', null),
        price: Joi.number().allow('', null),
        description: Joi.string().allow('', null),
    })

    validateRequest(req, next, updateSchemaRules)
}

function update(req,res,next){
    if (req.fileValidationError) {
        let err = req.fileValidationError;
        next(err)
    }

    if (req.files.length) {
        let images = [];

        req.files.map(img => {
            let image = {}
            image.name = img.filename
            images.push(image)
        })

        req.body.images = images
    }

    roomTypeService.update(req)
        .then(roomType => {
            if (roomType) {
                res.json(roomType)
            } else {
                next(`Room type not found`)
            }
        })
        .catch(next)
}

function _delete(req,res,next){
    roomTypeService._delete(req)
        .then(roomType => {
            if (roomType) {
                res.json(roomType)
            } else {
                next(`Room type not found`)
            }
        })
        .catch(next)
}
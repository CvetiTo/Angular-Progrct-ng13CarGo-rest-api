const router = require('express').Router();
const api = require('../services/catalog.js');
const mapErrors = require('../utils/mapper.js');
const { isAuth, isOwner } = require('../middlewares/guards.js');
const preload = require('../middlewares/preload.js');
const { json } = require('express/lib/response');
const { createIndexes } = require('../models/User.js');

router.get('/', async (req, res) => {
    const data = await api.getAll();
    console.log('Read catalog')
    //res.end();
    res.json(data);
});

router.post('/',isAuth(), async (req, res) => { 
    console.log(req.body);
   
    const item = {
        loading: req.body.loading,
        unloading: req.body.unloading,
        startingFrom: req.body.startingFrom,
        tons: req.body.tons,
        price: req.body.price,
        owner: req.user._id
    }

    try {
        //throw new Error('Test error/nSecond line');
        const result = await api.create(item);
        res.status(201).json(result);
    } catch(err) {
        const error = mapErrors(err);
        console.error(err.message);
        res.status(400).json({ message: error });
    }
    
    //res.end();
});

router.get('/:id', preload(), (req, res) => {
    const item = res.locals.item; //await api.getById(req.params.id);
    console.log('Read record')
    //res.end();
    res.json(item);
});

router.put('/:id', preload(), isOwner(), async (req, res) => {
    console.log('Update record')
    //res.end();
    const itemId = req.params.id;
    const item = {
        loading: req.body.loading,
        unloading: req.body.unloading,
        startingFrom: req.body.startingFrom,
        price: req.body.price,
        tons: req.body.tons
    }

    try {
        const result = await api.update(itemId, item);
        res.json(result);
    } catch(err) {
        const error = mapErrors(err);
        console.error(err.message);
        res.status(400).json({ message: error });
    }
});

router.delete('/:id', preload(), isOwner(), async (req, res) => {
    console.log('Delete record')
    //res.end();
    
    try {
        const itemId = req.params.id;
        await api.deleteById(itemId);
        res.status(204).end();
    } catch(err) {
        const error = mapErrors(err);
        console.error(err.message);
        res.status(400).json({ message: error });
    }
});

module.exports = router;
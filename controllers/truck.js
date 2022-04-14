const router = require('express').Router();
const api = require('../services/truck.js');
const mapErrors = require('../utils/mapper.js');
const { isAuth, isOwner } = require('../middlewares/guards.js');
const preload = require('../middlewares/preload.js');


router.get('/', async (req, res) => {
    const data = await api.getAll();
    console.log('Read catalog')
    //res.end();
    res.json(data);
});

router.post('/',  async (req, res) => { //isAuth(),
    console.log(req.user);//._id
   
    const item = {
        loading: req.body.loading,
        unloading: req.body.unloading,
        startingFrom: req.body.startingFrom,
        validUntil: req.body.validUntil,
        type: req.body.type,
        tons: req.body.tons,
        price: req.body.price,
        owner: req.user //._id
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

router.get('/:id',  (req, res) => { //preload(),
    const item = res.locals.item; //await api.getById(req.params.id);
    console.log('Read record')
    //res.end();
    res.json(item);
});

router.put('/:id',  isOwner(), async (req, res) => {//preload(),
    console.log('Update record')
    //res.end();
    const itemId = req.params.id;
    const item = {
        loading: req.body.loading,
        unloading: req.body.unloading,
        startingFrom: req.body.startingFrom,
        validUntil: req.body.validUntil,
        type: req.body.type,
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
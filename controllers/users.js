const router = require('express').Router();
const { isGuest } = require('../middlewares/guards');
const { register, login, logout, profile } = require('../services/users');
const mapErrors = require('../utils/mapper');

//
router.post('/register',isGuest(),  async (req, res) => {
    try {
        if (req.body.username.trim() == '' || req.body.email.trim() == '' 
        || req.body.telephone.trim() == '' || req.body.password.trim() == '') {
            throw new Error('Some fields are required');
        }

        const result = await register( req.body.username.trim().toLowerCase(), req.body.email.trim().toLowerCase(), 
         req.body.telephone.trim(), req.body.password.trim());
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const result = await login(req.body.username.trim().toLowerCase(), req.body.password.trim());
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.get('/logout', (req, res) => {
    console.log(req.user);
    logout(req.user?.token);
    res.status(204).end();
});

//router.get('/profile', async (req, res) => {
//
//})
//
//router.put('/profile', async (req, res) => {
//    try {
//        const result = await profile(req.body.email.trim().toLowerCase(), );
//        res.json(result);
//    } catch (err) {
//        console.error(err.message);
//        const error = mapErrors(err);
//        res.status(400).json({ message: error });
//    }
//})

module.exports = router;
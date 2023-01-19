const router = require('express').Router();
const { User } = require('../../models');


router.post('/register', async (req, res) => {
    try {
        console.log(req.body);

        const userRegData = await User.create(req.body);

        req.session.save(() => {
        req.session.user_id = userRegData.id;
        req.session.logged_in = true;
        res.redirect('/dashboard');
        });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
        res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again' });
        return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
        res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again' });
        return;
        }

        req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
        res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;
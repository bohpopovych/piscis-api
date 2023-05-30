import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'User should log in!' });
    }

    jwt.verify(token.slice(7), process.env.SECRET_KEY, (err, user) => {
        if (err) {
        return res.status(403).json({ error: 'Access denied!' });
        }

        req.user = user;
        next();
    });
};

export default auth;
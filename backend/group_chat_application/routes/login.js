const express = require('express');

const app = express();

const router = express.Router()

router.get('/login', (req, res) => {
    res.send(`
        <form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="POST">
            <input type="text" id="username" name="username" placeholder="Enter the username" required>
            <button type="submit">Login</button>
        </form>
    `);
});


module.exports = router
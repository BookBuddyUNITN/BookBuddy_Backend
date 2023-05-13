import jwt from 'jsonwebtoken'

export async function login(req, res) {
    // let user = await Student.findOne({ email: req.body.email }).exec()
    const password = "test"
    // if (!user) res.json({ success: false, message: 'User not found' })
    if (password != req.body.password) {
        res.json({ success: false, message: 'Wrong password' })
        return
    }
    // user authenticated -> create a token
    var payload = { pinco: "pallino" }
    var options = { expiresIn: 86400 } // expires in 24 hours
    var token = jwt.sign(payload, process.env.SUPER_SECRET, options);
    res.json({
        success: true, 
        message: 'Enjoy your token!',
        token: token
    });
}
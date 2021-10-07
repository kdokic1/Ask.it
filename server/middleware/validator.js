module.exports = function (req, res, next) {
    const { email, password } = req.body;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let error = { email: '', password: ''};

    if (req.path === 'login') {
        if(!email) {
            error['email'] = 'Please enter your email address.'
        }
        if(!password) {
            error['password'] = 'Please enter your password.'
        }

        if(error['email'] != '' || error['password'] != '') {
            return res.status(401).json(error);
        }
    }

    if (req.path === '/signup') {
        if(!email) {
            error['email'] = 'Please enter your email address.'
        } else if (!email.match(regexEmail)) {
            error['email'] = 'Enter an email address in the correct format, like name@example.com.'
        }

        if(!password) {
            error['password'] = 'Please enter your password.'
        } else if (password.length < 5) {
            error['password'] = 'Password should contain at least 5 characters.';
        }

        if(error['email'] != '' || error['password'] != '') {
            return res.status(401).json(error);
        }
    }

    next();
};
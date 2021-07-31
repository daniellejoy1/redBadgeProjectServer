const authDeleteClient = (permissions) => {
    return (req, res, next) => {
        const userRole = req.body.role
        if (permissions.includes(userRole)) {
            next()
        }
        else {
            return res.status(401).json("You do not have permission to delete clients")
        }

    }
};

// const authQuotes = () => {};

module.exports = { authDeleteClient }
const { sendToClubEmail } = require("../utils/mailer.utils");

exports.sendMaintoClub= async (req, res, next) => {
    sendToClubEmail(req.body.subject,"",req.body);
    return res.send(`Hey! Your message has been sent`);
}
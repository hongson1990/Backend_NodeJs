import bcrypt from 'bcryptjs';
import db from '../models/index';


const salt = bcrypt.genSaltSync(10);

let handleUserLogin = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'rodeId', 'password'],
                    where: { email: email },
                    raw: true,
                });

                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `Ok`;
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exits in your system. Plz try other email`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findOne({
                where: {
                    email: userEmail
                },
            });
            if (users) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
}
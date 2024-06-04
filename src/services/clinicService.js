import db from '../models/index';

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name
                || !data.address
                || !data.imageBase64
                || !data.descriptionHTML
                || !data.desciptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    desciptionMarkdown: data.desciptionMarkdown
                });

                resolve({
                    errCode: 0,
                    errMessage: 'Ok'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'desciptionMarkdown']
                });
                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId
                            },
                            attributes: ['doctorId', 'provinceId']
                        });
                    } else {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId']
                        });
                    }
                    data.doctorSpecialty = doctorSpecialty;
                } else {
                    data = {}
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                    data
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}



module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById
}
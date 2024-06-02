import { name } from 'ejs';
import db from '../models/index';

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // imageBase64: '',
            // descriptionHTML: '',
            // desciptionMarkdown: '',
            if (!data.name
                || !data.imageBase64
                || !data.descriptionHTML
                || !data.desciptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
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

module.exports = {
    createSpecialty: createSpecialty
}
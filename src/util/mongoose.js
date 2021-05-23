import { CourseModel } from "../app/models/course.model.js";

const doctumentsToObjects = (documents) => {
    return documents.map((document) => document.toObject());
};

const doctumentToObject = (document) => {
    return document.toObject();
};

const getCodeAuthorUnique = (min, max) => {
    let isEqual = true;
    let code = 0;
    while (isEqual) {
        code = Math.floor(Math.random() * (max - min + 1) + min);
        CourseModel.findOne({ code }).then((isEqual = true)).catch((isEqual = false));
    }
    return code;
}

export {
    getCodeAuthorUnique,
    doctumentsToObjects,
    doctumentToObject,
};

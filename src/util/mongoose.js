import { CourseModel } from "../app/models/course.model.js";

const doctumentsToObjects = (docs) => {
    return docs.map((doc) => doc.toObject());
};

const doctumentToObject = (doc) => {
    return doc.toObject();
};

const getCodeAuthorUnique = (min, max) => {
    let isEqual = true;
    let code = 0;
    while (isEqual) {
        code = Math.floor(Math.random() * (max - min + 1) + min);
        CourseModel.findOne({ code })
            .then((isEqual = true))
            .catch((isEqual = false));
    }
    return code;
};

export { getCodeAuthorUnique, doctumentsToObjects, doctumentToObject };

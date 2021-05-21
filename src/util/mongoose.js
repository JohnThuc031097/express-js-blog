const doctumentsToObjects = (documents) => {
    return documents.map((document) => document.toObject());
};

const doctumentToObject = (document) => {
    return document.toObject();
};

export { doctumentsToObjects, doctumentToObject };

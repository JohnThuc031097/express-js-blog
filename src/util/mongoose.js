const doctumentsToObjects = (docs) => {
    return docs.map((doc) => doc.toObject());
};

const doctumentToObject = (doc) => {
    return doc.toObject();
};

export { doctumentsToObjects, doctumentToObject };

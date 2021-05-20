const DoctumentsToObjects = (documents) => {
    return documents.map((document) => document.toObject());
};

const DoctumentToObject = (document) => {
    return document.toObject();
};

export { DoctumentsToObjects, DoctumentToObject };

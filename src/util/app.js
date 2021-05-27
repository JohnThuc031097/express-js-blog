import path from 'path';

export default (() => {
    const dirname = path.join(path.resolve(), 'src');
    const rootFolder = {
        resources: path.join(dirname, 'resources'),
        public: path.join(dirname, 'public'),
    };
    const nameCollection = 'education_dev';
    return {
        Dirname() {
            return dirname;
        },
        RootFolder() {
            return rootFolder;
        },
        NameCollection() {
            return nameCollection;
        },
    };
})();

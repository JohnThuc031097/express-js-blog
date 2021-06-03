import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-sequence';

const _AutoIncrement = AutoIncrement(mongoose);
const Schema = mongoose.Schema;

const authorSchema = new Schema(
    {
        firstName: { type: String, maxLength: 50 },
        lastName: { type: String, maxLength: 50 },
        username: { type: String, maxLength: 20 },
        password: { type: String, maxLength: 20 },
        coin: { type: Number },
        index: { type: Number },
    },
    { timestamps: true },
);
// Add plugin
authorSchema.plugin(_AutoIncrement, {
    id: 'index_author',
    inc_field: 'index',
});

const AuthorModel = mongoose.model('author', authorSchema);

export { AuthorModel };

const { model, Schema, Types: { ObjectId } } = require('mongoose');


const userSchema = new Schema({
    email: { type: String, required: [true, 'Email is required'] },
    hashedPassword: { type: String, required: true },
    loads: [{ type: ObjectId, ref: "Item" }],
    offers: [{ type: ObjectId, ref: "Offer" }]
}, { timestamps: { createdAt: 'created_at' } });


userSchema.index({ email: 1}, {
    collation: {
        locale: 'en',
        strength: 1
    }
});

const User = model('User', userSchema);

module.exports = User;
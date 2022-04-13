const { model, Schema, Types: { ObjectId }   } = require('mongoose');


const userSchema = new Schema({
    username: {type: String, required: true},
    email: { type: String, required: [true, 'Email is required'] },
    telephone: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    trucks: [{ type: ObjectId, ref: "Truck" }],
    loads: [{ type: ObjectId, ref: "Item" }],
    offers: [{ type: ObjectId, ref: "Offer" }]
}, { timestamps: { createdAt: 'created_at' } });


userSchema.index({ username: 1}, {
    collation: {
        locale: 'en',
        strength: 1
    }
});

const User = model('User', userSchema);

module.exports = User;
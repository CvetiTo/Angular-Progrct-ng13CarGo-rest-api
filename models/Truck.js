const { model, Schema, Types: { ObjectId } } = require('mongoose');

const truckSchema = new Schema({
    loading: { type: String, required: true },
    unloading: { type: String, required: true },
    startingFrom: { type: String, required: true },
    validUntil: { type: String, required: true },
    type: { type: String, required: true },
    tons: { type: Number, required: true },
    price: { type: Number},
    offers: [{ type: ObjectId, ref: 'Offer'}],
    owner: { type: ObjectId, ref: 'User' },
}, { timestamps: { createdAt: 'created_at' } });

const Truck = model('Truck', truckSchema);
module.exports = Truck;
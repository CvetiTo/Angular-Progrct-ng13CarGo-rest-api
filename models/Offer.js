const { model, Schema, Types: ObjectId } = require('mongoose');

 const offerSchema = new Schema ({
    text: { type: String, required: true },
    owner: { type: ObjectId, ref: 'User' },
    loadId: { type: ObjectId, ref: 'Item'},
    truckId: { type: ObjectId, ref: 'Truck'}
 })

const Offer = model('Offer', offerSchema);

module.exports = Offer;

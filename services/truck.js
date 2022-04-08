const Truck = require('../models/Truck');

async function getAll() {
    return Truck.find({});
}
async function create(item) {
    const result = new Truck(item);
    await result.save();

    return result;
}
function getById(id) {
    return Truck.findById(id);
}

async function update(id, item) {
    const existing = await Truck.findById(id);

        existing.loading = item.loading;
        existing.unloading = item.unloading;
        existing.startingFrom = item.startingFrom;
        existing.validUntil = item.validUntil;
        existing.type = item.type;
        existing.tons = item.tons;
        existing.price = item.price;

      await existing.save();

    return existing;
}

async function deleteById(id) {
    await Truck.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteById
}
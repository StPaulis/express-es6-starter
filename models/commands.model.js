import mongoose from 'mongoose';

// DB Entities Map

const CommandSchema = mongoose.Schema({
    // quantity: {type: Number, required: true, unique: false, index: false},
    // userId: {type: Number, required: true, unique: false, index: false},
    target_url: {type: String, required: true, unique: false, index: false},
    virtual_users: {type: Number, required: true, unique: false, index: false},
    test_duration: {type: Number, required: true, unique: false, index: false},
}, {collection : 'Command'});

let CommandsModel = mongoose.model('Command', CommandSchema);

// Db Queries
CommandsModel.addCommand = (commandToAdd) => {
    return commandToAdd.save();
}

export default CommandsModel;

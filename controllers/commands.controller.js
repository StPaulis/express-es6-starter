import Command from '../models/commands.model'
import logger from '../core/logger/app-logger'
import { exec } from 'child_process';

const controller = {};

controller.addCommand = async (req, res) => {
    // Take arguments
    let commandToAdd = Command({
        quantity: req.body.quantity,
        userId: req.body.userId,
    });
    try {
        // Put your script here to been executed when requested... 
        execString(`echo quantity: ${commandToAdd.quantity}`)
        // add command to db
        const savedCommand = await Command.addCommand(commandToAdd);

        // log to filesystem
        logger.info('Adding command...');

        // send request
        res.send('added: ' + savedCommand);
    }
    catch (err) {
        logger.error('Error in getting commands- ' + err);
        res.send('Got error in add' + commandToAdd);
    }
}

// #region helper
function execString(msg) {
    exec(msg,
        function (error, _stdout, _stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    console.log(`executing... '${msg}'`);
}
// #endregion

export default controller;
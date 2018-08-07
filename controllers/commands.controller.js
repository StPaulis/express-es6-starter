import Command from '../models/commands.model'
import logger from '../core/logger/app-logger'
import { exec } from 'child_process';

const controller = {};

controller.addCommand = async (req, res) => {
    // Take arguments
    let commandToAdd = Command({
        // quantity: req.body.quantity,
        // userId: req.body.userId,
        target_url: req.body.target_url,
        virtual_users: req.body.virtual_users,
        test_duration: req.body.test_duration
    });
    try {
        // Put your script here to been executed when requested... 
        
         // execString(`echo quantity: ${commandToAdd.quantity}, userId: ${commandToAdd.userId}`)
        // execString(`python ../scripts/loadtest/trigger.py ${commandToAdd.target_url} ${commandToAdd.virtual_users} ${commandToAdd.test_duration}`)
        // const spawn = require("child_process").spawn;
        // const execString = spawn('python',["../scripts/loadtest/trigger.py", commandToAdd.target_url, commandToAdd.virtual_users, commandToAdd.test_duration]);
        logger.info(target_url+'...'+commandToAdd.target_url);
        logger.info(virtual_users+'...'+commandToAdd.virtual_users);
        logger.info(test_duration+'...'+commandToAdd.test_duration);
        
        // const { execSync } = require('child_process');
        // execSync(
        //         'python ./scripts/loadtest/trigger.py '+commandToAdd.target_url+' '+commandToAdd.virtual_users+' '+commandToAdd.test_duration,
        //         {stdio: 'inherit'}
        // );
        execString(
            `python ./scripts/loadtest/trigger.py ${commandToAdd.target_url} ${commandToAdd.virtual_users} ${commandToAdd.test_duration}`
        )
        
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

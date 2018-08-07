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
        logger.info('...'+commandToAdd.target_url+'...');
        logger.info('...'+commandToAdd.virtual_users+'...');
        logger.info('...'+commandToAdd.test_duration+'...');
        
        logger.info('Executing Python script...');
        
        const { execSync } = require('child_process');
        // test execution        
        execSync('python --version',{stdio: 'inherit'}) 
        // execute my script
        execSync(
                'python ..core/scripts/loadtest/trigger.py '+commandToAdd.target_url+' '+commandToAdd.virtual_users+' '+commandToAdd.test_duration,
                {stdio: 'inherit'}
        );
            
        logger.info('Python script executed...');
        
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

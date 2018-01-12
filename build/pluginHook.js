/**
 * webpack emit plugin
 * @date: 2017.09.24
 */
const rm = require('rimraf');
const chalk = require('chalk');
const moment = require('moment');

class MyEmitHook {
    constructor ( options ) {

    }

    apply ( compiler ) {
        compiler.plugin("emit", function(compilation, callback) {
            const timeshow = moment().format('YYYY-MM-DD HH:mm:ss');
            console.log(chalk.green(`\n\nThe compilation is going to emit files,emit time: ${ timeshow }`));
            callback();
            // rm( compiler.outputPath, err => {
            //     if (err) throw err
            //     console.log(chalk.green(`webpack outputPath is empty ...........`));
            //     callback();
            // });
        });
    }
}

module.exports = {
    MyEmitHook
};

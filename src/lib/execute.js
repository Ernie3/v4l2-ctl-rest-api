const exec = require("child_process").exec;

/**
 * Executes a shell command
 * @param {string} cmd the command to run
 * @return stdout and stderr as a result of running the command
 */
function execute(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, function(error, stdout, stderr) {
            if(error) {
                return reject(error);
            }
    
            return resolve({
                stdout: stdout,
                stderr: stderr
            });
        });
    });
}

module.exports = execute;

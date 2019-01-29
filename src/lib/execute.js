const exec = require("child_process").exec;

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

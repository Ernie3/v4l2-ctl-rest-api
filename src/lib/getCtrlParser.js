/**
 * Parses the output for 'v4l2-ctl -d <device> --get-ctrl <control>'
 * @param {string} raw the raw output from running the command
 * @reutrn the parsed control with the setting name and value
 */
function parseControl(raw) {
    if(raw === null || raw === "") {
        return [];
    }

    var parsed = [];

    var splitRaw = raw.split(':');
    for(var split of splitRaw) {
        parsed.push(split.replace(/\s/g, ""));
    }

    return {
        setting: parsed[0],
        value: parsed[1]
    };
}

module.exports = parseControl;

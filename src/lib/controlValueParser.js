function parseControl(raw) {
    if(raw === null || raw === "") {
        return [];
    }

    var retval = [];

    var splitRaw = raw.split(':');
    for(var split of splitRaw) {
        retval.push(split.replace(/\s/g, ""));
    }

    return retval;
}

module.exports = parseControl;

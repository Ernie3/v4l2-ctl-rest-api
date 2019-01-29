/**
 * Returns the normalized value between min and max such that
 * min <= returnValue <= max
 * @param {number} value the value
 * @param {number} min the min value
 * @param {number} max the max value
 * @reutrn the normalized value between min and max
 */
function normalizeValue(value, min, max) {
    return value > max ? max : value < min ? min : value;
}

module.exports = normalizeValue;

function normalizeValue(value, min, max) {
    return value > max ? max : value < min ? min : value;
}

module.exports = normalizeValue;

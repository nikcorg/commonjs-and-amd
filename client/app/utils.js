function reverse(str) {
    return str.split("").reverse().join("");
}

function throws() {
    throw new Error("Unhappy");
}

module.exports = {
    reverse: reverse,
    throws: throws
}

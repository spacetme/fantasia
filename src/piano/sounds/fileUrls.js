let files = { }
let context = require.context('file!./', false, /\.(?:m4a|ogg)$/)
for (let key of context.keys()) files[key.match(/\w+\.\w+/)[0]] = context(key)

module.exports = files

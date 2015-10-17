var path = require('path')

module.exports = [
  {
    test: /\.js$/,
    loaders: ['babel'],
    include: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'test')
    ]
  },
  {
    test: /\.json$/,
    loaders: ['json']
  }
]


module.exports = name => ({
  onNext (value) {
    console.log(name, 'next', value)
  },
  onCompleted (value) {
    console.info(name, 'completed')
  },
  onError (error) {
    console.error(name, 'error', error)
  }
})

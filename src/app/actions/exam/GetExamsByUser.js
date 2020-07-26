const outputs = require('./../outputs')

module.exports = ({ examRepository }) => (userId) => {
    try {
        const result = examRepository.getExamsByUser(userId)
        return ({ type: outputs.SUCCESS, result })
    }
    catch (error) {
        return ({ type: outputs.ERROR, error })
    }
}


module.exports = ({examRepository}) => (userId) => {
    return examRepository.getExamsByUser(userId)
}
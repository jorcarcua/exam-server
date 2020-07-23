

module.exports = ({examRepository}) => (userId) => {
    return examRepository.getAllExams(userId)
}
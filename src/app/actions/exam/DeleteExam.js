

module.exports = ({examRepository}) => (id) => {
    return examRepository.deleteExam(id)
}


module.exports = ({examRepository}) => (id) => {
    return examRepository.findExam(id)
}
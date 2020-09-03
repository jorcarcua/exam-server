const action = require('../../../../src/interfaces/http/validators/examValidator');

const examDomainValidatorBuilder = require('../../../../src/domain/validators/examDomainValidator');

// const db = require('../../../../src/infrastructure/database/database')({config, logger})
// const {examRepository} = require('../../../../src/infrastructure/database/repository')

describe('validation of url params', () => {
  // empty param
  // incorrect id
  // incorrect limit
  // correct id
  // correct limit
  const subject = action({});

  describe('id param validation', () => {
    // empty id
    // incorrect id format
    // correct id format
    test('empty id', async () => {
      const params = { id: '' };
      const { error, data } = await subject.validateParams(params);
      expect(data).toBeNull();
      expect(error.message).toBe('ValidationSyntaxError');
    });

    test('incorrect id', async () => {
      const params = { id: 'hello' };
      const { error, data } = await subject.validateParams(params);
      expect(data).toBeNull();
      expect(error.message).toBe('ValidationSyntaxError');
    });

    test('correct id', async () => {
      const params = { id: '5f176e7c5d05810f9b3c416a' };
      const { error, data } = await subject.validateParams(params);
      expect(data).toBe(params);
      expect(error).toBeNull();
    });
  });

  describe('incorrect limit', () => {
    // empty limit
    // limit is not a number
    // limit min 3
    // limit max 30
  });

  describe('correct url params', () => {});
});

describe('validation of body', () => {
  describe('title validation', () => {
    // min 3
    // max 30
    // title empty
    // tilte is not a string
    // title correct
  });

  describe('user validation', () => {
    // user empty
    // user is not a string
    // user is correct
  });

  let exam;
  let MockRepository;
  let subject;
  describe('title already exits', () => {
    // title already exits
    // title doesn't exits
    exam = {
      title: 'exam 1',
      numberQuestions: 3,
      success: 1,
      failure: 2,
      user: 1,
    };
    MockRepository = {
      existsExamWithTitle: (title) => {
        return true;
      },
      getExamsByUser: (userId) => {
        return [];
      },
    };
    const examDomainValidator = examDomainValidatorBuilder({
      examRepository: MockRepository,
    });

    subject = action({ examDomainValidator });

    test('returns validation error', async () => {
      const { error, data } = await subject.validateBody(exam);
      expect(error.message).toBe('ValidationConflictError');
      expect(data).toBeNull();
    });
  });

  describe('max number of exams condition', () => {
    // max number of exams reached
    // max number of exams not reached
    MockRepository = {
      existsExamWithTitle: (title) => {
        return false;
      },
      getExamsByUser: (userId) => {
        return [
          {
            title: 'exam 1',
          },
          {
            title: 'exam 2',
          },
          {
            title: 'exam 3',
          },
          {
            title: 'exam 4',
          },
        ];
      },
    };

    const examDomainValidator = examDomainValidatorBuilder({
      examRepository: MockRepository,
    });

    subject = action({ examDomainValidator });

    test('returns validation error', async () => {
      const { error, data } = await subject.validateBody(exam);
      expect(error.message).toBe('ValidationConflictError');
      expect(data).toBeNull();
    });
  });
});

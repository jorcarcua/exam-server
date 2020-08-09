const action = require('../../../../src/app/actions/exam/createExam');
const createExam = require('../../../../src/app/actions/exam/createExam');

describe('createExam action test', () => {
  let createExam;
  let error;
  const exam = {
    title: 'exam 1',
    numberQuestions: 3,
    success: 1,
    failure: 2,
    user: 1,
  };
  describe('validator returns error', () => {
    beforeAll(async () => {
      error = new Error('ValidationSyntaxError');
      error.details = 'validation error details';

      const MockExamValidator = {
        validateBody: async (input) => ({ error, data: null }),
      };
      const MockExamRepository = {
        createExam: async (id) => {
          return error;
        },
      };

      createExam = action({
        examRepository: MockExamRepository,
        examValidator: MockExamValidator,
      });
    });

    test('Throws the error', async () => {
      try {
        await createExam(exam);
      } catch (e) {
        expect(e).toBe(error);
      }
    });
  });

  describe('validation is correct', () => {
    const MockExamValidator = {
      validateBody: async (input) => ({ error: null, data: input }),
    };

    describe('exam exists', () => {
      beforeAll(async () => {
        const MockExamRepository = {
          createExam: async (id) => {
            return exam;
          },
        };
        createExam = action({
          examRepository: MockExamRepository,
          examValidator: MockExamValidator,
        });
      });

      test('returns the exam', async () => {
        const result = await createExam(exam);
        expect(result).toBe(exam);
      });
    });

    describe("exam doesn't exists", () => {
      beforeAll(async () => {
        const MockExamRepository = {
          createExam: async (exam) => {
            return null;
          },
        };

        createExam = action({
          examRepository: MockExamRepository,
          examValidator: MockExamValidator,
        });
      });

      test('returns empty value', async () => {
        const result = await createExam(exam);
        expect(result).toBeNull();
      });
    });
  });
});

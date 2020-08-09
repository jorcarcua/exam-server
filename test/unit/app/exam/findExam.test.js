const action = require('../../../../src/app/actions/exam/findExam');
  

    describe("validator returns error", () =>{
        let findExam;
        let error; 
        beforeAll( async () =>{ 
            error = new Error('ValidationSyntaxError'); 
            error.details = 'validation error details';
           
            const MockExamValidator = {
                 validateParams: async (input) => ({error, data: null})
            }
            const MockExamRepository = {
                findExam: async (id) => {return error}
            }   
          
          findExam = action({examRepository:MockExamRepository, examValidator:MockExamValidator}) 
          
        })
      
        test("Throws the error",  async () =>{ 
            try {
                await findExam(1);
              } catch (e) {
                expect(e).toBe(error);
              } 
        })

})

describe("validation is correct", () => {
    let MockExamValidator = {
        validateParams: async (input) => ({error: null, data: input})
   }

   describe("exam exists", () => {
    let findExam;
    let exam =  { 
        "title": "exam 1",
        "numberQuestions":3,
        "success": 1,
        "failure": 2,
        "user": 1
    }

    beforeAll( async () =>{ 
        
       const MockExamRepository = {
           findExam: async (id) => {return exam}
       }   
     
      findExam = action({examRepository:MockExamRepository, examValidator:MockExamValidator}) 
    })

        test("returns the exam", async () =>{
        const result = await findExam(1)
        expect(result).toBe(exam)
        })
    })
 
    describe("exam doesn't exists", () => {
        let findExam;
        beforeAll( async () =>{ 
            
            const MockExamRepository = {
                findExam: async (id) => {return null}
            }   
        
        findExam = action({examRepository:MockExamRepository, examValidator:MockExamValidator}) 
        })
        
        test("returns empty value", async () =>{
            const result = await findExam(1)
            expect(result).toBeNull()
        })
    })


})  
 


 

 
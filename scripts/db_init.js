
const config = require('../config/development').database
const logger = require('../src/infrastructure/logging/logger')
const db = require('../src/infrastructure/database/database')({config, logger})
const {userModel, examModel, questionModel} = require('../src/infrastructure/database/models')
const _users = require('./users.json')
const _exams = require('./exams.json')
const _questions = require('./questions-exam.json')
 

let connection = db.start()

deleteDatabase()

insertElements()


function deleteDatabase ()  {
   try{ 
    userModel.collection.drop();
    examModel.collection.drop();
    questionModel.collection.drop();
    console.log('Database deleted')
   }catch(error){
    console.log('Database not deleted')
    console.log(error)
   }
   
}



function insertElements () {
  createUsers()
}

function createUsers ()   {
  userModel.collection.insert(_users, (err, users) =>{
    if (err){ 
        return console.error(err);
    } else {
      console.log("Users correctly inserted");
     
      createExams(users.ops) 
    }
})
}

function createExams (users)  {
  let newExams = _exams 
  newExams[0].user = users[0]._id
  newExams[1].user = users[0]._id
  newExams[2].user = users[1]._id 
  examModel.collection.insert(newExams, (err, exams) =>{
   

    if (err){ 
        return console.error(err);
    } else {
      console.log("Exams correctly inserted");
      createQuestions(exams.ops)
     
    }
  })

}
 
function createNewQuestion () { 
  question = new questionModel()

  question.answers.push({text:'hola'})

  question.save()

}

async function createQuestions    (exams) {
  try{
  let newQuestions = _questions

  newQuestions[0].exam = exams[0]._id
  newQuestions[1].exam = exams[0]._id

  

  await newQuestions.map( newQuestion => {
    let question = new questionModel()
    question.exam =    newQuestion.exam
    question.text =    newQuestion.text
    question.success = newQuestion.success
    question.failure = newQuestion.failure  
    question.answers = newQuestion.answers
     question.save()
  })

  
  
}catch(error){
  console.log('Error creating questions')
  console.log(error)
}finally{
  console.log("Questions correctly inserted");
  connection.close(function () {
    console.log('Mongoose connection closed');
  }) 
}
  /*questionModel.collection.insert(newQuestions, (err, docs) =>{
    if (err){ 
        return console.error(err);
    } else {
      console.log("Questions correctly inserted");
      connection.close(function () {
        console.log('Mongoose connection closed');
      })
      
    }
  })*/
}


 
 
 
 

 

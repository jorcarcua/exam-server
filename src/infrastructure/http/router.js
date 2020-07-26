const express = require('express');
let router = express.Router();
const {BaseError} = require('./errors');

  
const routerAPI = ({logger, auth_middlewares, BaseError, actions}) => {

    router.get('/exams', auth_middlewares.ensureAuthenticated, async (req, res, next) =>{
        try{
             const examList= await actions.getExamsByUser(req.user._id);  
             const result = examList.map( exam => exam.transform());  
             res.status(200).json(result);
        }catch(error){
            next(error);
        }
    })
    
    router.get('/exam/:id', auth_middlewares.ensureAuthenticated,async (req, res, next) =>{
        try{
             const result= await actions.findExam(req.params.id); 
             if(result){   
                 res.status(200).json(result); 
             }else{
                next(new BaseError(404,'Exam Not Found'));
            } 
        }catch(error){ 
            handleExamError(error, next)
        }
    })
    
    router.post('/exams',  auth_middlewares.ensureAuthenticated, async (req,res,next) =>{
        try{ 
           const exam = req.body 
           exam.user = req.user.id
           const result= await actions.createExam(exam)
           console.log("reuslls")
           console.log(result)
           if(result){   
            res.status(201).json(result)
           }else{
            next(new BaseError(404,'Exam Not Found'));
           }  
        }catch(error){
            handleExamError(error, next)
        }
    })
    
    router.put('/exam/:id', async(req,res,next) => {
        try{
            const exam = req.body
            const result = await actions.updateExam(req.params.id, exam)
            if(result){
                res.status(200).json(result)
            }else{
                next(new BaseError(404,'Exam Not Found'));
            }
            
        }catch(error){
            handleExamError(error, next)
        }
    })
    
    router.delete('/exam/:id', auth_middlewares.ensureAuthenticated, async(req,res,next)=>{
        try{
            const result = await actions.deleteExam(req.params.id) 
            console.log('resukt')
            console.log(result)
            if(!result){
                throw new BaseError(404, 'Exam Not Found')
            }
            res.status(200).json(result)
        }catch(error){
            handleExamError(error, next)
        }
    })

    const handleExamError = (error, next) => {
        switch(error.message) {
            case 'ValidationSyntaxError':
                next(new BaseError(400, error.details))
            case 'ValidationConflictError':
                next(new BaseError(404, error.details))
            default: 
                next(error)
        }
    }
    
    //QUESTIONS
    
    router.get('nextQuestion', auth_middlewares.ensureAuthenticated, async(req,res,next)=>{

    })
    
    router.get('/exams/:id/questions', auth_middlewares.ensureAuthenticated, async(req,res,next)=>{
    
    })



    //AUTHENTICATION

    router.post('/login',  (req,res,next) =>{
        try{ 
            actions.login(req, res, (err, result) => { 
                if(err){return next(err)}
                if(!result){return next(new BaseError(401,'Username or password incorrect', true))}
                res.json({ data: { token: result.token } });
                   
            })
           }catch(error){
               next(error)
           } 
    })

    router.post('/register', async (req, res, next) => { 
        try{  
           const user =  await actions.register(req.body);
           res.json({data: user});
        }catch(error){ 
            next(error);
        }

    })   
    
    return router
    

 }

 

module.exports = routerAPI;
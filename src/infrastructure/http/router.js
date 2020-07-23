const express = require('express');
let router = express.Router();
 
 
  
const routerAPI = ({logger, auth_middlewares, BaseError, actions}) => {

    router.get('/exams', auth_middlewares.ensureAuthenticated, async (req, res, next) =>{
        try{
             console.log('mensaje desde exams')
             console.log(req.user._id)
             const examList= await actions.getAllExams(req.user._id)  
             const result = examList.map( exam => exam.transform()) 
             console.log(result)
             res.status(200).json(result)
        }catch(error){
            next(error)
        }
    })
    
    router.get('/exam/:id', async (req, res, next) =>{
        try{
             const examList= await actions.getAllExams(req.user.id)
             res.status(200).json(examList)
        }catch(error){
            next(error)
        }
    })
    
    router.post('/exams',   async (req,res,next) =>{
        try{
            //TODO:VALIDAR req.exam, si no es valido mandar algun tipo de error
           const exam = req.exam
           exam.user = req.user.id
           const result= await actions.createExam(req.exam)
            res.status(201).json(result)
        }catch(error){
            next(error)
        }
    })
    
    router.put('/exam/:id', async(req,res,next) => {
        try{
            //TODO:VALIDAR req.exam, si no es valido mandar algun tipo de error
            const result = await actions.updateExam(req.exam)
            res.status(200).json(result)
        }catch(error){
            next(error)
        }
    })
    
    router.delete('/exam/:id', async(req,res,next)=>{
        try{
            const result = await actions.deleteExam(req.params.id)
            res.status(204).json(result)
        }catch(error){
            next(error)
        }
    })
    
    router.delete('/exams', async(req,res,next)=>{
    
    })
    
    
    //QUESTIONS
    
    router.get('/exams/:id/questions', async(req,res,next)=>{
    
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
           const user =  await actions.register(req.body) 
           res.json({data: user})
        }catch(error){ 
            next(error)
        }

    })   
    
    return router
    

 }

 

module.exports = routerAPI;
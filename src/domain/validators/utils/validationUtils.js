
const joiValidation = async (schema,input) => {
    const { error, value } =  await schema.validate(input)
    if(error){
       return  error.details.map(error => error.message) 
    }
    return []
}

const addErrors = (messages, newMessages) => {  
    if(newMessages && newMessages.lenghth>0 && messages.length>0){ 
        messages = messages.push(', ')
         
    } 
   
    return [...messages,...newMessages]
}

module.exports = {
    joiValidation,
    addErrors
}
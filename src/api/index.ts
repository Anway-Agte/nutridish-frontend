const host = 'https://nutri-dish.herokuapp.com'

export const book = async (body:bookRequestBody,jwt:string) => {
    try{
        const response = await fetch(`${host}/book`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(body) ,
        });
        if(response.ok){
            const result = await response.json()
            if(result){
                return result; 
            }
        }else{
            throw new Error('There was some unhandled error')
        }
    }
    catch(err){
        throw(err)
    }
} 

export const getBuildings = async () => {
    try{
        const response = await fetch(`${host}/delivery/buildings`,{
            method:'GET',
        }) 
        if(response.ok){
            const result = await response.json();
            return result;
        }
        else{
        }
    } 
    catch(err){
        throw(err);
    }
} 

export const getDepartments = async (id:string) => {
    try{
        const response = await fetch(`${host}/delivery/departments/${id}`,{
            method:'GET'
        }); 
        if(response.ok){
            const result = await response.json();
            return result
        }
    }
    catch(err){
        throw(err);
    }
}

export const getFloors = async (building:string) =>{
    try{
        const response = await fetch(`${host}/delivery/floors/${building}`,{
            method:'GET'
        }); 
        if(response.ok){
            const result = await response.json();
            return result
        }
    }
    catch(err){
        throw(err);
    }
} 

export const sendEmailForVerification = async (email:string) => {
    try{
        const response = await fetch(`${host}/sendmail`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:email}) ,
        });
        if(response.ok){
            const result = await response.json()
            if(result){
                return result
            }
            else{
                throw new Error('There was some unexpected error. Please try again')
            }
        }
        else{
            throw new Error('There was some unexpected error. Please try again')
        }
    }
    catch(err){
        throw err
    }
} 

export const SignUserIn = async (payload:signInRequestBody) =>{
    try{
        const response = await fetch(`${host}/signin`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        if(response.ok){
            const result = await response.json()
            if(result){
                return result
            }
            else{
                throw new Error('There was some unexpected error. Please try again')
            }
        }
        else{
            throw new Error('There was some unexpected error. Please try again')
        }
    }
    catch(err){
        throw err
    }
} 

export const fillDetails = async(body:editUserDetails,jwt:string) => {
    try{
        const response = await fetch(`${host}/user`, {
            method:'PUT', 
            headers:{
                'Authorization':`Bearer ${jwt}`, 
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body) 
        })

        if(response.ok){
            const result = await response.json()
            return result 
        }
        else{
            throw new Error('Error')
        }
    }
    catch(err){
        throw new Error('There was some error. Please try again')
    }
} 

export const generatePaymentLink = async (body:generatePaymentInterface,jwt:string) => {
    try{
        const response = await fetch(`${host}/book/paymentlink`,
        {
            method:'POST', 
            headers:{
                'Authorization':`Bearer ${jwt}`, 
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body) 
        
        }
        ) 
        if(response.ok){
            const result = await response.json()
            return result
        }
        else{
            throw new Error('There was an error! Please try again')
        }
    }
    catch(err){
        throw new Error('There was some error. Please try again')
    }
} 

export const verifyPaymentLink = async (body:verifyPaymentBody,jwt:string) => {
    try{
        const response = await fetch(`${host}/book/verifypayment`,
        {
            method:'POST', 
            headers:{
                'Authorization':`Bearer ${jwt}`, 
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body) 
        
        }
        ) 
        if(response.ok){
            const result = await response.json()
            return result
        }
        else{
            throw new Error('There was an error! Please try again')
        }
    }
    catch(err){
        throw new Error('There was some error. Please try again')
    }
} 

export const getUser = async (jwt:string) => {
    try{
        const response = await fetch(`${host}/user`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization' : `Bearer ${jwt}`
            } 
        })
        if(response.ok){
            const result = await response.json()
            return result
        }
        else{
            throw new Error('There was an error! Please try again.')
        }
    }
    catch(err){
        throw new Error('There was an error! Please try again.')
    }
} 

export const getOrderHistory = async (jwt:string) => {
    try{
        const response = await fetch(`${host}/user/orders`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization' : `Bearer ${jwt}`
            } 
        })
        if(response.ok){
            const result = await response.json()
            return result
        }
        else{
            throw new Error('There was an error! Please try again.')
        }
    }
    catch(err){
        throw new Error('There was an error! Please try again.')
    }
}
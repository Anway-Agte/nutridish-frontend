const host = 'https://nutridish-backend.herokuapp.com'

export const book = async (body:any) => {
    try{
        const response = await fetch(`${host}/book`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) ,
        });
        if(response.ok){
            const result = await response.json()
            if(result){
                return result; 
            }
        }else{
            console.log(response.status);
            throw new Error('There was some unhandled error')
        }
    }
    catch(err){
        console.log(err);
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
        console.log(err);
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

export const SignUserIn = async (payload:any) =>{
    try{
        console.log('here')
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
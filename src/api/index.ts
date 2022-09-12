const host = 'https://nutridish-backend.herokuapp.com'

export const book = async (body:any) => {
    console.log(body);
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
                console.log('sasdasfdas');
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
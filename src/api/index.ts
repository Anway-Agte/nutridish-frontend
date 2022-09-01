export const book = async (body:any) => {
    console.log("Here");
    console.log(body);
    try{
        const response = await fetch('http://192.168.142.221:8000/book', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) ,
        });
        if(response.status === 200){
            const result = await response.json()
            if(result){
                console.log('sasdasfdas');
                return result; 
            }
        }else{
            console.log('sdfsdf');
        }
    }
    catch(err){
        console.log(err);
        throw(err)
    }
}
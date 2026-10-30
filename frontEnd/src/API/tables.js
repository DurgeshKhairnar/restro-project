

export const postTables = async(tableData) => {
    try{

        const response = await fetch("http://localhost:3000/api/createTable",{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(tableData),
        });
    
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    }catch (e){
        console.log(`error in post ${e.message}`)
    }
} 


export const fetchTables = async() => {
    try{

        const response = await fetch('http://localhost:3000/api/getTables',{
            'method':'GET',
            'credentials':'include',
            headers:{
                'Content-Type':'application/json'
            }
        })
        
        const  jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse.data;
    }catch (e){
        console.log(`add table error ${e.message}`)
    }
}
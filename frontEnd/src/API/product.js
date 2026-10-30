

export const  postProducts = async(product) => {
    try{

        const response = await fetch('http://localhost:3000/api/addProducts',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(product),
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        return jsonResponse;
    }catch (e){
        console.log(`post product ${e.message}`)
    }
} 


export const getProducts = async() => {
    try{
        const response = await fetch('http://localhost:3000/api/getAllProducts',{
            method:'GET',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
        });
        const jsonResponse = await response.json();
            console.log(jsonResponse)
        return jsonResponse;
    }catch (e){
        console.log(`get product ${e.message}`)
    }
} 


export const putProduct = async(items,id) => {
    try{
        const response = await fetch(`http://localhost:3000/api/updateProduct/${id}`,{
            method:'PUT',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(items)
        })
        const jsonResponse = await response.json();
        return jsonResponse;
    }catch (e){
        console.log(`update product ${e.message}`)
    }
} 


export const deleteProduct = async(id) =>{
    try{

        const response = await fetch(`http://localhost:3000/api/deleteProduct/${id}`,{
            method:'DELETE',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            }
        })

    }catch (e){
        console.log(`error in delete ${e.message}`)
    }
}
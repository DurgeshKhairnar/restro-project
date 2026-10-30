

export const createOrder = async(order) => {
    try{
        const response = await fetch('http://localhost:3000/api/createOrder',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(order)
        })
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse.data;
    }catch (e){
        console.log(`error in createOrder ${e.message}`)
    }
}

export const fetchOrder = async() => {
    try{
        const response = await fetch('http://localhost:3000/api/getOrders',{
            method:'GET',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
        })
        const jsonResponse = await response.json();
        return jsonResponse.data;
    }catch (e){
        console.log(`error in getOrder ${e.message}`)
    }
}

export const CheckInOrder = async(id) => {
    try{
        const response = await fetch(`http://localhost:3000/api/check-InOrders/${id}`,{
            method:'PATCH',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
             body:JSON.stringify({ status:'check-In'})
        })
         await response.json();
        return response;
    }catch (e){
        console.log(`error in getOrder ${e.message}`)
    }
}

export const updateOrder = async(order,id) => {
    try{
        const response = await fetch(`http://localhost:3000/api/updateOrder/${id}`,{
            method:'PUT',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(order)
        })
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse.data;
    }catch (e){
        console.log(`error in updateOrder ${e.message}`)
    }
}
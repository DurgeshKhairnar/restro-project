

export const createTableBooking = async(tableBInfo) => {
    try{

        const response = await fetch('http://localhost:3000/api/createBooking',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(tableBInfo)
        })
        const jsonResponse = await response.json();
        console.log(jsonResponse);
    }catch (e){
        console.log(`error in table booking ${e.message}`)
    }
}


export const fetchBookings = async(req,res) => {
    const response = await fetch('http://localhost:3000/api/getAllBooking',{
            method:'GET',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
        });
        const jsonResponse = await response.json();
        return jsonResponse;
}
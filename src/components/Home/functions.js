export const RequestedHeader = () => {    
    let header = new Headers({        
        'Content-Type': 'application/json'        
    });
    return header;
}

export const GetHeroes = async (query) => {

    const url = 'https://gateway.marvel.com:443/v1/public/characters?'+ query +'ts=1&apikey=d6eab31a137f96bb005b0fbdac4b36b2&hash=452190371e2ba270e5a11a4c2bd03aec'; 
    const response = await fetch(url).then((res) => res.json())
        .then((Response) => {                      
            if (Response !== undefined && Response.code === 200) {                        
                return Response;
            } else {
                throw new Error(Response.Descripcion);
            }
        }).catch((error) => {
            console.log('Error:' + error);
            return null;
        });
    return response;
}

export const GetEvents = async () => {

    const url = 'https://gateway.marvel.com:443/v1/public/events?ts=1&apikey=d6eab31a137f96bb005b0fbdac4b36b2&hash=452190371e2ba270e5a11a4c2bd03aec'; 
    const response = await fetch(url).then((res) => res.json())
        .then((Response) => {                      
            if (Response !== undefined && Response.code === 200) {                        
                return Response;
            } else {
                throw new Error(Response.Descripcion);
            }
        }).catch((error) => {
            console.log('Error:' + error);
            return null;
        });
    return response;
}
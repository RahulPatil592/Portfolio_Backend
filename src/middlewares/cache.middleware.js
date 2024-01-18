import client from "../../redis_client.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const cache = (dataType)=>{
    return async (req, res, next) => {
        try {
            let getData = await client.get(dataType)
            getData = JSON.parse(getData);
            if (getData) {
               return res
                .status(200)
                .json(new ApiResponse(200,getData,"data from cache"));
            }
            else {
                next()
            }
    
        } catch (error) {
            console.log(error)
            res.status(500).json(
                error
            )
    
        }
    }
    
}
export {
    cache
}
import client from "../../redis_client.js";
const cache = async (dataType,req, res, next) => {
    try {
        let getData = await client.get(dataType)
        getData = JSON.parse(getData);
        if (getData) {
           return res
            .status(200)
            .json(getData)
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

export {
    cache
}
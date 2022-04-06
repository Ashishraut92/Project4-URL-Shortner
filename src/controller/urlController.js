const validUrl = require("valid-url")
const shortId = require("shortId")
const urlModel = require("../models/urlModel")
const baseUrl = "http://localhost:3000"

const isValid = function (value) {
    if (typeof value == 'undefined' || value === null) return false
    if (typeof value == 'string' && value.length === 0)
     return false
    return true
}

function validateUrl(value) {
    if (!(/(ftp|http|https|FTP|HTTP|HTTPS):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(value.trim()))) {
        return false
    }
        return true
}


const createurl = async function (req, res) {
    try {
        const data = req.body
        const objectKey = Object.keys(data)
        if(objectKey.length > 0){
            if((objectKey != 'longUrl')){
                return res.status(400).send({ status: false, msg: "only longUrl link is allowed !" })  
            }
        }

        let longUrl=data.longUrl

        if (!isValid(data.longUrl)) {
            return res.status(400).send({ status: false, msg: "longUrl is required" })
        }
        // if (!validUrl.isUri(baseUrl)) {
        //     return res.status(401).send({ status: false, msg: "baseUrl is invalid" })
        // }
        if (!validateUrl(data.longUrl)) {
            return res.status(401).send({ status: false, msg: "longUrl is invalid" })
        }
        let urlCode = shortId.generate()

        
            let shortUrl = baseUrl + '/' + urlCode
            
            data.urlCode = urlCode 
            data.shortUrl = shortUrl

        let isUrlexist= await urlModel.findOne({longUrl}).select({longUrl:1,urlCode:1,shortUrl:1, _id:0})
           if(isUrlexist){
               return res.status(200).send({msg:"succes", data:isUrlexist})
           }

            let data1 = await urlModel.create(data)
            let result = {
                longUrl: data1.longUrl,
                shortUrl: data1.shortUrl,
                urlCode: data1.urlCode
            }
            return res.status(201).send({ status: true,msg:"success", data: result })

        }
    
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}

const geturl = async function (req, res) {
    try {
        const urlCode = req.params.urlCode
        
        if (!isValid(urlCode)) {
            res.status(400).send({ status: false, message: 'Please provide valid urlCode' })
        }

        const url = await urlModel.findOne({urlCode })     //second check in Db
        if (!url) {
            return res.status(404).send({ status: false, message: 'No URL Found' })
        }
        return res.status(301).redirect(url.longUrl)


    } catch (err) {
        console.error(err)
        res.status(500).send({ status: false, message: err.message })
    }
}


module.exports = {createurl,geturl}







// let createurl = async function (req, res) {
//     try {
//         const requestBody = req.body
//         if (!requestBody) {
//             return res.status(400).send({ status: false, message: "invalid request parameter" })
//         }
//         const { longUrl } = requestBody
//         const baseurl = config.get("baseUrl")


//         if (!validUrl.isUri(baseUrl)) {
//             return res.status(400).send("invalid baseurl")
        
//         }

//         //create url code

//         const urlCode = shortId.generate();



//         // check long url 

//         if (validUrl.isUri(longUrl)) {
//             try {
//                 let url = await url.findOne({ longUrl })

//                 if (url) {
//                     res.status(200).send(url)
//                 } else {
//                     const shortUrl = baseurl + '/' + urlCode

//                     url = new url({
//                         longUrl, shortUrl, urlCode, date: new Date()

//                     });

//                     await urlModel.create(requestBody)
//                     res.status(201).send({ msg: "url created successfully" })
//                 }
//             } catch (err) {
//                 res.status(500).send({ msg: msg.err })

//             }
//         } else {
//             res.status(400).send({ msg: "invalid long url" })

//         }
//     }catch (err) {
//         res.status(500).send({ msg: err.msg })

//     }
// }


//      module.exports.createurl = createurl



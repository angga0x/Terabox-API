const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

async function preCreate(filename) {
    try {

        const formData = new FormData()
        formData.append('file', fs.createReadStream(filename), {
            filename: filename,
            contentType: 'application/octet-stream',
        })

        const preCreateConfig = {
            method: 'POST',
            url: `https://dm.terabox.com/api/precreate?app_id=250528&web=1&channel=dubox&clienttype=0&jsToken=EA46BF6BA75FEA783927AF11C94BB0FF89F9888A381765EE85AF2CD693D213AB9DCF124883E1C45FFC00F0E565353C4448D1DCC92A3B2BF70F0EEC544C7AD52D&dp-logid=42278800774041990032`,
            params: {
                path: filename,
                autoinit: "1",
                target_path: "/",
                block_list: '["5910a591dd8fc18c32a8f3df4fdc1761"]',
                file_limit_switch_v34: "true",
                local_mtime: "1731047805",
            },
            headers: {
                ...formData.getHeaders(),
                Host: "dm.terabox.com",
                Cookie: "browserid=X48YHGFCqkgpkpCfLIUvrLwKRFlXCyxb60NUeTO7iortMohvI6zgP2AYt1s=; lang=id; __bid_n=1944f06f1e17a958cd4207; ndus=Y-gmhdkpeHuiqwNLLxScUB-5xlr7f0lJYK5dO-ND; csrfToken=PX_0t2mYLWGoPzpKMiDb8N_L; _ga=GA1.1.1194263996.1736492668; ndut_fmt=87F6C45A02836869416D8D5293E216804AD7650C870C65D5725A80FBC157E37A; ab_sr=1.0.1_M2U1Y2UxMGZhZGMyNGE4YmJmZDNlYjU0NjgwY2FkYjcxNzRlZmE5M2UzZGI4ZjcyNTk1MDIzZGNkNGZmYjJjMmI3NTE2YTFjZmJhZjRkNDY1Y2U0NGUyODU1YmRmOWFhNGQ5ZDkwMDFjM2QwOWVkMzhlZTQxMDI2YzRhMjZhMDVlMzRmMWMzMDZiZjE1OThjZDM4ODM1MjUyYzU1YTY2OQ==; _ga_06ZNKL8C2E=GS1.1.1736492668.1.1.1736494620.52.0.0",
                "Accept-Language": "en-US,en;q=0.9",
                "Sec-Ch-Ua": "\"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
                "Sec-Ch-Ua-Platform": "\"Windows\"",
                "X-Requested-With": "XMLHttpRequest",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.86 Safari/537.36",
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                Origin: "https://dm.terabox.com",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Dest": "empty",
                Referer: "https://dm.terabox.com/indonesian/main?category=all",
                "Accept-Encoding": "gzip, deflate, br",
                Priority: "u=1, i",
                Connection: "keep-alive",
            },
            data: formData,
        }

        const preCreateResponse = await axios(preCreateConfig)
        if(preCreateResponse.status === 200) {
            const preCreateData = preCreateResponse.data
            console.log('PreCreate Data:', preCreateData)

            await new Promise((resolve) => setTimeout(resolve, 5000))
            await superFile(filename, preCreateData.uploadid)
        
        } else {
            console.log('PreCreate Failed')
        }

    } catch (err) {
        console.log(err)
    }
}

async function superFile(filename, upload_id) {
    try {

        console.log('Filename:', filename)
        // console.log('File Content:', fileContent)

        const fileContent = fs.readFileSync(filename)
        const formData = new FormData()
        formData.append('file', fileContent, {
            filename: 'blob',
            contentType: 'application/octet-stream',
        })

        const uploadConfig = {
            method: 'POST',
            url: `https://kul-cdata.terabox.com/rest/2.0/pcs/superfile2?method=upload&app_id=250528&channel=dubox&clienttype=0&web=1&logid=MTczNjQ5NDYxMzI0MTAuNzc0MjA0Mzc0MDY5NDg5Nw==&path=%2F${filename}&uploadid=${upload_id}&uploadsign=0&partseq=0`,
            headers: {
                ...formData.getHeaders(),
                Host: "kul-cdata.terabox.com",
                Cookie: "browserid=X48YHGFCqkgpkpCfLIUvrLwKRFlXCyxb60NUeTO7iortMohvI6zgP2AYt1s=; lang=id; __bid_n=1944f06f1e17a958cd4207; ndus=Y-gmhdkpeHuiqwNLLxScUB-5xlr7f0lJYK5dO-ND; _ga=GA1.1.1194263996.1736492668; ab_sr=1.0.1_M2U1Y2UxMGZhZGMyNGE4YmJmZDNlYjU0NjgwY2FkYjcxNzRlZmE5M2UzZGI4ZjcyNTk1MDIzZGNkNGZmYjJjMmI3NTE2YTFjZmJhZjRkNDY1Y2U0NGUyODU1YmRmOWFhNGQ5ZDkwMDFjM2QwOWVkMzhlZTQxMDI2YzRhMjZhMDVlMzRmMWMzMDZiZjE1OThjZDM4ODM1MjUyYzU1YTY2OQ==; _ga_06ZNKL8C2E=GS1.1.1736492668.1.1.1736494671.1.0.0",
                "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryreP08Y4rD5rUahBE",  // Boundary tetap
                "Sec-Ch-Ua-Platform": "\"Windows\"",
                "Accept-Language": "en-US,en;q=0.9",
                "Sec-Ch-Ua": "\"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
                "Sec-Ch-Ua-Mobile": "?0",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.86 Safari/537.36",
                Accept: "*/*",
                Origin: "https://dm.terabox.com",
                "Sec-Fetch-Site": "same-site",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Dest": "empty",
                Referer: "https://dm.terabox.com/",
                "Accept-Encoding": "gzip, deflate, br",
                Priority: "u=1, i",
                Connection: "keep-alive",
            },
            data: formData,
        }

        const uploadResponse = await axios(uploadConfig)
        if(uploadResponse.status === 200) {
            const size = uploadResponse.headers['x-bs-file-size']
            const upload_id = uploadResponse.data.uploadid
            const md5 = uploadResponse.data.md5

            await new Promise((resolve) => setTimeout(resolve, 5000))
            await createFile(md5, upload_id, size, filename)
        
        } else {
            console.log('SuperFile status not 200')
        }

    } catch (err) {
        console.log(err)
    }
}

//createFile

async function createFile(md5,upload_id, size, filename) {
    try {
        const createFileConfig = {
            method: 'POST',
            url: `https://dm.terabox.com/api/create?isdir=0&rtype=1&bdstoken=7eb4345d9f9b3dd02a4f809f93bcdd1c&app_id=250528&web=1&channel=dubox&clienttype=0&jsToken=EA46BF6BA75FEA783927AF11C94BB0FF89F9888A381765EE85AF2CD693D213AB9DCF124883E1C45FFC00F0E565353C4448D1DCC92A3B2BF70F0EEC544C7AD52D&dp-logid=92941900882926860036`,
            params: {
                path: `/${filename}`,
                size: size,
                uploadid: upload_id,
                target_path: '/',
                block_list: `["${md5}"]`,
            },
            headers: {
                'Host': 'dm.terabox.com',
                'Cookie': 'browserid=X48YHGFCqkgpkpCfLIUvrLwKRFlXCyxb60NUeTO7iortMohvI6zgP2AYt1s=; lang=id; __bid_n=1944f06f1e17a958cd4207; ndus=Y-gmhdkpeHuiqwNLLxScUB-5xlr7f0lJYK5dO-ND; csrfToken=PX_0t2mYLWGoPzpKMiDb8N_L; _ga=GA1.1.1194263996.1736492668; ndut_fmt=AF3E1B8F663AD34A6C53C3DAFC0FC74E9A61BA9552EEFB3B18F87183EDEB7E8F; ab_sr=1.0.1_M2VjMmEzNWM4ZDQ3YWQyNjhhYTNhNjU5YWE5ZWMwMTcyZWRlODIwNmE4OGM5NDE2Y2QwMmI4NjQ1OWY1YWYxYzdhZDEyMTdlNTdiZTBlMGZkODkwMDc1ZDZlOTcxNWU1N2JlN2UxNjQ0YWFmMGJmZTIyZjVhM2I4YTUzOWNlOTUxNzI2MDY5NjEyMTFjM2IwMjBiNTBkMWExYzBjMGE0ZA==; _ga_06ZNKL8C2E=GS1.1.1736492668.1.1.1736496612.40.0.0',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Accept-Language': 'en-US,en;q=0.9',
                'Sec-Ch-Ua': '"Chromium";v="131", "Not_A Brand";v="24"',
                'Sec-Ch-Ua-Mobile': '?0',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.86 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'https://dm.terabox.com',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': 'https://dm.terabox.com/indonesian/main?category=all',
                'Accept-Encoding': 'gzip, deflate, br',
                'Priority': 'u=4, i',
                'Connection': 'keep-alive'
            }
        }

        const createFileResponse = await axios(createFileConfig)
        console.log('Create File Response:', createFileResponse)
        if(createFileResponse.status === 200) {
            console.log('Create File Success')
            console.log('File URL:', createFileResponse.data)
        
        } else {
            console.log('Create File Failed')
        }

    } catch (err) {
        console.log(err)
    }
}

module.exports = { preCreate, superFile, createFile }

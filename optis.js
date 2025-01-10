const axios = require('axios');

async function sendOptionsRequest() {
    const url = "https://kul-cdata.terabox.com/rest/2.0/pcs/superfile2";
    const params = {
        method: "upload",
        app_id: "250528",
        channel: "dubox",
        clienttype: "0",
        web: "1",
        logid: "MTczNjQ5Mjg0MTM3MjAuNzQ1MDkzMzQ5MzUzNDAwNw==",
        path: "/do.txt",
        uploadid: "N1-NjEuNS4yMS4xMTE6MTczNjQ5Mjg3NjoyMjMzNTg5NDM0NjQ0MjQ0ODg=",
        uploadsign: "0",
        partseq: "0",
    };

    try {
        const response = await axios.options(url, {
            params: params,
            headers: {
                Accept: "*/*",
                "Access-Control-Request-Method": "POST",
                Origin: "https://dm.terabox.com",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.86 Safari/537.36",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-site",
                "Sec-Fetch-Dest": "empty",
                Referer: "https://dm.terabox.com/",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.9",
                Priority: "u=1, i",
                Connection: "keep-alive",
            },
        });

        console.log("OPTIONS request successful:", response.headers);
    } catch (error) {
        console.error("OPTIONS request failed:", error.response?.data || error.message);
    }
}

// Panggil fungsi
sendOptionsRequest();

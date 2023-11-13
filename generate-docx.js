const fs = require('fs');
const axios = require('axios');


(async function() {
    let article;
    try {
        const httpResponse = await axios.get("http://localhost:3080/resume", {
            responseType: 'arraybuffer',
            headers: {
                'Accept': "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            }
        });
        fs.writeFile("./temp.docx", httpResponse.data, function (err) {
        if (err) console.log(err);
        else console.log("done");
      });
    } catch (err) {
        console.log(err)
    }
})();

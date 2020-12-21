const express = require('express');
const cors =  require('cors');

const randomUrlList = ['/binky', '/blobby', '/neural'];

function serve(port) {
    const app = express();
    app.use(cors(), (req, res, next) => {
        const filteredRandomList = randomUrlList.filter((url) => url !== req.originalUrl);
        res.send({
            path: req.originalUrl,
            time: (new Date()).toISOString(),
            nextUrl: filteredRandomList[Math.floor(Math.random() * filteredRandomList.length)]
        });
        next();
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
}

serve(3020);
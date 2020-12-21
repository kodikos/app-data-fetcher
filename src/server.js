const express = require('express');

function serve(port) {
    const app = express();

    app.use((req, res) => {
        res.send(`<html><body><div>Path: ${req.originalUrl}</div><div>Time: ${(new Date()).toISOString()}</div></body></html>`);
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
}

serve(3020);
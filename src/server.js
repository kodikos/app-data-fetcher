const express = require('express');

function serve(port) {
    const app = express();

    app.use((req, res) => {
        res.send({
            path: req.originalUrl,
            time: (new Date()).toISOString()
        });
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
}

serve(3020);
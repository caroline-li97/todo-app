// backend/server.js
const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks.js'); // import task server
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRouter); // use task server

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


//curl -X (= curl -X GET)
//curl -X POST
    //-H: Add Request Headers: content type
    //-d: Send Request Body: data
//eg. 
    // curl -X POST http://localhost:5000/tasks \
    // -H "Content-Type: application/json" \
    // -d '{"task": "Learn Node.js"}'
//curl -X DELETE
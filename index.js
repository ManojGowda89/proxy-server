const express = require('express');
const axios = require('axios');
require('dotenv').config();  

const app = express();

var LOCAL_SERVER_PORT = process.env.LOCAL_SERVER_PORT||3000;  

const LOCAL_SERVER_URL = `http://localhost:${LOCAL_SERVER_PORT}`;  

const PORT = process.env.PORT || 8080;  

app.use(express.json());


app.all('*', async (req, res) => {
  try {
   
    const response = await axios({
      method: req.method,              
      url: `${LOCAL_SERVER_URL}${req.url}`,  
      headers: req.headers,           
      data: req.body,                 
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error forwarding request:', error);


    res.status(error.response ? error.response.status : 500).json({
      message: 'Error forwarding request to local server',
      error: error.message,
    });
  }
});



app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}-LocalServer ${LOCAL_SERVER_PORT}`);
});

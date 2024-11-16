const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 5000;
const dataFile = path.join(__dirname, 'connect.json');

// Function to read data from the JSON file
const readData = () => {
  try {
    const data = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return { data: [] };
  }
};

// Function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;
  const method = req.method;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (pathname === '/data') {
    if (method === 'GET') {
      // Handle GET request
      const data = readData();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data.data));
    } else if (method === 'POST') {
      // Handle POST request
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => {
        const newData = JSON.parse(body);
        newData.id = Date.now().toString();
        const data = readData();
        data.data.push(newData);
        writeData(data);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newData));
      });
    } else if (method === 'PUT') {
      // Handle PUT request
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => {
        const updatedData = JSON.parse(body);
        const data = readData();
        const index = data.data.findIndex((item) => item.id === updatedData.id);
        if (index !== -1) {
          data.data[index] = updatedData;
          writeData(data);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(updatedData));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Data not found' }));
        }
      });
    } else if (method === 'DELETE') {
      // Handle DELETE request
      const { id } = query;
      const data = readData();
      const filteredData = data.data.filter((item) => item.id !== id);
      if (data.data.length !== filteredData.length) {
        data.data = filteredData;
        writeData(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Data deleted successfully' }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Data not found' }));
      }
    } else {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Method not allowed' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

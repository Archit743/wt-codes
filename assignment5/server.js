// server.js - Simple Node.js HTTP server to handle contact form submissions

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer((req, res) => {
  // Log incoming request
  console.log(`${req.method} ${req.url}`);

  // Handle different routes
  if (req.url === '/' || req.url === '/index.html') {
    // Serve the HTML page
    fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
  } 
  // Handle form submission
  else if (req.url === '/submit-form' && req.method === 'POST') {
    let body = '';
    
    // Collect data chunks
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    // Process the complete request body
    req.on('end', () => {
      try {
        // Parse JSON data
        const formData = JSON.parse(body);
        
        // Log form submission (in real app, you'd save to database, send email, etc.)
        console.log('Form submission received:');
        console.log(formData);
        
        // Send success response
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'Thank you for your message! We will get back to you soon.' 
        }));
        
        // In a real application, you would:
        // 1. Validate the input data
        // 2. Save to a database
        // 3. Send notification emails
        // 4. Possibly add to CRM system
        
      } catch (error) {
        // Handle parsing errors
        console.error('Error parsing form data:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: false, 
          message: 'Invalid form data provided.' 
        }));
      }
    });
  } 
  // Handle 404 - Not Found
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} in your browser`);
});
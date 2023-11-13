const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const path = require('path');
const terminate = require('terminate')

// Start the Express application

const expressProcess = exec('node app.js');

expressProcess.stdout.on('data', (data) => {
  console.log(`Express: ${data}`);
});

expressProcess.stderr.on('data', (data) => {
  console.error(`Express Error: ${data}`);
});

expressProcess.on('close', (code) => {
  console.log(`Express process exited with code ${code}`);
});

// Wait for the Express application to start (adjust the delay as needed)
setTimeout(generatePDF, 60);

async function generatePDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load the resume page
  const resumeURL = 'http://localhost:3080/resume'; // Update with your actual URL
  await page.goto(resumeURL, { waitUntil: 'networkidle0' });

  // Set the PDF options
  const pdfOptions = {
    path: path.join(__dirname, 'output', 'resume.pdf'), // Adjust the output path as needed
    format: 'A4',
    printBackground: true,
  };

  // Generate PDF
  await page.pdf(pdfOptions);

  await browser.close();

  // Close the Express application after generating the PDF
  //expressProcess.kill();
  //expressProcess.kill('SIGINT');  
  terminate(expressProcess.pid, err => console.log("here"))

}

generatePDF();

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3080;

app.set('view engine', 'ejs'); // You can use a different template engine if you prefer

// Define a route to render the resume page
app.get('/resume', (req, res) => {
  // Path to the folder containing experience JSON files
  const experienceFolderPath = path.join(__dirname, 'experience');

  // Read all experience JSON files from the folder
  const experienceFiles = fs.readdirSync(experienceFolderPath);

  // Parse each experience JSON file and store the data in an array
  const experiences = experienceFiles.map((file) => {
    const filePath = path.join(experienceFolderPath, file);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  });

  // Path to the folder containing extras JSON files
  const extrasFolderPath = path.join(__dirname, 'extras');

  // Read all extras JSON files from the folder
  const extrasFiles = fs.readdirSync(extrasFolderPath);

  // Parse each extras JSON file and store the data in an array
  const extras = extrasFiles.map((file) => {
    const filePath = path.join(extrasFolderPath, file);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  });

  // Path to the folder containing education JSON files
  const educationFolderPath = path.join(__dirname, 'education');

  // Read all education JSON files from the folder
  const educationFiles = fs.readdirSync(educationFolderPath);

  // Parse each eduucation JSON file and store the data in an array
  const educations = educationFiles.map((file) => {
    const filePath = path.join(educationFolderPath, file);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  });

  // Path to the folder containing contacts JSON files
  const contactsPath = path.join(__dirname, 'contacts');

  // Read all contact JSON files from the folder
  const contactsFiles = fs.readdirSync(contactsPath);

  // Parse each contacts JSON file and store the data in an array
  const contacts = contactsFiles.map((file) => {
    const filePath = path.join(contactsPath, file);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  });

  // Path to the folder containing skills JSON files
  const skillsPath = path.join(__dirname, 'skills');

  // Read all skill JSON files from the folder
  const skillsFiles = fs.readdirSync(skillsPath);

  // Parse each skills JSON file and store the data in an array
  const skills = skillsFiles.map((file) => {
    const filePath = path.join(skillsPath, file);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  });


  // Read name details from name.json
  const namesPath = path.join(__dirname, 'name.json');
  const namesData = fs.readFileSync(namesPath, 'utf-8');
  const names = JSON.parse(namesData);


  // Read version from version.txt
  const versionPath = path.join(__dirname, 'version.txt');
  const version = fs.readFileSync(versionPath, 'utf-8').trim();

  // Render the resume page with the experiences, extras, contact details, and version
  res.render('resume', { experiences, extras, educations, names, skills, contacts, version });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
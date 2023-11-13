#!/bin/bash

npm run resume &
wget -O resume.html http://localhost:3080/resume
pandoc resume.html -o "test.docx"

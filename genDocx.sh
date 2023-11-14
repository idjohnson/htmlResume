#!/bin/bash

npm run resume &
sleep 4
wget -O resume.html http://localhost:3080/resume
pandoc resume.html -o "resume.docx"


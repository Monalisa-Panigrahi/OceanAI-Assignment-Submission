# OceanAI-Assignment-Submission
AI-powered platform to create and refine Word (.docx) and PowerPoint (.pptx) documents. Users can configure outlines, generate content using LLMs, refine sections with prompts, and export final files. Includes authentication, project management, and a full interactive editor.
🚀 Overview

This project allows authenticated users to:

Choose a document format: Word (.docx) or PowerPoint (.pptx)

Define document structure (outline or slide titles)

Generate content using a Large Language Model (LLM) such as Google Gemini

Refine and improve content section-by-section

Export the final result as a professional .docx or .pptx file

The system includes authentication, project management, AI integration, refinement tools, and export functionalities.

🧠 Core Features
1. User Authentication & Dashboard

Secure login & registration (JWT or Firebase Auth)

Dashboard showing all user projects

Create new projects with custom configurations

Stores:

Document type

Outline/slide configuration

Generated content

Refinement history (edits, comments, feedback)

2. Document Configuration

Users configure documents by:

Selecting .docx or .pptx

Entering the topic or main prompt
(e.g., “Market analysis of the EV industry in 2025”)

Depending on document type:

For Word (.docx):

Add, remove, reorder, rename outline sections

For PowerPoint (.pptx):

Define number of slides

Provide a title for each slide

3. AI-Powered Content Generation

Backend generates content section-by-section or slide-by-slide

Each LLM request is contextualized to the specific section

Uses Gemini or any other LLM API

Stores all generated text in the database

4. Interactive Refinement Interface

Each section or slide includes:

✨ AI Refinement Prompt
Users enter instructions like:

“Make this more formal”

“Convert to bullet points”

“Shorten to 100 words”

👍 Feedback Buttons
Like/Dislike to track content quality

💬 Comment Box
Users can add notes — all saved to the database

Persistence included: each AI edit, refinement prompt, and comment is stored per section.

5. Document Export

Backend generates a final downloadable file:

.docx created using python-docx

.pptx created using python-pptx

Exports always use the latest refined content from the database.

🌟 Bonus (Optional)
AI-Generated Templates

AI can automatically suggest:

Word document outline

PowerPoint slide titles

Users may accept or edit the generated structure.

🧩 Tech Stack
Backend (FastAPI or Flask)

Handles:

Authentication (JWT)

AI API calls

Content generation & refinement

Database communication

DOCX/PPTX file assembly

Frontend (React / Vue / HTML-CSS-JS)

Provides:

Modern, responsive UI

Authentication pages

Project dashboard

Document configuration

Refinement interface

Database

Any of:

Firebase Firestore

PostgreSQL

SQLite

Stores all user & project data.

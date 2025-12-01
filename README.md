OceanAI is an AI-driven platform that enables users to create, refine, and export professional Word (.docx) and PowerPoint (.pptx) documents.
It provides an end-to-end workflow for generating content using LLMs, improving sections through iterative prompts, and exporting the final output as polished files.

The platform is designed for students, professionals, and teams who require structured document creation combined with AI-based assistance.

1. Overview

OceanAI allows authenticated users to:

Select a document format (.docx or .pptx)

Configure the structure (outline sections or slide titles)

Generate content using a Large Language Model (Gemini or any LLM API)

Refine content section-by-section with custom instructions

View and manage all projects from a dashboard

Export the final version as a downloadable Word or PowerPoint file

The system supports complete project management, content history, and advanced refinement tools.

2. Core Features
a) User Authentication and Dashboard

Secure user registration and login (JWT / Firebase Auth)

Personalized dashboard displaying all saved projects

Ability to create, edit, and delete projects

Each project stores:

Document type (Word or PowerPoint)

Initial configuration

Generated content

Refinement history and comments

b) Document Configuration

Users can configure a document before content generation:

For Word (.docx):

Add, remove, reorder, and rename outline sections

Suitable for reports, assignments, case studies, and articles

For PowerPoint (.pptx):

Define total number of slides

Provide titles for each slide

Designed for presentations, summaries, and pitch decks

c) AI-Based Content Generation

Content is generated per section or per slide

Each LLM request is context-specific for better accuracy

Supports Gemini or any other API-compatible LLM

All generated outputs are saved to the project database

Ensures consistent writing style across the document

d) Interactive Refinement Workspace

Each section or slide comes with a fully interactive editing interface:

Refinement Prompt
Users can request modifications such as:

Make the text formal or concise

Convert into bullet points

Expand or simplify the explanation

Feedback Controls
Like/Dislike buttons to track quality of generated content

Comments and Notes
Users can add detailed notes, and each comment is saved for future reference

Complete Edit History
Every AI edit and user refinement is stored, allowing rollbacks or comparisons

e) Document Export

OceanAI can generate ready-to-download files:

DOCX Generation:
Handled through python-docx, ensuring proper formatting

PPTX Generation:
Built slide-by-slide with python-pptx

The export system always uses the most recent refined content, ensuring the final file reflects all edits and improvements.

3. Optional Enhancements
AI-Suggested Templates

Automatically proposes outlines for Word documents

Can generate slide titles for PowerPoint presentations

Users may accept, reject, or edit suggestions before generating content

4. Tech Stack
Backend (FastAPI or Flask)

User authentication via JWT or Firebase Auth

API endpoints for content generation and refinement

Integration with Gemini or other LLM providers

Document assembly for DOCX/PPTX

Project and history management

Frontend (React / Vue / Standard HTML-CSS-JS)

Responsive and clean user interface

Document configuration module

Editing and refinement workspace

Authentication and dashboard views

Database Options

Firebase Firestore

PostgreSQL

SQLite

Any of these can be used depending on deployment environments and scaling needs.

5. Project Structure (Example)
OceanAI/
│── backend/
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── docx_export/
│   ├── pptx_export/
│   └── main.py
│
│── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.js
│
└── README.md

6. Key Advantages

Structured workflow for long documents and presentations

Consistent content generation using section-aware prompts

Full control over document design and flow

Interactive and traceable refinement process

Production-ready export mechanism for .docx and .pptx

Suitable for academic, business, and professional use cases

7. Future Scope

Collaboration mode for multiple users per project

Advanced formatting controls for text styling

Real-time preview of DOCX/PPTX before export

Versioning of documents and automatic backups

Integration with Google Drive and OneDrive for cloud exports

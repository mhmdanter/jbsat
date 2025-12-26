# JBSAT - Job Board with Simple Applicant Tracker

## Description

JBSAT is a web-based application that enables employers to post job openings and manage incoming applications, while allowing job seekers to browse jobs, apply online, and track application status. The system focuses on delivering a minimal yet functional Applicant Tracking System (ATS) suitable for small organizations.

## Features

- User registration and authentication with JWT
- Role-based access control (Employer and Job Seeker)
- Job posting management (CRUD)
- Job browsing and search
- Job application submission with resume upload
- Application status tracking and management

## Tech Stack

- Frontend: React.js
- Backend: Django (Django REST Framework)
- Database: PostgreSQL
- Authentication: JWT
- File Storage: Local (for MVP)

## Installation

### Backend

1. Navigate to the backend directory: `cd jbsat_backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment: `venv\Scripts\activate` (Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Run migrations: `python manage.py migrate`
6. Start the server: `python manage.py runserver`

### Frontend

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Usage

- Register as an Employer or Job Seeker
- Employers can post jobs and manage applications
- Job Seekers can browse jobs, apply with resume, and track status

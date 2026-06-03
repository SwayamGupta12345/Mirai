# System Architecture (ChatterlyAI)

ChatterlyAI is a microservice-based application with independent services communicating via JSON APIs. Each service is deployed separately to optimize resource usage and isolate workloads.

## Components

- **Frontend (Next.js)**
  - Handles all user interactions and routes requests to the appropriate backend service.

- **ChatterlyAI Backend (Node.js)**
  - Handles socket connections for **chat with friends** functionality.
  - Communicates with MongoDB for storing/retrieving chat data.

- **ChatterlyAI Backend-2 (Node.js)**
  - Handles socket/session management for **chatbot** functionality.
  - Communicates with MongoDB for storing session-related data.

- **Agentic Service (Python / CrewAI)**
  - Handles AI/NLP calls for the **chatbot**.
  - Reads/writes data to MongoDB for AI context and logs.

- **MongoDB**
  - Shared database storing messages, sessions, and AI-generated content.

## Request Flow
### Chat with Friend
Frontend (Next.js) --> ChatterlyAI Backend (Node.js) - Socket & Chat --> MongoDB


### Chatbot

Frontend (Next.js) --> Agentic Service (Python / CrewAI) - AI/NLP Calls--> ChatterlyAI Backend-2 (Node.js) - Socket & Session Management --> MongoDB



## Notes

- Frontend decides which backend to call based on the feature:
  - **Chat with Friend** → Backend handles socket only.  
  - **Chatbot** → Agentic Service handles AI; Backend-2 handles socket/session.  
- MongoDB is the centralized data layer for all services.  
- Separate deployments isolate ML workloads and optimize free-tier hosting.



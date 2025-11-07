Mock E-Commerce Cart Application
This project is built as part of the Vibe Commerce Internship Screening Assignment.
It demonstrates full-stack e-commerce fundamentals including product listing, cart management, checkout flow, REST API integration, and basic state handling.

Tech Stack
Frontend
Built using Vite + React
| Package               | Purpose                         |
| --------------------- | ------------------------------- |
| `react` / `react-dom` | UI Framework                    |
| `react-router-dom`    | Routing                         |
| `axios`               | API communication               |
| `@fortawesome/*`      | Icons                           |
| `jspdf`               | Generate PDF receipts (if used) |
| `vite`                | Development environment         |
| `eslint`              | Code linting                    |

Backend
Built with Express + MongoDB
| Package                | Purpose                        |
| ---------------------- | ------------------------------ |
| `express`              | Server framework               |
| `mongoose`             | MongoDB ODM                    |
| `cors`                 | Cross-origin support           |
| `nodemon` *(dev only)* | Auto-reload during development |

/project-root
 ├── /frontend     → React UI
 └── /backend      → Express server + MongoDB

Features
Frontend
Product grid with Add to Cart
Cart page with:
   Quantity update 
   Remove item
   Automatic total price calculation
Checkout form (Name & Email)
Receipt/summary after checkout
Fully responsive layout

Backend
REST API for products, cart, and checkout
Mock products stored in DB / in-memory
Returns checkout receipt with timestamp

Backend Setup
cd backend
npm install
node index.js

Frontend Setup
cd ../frontend
npm install
npm run dev

Author:
Abhishek Kuliyal


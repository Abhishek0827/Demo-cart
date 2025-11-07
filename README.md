Mock E-Commerce Cart Application
This project is built as part of the Vibe Commerce Internship Screening Assignment.
It demonstrates full-stack e-commerce fundamentals including product listing, cart management, checkout flow, REST API integration, and basic state handling.

<h2>Tech Stack</h2>

Frontend : 
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

Backend : 
Built with Express + MongoDB
| Package                | Purpose                        |
| ---------------------- | ------------------------------ |
| `express`              | Server framework               |
| `mongoose`             | MongoDB ODM                    |
| `cors`                 | Cross-origin support           |
| `nodemon` *(dev only)* | Auto-reload during development |

/project-root</br>
 ├── /frontend     → React UI</br>
 └── /backend      → Express server + MongoDB

<h2>Features</h2>

<b>Frontend</b>
<p>
Product grid with Add to Cart</br>
Cart page with:</br>
<ul>
 <li> Quantity update </li>
 <li>Remove item</li>
 <li>Automatic total price calculation</li>
 
</ul>
Checkout form (Name & Email)</br>
Receipt/summary after checkout</br>
Fully responsive layout
</p>

<b>Backend</b>
<p>REST API for products, cart, and checkout</br>
Mock products stored in DB / in-memory</br>
Returns checkout receipt with timestamp
</p>

Backend Setup</br>
cd backend</br>
npm install</br>
node index.js</br>

Frontend Setup</br>
cd ../frontend</br>
npm install</br>
npm run dev</br>

<h1>Author : 
Abhishek Kuliyal </h1>


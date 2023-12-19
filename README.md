# Dashboard_back-end

# Visualization Data API

This project is an API server built with Node.js, Express, and MongoDB. It provides endpoints to fetch data for visualization charts and dropdown filter values.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MongoDB

### Installing

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file in the root directory and add your MongoDB Atlas user and password:

```env
DB_USER=your_db_user
DB_PASS=your_db_password


### Running the Server
Start the server with node app.js (or nodemon app.js if you have nodemon installed). The server will start on http://localhost:8000.

### API Endpoints
GET /visualizationData: Fetches data from the collection of length 50.
GET /doughnutChartData: Fetches data from the collection for doughnut chart with filters.
GET /barChartData: Fetches data from the collection for bar chart with filters.
GET /lineChartData: Fetches data from the collection for line chart with filters.
GET /filterValues: Fetches the distinct values for the dropdown filters to provide frontend dropdown options and values - end_year, sector, topic, region, start_year, pestle.
Built With
Node.js
Express
Mongoose

License
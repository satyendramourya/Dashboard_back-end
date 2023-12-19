require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const port = 8000;

// mongodb atlas string
const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.uuso3od.mongodb.net/jsonData?retryWrites=true&w=majority`;

// connecting to mongodb atlas via mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB Atlas')).catch(err => console.log(err));

// Create a router instance
const router = express.Router();

// Create a schema for the "jsonData.visualizationDemoData" collection
const dataSchema = new mongoose.Schema({
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
});

// Create a model for the "jsonData.visualizationDemoData" collection
const VisualizationData = mongoose.model('visualizationDemoData', dataSchema);

// Define route handler to fetch data from the collection of length 50
router.get('/visualizationData', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 50;
        const skip = (page - 1) * limit;

        const totalLength = await VisualizationData.countDocuments();
        const totalPages = Math.ceil(totalLength / limit);

        const data = await VisualizationData.find({}).skip(skip).limit(limit);
        const currentLength = data.length;

        res.status(200).json({
            page,
            totalPages,
            totalLength,
            currentLength,
            data
        });
    } catch (err) {
        console.error('Error occurred while fetching data from MongoDB Atlas...\n', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// fetch data from the collection for doughnut chart with filters
router.get('/doughnutChartData', async (req, res) => {
    try {
        const { end_year, sector, topic, region, start_year, pestle } = req.query;
        const filter = {};

        if (end_year) filter.end_year = end_year;
        if (sector) filter.sector = sector;
        if (topic) filter.topic = topic;
        if (region) filter.region = region;
        if (start_year) filter.start_year = start_year;
        if (pestle) filter.pestle = pestle;

        const data = await VisualizationData.find(filter, 'intensity sector');
        const currentLength = data.length;
        res.status(200).json({
            currentLength,
            data
        });
    } catch (err) {
        console.error('Error occurred while fetching doughnut chart data from MongoDB Atlas...\n', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// fetch data from the collection for bar chart with filters
router.get('/barChartData', async (req, res) => {
    try {
        const { end_year, sector, topic, region, start_year, pestle } = req.query;
        const filter = {};

        if (end_year) filter.end_year = end_year;
        if (sector) filter.sector = sector;
        if (topic) filter.topic = topic;
        if (region) filter.region = region;
        if (start_year) filter.start_year = start_year;
        if (pestle) filter.pestle = pestle;

        const data = await VisualizationData.find(filter, 'topic country'); 
        const currentLength = data.length;
        res.status(200).json({
            currentLength,
            data
        });
    } catch (err) {
        console.error('Error occurred while fetching doughnut chart data from MongoDB Atlas...\n', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// fetch data from the collection for line chart with filters
router.get('/lineChartData',async (req, res) => {
    try {
         const { end_year, sector, topic, region, start_year, pestle } = req.query;
        const filter = {};

        if (end_year) filter.end_year = end_year;
        if (sector) filter.sector = sector;
        if (topic) filter.topic = topic;
        if (region) filter.region = region;
        if (start_year) filter.start_year = start_year;
        if (pestle) filter.pestle = pestle;

        const data = await VisualizationData.find(filter, 'intensity added topic');
        const currentLength = data.length;
        res.status(200).json({
            currentLength,
            data
        });
    } catch (err) {
        console.error('Error occurred while fetching doughnut chart data from MongoDB Atlas...\n', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// api to fetch the distinct values for the dropdowns filters to provide frontend dropdown options and values - end_year, sector, topic, region, start_year, pestle
router.get('/filterValues', async (req, res) => {
    try {
        const countriesList = await VisualizationData.distinct('country');
        const endYearsList = await VisualizationData.distinct('end_year');
        const sectorsList = await VisualizationData.distinct('sector');
        const topicsList = await VisualizationData.distinct('topic');
        const regionsList = await VisualizationData.distinct('region');
        const startYearsList = await VisualizationData.distinct('start_year');
        const pestlesList = await VisualizationData.distinct('pestle');
        

        res.status(200).json({
            uniqueCountries,
            uniqueEndYears,
            uniqueSectors,
            uniqueTopics,
            uniqueRegions,
            uniqueStartYears,
            uniquePestles
        });
    } catch (err) {
        console.error('Error occurred while fetching filter values from MongoDB Atlas...\n', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})



// Mount the router on the app
app.use('/', router);


app.listen(port, () => {
    console.log(`API server listening at http://localhost:${port}`);
});

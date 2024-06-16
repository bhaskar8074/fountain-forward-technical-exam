const request = require('supertest');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const Papa = require('papaparse');

const app = express();
app.use(cors());

let inventoryData = [];

// Read and parse the CSV file
beforeAll((done) => {
    fs.readFile('sample-data.csv', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the CSV file', err);
            return done(err);
        }
        Papa.parse(data, {
            header: true,
            complete: (results) => {
                inventoryData = results.data;
                done();
            }
        });
    });
});

// API endpoint to serve inventory data
app.get('/api/inventory', (req, res) => {
    const { make, duration } = req.query;

    // Filter the data based on query parameters
    let filteredData = inventoryData;

    if (make) {
        filteredData = filteredData.filter(item => item.brand && item.brand.toLowerCase() === make.toLowerCase());
    }

    if (duration) {
        const durationMap = {
            'last-month': 1,
            'this-month': 0,
            'last-3-months': 3,
            'last-6-months': 6,
            'this-year': new Date().getFullYear(),
            'last-year': new Date().getFullYear() - 1,
        };
        const monthsToSubtract = durationMap[duration];

        if (typeof monthsToSubtract === 'number') {
            const filterDate = new Date();
            filterDate.setMonth(filterDate.getMonth() - monthsToSubtract);

            filteredData = filteredData.filter(item => new Date(item.timestamp) >= filterDate);
        } else if (typeof monthsToSubtract === 'string') {
            filteredData = filteredData.filter(item => new Date(item.timestamp).getFullYear() === monthsToSubtract);
        }
    }

    // Sort the data by date (assuming 'timestamp' field is in a valid date format)
    filteredData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json(filteredData);
});

describe('GET /api/inventory', () => {
    it('should return all inventory data', async () => {
        const response = await request(app).get('/api/inventory');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should filter by make', async () => {
        const response = await request(app).get('/api/inventory?make=Ford');
        expect(response.status).toBe(200);
        expect(response.body.every(item => item.brand.toLowerCase() === 'ford')).toBe(true);
    });

    it('should filter by duration (last month)', async () => {
        const response = await request(app).get('/api/inventory?duration=last-month');
        expect(response.status).toBe(200);
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        expect(response.body.every(item => new Date(item.timestamp) >= oneMonthAgo)).toBe(true);
    });

    it('should filter by duration (this year)', async () => {
        const response = await request(app).get('/api/inventory?duration=this-year');
        expect(response.status).toBe(200);
        const thisYear = new Date().getFullYear();
        expect(response.body.every(item => new Date(item.timestamp).getFullYear() === thisYear)).toBe(true);
    });

    it('should filter by make and duration', async () => {
        const response = await request(app).get('/api/inventory?make=Ford&duration=this-year');
        expect(response.status).toBe(200);
        const thisYear = new Date().getFullYear();
        expect(response.body.every(item => item.brand.toLowerCase() === 'ford' && new Date(item.timestamp).getFullYear() === thisYear)).toBe(true);
    });
});

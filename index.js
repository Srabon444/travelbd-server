const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;


const cors = require('cors');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n5ckx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

    try {

        await client.connect();
        const database = client.db('travelbdtshirtdb')
        const productsCollection = database.collection("allProducts");
        console.log('Mongodb Connect successfully!');

        // GET API
        app.get('/products', async (req, res) => {

            const cursor = productsCollection.find({})
            const packages = await cursor.toArray();
            res.send(packages);

        })



    }
    finally {
        // await client.close();
    }

}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('travelbd-tshirt server is running!')
})

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})
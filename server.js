const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const {connectToMongoDB, client} = require('./config/db.config.js')

const app = express()
const port = process.env.PORT || 5000

// mongodb connection
connectToMongoDB().catch(console.dir);

// all db collections
const projectsCollection = client.db('PersonalPortfolio').collection('Projects')
const skillsCollection = client.db('PersonalPortfolio').collection('Skills')
const testimonialsCollection = client.db('PersonalPortfolio').collection('Testimonials')
const servicesCollection = client.db('PersonalPortfolio').collection('Services')

app.get('/', (req, res)=>{
    res.send('Personal Portfolio Server is running')
})
/********* Projects routes ***********/

app.get('/projects', async(req, res)=>{
    const result = await projectsCollection.find().toArray()
    res.send(result)
})

app.post('/insertProject', async(req, res)=>{
    const result = await projectsCollection.insertOne(req.body)
    res.send(result)
})

/********* Skills routes ***********/
app.get('/skills', async(req, res)=>{
    const result = await skillsCollection.find().toArray()
    res.send(result)
})

/********* services routes ***********/
app.get('/services', async(req, res)=>{
    const result = await servicesCollection.find().toArray()
    res.send(result)
})

/********* testimonials routes ***********/
app.get('/testimonials', async(req, res)=>{
    const result = await testimonialsCollection.find().toArray()
    res.send(result)
})

app.listen(port, ()=> {
    console.log(`Server is running on ${port} port...`);
})


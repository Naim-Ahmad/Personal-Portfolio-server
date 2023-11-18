const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const {connectToMongoDB, client} = require('./config/db.config.js')
const { corsOptions } = require('./config/middleware.config.js')
const { ObjectId } = require('mongodb')

const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use([cors(corsOptions), express.json()])

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

app.post('/projects', async(req, res)=>{
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

app.post('/testimonials', async(req, res)=>{
    const result = await testimonialsCollection.insertOne(req.body)
    res.send(result)
})

app.put('/testimonials', async(req, res)=>{
    const result = await testimonialsCollection.insertOne(req.body)
    res.send(result)
})

app.delete('/testimonials/:id', async(req, res)=>{
    const query = {_id: new ObjectId(req.params.id)}
    const result = await testimonialsCollection.deleteOne(query)
    res.send(result)
})



app.listen(port, ()=> {
    console.log(`Server is running on ${port} port...`);
})


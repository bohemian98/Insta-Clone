const express=require('express')
const app = express()
const mongoose=require('mongoose')
const PORT=5000
const {MONGOURI}= require('./keys')
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})


mongoose.connection.on('connected' , () => {
    console.log('connected to mongo yeahhh')

})

mongoose.connection.on('error' , (err) => {
    console.log("error connection" , err)
}) 

require('./models/user')
require('./models/post')

//app.use(bodyParser);
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

app.listen(PORT,() => {
    console.log("Sever is running on",PORT)
})

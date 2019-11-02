const express = require('express');
const database = require('./Api/config/database');
const cors = require('cors');
const bodyparser = require('body-parser');
const app=express();
const path=require('path');
database.authenticate().
then(response => {
    console.log(`Database Connected `);
}).catch(err => {
    console.log(`Could not connect database due to the following error ${err.message}`)
})

app.use(cors());
app.use(bodyparser.json())
app.use('/api/condition',require('./Api/routes/condition'));
app.use('/api/department',require('./Api/routes/department'));
app.use('/api/dutyroaster',require('./Api/routes/dutyroaster'));
app.use('/api/medicalhistory',require('./Api/routes/medicalhistory'));
app.use('/api/patient',require('./Api/routes/patient'));
app.use('/api/stafftype',require('./Api/routes/stafftype'));
app.use('/api/user',require('./Api/routes/user'));
app.use('/api/role',require('./Api/routes/role'));
app.use('/api/specialty',require('./Api/routes/specialty'));
app.use('/api/testresult',require('./Api/routes/testresult'));
app.use(express.static("build"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
let Port = process.env.PORT||4000;

app.listen(Port,()=>{
    console.log(`Server Connected on port ${Port}`)
})
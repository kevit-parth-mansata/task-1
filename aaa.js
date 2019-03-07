var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
 
var app = express()
app.listen(3000, () => {
    console.log('Started listening on port 3000');
});
app.post('/profile', upload.single('logo'), (req, res,next) =>{
console.log("Uploaded");
console.log(req.file.filename);
res.send('hhhh');
})
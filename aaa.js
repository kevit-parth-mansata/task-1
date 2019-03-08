var express = require('express')
var multer  = require('multer')

var app = express()
app.listen(3000, () => {
    console.log('Started listening on port 3000');
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, '.jpg') //Appending .jpg
  }
})

var upload = multer({ storage: storage });


app.post('/profile', upload.single('logo'), (req, res,next) =>{
console.log("Uploaded");
console.log(req.file.filename);
res.send('hhhh');
})
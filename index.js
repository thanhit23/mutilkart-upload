const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const PORT = 3000;
const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

const storage = multer.diskStorage({
  destination: (res, file, callback) => {
    callback(null, path.join(__dirname, './uploads'));
  },
  filename: (res, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

// api routes
app.use('/resources/images', express.static(`${__dirname}/uploads`));
app.post('/file', upload.array('file'), async (req, res) => {
  const arrImages = req.files.map((item) => `/resources/images/${item.originalname}`);
  const response = {
    status: true,
    data: arrImages,
    message: '',
  } 
  return res.json(response);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})



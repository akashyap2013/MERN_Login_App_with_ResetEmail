import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';
import multer from 'multer';
import mongoose from 'mongoose';
import Users from '../server/model/User.model.js'
import "../server/pdfDetails.js"

const app = express();

/** middlewares */
app.use(express.json({ limit: '10mb' }));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack
app.use("/files", express.static("files"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});


const PdfSchema = mongoose.model("PdfDetails");
const upload = multer({ storage: storage });

app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const fileName = req.file.filename;
  const CourseCode = req.body.CourseCode;
  const teacherId = req.body.teacherId;
  try {
    await PdfSchema.create({ title: title, pdf: fileName, CourseCode: CourseCode,  teacherId: teacherId });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

app.get('/api/getPdfTitles', async (req, res) => {
  try {
    const titles = await PdfSchema.find({}).distinct('title');
    res.json(titles);
  } catch (error) {
    console.error('Error fetching PDF titles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    await Users.findByIdAndRemove(userId);
    res.json({ success: true });
  } catch (error) {
    console.error('Error removing user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/get-files", async (req, res) => {
    try {
      PdfSchema.find({}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {}
});


app.get('/api/pdfs', async (req, res) => {
  const teacherId = req.query.teacherId; // Get teacherId from the query parameters
  console.log('Teacher ID:', teacherId);

  try {
    const files = await PdfSchema.find({ teacherId }); // Assuming "teacherId" is a field in your schema
    console.log('Filtered Files:', files);
    res.json({ data: files });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new route to handle fetching PDFs for a specific title
app.get('/api/title', async (req, res) => {
  const teacherId = req.query.teacherId;
  console.log("teacher id:", teacherId)
  const title = req.query.title;
  console.log("title :", title)


  try {
    const files = await PdfSchema.find({ teacherId, title });
    console.log("files :", files)
    res.json({ data: files });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/pdf', async (req, res) => {
  const fileName = req.query.fileName;

  try {
    const file = await PdfSchema.findOne({ pdf: fileName });

    if (file) {
      // Assuming 'file' is the matching document
      res.json({ data: file });
    } else {
      // If no file is found with the given fileName
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Assume you have an array to store the received data
let savedData = [];

// API endpoint to receive data using POST
app.post('/api/saveData', (req, res) => {
  const { registerNumber, finalTotal, CourseCode } = req.body;

  // Process the data, save it to a database, etc.
  console.log('Received data:', { registerNumber, finalTotal, CourseCode });

  // Save the data to the array
  savedData.push({ registerNumber, finalTotal, CourseCode });

  // Send a response to the client
  res.json({ message: 'Data received and saved successfully!' });
});

// API endpoint to retrieve saved data using GET
app.get('/api/getData', (req, res) => {
  // Return the saved data
  res.json({ data: savedData });
});

app.delete('/api/deleteData', (req, res) => {
  const dataToDelete = req.body;

  // Find the index of the item with the same properties as dataToDelete in the array
  const indexToDelete = savedData.findIndex(item => 
    item.registerNumber === dataToDelete.registerNumber &&
    item.finalTotal === dataToDelete.finalTotal &&
    item.CourseCode === dataToDelete.CourseCode
  );

  // If the item is found, remove it from the array
  if (indexToDelete !== -1) {
    savedData.splice(indexToDelete, 1);

    res.json({ message: 'Data deleted successfully!' });
  } else {
    res.status(404).json({ message: 'Data not found!' });
  }
});

// Array to store published data
const publishedData = [];

// API endpoint for publishing data
app.post('/api/publishData', (req, res) => {
  const newData = req.body.data;

  // Store the published data in the array
  publishedData.push(...newData);

  // Respond with a success message
  res.json({ message: 'Data published successfully!' });
});

app.get('/api/getPublishData', (req, res) => {
  // Return the saved data
  res.json({ data: publishedData });
});


/** api routes */
app.use('/api', router)



/** start server only when we have valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})
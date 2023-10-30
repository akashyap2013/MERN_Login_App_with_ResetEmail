import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';
import multer from 'multer';
import mongoose from 'mongoose';
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
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  const teacherId = req.body.teacherId;
  try {
    await PdfSchema.create({ title: title, pdf: fileName,  teacherId: teacherId });
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

app.get('/api/getPdfTitles', (req, res) => {
  ATLAS_URI.all('SELECT title FROM pdfs', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }
    const titles = rows.map(row => row.title);
    res.json(titles);
  });
});



app.get("/get-files", async (req, res) => {
    try {
      PdfSchema.find({}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {}
});

app.get('/api/pdfs', async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, ENV.JWT_SECRET);
  req.user = decodedToken;
  const teacherId = req.user.teacherId; // Get teacherId from the query parameters
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


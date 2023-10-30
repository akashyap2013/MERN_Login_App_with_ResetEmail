import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "../PdfComp";

const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function ImageUpload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");

  useEffect(() => {
    getPdf();
    fetchTeachers()
  }, []);
  

  const getPdf = async () => {
    const result = await axios.get(`${serverDomain}/get-files`);
    console.log(result.data.data);
    setAllImage(result.data.data);
  };
  

  const fetchTeachers = async () => {
    try {
      const teachersResult = await axios.get('/api/users/teacher'); // Replace with your actual API endpoint
      setTeachers(teachersResult.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };
  
  

  const submitImage = async (e) => {
    e.preventDefault();

    
    const teacherName = selectedTeacher
    const selectedTeacherObject = teachers.find((teacher) => teacher.username === teacherName);
    if (!selectedTeacherObject) {
      alert("Please select a teacher.");
      return;
    }
    const teacherId = selectedTeacherObject._id

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("teacherId", teacherId);
    console.log(title, file, teacherId);

    const result = await axios.post(`${serverDomain}/upload-files`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status === "ok") {
      alert("Uploaded Successfully!!!");
      getPdf();
    }
  };


  const showPdf = (pdf) => {
    // window.open(`http://localhost:8080/files/${pdf}`, "_blank", "noreferrer");
    setPdfFile(`${serverDomain}/files/${pdf}`);
  };
  
  return (
    <div className="ImageUpload">
      <form className="formStyle" onSubmit={submitImage}>
        <h4>Upload Pdf Here</h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          className="form-control "
          accept="application/pdf"
          required
          multiple
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          className="form-control"
        >
          <option value="">Select a Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.username}
            </option>
          ))}
        </select>
        <br />
        <button className="btn btn-primary" type="submit" style={{ marginRight: '20px' }}>
          Submit
        </button >
        <button className="btn btn-primary" type="send" style={{ marginRight: '16px' }}>
          Send
        </button>
      </form>
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          {allImage == null
            ? ""
            : allImage.map((data, index) => {
                return (
                  <div className="inner-div" key={index}>
                    <h6>Title: {data.title}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
      <PdfComp pdfFile={pdfFile}/>
    </div>
  );
}

export default ImageUpload;
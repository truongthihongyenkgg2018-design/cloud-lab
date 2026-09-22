import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/api/students")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }, []);

  const handleAddStudent = async () => {
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentId,
          name: name,
          email: email,
        }),
      });

      const newStudent = await response.json();

      setStudents([...students, newStudent]);

      setStudentId("");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <div>
      <h1>Danh sách sinh viên</h1>

      <h2>Thêm sinh viên</h2>

      <input
        type="text"
        placeholder="MSSV"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Họ tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleAddStudent}>Thêm sinh viên</button>

      <hr />

      {students.map((student) => (
        <div key={student._id}>
          <p>MSSV: {student.studentId}</p>
          <p>Họ tên: {student.name}</p>
          <p>Email: {student.email}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
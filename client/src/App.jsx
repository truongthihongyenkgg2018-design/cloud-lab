import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadStudents = async () => {
    try {
      const response = await fetch("/api/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleAddStudent = async () => {
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          name,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Không thể thêm sinh viên");
      }

      setStudentId("");
      setName("");
      setEmail("");

      await loadStudents();
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setStudentId(student.studentId);
    setName(student.name);
    setEmail(student.email);
  };

  const handleUpdateStudent = async () => {
    try {
      const response = await fetch(`/api/students/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          name,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Không thể cập nhật sinh viên");
      }

      setEditingId(null);
      setStudentId("");
      setName("");
      setEmail("");

      await loadStudents();
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa sinh viên này không?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Không thể xóa sinh viên");
      }

      await loadStudents();
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <div>
      <h1>Danh sách sinh viên</h1>

      <h2>{editingId ? "Cập nhật sinh viên" : "Thêm sinh viên"}</h2>

      <input
        placeholder="MSSV"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <input
        placeholder="Họ tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {editingId ? (
        <button onClick={handleUpdateStudent}>
          Cập nhật sinh viên
        </button>
      ) : (
        <button onClick={handleAddStudent}>
          Thêm sinh viên
        </button>
      )}

      {editingId && (
        <button
          onClick={() => {
            setEditingId(null);
            setStudentId("");
            setName("");
            setEmail("");
          }}
        >
          Hủy
        </button>
      )}

      <hr />

      {students.map((student) => (
        <div key={student._id}>
          <p>MSSV: {student.studentId}</p>
          <p>Họ tên: {student.name}</p>
          <p>Email: {student.email}</p>

          <button onClick={() => handleEdit(student)}>
            Sửa
          </button>

          <button onClick={() => handleDelete(student._id)}>
            Xóa
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
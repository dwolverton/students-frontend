import { useEffect, useState } from "react";
import Student from "../model/Student";
import { createStudent, deleteStudent, readAllStudents } from "../service/StudentApiService";
import StudentCard from "./StudentCard";
import StudentForm from "./StudentForm";

function StudentList() {
  // array of students from the API
  const [ students, setStudents ] = useState<Student[]>([]);
  const [ studentsLoaded, setStudentsLoaded ] = useState(false);

  // useEffect runs once when our componet loads.
  useEffect(() => {
    // load our initial data here.
    loadStudents();
  }, []);

  function loadStudents() {
    readAllStudents().then(studentsFromApi => {
      setStudents(studentsFromApi);
      setStudentsLoaded(true);
    });
  }

  function handleAddStudent(student: Student): void {
    // After createStudent successfully completes, call loadStudents to
    // refresh the data here.
    createStudent(student).then(loadStudents);
  }

  // Use the ! (non-null assertion) TypeScript operator to tell TypeScript
  // that we know the _id will not be undefined. (see below)
  function handleDeleteStudent(studentId: string): void {
    deleteStudent(studentId).then(loadStudents);
  }

  return (
    <div className="StudentList">
      <h2>Students</h2>
      { !studentsLoaded ?
          <p className="StudentList__message">Loading...</p>
        : students.length === 0 ?
          <p className="StudentList__message">No Students</p>
        :
          students.map(eachStudent => 
            <StudentCard key={eachStudent._id} student={eachStudent}
                          onDelete={() => handleDeleteStudent(eachStudent._id!)}
            />)
      }
      <h2>Add a Student</h2>
      <StudentForm onSubmit={handleAddStudent}/>
    </div>
  );
}

export default StudentList;
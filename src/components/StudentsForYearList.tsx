import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Student from "../model/Student";
import { deleteStudent, readStudentsByYear } from "../service/StudentApiService";
import StudentCard from "./StudentCard";

interface RouteParams {
  year: string; // has to be a string
}

function StudentsForYearList() {
  const year: number = parseInt(useParams<RouteParams>().year);

  // array of students from the API
  const [ students, setStudents ] = useState<Student[]>([]);
  const [ studentsLoaded, setStudentsLoaded ] = useState(false);

  const loadStudents = useCallback(function () {
    readStudentsByYear(year).then(studentsFromApi => {
      setStudents(studentsFromApi);
      setStudentsLoaded(true);
    });
  }, [ year ]); // loadStudents depends on year

  // useEffect runs once when our componet loads.
  useEffect(() => {
    // load our initial data here.
    loadStudents();
  }, [loadStudents]); // useEffect depends on loadStudents

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
    </div>
  );
}

export default StudentsForYearList;
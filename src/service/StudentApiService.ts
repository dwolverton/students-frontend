import axios from "axios";
import Student from "../model/Student";

const baseUrl = process.env.REACT_APP_API_URL || "";
if (!baseUrl) {
  console.error("REACT_APP_API_URL environment variable not set.");
}

export function readAllStudents():Promise<Student[]> {
  return axios.get(`${baseUrl}/students`).then(res => res.data);
}

export function readStudentsByYear(year: number):Promise<Student[]> {
  return axios.get(`${baseUrl}/students`, {
    params: { year: year }
  }).then(res => res.data);
}

export function createStudent(student: Student):Promise<Student> {
  return axios.post(`${baseUrl}/students`, student).then(res => res.data);
}

export function deleteStudent(studentId: string):Promise<void> {
  return axios.delete(`${baseUrl}/students/${encodeURIComponent(studentId)}`);
}
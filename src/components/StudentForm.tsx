import { ChangeEvent, FormEvent, useRef, useState } from "react";
import "./StudentForm.css";
import Student from "../model/Student";
import { storage } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props {
  onSubmit: (student: Student) => void;
}

function StudentForm({ onSubmit }: Props) {
  const [ name, setName ] = useState("");
  const [ year, setYear ] = useState("");
  const [ present, setPresent ] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event:FormEvent): void {
    event.preventDefault();

    const student: Student = {
      name: name,
      year: parseInt(year),
      present: present
    }

    const files = photoInputRef.current?.files;
    if (files && files[0]) {
      const photoFile = files[0];
      console.log(photoFile);

      const storageRef = ref(storage, "profile-photos/" + photoFile.name);
      // First upload the file
      uploadBytes(storageRef, photoFile).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          // Then save the student
          student.profilePhoto = url;
          onSubmit(student);
          clearForm();
        });
      });
    } else {
      onSubmit(student);
      clearForm();
    }
  }

  function clearForm() {
    setName("");
    setYear("");
    setPresent(false);
    formRef.current?.reset();
  }

  function handleYearChange(event:ChangeEvent<HTMLInputElement>): void {
    setYear(event.target.value);
  }

  return (
    <form className="StudentForm" onSubmit={handleSubmit} ref={formRef}>
      <p>
        <label htmlFor="StudentForm_name">Name</label>
        <input id="StudentForm_name" value={name} onChange={e => setName(e.target.value)} required />
      </p>
      <p>
        <label>Year</label>
        <label>
          <input type="radio" name="year" value="1" checked={year === "1"} onChange={handleYearChange} required />
          First
        </label>
        <label>
          <input type="radio" name="year" value="2" checked={year === "2"} onChange={handleYearChange} required />
          Second
        </label>
        <label>
          <input type="radio" name="year" value="3" checked={year === "3"} onChange={handleYearChange} required />
          Third
        </label>
        <label>
          <input type="radio" name="year" value="4" checked={year === "4"} onChange={handleYearChange} required />
          Fourth
        </label>
      </p>
      <p>
        <label htmlFor="StudentForm_present">Present</label>
        <input id="StudentForm_present" type="checkbox" checked={present} onChange={e => setPresent(e.target.checked)} />
      </p>
      <p>
        <label htmlFor="StudentForm_photo">Profile Photo</label>
        <input id="StudentForm_photo" type="file" ref={photoInputRef} />
      </p>
      <p>
        <button type="submit">Add Student</button>
      </p>
    </form>
  );
}

export default StudentForm;
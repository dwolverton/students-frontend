import Student from "../model/Student";
import './StudentCard.css';

interface Props {
  student: Student;
  onDelete: () => void;
}

function StudentCard({ student, onDelete }: Props) {
  return (
    <div className="StudentCard">
      <div className="StudentCard__top">
        <h3>{student.name}</h3>
        <button onClick={onDelete}>Delete</button>
      </div>
      <p><span className="StudentCard__label">Year:</span> {student.year}</p>
      { student.present ?
        <p className="StudentCard__attendance StudentCard__present">Present</p> :
        <p className="StudentCard__attendance StudentCard__absent">Absent</p>
      }
      { !!student.profilePhoto && <p>
        <img className="StudentCard__photo" src={student.profilePhoto} alt="" />
      </p> }
    </div>
  );
}

export default StudentCard;
import axios from "axios";
import Teacher from "../components/TeacherComponents/Teacher.jsx";


export async function getFreeTeachers() {
    return await axios.get(`http://localhost:5000/teachers/free`).then(response => {
        return response.data;
    })
}


export async function getTeachersCard(subjectId, handlerTeachers) {
    return await axios.get(`http://localhost:5000/teachers/${subjectId}`).then(
        (response) => {
            return response.data.map(teacher => {
                return <Teacher
                    key={teacher.id}
                    teacher={teacher}
                    subject={subjectId}
                    handlerTeachers={handlerTeachers}
                />
            });
        })
}

export async function deleteTeacher(teacherId) {
    return await axios.delete(`http://localhost:5000/teachers/${teacherId}`).then(
        response => response.status
    );
}

export async function addNewTeacher(values){
    return await axios.post('http://localhost:5000/teachers/add', values).then(
        response => response
    );
}
import axios from "axios";
import Teacher from "../components/TeacherComponents/Teacher.jsx";
import Student from "../components/StudentComponents/Student.jsx";
import {Typography} from "antd";
import SetTeacher from "../components/TeacherComponents/SetClassTeacher.jsx";
import ClassroomTeacher from "../components/TeacherComponents/ClassroomTeacher.jsx";


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


export async function getClassesOptions() {
    return await axios.get('http://localhost:5000/class/all').then((response) => {
        const responseClasses = response.data.map((item) => {
            return getItem(
                `${item.class_number} ${item.class_word}`,
                item.id
            );
        })
        return getItem('Классы', 'classes', null, responseClasses)
    })
}


export async function getClassInfo(classId, handlerTeachers, classesOptions, handlerStudents) {
    return await axios.get(`http://localhost:5000/class/${classId}`)
        .then((response) => {
            let classroomTeacher
            const clsInfo = response.data;
            const classStudents = clsInfo.students.map((student) => {
                return (
                    <Student
                        student={student}
                        key={student.id}
                        handlerStudents={handlerStudents}
                        classId={classId}
                    />
                )
            })

            if (clsInfo.classroom_teacher !== null) {
                console.log(clsInfo.classroom_teacher)
                classroomTeacher = (
                    <ClassroomTeacher
                        teacher={clsInfo.classroom_teacher}
                    />
                )
            } else {
                classroomTeacher = (
                    <Typography.Title
                        level={5}
                        style={{marginBottom: "0px", marginTop: "15px"}}
                    >
                        Классного руководителя в данном классе нет
                    </Typography.Title>
                )
            }

            return {
                students: classStudents,
                teacher: classroomTeacher,
            }
        })
}

export async function setClassTeacher(teacherId, classId){
    return await axios.patch(`http://localhost:5000/class/${classId}/teacher/${teacherId}`).then(
        (response) => {
            return response
        }
    )
}
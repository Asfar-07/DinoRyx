package com.gym.dashboard_service.service;

import com.gym.dashboard_service.exception.DataInvalidFormatException;
import com.gym.dashboard_service.exception.ResourceNotFoundException;
import com.gym.dashboard_service.model.studentmodel.StudentModel;
import com.gym.dashboard_service.model.studentmodel.UpdateStudentModel;
import com.gym.dashboard_service.repository.StudentRepository;
import com.gym.dashboard_service.utils.CreateRandomKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public void addStudent(StudentModel student,long UserId){
        if (student == null) throw  new DataInvalidFormatException("Data Null");
        long key=new CreateRandomKey().onlyNumber();
        Date date = new Date(System.currentTimeMillis());
        student.set_id(key);
        student.setCreated(date.getTime());
        student.setUserId(UserId);
        studentRepository.save(student);
    }
    public StudentModel getStudent(long studentID){
        return studentRepository.findById(studentID).orElseThrow(()-> new ResourceNotFoundException("Student Not Found"));
    }

    public List<StudentModel> getAllStudent(String dashboardId){
        return studentRepository.findAllByDashboardId(dashboardId);
    }

    public void updateStudent(StudentModel student, UpdateStudentModel updateStudentModel){
        if(updateStudentModel.getName()!=null) student.setName(updateStudentModel.getName());
        if(updateStudentModel.getAge()!=0) student.setAge(updateStudentModel.getAge());
        if(updateStudentModel.getProgressStatus()!=null) student.setProgressStatus(updateStudentModel.getProgressStatus());
        if(updateStudentModel.getAddress()!=null) student.setAddress(updateStudentModel.getAddress());
        if(updateStudentModel.getContact()!=null) student.setContact(updateStudentModel.getContact());
        Date date = new Date(System.currentTimeMillis());
        student.setUpdate_Date(date.getTime());
        studentRepository.save(student);
    }
    public void deleteStudent(StudentModel student){
        studentRepository.delete(student);
    }


}

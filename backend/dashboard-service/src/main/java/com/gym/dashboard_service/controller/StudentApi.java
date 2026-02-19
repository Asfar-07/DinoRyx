package com.gym.dashboard_service.controller;

import com.gym.dashboard_service.model.studentmodel.StudentModel;
import com.gym.dashboard_service.model.studentmodel.UpdateStudentModel;
import com.gym.dashboard_service.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class StudentApi {

    StudentService service;

    @GetMapping(value = "/student/data")
    public ResponseEntity<?> getStudentData(@RequestParam("dashID") String dashboard){
        List<StudentModel> data=service.getAllStudent(dashboard);
        return ResponseEntity.ok(data);
    }
    @PostMapping(value="/student/inset")
    public  ResponseEntity<?> addNewStudent(@RequestBody StudentModel student,@RequestHeader("user_id") long userId){
        service.addStudent(student,userId);
        return ResponseEntity.ok("success");
    }
    @PutMapping(value="/student/update")
    public ResponseEntity<?> updateStudent(@RequestBody UpdateStudentModel updateStudent){
        StudentModel student=service.getStudent(updateStudent.get_id());
        service.updateStudent(student,updateStudent);
        return ResponseEntity.ok("success");
    }

    @DeleteMapping(value="/student/remove")
    public ResponseEntity<?> removeStudent(@RequestBody long studentId){
        StudentModel student=service.getStudent(studentId);
        service.deleteStudent(student);
        return ResponseEntity.ok("success");
    }
}

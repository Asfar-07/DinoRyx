package com.gym.dashboard_service.controller;

import com.gym.dashboard_service.model.studentmodel.StudentModel;
import com.gym.dashboard_service.model.studentmodel.UpdateStudentModel;
import com.gym.dashboard_service.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class StudentApi {
    @Autowired
    StudentService service;

    @GetMapping(value = "/student/data")
    public ResponseEntity<?> getStudentData(@RequestParam("dashID") String dashboard){
        List<StudentModel> data=service.getAllStudent(dashboard);
        return ResponseEntity.ok(data);
    }
    @PostMapping(value="/student/inset")
    public  ResponseEntity<?> addNewStudent(@RequestBody StudentModel student){
        long userId=12345;
        service.addStudent(student,userId);
        return ResponseEntity.ok("success");
    }
    @PutMapping(value="/student/update")
    public ResponseEntity<?> updateStudent(@RequestBody UpdateStudentModel updateStudent){
        StudentModel student=service.getStudent(updateStudent.get_id());
        service.updateStudent(student,updateStudent);
        return ResponseEntity.ok("success");
    }

    @DeleteMapping(value="/student/remove/{dashId}/{studentID}")
    public ResponseEntity<?> removeStudent(@PathVariable String dashId,@PathVariable long studentID){
        StudentModel student=service.getStudent(studentID);
        if (student.getDashboardId().equals(dashId)){
            service.deleteStudent(student);
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not student this dashboard");
        }
        return ResponseEntity.ok("success");
    }
}

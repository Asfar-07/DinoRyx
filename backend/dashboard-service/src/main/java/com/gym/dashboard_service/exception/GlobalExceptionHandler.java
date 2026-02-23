package com.gym.dashboard_service.exception;

import com.mongodb.DuplicateKeyException;
import com.mongodb.MongoException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    //(ResourceNotFoundException) is custom exception for "not found"
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> DataNotFound(ResourceNotFoundException error){
        System.out.println("not found--"+ error.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found");
    }

    @ExceptionHandler(DataInvalidFormatException.class)
    public ResponseEntity<?> DataInvalid(DataInvalidFormatException error){
        System.out.println("invalid Data--"+ error.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Data");
    }

    //(DuplicateKeyException) handle duplicate key error from Entity or Database (@Indexed(unique = true))
    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<?> DuplicateID(DuplicateKeyException error){
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Duplicate key formed");
    }

    //(MongoException) Database connection failure
    @ExceptionHandler(MongoException.class)
    public ResponseEntity<?> handleMongo(MongoException e) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("Database crushed");
    }
//    //Normal java exception from code
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<?> GeneralError(Exception e) {
//        return ResponseEntity
//                .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                .body("Server Down");
//    }
}

/* Work Flow
Step 1:Stops normal execution
Step 2:Searches for matching exception(@ExceptionHandler)
Step 3:Executes that method
Step 4:Returns proper HTTP response
*/


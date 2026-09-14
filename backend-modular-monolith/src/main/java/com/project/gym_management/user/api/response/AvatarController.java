package com.project.gym_management.user.api.response;

import com.project.gym_management.user.application.AvatarService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/user/data")
public class AvatarController {
    @Autowired
    AvatarService avatarService;

    @GetMapping("/fetch/all/default/avatars")
    public ResponseEntity<List<String>> GetAllDefault(){
        List<String> avatars = avatarService.fetchAllDefaultAvatar();
        return ResponseEntity.ok(avatars);
    }

    @PutMapping("/save/changed/default/avatar")
    public ResponseEntity<?> SaveDefault(@RequestBody HashMap<String, String> body, HttpServletRequest request){
        String userId = (String) request.getAttribute("userId");
        try {
            avatarService.changeDefaultAvatar(body.get("avatar"), Long.parseLong(userId));
            return ResponseEntity.ok("ok");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}

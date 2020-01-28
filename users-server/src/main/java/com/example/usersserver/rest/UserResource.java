package com.example.usersserver.rest;

import com.example.usersserver.persistance.model.DTO.UserDTO;
import com.example.usersserver.persistance.model.User;
import com.example.usersserver.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserResource {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserDTO> save(@RequestBody User user) {
        return new ResponseEntity<>(
                userService.save(user),
                HttpStatus.CREATED
        );
    }

    @GetMapping("{username}")
    public UserDTO findByUsername(@PathVariable String username) {
        return userService.findByUsername(username);
    }

    @GetMapping
    public List<UserDTO> findAll() {
        return userService.findALl();
    }

//    @PutMapping
//    public void update(@RequestBody User user) {
//        userService.save(user);
//    }

    @DeleteMapping("{username}")
    public ResponseEntity<Long> delete(@PathVariable String username) {
        return new ResponseEntity<>(
                userService.deleteByUsername(username),
                HttpStatus.NO_CONTENT
        );
    }

}

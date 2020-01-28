package com.example.usersserver.service;

import com.example.usersserver.persistance.model.DTO.UserDTO;
import com.example.usersserver.persistance.model.Role;
import com.example.usersserver.persistance.model.User;
import com.example.usersserver.persistance.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserDTO save(User user) {
        if (user.getId() == null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setTimestampOfRegister(System.currentTimeMillis());
        } else {
//            User oldUser = userRepository.findFirstByUsername(user.getUsername()).orElseThrow();
//            user.setPassword(oldUser.getPassword());
            throw new RuntimeException("user exists");
        }
        user.setRole(Role.USER);
        var savedUser = userRepository.save(user);
        return UserDTO.fromUser(savedUser);
    }

    public UserDTO findByUsername(String username) {
        var user = userRepository.findFirstByUsername(username).orElseThrow();
        return UserDTO.fromUser(user);
    }

    public long deleteByUsername(String username) {
        return userRepository.deleteByUsername(username);
    }

    public List<UserDTO> findALl() {
        return userRepository.findAll().stream().map(UserDTO::fromUser).collect(Collectors.toList());
    }
}

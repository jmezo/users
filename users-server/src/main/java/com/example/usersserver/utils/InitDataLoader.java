package com.example.usersserver.utils;

import com.example.usersserver.persistance.model.Role;
import com.example.usersserver.persistance.model.User;
import com.example.usersserver.persistance.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Component
@Transactional
@AllArgsConstructor
public class InitDataLoader {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    @PostConstruct
    public void init() {
        List<User> testUsers = new ArrayList<>();

        for(int i = 0; i < 10; i++) {
            var user = User.builder()
                    .username("user"+i)
                    .password(encoder.encode("password"+i))
                    .timestampOfRegister(System.currentTimeMillis())
                    .role(i == 0 ? Role.ADMIN : Role.USER)
                    .build();
            testUsers.add(user);
        }
        userRepository.saveAll(testUsers);
    }
}

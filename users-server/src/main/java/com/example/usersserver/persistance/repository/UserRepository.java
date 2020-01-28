package com.example.usersserver.persistance.repository;

import com.example.usersserver.persistance.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findFirstByUsername(String username);

//    @Modifying
//    @Query("delete from User u where username = ?1")
    @Transactional
    long deleteByUsername(String username);

}

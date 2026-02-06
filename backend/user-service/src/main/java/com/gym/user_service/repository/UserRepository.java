package com.gym.user_service.repository;


import com.gym.user_service.model.UserDataModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserDataModel, Long> {

    Optional<UserDataModel> findByEmail(String email);
}

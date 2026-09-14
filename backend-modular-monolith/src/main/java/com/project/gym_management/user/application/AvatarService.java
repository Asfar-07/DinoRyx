package com.project.gym_management.user.application;

import java.util.List;

public interface AvatarService {

    List<String> fetchAllDefaultAvatar();
    void changeDefaultAvatar(String avatar, Long userId);
}

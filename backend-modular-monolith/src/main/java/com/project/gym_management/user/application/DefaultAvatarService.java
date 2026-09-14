package com.project.gym_management.user.application;

import java.util.List;

public interface DefaultAvatarService {
    public String getRandomAvatarCode();
    public boolean isValidDefaultAvatar(String avatarCode);
    public List<String> structuredDefaultAvatars();
}

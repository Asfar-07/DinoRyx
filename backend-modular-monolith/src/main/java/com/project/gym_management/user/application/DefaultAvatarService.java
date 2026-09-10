package com.project.gym_management.user.application;

public interface DefaultAvatarService {
    public String getRandomAvatarCode();
    public boolean isValidDefaultAvatar(String avatarCode);
}

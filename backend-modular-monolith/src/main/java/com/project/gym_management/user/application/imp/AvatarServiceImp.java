package com.project.gym_management.user.application.imp;

import com.project.gym_management.user.application.AvatarService;
import com.project.gym_management.user.domain.UserProfileTable;
import com.project.gym_management.user.infrastructure.ProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class AvatarServiceImp implements AvatarService {

    final DefaultAvatarServiceImp defaultAvatarServiceImp;
    final ProfileRepository profileRepository;

    public AvatarServiceImp(DefaultAvatarServiceImp defaultAvatarServiceImp, ProfileRepository profileRepository) {
        this.defaultAvatarServiceImp = defaultAvatarServiceImp;
        this.profileRepository = profileRepository;
    }

    @Override
    public List<String> fetchAllDefaultAvatar() {
        return defaultAvatarServiceImp.structuredDefaultAvatars();
    }

    @Override
    public void changeDefaultAvatar(String avatar,Long userId) {
        UserProfileTable profile = profileRepository.findByUserId(userId).orElseThrow(
                () -> new NullPointerException("user not found")
        );
        if(!Objects.equals(profile.getAvatar(), avatar)){
            profile.setAvatar(avatar);
            profileRepository.save(profile);
        } else{
            throw new IllegalArgumentException("This avatar is already set.");
        }
    }

    @Override
    public void saveCustomAvatar(String avatarPath, Long userId) {
        UserProfileTable profile = profileRepository.findByUserId(userId).orElseThrow(
                () -> new NullPointerException("user not found")
        );
        profile.setAvatar(avatarPath);
        profileRepository.save(profile);
    }
}

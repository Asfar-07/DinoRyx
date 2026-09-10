package com.project.gym_management.user.application.imp;

import com.project.gym_management.user.application.DefaultAvatarService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class DefaultAvatarServiceImp implements DefaultAvatarService {
    private static final List<String> DEFAULT_AVATARS = List.of(
            "AGHVDS",
            "BSUEHJ",
            "JKHGHK",
            "LSHUDM",
            "VGFHKD"
    );

    @Override
    public String getRandomAvatarCode() {
        return DEFAULT_AVATARS.get(
                ThreadLocalRandom.current()
                        .nextInt(DEFAULT_AVATARS.size())
        );
    }

    @Override
    public boolean isValidDefaultAvatar(String avatarCode) {
        return DEFAULT_AVATARS.contains(avatarCode);
    }
}

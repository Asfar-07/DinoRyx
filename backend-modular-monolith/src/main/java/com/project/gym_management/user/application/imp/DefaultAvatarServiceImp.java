package com.project.gym_management.user.application.imp;

import com.project.gym_management.user.application.DefaultAvatarService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class DefaultAvatarServiceImp implements DefaultAvatarService {
    private static final String DEFAULT_AVATAR_PATH = "/";

    private static final List<String> DEFAULT_AVATARS = List.of(
            "AGHVDS",
            "BSUEHJ",
            "JKHGHK",
            "LSHUDM",
            "VGFHKD",
            "GMJALT",
            "XMLRKD",
            "ZWRTIO",
            "BHDKIS",
            "NVDJDI"
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

    @Override
    public List<String> structuredDefaultAvatars() {
        return DEFAULT_AVATARS.stream()
                .map(name -> DEFAULT_AVATAR_PATH + name + ".webp")
                .toList();
    }
}

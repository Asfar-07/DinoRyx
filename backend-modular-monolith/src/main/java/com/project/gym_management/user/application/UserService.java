package com.project.gym_management.user.application;

import com.project.gym_management.user.domain.UpdateUserPrint;

public interface UserService {
    public Object[] FetchMe(long id);
    public Object[] FetchUser(long id);
    public boolean UpdateUser(long id, UpdateUserPrint update_user);
    public boolean DeleteService(long id);
}

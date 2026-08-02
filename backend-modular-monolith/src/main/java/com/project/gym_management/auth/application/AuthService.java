package com.project.gym_management.auth.application;

import com.project.gym_management.auth.api.request.ReqAuth;
import com.project.gym_management.auth.domain.AuthProviderTable;
import com.project.gym_management.auth.domain.ResetPasswordTable;
import com.project.gym_management.auth.infrastructure.PasswordResetRepo;
import com.project.gym_management.auth.infrastructure.ProviderRepository;
import com.project.gym_management.user.domain.UserProfileTable;
import com.project.gym_management.user.domain.UserTable;
import com.project.gym_management.user.infrastructure.ProfileRepository;
import com.project.gym_management.user.infrastructure.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class AuthService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordResetRepo resetRepository;
    @Autowired
    ProviderRepository providerRepository;
    @Autowired
    ProfileRepository profileRepository;

    private final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    HashMap<String, Object> response=new HashMap<>();

    public HashMap<String,Object> signupService(ReqAuth request){
        Random random = new Random();
        if(userRepository.findByEmail(request.getEmail()).orElse(null) == null){
            long numberRID = (long) (100000 + random.nextInt(900000)) *(100000 + random.nextInt(900000));
            UserTable user=UserTable.builder()
                    .id(numberRID)
                            .username(request.getUsername())
                            .email(request.getEmail())
                            .build();
            user = userRepository.save(user);

            AuthProviderTable provider=AuthProviderTable.builder()
                            .provider("local")
                            .password(passwordEncoder.encode(request.getPassword()))
                            .user(user)
                            .build();
            providerRepository.save(provider);

            UserProfileTable profile=UserProfileTable.builder()
                    .available(false)
                    .trainer(false)
                    .user(user)
                    .build();
            profileRepository.save(profile);

            this.response.put("status",true);
            this.response.put("message","New User Added");
            this.response.put("data",user);
            return this.response;
        }else {
            response.put("status",false);
            response.put("message","Email Existed");
            response.put("data",null);
            return  this.response;
        }
    }
    public HashMap<String,Object> loginService(ReqAuth request) {
        final String enterPassword=request.getPassword();
        UserTable user=userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user != null ) {
            AuthProviderTable provider=providerRepository.findByProviderAndUserId("local",user.getId()).orElse(null);
            if(provider != null) {
                final String realPassword = provider.getPassword();
                if (passwordEncoder.matches(enterPassword, realPassword)) {
                    this.response.put("status", true);
                    this.response.put("message", "Password Matching");
                    this.response.put("data", user);
                    return this.response;
                } else {
                    this.response.put("status", false);
                    this.response.put("message", "Password Not Match");
                    this.response.put("data", null);
                    return this.response;
                }
            }else {
                this.response.put("status",false);
                this.response.put("message","Logged with another service");
                this.response.put("data",null);
                return this.response;
            }
        } else {
            this.response.put("status",false);
            this.response.put("message","Not Found Email");
            this.response.put("data",null);
            return this.response;
        }
    }
    public HashMap<String,Object>  googleService(Map<String,String> request){
        Random random = new Random();
        if(request.get("email") == null){
            this.response.put("status",false);
            return this.response;
        }
        UserTable userFetch=userRepository.findByEmail(request.get("email")).orElse(null);
        if (userFetch == null){
            long numberRID = (long) (100000 + random.nextInt(900000)) *(100000 + random.nextInt(900000));
             UserTable user=UserTable.builder()
                    .id(numberRID)
                    .username(request.get("name"))
                    .email(request.get("email"))
                    .build();
            user = userRepository.save(user);
            AuthProviderTable provider=AuthProviderTable.builder()
                    .provider("google")
                    .password(null)
                    .user(user)
                    .build();
            providerRepository.save(provider);
            UserProfileTable profile=UserProfileTable.builder()
                    .available(false)
                    .trainer(false)
                    .avatar(request.get("picture"))
                    .user(user)
                    .build();
            profileRepository.save(profile);

            this.response.put("status",true);
            this.response.put("data",user);
        }else {
            this.response.put("status",true);
            this.response.put("data",userFetch);
        }
        return this.response;
    }
    public boolean ResetPassword(String newPassword, String tokenId){
        List<ResetPasswordTable> tokens = resetRepository.findAllValidation(LocalDateTime.now()); // collect data
        for (ResetPasswordTable table : tokens) {                                           // make loop for find match token
            if (passwordEncoder.matches(tokenId, table.getToken())) {
                UserTable user=userRepository.findByEmail(table.getEmail()).orElse(null);
                if (user != null){
                    AuthProviderTable provider=providerRepository.findByProviderAndUserId("local",user.getId()).orElse(null);
                    if(provider != null){
                        provider.setPassword(passwordEncoder.encode(newPassword));
                        providerRepository.save(provider);
                    }else {
                        AuthProviderTable newProvider=AuthProviderTable.builder()
                                .provider("local")
                                .password(passwordEncoder.encode(newPassword))
                                .user(user)
                                .build();
                        providerRepository.save(newProvider);
                    }
                    table.setUsed(true);
                    resetRepository.save(table);

                    return true; //success all
                }
                return false; //user not exited
            }
            return false; // token not matching
        }
        return false; // expired or not exited
    }


    public  void TestService(){
//        UserTable user=new UserTable();
//        UserProfileTable profile=new UserProfileTable();
//        user.setEmail("Example@email.com");
//        user.setUsername("asfar");
//        userRepository.save(user);
//        profile.setAbout("dfhdfjk");
//        profile.setPhone_on("1111111");
//        profile.setAvailable(true);
//        profile.setTrainer(false);
//        profile.setUser(user);
//        profileRepository.save(profile);
        UserTable user=userRepository.findById(2).orElse(null);
//        AuthProviderTable providerTable=AuthProviderTable.builder().user(user)
//                .provider("local")
//                .password("asdfg")
//                .build();
//        providerRepository.save(providerTable);
        assert user != null;
//        AuthProviderTable provider= (AuthProviderTable) user.getProvider();
        System.out.println(user.getEmail());
        System.out.println(user.getProvider());
        System.out.println(user.getProfile().getPhone_on());
    }

}

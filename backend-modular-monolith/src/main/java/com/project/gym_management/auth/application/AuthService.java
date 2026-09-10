package com.project.gym_management.auth.application;

import com.project.gym_management.auth.api.request.ReqAuth;
import com.project.gym_management.auth.domain.AuthProviderTable;
import com.project.gym_management.auth.domain.OtpVerificationTable;
import com.project.gym_management.auth.domain.ResetPasswordTable;
import com.project.gym_management.auth.domain.enums.AuthProvider;
import com.project.gym_management.auth.domain.enums.OtpPurpose;
import com.project.gym_management.auth.infrastructure.OtpVerificationRepository;
import com.project.gym_management.auth.infrastructure.PasswordResetRepo;
import com.project.gym_management.auth.infrastructure.ProviderRepository;
import com.project.gym_management.user.domain.UserProfileTable;
import com.project.gym_management.user.domain.UserTable;
import com.project.gym_management.user.domain.enums.UserStatus;
import com.project.gym_management.user.infrastructure.ProfileRepository;
import com.project.gym_management.user.infrastructure.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
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

    final AuthMailVerification authMailVerification;
    final OtpVerificationRepository otpVerificationRepository;

    private final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    HashMap<String, Object> response=new HashMap<>();

    public AuthService(AuthMailVerification authMailVerification, OtpVerificationRepository otpVerificationRepository) {
        this.authMailVerification = authMailVerification;
        this.otpVerificationRepository = otpVerificationRepository;
    }

    @Transactional
    public HashMap<String,Object> signupService(ReqAuth request){
        Random random = new Random();
        if(userRepository.findByEmail(request.getEmail()).orElse(null) == null){
            long numberRID = (long) (100000 + random.nextInt(900000)) *(100000 + random.nextInt(900000));
            UserTable user = UserTable.builder()
                    .id(numberRID)
                            .username(request.getUsername())
                            .email(request.getEmail())
                            .status(UserStatus.PENDING)
                            .build();
            user = userRepository.save(user);

            AuthProviderTable provider = AuthProviderTable.builder()
                            .provider(AuthProvider.LOCAL)
                            .password(passwordEncoder.encode(request.getPassword()))
                            .user(user)
                            .build();
            providerRepository.save(provider);

            UserProfileTable profile = UserProfileTable.builder()
                    .available(false)
                    .trainer(false)
                    .user(user)
                    .build();
            profileRepository.save(profile);

            authMailVerification.sendSignupOtp(user);

            this.response.put("status",true);
            this.response.put("message","Verify Otp Generated");
            return this.response;

        }else {

            response.put("status",false);
            response.put("message","Email Existed");
            return  this.response;
        }
    }

    @Transactional
    public HashMap<String,Object> resendSignupOtp(String email) {

        UserTable user = userRepository
                .findByEmail(email)
                .orElse(null);

        if(user == null){
            this.response.put("status",false);
            this.response.put("message","user not found");
            return this.response;
        }

        if (user.getStatus() == UserStatus.ACTIVE) {
            this.response.put("status",false);
            this.response.put("message","already verified");
            return this.response;
        }

        if (user.getStatus() == UserStatus.BLOCKED) {
            this.response.put("status",false);
            this.response.put("message","Account is blocked");
            return this.response;
        }
        otpVerificationRepository.invalidatePreviousOtps(
                user.getId(),
                OtpPurpose.SIGNUP
        );
        try{
            authMailVerification.ResendSignupOtp(user);
        } catch (Exception e){
            this.response.put("status",false);
            this.response.put("message",e.getMessage());
            return this.response;
        }

        this.response.put("status",true);
        this.response.put("message","Verify Otp Generated");
        return this.response;
    }

    public HashMap<String,Object> loginService(ReqAuth request) {
        final String enterPassword=request.getPassword();
        UserTable user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user != null ) {
            AuthProviderTable provider = providerRepository.findByProviderAndUserId(AuthProvider.LOCAL,user.getId()).orElse(null);

            if(provider != null) {
                final String realPassword = provider.getPassword();
                if (passwordEncoder.matches(enterPassword, realPassword)) {
                    if(user.getStatus() == UserStatus.ACTIVE){
                        this.response.put("status", true);
                        this.response.put("message", "Password Matching");
                        this.response.put("data", user);
                        return this.response;
                    } else{
                        this.response.put("status", false);
                        this.response.put("message", "Missing Validation");
                        this.response.put("data", null);
                        return this.response;
                    }
                } else {
                    System.out.println("not match");
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
        UserTable userFetch = userRepository.findByEmail(request.get("email")).orElse(null);
        if (userFetch == null){
            long numberRID = (long) (100000 + random.nextInt(900000)) *(100000 + random.nextInt(900000));
             UserTable user=UserTable.builder()
                    .id(numberRID)
                    .username(request.get("name"))
                     .status(UserStatus.ACTIVE)
                    .email(request.get("email"))
                    .build();
            user = userRepository.save(user);
            AuthProviderTable provider=AuthProviderTable.builder()
                    .provider(AuthProvider.GOOGLE)
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
                    AuthProviderTable provider=providerRepository.findByProviderAndUserId(AuthProvider.LOCAL,user.getId()).orElse(null);
                    if(provider != null){
                        provider.setPassword(passwordEncoder.encode(newPassword));
                        providerRepository.save(provider);
                    }else {
                        AuthProviderTable newProvider=AuthProviderTable.builder()
                                .provider(AuthProvider.LOCAL)
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

    public HashMap<String,Object> signupOtpVerify(HashMap<String, String> req){
        String email = req.get("email").trim().toLowerCase();
        UserTable user = userRepository
                .findByEmail(email)
                .orElse(null);

        if(user == null){
            this.response.put("status",false);
            this.response.put("message","user not found");
            return this.response;
        }

        if (user.getStatus() == UserStatus.ACTIVE) {
            this.response.put("status",false);
            this.response.put("message","user already verified");
            return this.response;
        }

        OtpVerificationTable otp = otpVerificationRepository.findTopByUserIdAndPurposeOrderByCreatedAtDesc(
                user.getId(),
                OtpPurpose.SIGNUP
        ).orElse(null);


        if(otp == null || otp.isVerified()){
            this.response.put("status",false);
            this.response.put("message","invalid otp");
            return this.response;
        }

        if (otp.getExpiresAt().isBefore(LocalDateTime.now())) {
            this.response.put("status",false);
            this.response.put("message","otp expired");
            return this.response;
        }

        if (otp.getAttempts() >= 5) {
            this.response.put("status",false);
            this.response.put("message","multiple attempt");
            return this.response;
        }
        if (!passwordEncoder.matches(
                req.get("otp"),
                otp.getOtpHash()
        )) {

            otpVerificationRepository.save(otp);

            this.response.put("status",false);
            this.response.put("message","invalid otp");
            return this.response;
        }

        otp.setAttempts(otp.getAttempts() + 1);
        otp.setVerified(true);

        user.setStatus(UserStatus.ACTIVE);

        otpVerificationRepository.save(otp);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        this.response.put("status",true);
        this.response.put("message","otp matched");
        this.response.put("data", user);
        return this.response;
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

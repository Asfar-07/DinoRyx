package com.gym.dashboard_service.utils;

import java.util.Random;

public class CreateRandomKey {
    static String alphabets="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    StringBuilder collect_Key=new StringBuilder();
    Random random = new Random();

    public long onlyNumber(){
        return (long) (100000 + random.nextInt(900000)) *(100000 + random.nextInt(900000));
    }

    public StringBuilder alphaWITH_num(){
        System.out.println(alphabets.length());
        for(int i=1;i<=13;i++){
            if(i <=4){
                collect_Key.append(alphabets.charAt(random.nextInt(10)));
            }else{
                collect_Key.append(String.valueOf(random.nextInt(10)));
            }
        }
        return collect_Key;
    }
}

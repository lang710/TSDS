package util.time;

import java.text.SimpleDateFormat;
import java.util.Date;

public class timeTrans {

    //获取当前系统距1970-01-01的秒数
    public static int getCurrentSecond(){
        long seconds=System.currentTimeMillis()/1000;     //当前系统时间（距离1970年的秒数）
        return (int)seconds;
    }

    //获取当前年月日
    public static String getCurrentYMD(){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String currentDate =   dateFormat.format( new Date() );
        return currentDate;
    }

    //获取当前时分秒
    public static String getCurrentHMS(){
        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss ");
        String currentDate =   dateFormat.format( new Date() );
        return currentDate;
    }

    //获取当前年月日 时分秒
    public static String getCurrentDatetime(){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss ");
        String currentDate =   dateFormat.format( new Date() );
        return currentDate;
    }

    /*public static void main(String[] args){
        String date=getCurrentYMD();
        String time=getCurrentHMS();
        String datetime=getCurrentDatetime();
        System.out.println(date);
        System.out.println(time);
        System.out.println(datetime);
    }*/
}
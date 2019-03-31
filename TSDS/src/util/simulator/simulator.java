package util.simulator;

import util.dao.dbquery;
import util.time.timeTrans;

import java.util.Random;

public class simulator {
    //根据上下限生成随机数
    public static float getRand(float floor, float ceiling){
        Random rand=new Random();
        return rand.nextFloat() * (ceiling - floor) + floor;
    }

    //存入数据库
    public static void storageSQL(String date,String time, float value, String kpi_id){
        String statement = "insert into simulatorTS (date,time, value, kpi_id) values ('"+date+"','"+time+"','"+value+"','"+kpi_id+"')";
        dbquery myquery=new dbquery();
        myquery.setConn();
        myquery.update(statement);
        myquery.closeConn();
    }


    public static void simulatee(int rating) {

        String date;
        String time;
        float value;
        String kpi_id;

        while(true) {

            value = getRand(20,200);           //生成随机数
            date = timeTrans.getCurrentYMD();               //获取日期
            time = timeTrans.getCurrentHMS();               //获取时间
            kpi_id="simulator";                              //设置kpiid
            storageSQL(date,time,value,kpi_id);

            try {
                Thread.sleep(1000 * rating);            //模拟器延时
            } catch (InterruptedException ie) {
                ie.printStackTrace();
            }

        }
    }

    public static void main(String[] args){
        simulatee(2);
    }
}

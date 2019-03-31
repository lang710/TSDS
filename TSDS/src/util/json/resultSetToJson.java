package util.json;

import org.json.JSONArray;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

public class resultSetToJson {

    public String rsToJson(ResultSet rs) throws SQLException {
        //json数组
        JSONArray array=new JSONArray();

        //获取列数
        ResultSetMetaData metaData=rs.getMetaData();
        int columnCount=metaData.getColumnCount();

        //遍历ResultSet中的每条数据
        while(rs.next()){
            JSONObject jsonObj=new JSONObject();

            //遍历每一列
            for(int i=1;i<=columnCount;i++){
                String columnName=metaData.getColumnLabel(i);
                String value=rs.getString(columnName);
                jsonObj.put(columnName,value);
            }
            array.put(jsonObj);
        }

        return array.toString();
    }
}

package util.safe;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Enumeration;

public class checkSessAttr {
    public boolean checkName(HttpServletRequest request, String name){
        HttpSession sess=request.getSession();
        Enumeration en=sess.getAttributeNames();
        while(en.hasMoreElements()){
            String isValid=(String)en.nextElement();
            if(isValid==name)
                return true;
        }
        return false;
    }
}

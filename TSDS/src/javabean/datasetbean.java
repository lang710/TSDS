package javabean;

public class datasetbean {
    int id;
    String name;
    String datetime;

    public datasetbean(){}

    public datasetbean(int id,String name,String timestamp){
        this.id=id;
        this.name=name;
        this.datetime=timestamp;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDatetime() {
        return datetime;
    }

    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }
}

package br.com.farm.adm.util;

public class LatLng{
    public float lat;
    public float lng;

    public LatLng(){}
    public LatLng(float lat, float lng){
        this.lat = lat;
        this.lng = lng;
    }

    public String toString(){
        return "["+lat+", "+lng+"]";
    }
}
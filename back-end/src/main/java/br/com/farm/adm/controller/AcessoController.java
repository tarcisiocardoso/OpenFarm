package br.com.farm.adm.controller;

import com.google.gson.JsonArray;

import com.google.gson.JsonObject;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class AcessoController {

    @RequestMapping(method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    public String getProfile(@AuthenticationPrincipal OAuth2User principal){
        System.out.println(">>>> ACESSO CONTROLLER <<<");
        principal.getAttributes().forEach((key, val) ->{
			System.out.println(key+": "+val);
        });
        
        JsonArray array = new JsonArray();
        JsonObject j = new JsonObject();
        // j.add("user", null);
        array.add("adm");
        array.add("blog");
        array.add("forum");
        j.add("acesso", array);

        return j.toString();
    }

}
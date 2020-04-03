package br.com.farm.adm.controller.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/info")
public class InfoController {

    @Autowired
    ResourceLoader resourceLoader;

    @RequestMapping(method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public Object montaBlogCategory( ) {

        return this.loadBlogCategory();
    }

    private Resource loadBlogCategory() {
        return resourceLoader.getResource(
          "classpath:data/info.json");
    }

}
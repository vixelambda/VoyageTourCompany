package com.voyagetourcompany.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UIController {
    @RequestMapping(value={"/login", "/registration"})
    public String HomePage() {
        return "index.html";
    }
}
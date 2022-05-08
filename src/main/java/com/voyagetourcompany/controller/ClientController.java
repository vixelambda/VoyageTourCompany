package com.voyagetourcompany.controller;

import com.voyagetourcompany.entity.Tour;
import com.voyagetourcompany.entity.User;
import com.voyagetourcompany.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class ClientController {
    @Autowired
    UserService userService;

    @GetMapping("/info")
    public User getUserInfo(){
        return userService.findByEmail(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
    }

    @PostMapping("/info")
    public User updateUserInfo(@RequestBody User user){
        return userService.updateUser(user);
    }

    @PostMapping("/booking")
    public User bookTour(@RequestBody Tour tour){
        return userService.bookTour(tour);
    }
}
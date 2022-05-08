package com.voyagetourcompany.controller;

import com.voyagetourcompany.entity.User;
import com.voyagetourcompany.model.LoginInput;
import com.voyagetourcompany.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/registration")
    public String addUser(@RequestBody User userForm) {
        if (userForm.getUsername().equals("")||
                userForm.getFirstname().equals("")||
                userForm.getLastname().equals("")||
                userForm.getPassword().equals("")||
                userForm.getEmail().equals("")||
                userForm.getMiddlename().equals("")||
                userForm.getPassportdata().equals("")||
                userForm.getAge()==0||
                userForm.getPhone().equals("")){
            return userForm.toString();
        }
        if (!userForm.getPassword().equals(userForm.getPasswordConfirm())){
            return "Пароли не совпадают";
        }
        String answer = userService.saveUser(userForm);
        if (!answer.equals("")){
            return "usernameError";
        }
        return "success";
    }

    @PostMapping("/login")
    ResponseEntity<String> auth(@RequestBody LoginInput loginInput) {
        return userService.login(loginInput);
    }
}
package com.voyagetourcompany.service;

import com.voyagetourcompany.config.JWTUtil;
import com.voyagetourcompany.entity.Role;
import com.voyagetourcompany.entity.Tour;
import com.voyagetourcompany.entity.User;
import com.voyagetourcompany.model.LoginInput;
import com.voyagetourcompany.repository.RoleRepository;
import com.voyagetourcompany.repository.TourRepository;
import com.voyagetourcompany.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService implements UserDetailsService {
    @PersistenceContext
    private EntityManager em;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    TourRepository tourRepository;
    @Autowired
    JWTUtil jwtUtil;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) throw new UsernameNotFoundException("Пользователь не найден");
        return user;
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public String saveUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return "Этот логин занят";
        }
        if(userRepository.findByEmail(user.getEmail())!=null){
            return "Этот email занят";
        }
        user.setRoles(List.of(new Role(1L,"ROLE_USER")));
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "";
    }

    public User updateUser(User user){
        Optional<User> updatedUser = userRepository.findById(user.getId());
        if(updatedUser.isPresent()){
            updatedUser.get().setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            updatedUser.get().setFirstname(user.getFirstname());
            updatedUser.get().setLastname(user.getLastname());
            updatedUser.get().setMiddlename(user.getMiddlename());
            updatedUser.get().setPassportdata(user.getPassportdata());
            updatedUser.get().setPhone(user.getPhone());
            updatedUser.get().setEmail(user.getEmail());
            updatedUser.get().setAge(user.getAge());
            updatedUser.get().setUsername(user.getUsername());
            return userRepository.save(updatedUser.get());
        }
        return userRepository.save(user);
    }

    public boolean deleteUser(Long userId) {
        if (userRepository.findById(userId).isPresent()) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }


    public User bookTour(Tour tour){
        User user = userRepository.findByEmail(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
        tour.setCount(tour.getCount()-1);
        tourRepository.save(tour);
        user.getTours().add(tour);
        userRepository.save(user);

        return user;
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public ResponseEntity<String> login (LoginInput loginInput){
        if(userRepository.findByEmail(loginInput.getEmail()) !=null){
            User user = userRepository.findByEmail(loginInput.getEmail());
            if (bCryptPasswordEncoder.matches(loginInput.getPassword(), user.getPassword())) {
                String token = jwtUtil.generateToken(user);
                return new ResponseEntity(token, HttpStatus.OK);
            }
            return new ResponseEntity("Wrong Data", HttpStatus.UNAUTHORIZED);
        }
        else{
            return new ResponseEntity("", HttpStatus.NOT_FOUND);
        }
    }
}
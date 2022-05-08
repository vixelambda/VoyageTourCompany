package com.voyagetourcompany.controller;

import com.voyagetourcompany.entity.Tour;
import com.voyagetourcompany.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private TourService tourService;

    @PostMapping("/tours")
    Tour addTour(@RequestBody Tour tour) {
        return tourService.addTour(tour);
    }
    @PutMapping("/tours/{id}")
    Tour updateTour(@RequestBody Tour tour) {
        return tourService.addTour(tour);
    }
    @DeleteMapping("/tours/{id}")
    void deleteTour(@PathVariable long id) {
        tourService.deleteTour(id);
    }
}
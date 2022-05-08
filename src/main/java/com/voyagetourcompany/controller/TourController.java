package com.voyagetourcompany.controller;

import com.voyagetourcompany.entity.Tour;
import com.voyagetourcompany.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TourController {
    @Autowired
    private TourService tourService;

    @GetMapping("/api/tours")
    public List<Tour> getTours(){
        return tourService.getAll();
    }

    @GetMapping("/api/tours/{tourId}")
    public Tour getTourById(@PathVariable Long tourId){
        return tourService.findById(tourId);
    }
}
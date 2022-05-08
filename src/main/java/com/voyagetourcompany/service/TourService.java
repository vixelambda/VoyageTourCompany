package com.voyagetourcompany.service;

import com.voyagetourcompany.entity.Tour;
import com.voyagetourcompany.repository.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TourService {
    @Autowired
    TourRepository tourRepository;

    public List<Tour> getAll(){
        return tourRepository.findAll();
    }

    public Tour findById(Long id){
        Optional<Tour> tour = tourRepository.findById(id);
        return tour.get();
    }

    public Tour addTour(Tour tour){
        tourRepository.save(tour);
        return tour;
    }

    public void deleteTour(Long id){
        tourRepository.deleteById(id);
    }
}
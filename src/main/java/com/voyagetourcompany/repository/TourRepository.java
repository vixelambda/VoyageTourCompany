package com.voyagetourcompany.repository;

import com.voyagetourcompany.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourRepository extends JpaRepository<Tour, Long> {
}
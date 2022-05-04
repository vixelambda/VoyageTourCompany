package com.voyagetourcompany.repository;

import com.voyagetourcompany.entity.Description;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DescriptionRepository extends JpaRepository<Description,Long> {
}
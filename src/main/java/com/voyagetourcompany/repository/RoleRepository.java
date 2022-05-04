package com.voyagetourcompany.repository;

import com.voyagetourcompany.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
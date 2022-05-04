package com.voyagetourcompany.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name = "descriptions")
@ToString
public class Description implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String img;
    private String text;

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Tour tour;
}
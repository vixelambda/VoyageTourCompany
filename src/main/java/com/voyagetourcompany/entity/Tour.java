package com.voyagetourcompany.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@Table(name = "tours")
@ToString
public class Tour implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String start;
    private String finish;
    private int price;
    private String date;
    private int count;

    @OneToOne(mappedBy = "tour",cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JsonIgnoreProperties("tour")
    private Description description;

    @ManyToMany(mappedBy = "tours",cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    private List<User> users;
}
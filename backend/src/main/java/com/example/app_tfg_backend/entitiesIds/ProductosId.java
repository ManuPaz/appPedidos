package com.example.app_tfg_backend.entitiesIds;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@Embeddable
public class ProductosId implements Serializable {
    @Column(name = "nombre")
    private String nombre ;
    @Column(name = "familia")
    private String familia;
    @Column(name = "subfamilia")
    private String subfamilia;






}
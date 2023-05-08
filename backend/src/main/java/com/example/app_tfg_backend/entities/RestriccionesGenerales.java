package com.example.app_tfg_backend.entities;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="restricciones_generales")
public class RestriccionesGenerales {
    @Id
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "valor")
    private String valor;
}

package com.example.app_tfg_backend.entities;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="opciones_cliente")
public class OpcionesCliente {
    @Id
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "valor")
    private String valor;
    @ManyToOne()
    @JoinColumn(name = "nombre_usuario", referencedColumnName = "nombre_usuario")
    private Usuario usuario;
}

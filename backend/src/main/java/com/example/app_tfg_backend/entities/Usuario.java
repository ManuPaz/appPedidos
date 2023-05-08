package com.example.app_tfg_backend.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="usuario")
public class Usuario {

    @Id
    @Column(name = "nombre_usuario")
    private String nombreUsuario;
    private String password;
    @Column(name = "correo_electronico")
    private String correoElectronico;
    @Column(name = "codigo_ruta")
    private String codigoRuta;
    public  Usuario(String nombre){
        this.nombreUsuario=nombre;
    }
}

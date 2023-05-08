package com.example.app_tfg_backend.dtos;

import com.example.app_tfg_backend.entities.Usuario;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
public class OpcionesClienteDTO {
    private String nombre;
    private String valor;
}

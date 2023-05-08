package com.example.app_tfg_backend.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UsuarioDTO {
    private String nombreUsuario;
    private String correoElectronico;
    private String password;


}

package com.example.app_tfg_backend.mappings;

import com.example.app_tfg_backend.dtos.UsuarioDTO;
import com.example.app_tfg_backend.entities.Usuario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class UsuarioToUsuarioDTO {
    public abstract UsuarioDTO usuarioToUsuarioDTO(Usuario source);
}

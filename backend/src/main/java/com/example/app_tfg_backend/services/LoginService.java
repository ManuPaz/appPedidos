package com.example.app_tfg_backend.services;

import com.example.app_tfg_backend.dtos.UsuarioDTO;
import com.example.app_tfg_backend.entities.Usuario;
import com.example.app_tfg_backend.mappings.UsuarioToUsuarioDTO;
import com.example.app_tfg_backend.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class LoginService {
    @Autowired
    private UsuarioToUsuarioDTO usuarioToUsuarioDTO;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioDTO login(UsuarioDTO usuarioDTO){

        Optional<Usuario> optionalUsuario=usuarioRepository.findUsuariosByNombreUsuarioAndPassword(usuarioDTO.getNombreUsuario(),usuarioDTO.getPassword());
        Usuario usuario=new Usuario();
        if (optionalUsuario.isPresent())
            usuario=optionalUsuario.get();
        usuarioDTO=usuarioToUsuarioDTO.usuarioToUsuarioDTO(usuario);
        return usuarioDTO;

    }
}

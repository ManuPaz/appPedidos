package com.example.app_tfg_backend.repositories;

import com.example.app_tfg_backend.entities.Usuario;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UsuarioRepository extends CrudRepository<Usuario,String> {
    Optional<Usuario> findUsuariosByNombreUsuarioAndPassword(String nombreUsuario, String password);
}

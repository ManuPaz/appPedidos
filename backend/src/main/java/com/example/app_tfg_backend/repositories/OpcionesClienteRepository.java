package com.example.app_tfg_backend.repositories;

import com.example.app_tfg_backend.entities.OpcionesCliente;
import com.example.app_tfg_backend.entities.Pedido;
import com.example.app_tfg_backend.entities.Usuario;
import com.example.app_tfg_backend.entitiesIds.PedidosId;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OpcionesClienteRepository extends CrudRepository<OpcionesCliente, String> {
    public List<OpcionesCliente> findAllByUsuario(Usuario usuario);



}

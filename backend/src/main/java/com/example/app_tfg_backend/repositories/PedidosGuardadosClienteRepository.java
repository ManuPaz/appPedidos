package com.example.app_tfg_backend.repositories;

import com.example.app_tfg_backend.entities.Pedido;
import com.example.app_tfg_backend.entities.PedidosGuardadosCliente;
import com.example.app_tfg_backend.entities.Usuario;
import com.example.app_tfg_backend.entitiesIds.PedidosId;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface PedidosGuardadosClienteRepository  extends CrudRepository<PedidosGuardadosCliente, String> {

    @Query("SELECT DISTINCT p.codigo FROM PedidosGuardadosCliente p where p.usuario=:usuario and p.seleccionado=True" )
    public Integer findGuardadoSeleccionado(@Param("usuario") String usuario);
    @Modifying
    @Query("update PedidosGuardadosCliente p set p.seleccionado=False where p.usuario=:usuario ")
    public void updateGuardadoSeleccionado(@Param("usuario") String usuario);
}

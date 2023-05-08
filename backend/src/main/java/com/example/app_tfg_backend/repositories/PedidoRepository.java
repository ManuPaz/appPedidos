package com.example.app_tfg_backend.repositories;

import com.example.app_tfg_backend.entities.Pedido;
import com.example.app_tfg_backend.entities.Usuario;
import com.example.app_tfg_backend.entitiesIds.PedidosId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface PedidoRepository   extends CrudRepository<Pedido, PedidosId> {


    @Query("SELECT DISTINCT p.fecha FROM Pedido p where p.usuario=:usuario and p.prefijo_codigo='ve'" )
    public Iterable<Date> findDistinctFechasPorUsuario(@Param("usuario") Usuario usuario);

    @Query("SELECT p FROM Pedido p where p.usuario=:usuario and date(p.fecha)=:fecha and p.prefijo_codigo='ve'" )
    public Iterable<Pedido> findPedidoPorFecha(@Param("usuario") Usuario usuario,@Param("fecha") Date fecha);


    @Query("SELECT p FROM Pedido p where p.pedidosId.codigo=:codigo " )
    public Iterable<Pedido> findPedidoPorCodigo(@Param("codigo") Integer codigo);

    @Query("SELECT p FROM Pedido p where p.usuario=:usuario  and p.prefijo_codigo='conf'" )
    public Iterable<Pedido> findPedidosGuardados(@Param("usuario") Usuario usuario);

    @Query("SELECT p FROM Pedido p where p.usuario=:usuario  and p.prefijo_codigo='ve' and p.fecha>= all(select p1.fecha from Pedido p1 where p1.usuario=:usuario  and p1.prefijo_codigo='ve')" )
    public Iterable<Pedido> findUltimoPedido(@Param("usuario") Usuario usuario);


}

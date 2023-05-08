package com.example.app_tfg_backend.repositories;

import com.example.app_tfg_backend.entities.Producto;
import com.example.app_tfg_backend.entitiesIds.ProductosId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductoRepository  extends CrudRepository<Producto, ProductosId> {
    public Iterable<Producto> findAllByProductosIdFamilia(String familia);
    public Iterable<Producto> findAllByProductosIdFamiliaAndProductosIdSubfamilia(String familia,String subfamilia);
    @Query("SELECT DISTINCT p.productosId.familia FROM Producto p  ")
    public List<String> findDistinctFamilia();
    @Query("SELECT DISTINCT p.productosId.subfamilia FROM Producto p where p.productosId.familia=:familia" )
    public List<String> findDistinctSubfamiliaByFamilia(@Param("familia")String familia);

    @Query("SELECT p FROM Producto p where  p.productosId.subfamilia like :nombre or p.productosId.nombre like :nombre ")
    public List<Producto> buscarProducto(@Param("nombre")String nombre);


}

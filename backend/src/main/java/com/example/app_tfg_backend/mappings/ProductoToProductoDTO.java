package com.example.app_tfg_backend.mappings;

import com.example.app_tfg_backend.dtos.ProductoDTO;
import com.example.app_tfg_backend.dtos.UsuarioDTO;
import com.example.app_tfg_backend.entities.Producto;
import com.example.app_tfg_backend.entities.Usuario;
import com.example.app_tfg_backend.entitiesIds.ProductosId;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class ProductoToProductoDTO {


    @Mappings({@Mapping(target = "nombre", source = "productosId.nombre"),
            @Mapping(target = "familia", source = "productosId.familia"),
            @Mapping(target = "subfamilia", source = "productosId.subfamilia"),
            @Mapping(target = "precio", source = "precio"),
    })
    public abstract ProductoDTO productoToProductoDTO(Producto producto);
    public abstract List<ProductoDTO> productoListToProductoDTO(List<Producto> productos);
}

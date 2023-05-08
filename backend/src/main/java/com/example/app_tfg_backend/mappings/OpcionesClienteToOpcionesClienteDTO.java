package com.example.app_tfg_backend.mappings;

import com.example.app_tfg_backend.dtos.OpcionesClienteDTO;
import com.example.app_tfg_backend.dtos.ProductoDTO;
import com.example.app_tfg_backend.entities.OpcionesCliente;
import com.example.app_tfg_backend.entities.Producto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class OpcionesClienteToOpcionesClienteDTO {


    @Mappings({@Mapping(target = "nombre", source = "nombre"),
            @Mapping(target = "valor", source = "valor"),
    })
    public abstract OpcionesClienteDTO opcionesClienteToOpcionesClienteDTO(OpcionesCliente opcionesCliente);
    public abstract List<OpcionesClienteDTO> opcionesClienteListToOpcionesClienteDTOList(List<OpcionesCliente> opcionesCliente);
}

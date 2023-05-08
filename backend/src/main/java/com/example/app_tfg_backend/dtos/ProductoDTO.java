package com.example.app_tfg_backend.dtos;

import com.example.app_tfg_backend.entitiesIds.ProductosId;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class ProductoDTO {
    private String familia;
    private String subfamilia;
    private String nombre;
    private Double precio;
    private Double precioAnterior;
    private Integer unidadesPorCaja;
    private Integer numeroUnidades;
}

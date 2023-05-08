package com.example.app_tfg_backend.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class PedidoDTO {
    private ArrayList<ProductoDTO> productos;
    private String usuario;
    private Date fecha;
    private String codigo;

}

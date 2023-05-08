package com.example.app_tfg_backend.entities;
import com.example.app_tfg_backend.entitiesIds.PedidosId;
import com.example.app_tfg_backend.entitiesIds.ProductosId;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="productos")
public class Producto {
    @EmbeddedId
    private ProductosId productosId;
    private Double precio;
    @Column(name = "unidades_por_caja")
    private Integer unidadesPorCaja;

}

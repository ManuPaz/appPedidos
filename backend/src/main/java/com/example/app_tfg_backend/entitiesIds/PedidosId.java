package com.example.app_tfg_backend.entitiesIds;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@Data
@Embeddable
public class PedidosId implements Serializable {
    @Column(name = "codigo")
    private Integer codigo ;

    private ProductosId productosId;





}
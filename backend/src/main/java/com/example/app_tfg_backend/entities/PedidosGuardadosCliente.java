package com.example.app_tfg_backend.entities;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="pedidos_guardados_cliente")
public class PedidosGuardadosCliente {
    @Id
    @Column(name = "codigo")
    private Integer codigo;
    @Column(name = "seleccionado")
    private boolean seleccionado;
    @Column(name = "usuario")
    private String usuario;

}

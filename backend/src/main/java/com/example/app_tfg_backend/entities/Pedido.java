package com.example.app_tfg_backend.entities;

import com.example.app_tfg_backend.entitiesIds.PedidosId;
import com.example.app_tfg_backend.entitiesIds.ProductosId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.parameters.P;

import javax.persistence.*;
import java.util.Date;

@Entity()
@Table(name="pedidos")
@Getter
@Setter
@NoArgsConstructor
public class Pedido {
    @EmbeddedId
    private PedidosId pedidosId;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "nombre", referencedColumnName = "nombre", insertable = false, updatable = false),
            @JoinColumn(name = "familia", referencedColumnName = "familia", insertable = false, updatable = false),
            @JoinColumn(name = "subfamilia", referencedColumnName = "subfamilia", insertable = false, updatable = false),
    })
    @JsonIgnore
    private Producto producto;

    @ManyToOne()
    @JoinColumn(name = "usuario", referencedColumnName = "nombre_usuario")
    private Usuario usuario;

    private String prefijo_codigo;
    private Integer numero;
    private Double precio;

    private Date fecha;

    public Pedido(String familia,String subfamilia,String nombre,Integer numeroDeUnidades,Integer codigo,String usuario,Date fecha,Double precio,String prefijo_codigo) {
        this.pedidosId=new PedidosId();
        pedidosId.setCodigo(codigo);
        this.usuario=new Usuario(usuario);
        this.producto=new Producto();
        ProductosId productosId=new ProductosId();
        productosId.setNombre(nombre);
        productosId.setFamilia(familia);
        productosId.setSubfamilia(subfamilia);
        this.pedidosId.setProductosId(productosId);
        this.producto.setProductosId(productosId);
        this.numero=numeroDeUnidades;
        this.fecha=fecha;
        this.precio=precio;
        this.prefijo_codigo=prefijo_codigo;
    }
}

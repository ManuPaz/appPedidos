package com.example.app_tfg_backend.services;


import com.example.app_tfg_backend.dtos.ProductoDTO;
import com.example.app_tfg_backend.entities.Producto;
import com.example.app_tfg_backend.mappings.ProductoToProductoDTO;
import com.example.app_tfg_backend.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private ProductoToProductoDTO productoToProductoDTO;



    public Iterable<ProductoDTO> buscarProductos(String nombre){
        Iterable<Producto> prod= productoRepository.buscarProducto("%"+nombre+"%");
        Iterable<ProductoDTO> prodDTO=productoToProductoDTO.productoListToProductoDTO((List<Producto>) prod);
        return  prodDTO;
    }
    public Iterable cargarProductosSubfamilia(String familia,String subfamilia){
        Iterable<Producto> prod=productoRepository.findAllByProductosIdFamiliaAndProductosIdSubfamilia(familia,subfamilia);
        Iterable<ProductoDTO> prodDTO=productoToProductoDTO.productoListToProductoDTO((List<Producto>) prod);
        return  prodDTO;

    }
    public Iterable cargarProductosFamilia(String familia){
        Iterable<Producto> prod=productoRepository.findAllByProductosIdFamilia(familia);
        Iterable<ProductoDTO> prodDTO=productoToProductoDTO.productoListToProductoDTO((List<Producto>) prod);
        return  prodDTO;

    }
    public Iterable cargarFamilias(){
        Iterable<String> fam=productoRepository.findDistinctFamilia();
        return fam;

    }
    public Iterable cargarSubFamilias(String familia){
        Iterable<String> fam=productoRepository.findDistinctSubfamiliaByFamilia(familia);
        return fam;

    }

}

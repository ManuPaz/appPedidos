package com.example.app_tfg_backend.services;

import com.example.app_tfg_backend.dtos.ProductoDTO;
import com.example.app_tfg_backend.dtos.PedidoDTO;
import com.example.app_tfg_backend.entities.Pedido;
import com.example.app_tfg_backend.entities.Usuario;
import com.example.app_tfg_backend.mappings.ProductoToProductoDTO;
import com.example.app_tfg_backend.repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class PedidoService {
    @Autowired
    PedidoRepository pedidoRepository;
    @PersistenceContext
    private EntityManager manager;
    @Autowired
    private ProductoToProductoDTO productoToProductoDTO;

    @Transactional
    public Integer hacerPedido(PedidoDTO productosYUsuarioPedidoDTO, String prefijoCodigo) {
        Integer codigo = generarCodigoPedido();

        ArrayList<Pedido> pedidos = new ArrayList<>();
        ArrayList<ProductoDTO> productos = productosYUsuarioPedidoDTO.getProductos();
        for (ProductoDTO producto : productos) {
            pedidos.add(new Pedido(producto.getFamilia(), producto.getSubfamilia(), producto.getNombre(), producto.getUnidadesPorCaja(), codigo, productosYUsuarioPedidoDTO.getUsuario(), productosYUsuarioPedidoDTO.getFecha(), producto.getPrecio(), prefijoCodigo));

        }
        if (pedidos.size() > 0) {
            try {
                pedidoRepository.saveAll(pedidos);
            } catch (Exception e) {

                return null;
            }
            return codigo;
        }
        return null;
    }

    public Integer generarCodigoPedido() {
        //Query query=manager.createQuery("select u.nombreUsuario from Usuario u ");
        Object codigo = manager.createQuery("select max(p.pedidosId.codigo) from Pedido p").getSingleResult();
        return (codigo == null) ? 1 : (Integer) codigo + 1;


    }

    public Iterable<Date> getFechasPedidos(String usuario) {
        Usuario u = new Usuario();
        u.setNombreUsuario(usuario);
        return pedidoRepository.findDistinctFechasPorUsuario(u);
    }

    public HashMap<String, PedidoDTO> tranformPedidoToPedidoDTO(List<Pedido> pedidosBrutos) {

        if (pedidosBrutos.size() > 0) {
            HashMap<String, PedidoDTO> pedidosMap = new HashMap<>();
            for (Pedido pedidoBruto : pedidosBrutos) {
                String codigo = String.valueOf(pedidoBruto.getPedidosId().getCodigo());
                if (!pedidosMap.containsKey(codigo)) {
                    PedidoDTO pedido = new PedidoDTO();
                    pedido.setUsuario(pedidoBruto.getUsuario().getNombreUsuario());
                    pedido.setFecha(pedidoBruto.getFecha());
                    pedido.setCodigo(codigo);
                    pedido.setProductos(new ArrayList<>());
                    pedidosMap.put(codigo, pedido);
                }
                ProductoDTO productoDTO = productoToProductoDTO.productoToProductoDTO(pedidoBruto.getProducto());
                productoDTO.setNumeroUnidades(pedidoBruto.getNumero());
                productoDTO.setPrecioAnterior(pedidoBruto.getPrecio());
                pedidosMap.get(codigo).getProductos().add(productoDTO);

            }

            return pedidosMap;
        } else return null;

    }

    public HashMap<String, PedidoDTO> getPedidoPorFecha(String usuario, String fecha) {
        Usuario u = new Usuario();
        u.setNombreUsuario(usuario);
        ;
        try {
            Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(fecha);

            List<Pedido> pedidosBrutos = (List<Pedido>) pedidoRepository.findPedidoPorFecha(u, date1);
            return tranformPedidoToPedidoDTO(pedidosBrutos);

        } catch (ParseException e) {
            return null;
        }

    }

    @Transactional
    public PedidoDTO findUltimoPedido(String nombreUsuario) {
        Usuario u = new Usuario();
        u.setNombreUsuario(nombreUsuario);
        List<Pedido> pedidosRaw = (List<Pedido>) pedidoRepository.findUltimoPedido(u);
        HashMap<String, com.example.app_tfg_backend.dtos.PedidoDTO> pedidoDTOHashMap = this.tranformPedidoToPedidoDTO(pedidosRaw);
        if (pedidoDTOHashMap!=null && pedidoDTOHashMap.keySet().toArray().length > 0)
            return pedidoDTOHashMap.get(pedidoDTOHashMap.keySet().toArray()[0]);
        return null;
    }


}

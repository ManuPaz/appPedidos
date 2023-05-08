package com.example.app_tfg_backend.services;


import com.example.app_tfg_backend.dtos.OpcionesClienteDTO;
import com.example.app_tfg_backend.dtos.PedidoDTO;
import com.example.app_tfg_backend.entities.OpcionesCliente;
import com.example.app_tfg_backend.entities.Pedido;
import com.example.app_tfg_backend.entities.PedidosGuardadosCliente;
import com.example.app_tfg_backend.entities.Usuario;
import com.example.app_tfg_backend.mappings.OpcionesClienteToOpcionesClienteDTO;
import com.example.app_tfg_backend.repositories.OpcionesClienteRepository;
import com.example.app_tfg_backend.repositories.PedidoRepository;
import com.example.app_tfg_backend.repositories.PedidosGuardadosClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;

@Service
public class RestriccionesService {
    @Autowired
    private OpcionesClienteRepository opcionesClienteRepository;
    @Autowired
    private PedidosGuardadosClienteRepository pedidosGuardadosClienteRepository;
    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private OpcionesClienteToOpcionesClienteDTO opcionesClienteToOpcionesClienteDTO;
    @Autowired
    private PedidoService pedidoService;

    public Iterable<OpcionesClienteDTO> getOpcionesCliente(String nombreUsuario) {
        Usuario usuario = new Usuario();
        usuario.setNombreUsuario(nombreUsuario);
        List<OpcionesCliente> op = opcionesClienteRepository.findAllByUsuario(usuario);
        List<OpcionesClienteDTO> opDTO = opcionesClienteToOpcionesClienteDTO.opcionesClienteListToOpcionesClienteDTOList(op);
        return opDTO;
    }

    public void setpcionesCliente(OpcionesCliente opt) {
        opcionesClienteRepository.save(opt);
    }

    public PedidoDTO getPedidoBase(String usuario) {
        Integer codigo = pedidosGuardadosClienteRepository.findGuardadoSeleccionado(usuario);
        if (codigo != null) {
            List<Pedido> pedidosRaw = (List<Pedido>) pedidoRepository.findPedidoPorCodigo(codigo);
            HashMap<String, PedidoDTO> pedidoDTOHashMap = pedidoService.tranformPedidoToPedidoDTO(pedidosRaw);
            if (pedidoDTOHashMap != null) {
                return pedidoDTOHashMap.get(pedidoDTOHashMap.keySet().toArray()[0]);

            }
            return null;

        }
        return null;
    }

    public HashMap<String, PedidoDTO> findPedidosGuardados(String nombreUsuario) {
        Usuario usuario = new Usuario();
        usuario.setNombreUsuario(nombreUsuario);
        List<Pedido> pedidosRaw = (List<Pedido>) pedidoRepository.findPedidosGuardados(usuario);
        HashMap<String, PedidoDTO> pedidoDTOHashMap = pedidoService.tranformPedidoToPedidoDTO(pedidosRaw);
        return pedidoDTOHashMap;
    }
    @Transactional
    public Integer guardarPedidoConfigurado(PedidoDTO productosYUsuarioPedidoDTO){

            String prefijoCodigo = "conf";
            Integer codigo = pedidoService.hacerPedido(productosYUsuarioPedidoDTO, prefijoCodigo);
            if(codigo!=null) {
                PedidosGuardadosCliente pedidosGuardadosCliente = new PedidosGuardadosCliente();
                pedidosGuardadosCliente.setCodigo(codigo);
                pedidosGuardadosCliente.setUsuario(productosYUsuarioPedidoDTO.getUsuario());
                pedidosGuardadosCliente.setSeleccionado(false);
                this.guardarPedidoBase(pedidosGuardadosCliente);
            }
            return codigo;

    }
    @Transactional
    public void guardarPedidoBase(PedidosGuardadosCliente pedidosGuardadosCliente) {
        if (pedidosGuardadosCliente.isSeleccionado()) {
            pedidosGuardadosClienteRepository.updateGuardadoSeleccionado(pedidosGuardadosCliente.getUsuario());

        }
        try {
            pedidosGuardadosClienteRepository.save(pedidosGuardadosCliente);


        } catch (Exception exception) {
        }
    }
}

package com.example.app_tfg_backend.api_rest;

import com.example.app_tfg_backend.dtos.*;
import com.example.app_tfg_backend.entities.OpcionesCliente;
import com.example.app_tfg_backend.entities.PedidosGuardadosCliente;
import com.example.app_tfg_backend.modelosRest.UsuarioFechaPedido;
import com.example.app_tfg_backend.services.LoginService;
import com.example.app_tfg_backend.services.PedidoService;
import com.example.app_tfg_backend.services.ProductoService;
import com.example.app_tfg_backend.services.RestriccionesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.HashMap;
import java.util.logging.Logger;

@RestController
public class Controller {
    @Autowired
    private LoginService login;
    @Autowired
    private ProductoService productoService;
    @Autowired
    private PedidoService pedidoService;
    @Autowired
    private RestriccionesService restriccionesService;
    public  Controller(){

    }



    @PostMapping(value = "/login",
            produces = {"application/json"},
            consumes = {"application/json"})
    ResponseEntity<UsuarioDTO> login(@Valid @RequestBody UsuarioDTO user) {
        user=login.login(user);
        return new ResponseEntity<UsuarioDTO>(user,HttpStatus.OK);
    }
    @PostMapping(value = "/getProductos",
            produces = {"application/json"}
          )
    ResponseEntity<Iterable<ProductoDTO>> getProductos(@RequestBody Familia familia ) {
        Iterable<ProductoDTO> prod=productoService.cargarProductosFamilia(familia.getFamilia());
        return new ResponseEntity<Iterable<ProductoDTO>>(prod,HttpStatus.OK);
    }

    @PostMapping(value = "/getProductosSubfamilia",
            produces = {"application/json"}
    )
    ResponseEntity<Iterable<ProductoDTO>> getProductosSubfamilia(@RequestBody Familia familia ) {
        Iterable<ProductoDTO> prod=productoService.cargarProductosSubfamilia(familia.getFamilia(),familia.getSubfamilia());
        return new ResponseEntity<Iterable<ProductoDTO>>(prod,HttpStatus.OK);
    }

    @PostMapping(value = "/getSubfamilias",
            produces = {"application/json"}
    )
    ResponseEntity<Iterable<String>> getSubfamilias(@RequestBody Familia familia ) {
        Iterable<String> prod=productoService.cargarSubFamilias(familia.getFamilia());
        return new ResponseEntity<Iterable<String>>(prod,HttpStatus.OK);
    }

    @GetMapping(value = "/getFamilias",
            produces = {"application/json"}
    )
    ResponseEntity<Iterable<String>> getFamilias() {
        return new ResponseEntity<Iterable<String>>(productoService.cargarFamilias(),HttpStatus.OK);
    }
    @PostMapping(value = "/hacerPedido"

    )
    ResponseEntity<Integer> hacerPedido(@Valid @RequestBody PedidoDTO pedidoDTO) {
        String prefijoCodigo = "ve";
        return new ResponseEntity<Integer>(pedidoService.hacerPedido(pedidoDTO,prefijoCodigo),HttpStatus.OK);
    }
    @PostMapping(value = "/getOpcionesCliente"
    )
    ResponseEntity<Iterable<OpcionesClienteDTO>> getOpcionesCliente(@Valid @RequestBody String usuario) {
        Iterable<OpcionesClienteDTO> opcionesClientes= restriccionesService.getOpcionesCliente(usuario.replace("\"",""));
        return new ResponseEntity<Iterable<OpcionesClienteDTO>>(opcionesClientes,HttpStatus.OK);
    }
    @PostMapping(value = "/setOpcionesCliente"
    )
    ResponseEntity<Iterable<OpcionesClienteDTO>> setOpcionesCliente(@Valid @RequestBody OpcionesCliente opt) {
        restriccionesService.setpcionesCliente(opt);
        Iterable<OpcionesClienteDTO> opcionesClientes= restriccionesService.getOpcionesCliente(opt.getUsuario().getNombreUsuario());
        return new ResponseEntity<Iterable<OpcionesClienteDTO>>(opcionesClientes,HttpStatus.OK);
    }
    @PostMapping(value="/buscarProductos")
    ResponseEntity<Iterable<ProductoDTO>> buscarProductos(@RequestBody  String raw) {
        Iterable<ProductoDTO>productos=productoService.buscarProductos(raw.replace("\"",""));
        return new ResponseEntity<Iterable<ProductoDTO>>(productos,HttpStatus.OK);
    }
    @PostMapping(value="/getFechasPedidos")
    ResponseEntity<Iterable<Date>> getFechasPedidos(@RequestBody  String nombreUsuario) {
        Iterable<Date>fechas=pedidoService.getFechasPedidos(nombreUsuario.replace("\"",""));
        return new ResponseEntity<Iterable<Date>>(fechas,HttpStatus.OK);
    }
    @PostMapping(value="/getPedidoPorFecha")
    ResponseEntity<HashMap<String, PedidoDTO>> getPedidoPorFecha(@RequestBody UsuarioFechaPedido usuarioFechaPedido) {
        HashMap<String, PedidoDTO> productosYUsuarioPedidoDTO=pedidoService.getPedidoPorFecha(usuarioFechaPedido.getUsuario(),usuarioFechaPedido.getFecha());
        return new ResponseEntity<HashMap<String, PedidoDTO>>(productosYUsuarioPedidoDTO,HttpStatus.OK);
    }
    @PostMapping(value="/getPedidoBase")
    ResponseEntity<PedidoDTO> getPedidoBase(@RequestBody String nombreUsuario) {
        PedidoDTO productosYUsuarioPedidoDTO=restriccionesService.getPedidoBase(nombreUsuario.replace("\"",""));
        return new ResponseEntity<PedidoDTO>(productosYUsuarioPedidoDTO,HttpStatus.OK);
    }

    @PostMapping(value = "/guardarPedidoBase"

    )
    ResponseEntity<PedidoDTO> guardarPedidoBase(@Valid @RequestBody PedidosGuardadosCliente pedidosGuardadosCliente) {
        restriccionesService.guardarPedidoBase(pedidosGuardadosCliente);
        PedidoDTO p=restriccionesService.getPedidoBase(pedidosGuardadosCliente.getUsuario());
        return new ResponseEntity<PedidoDTO>(p,HttpStatus.OK);
    }
    @PostMapping(value = "/guardarPedidoConfigurado"

    )
    ResponseEntity<Integer>guardarPedidoConfigurado(@Valid @RequestBody PedidoDTO pedidoDTO) {
        try {
            Integer codigo = restriccionesService.guardarPedidoConfigurado(pedidoDTO);
            if (codigo!=null) {
                return new ResponseEntity<>(codigo, HttpStatus.OK);
            }else{
                return new ResponseEntity<>(codigo, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping(value = "/getPedidosConfigurados"

    )
    ResponseEntity<HashMap<String, PedidoDTO>> getPedidosConfigurados(@Valid @RequestBody String nombreUsuario) {
        return new ResponseEntity<>(restriccionesService.findPedidosGuardados(nombreUsuario.replace("\"","")),HttpStatus.OK);
    }

    @PostMapping(value = "/getUltimoPedido"

    )
    ResponseEntity<PedidoDTO>getUltimoPedido(@Valid @RequestBody String nombreUsuario) {
        try {
            PedidoDTO p = pedidoService.findUltimoPedido(nombreUsuario.replace("\"", ""));
            if (p!=null) {
                return new ResponseEntity<>(p, HttpStatus.OK);
            }else{
                return new ResponseEntity<>(p, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}

import Carousel from "../Carousel/Carousel";
import Nav from "react-bootstrap/Nav";
import { getAllProducts } from "../../redux/action";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import './home.css'

const Home = () => {
    
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getAllProducts());
    }, [dispatch]);

    return (
        <div>
            <Carousel />
            <div className="filters_container mt-3">
            <main className="page-content">
                <div className="home-card">
                    <div className="content">
                        <h2 className="title">Camisetas</h2>
                        <p className="copy">Todas las camisetas de las mejores selecciones del mundo</p>
                        <Nav.Link href="/store" className="navLinks">
                            <button className="home-btn">Ir a tienda</button>
                        </Nav.Link>
                    </div>
                </div>
                <div className="home-card">
                <div className="content">
                      <h2 className="title">Pantalones</h2>
                      <p className="copy">Todos los pantalones de las mejores selecciones del mundo</p>
                      <Nav.Link href="/store" className="navLinks">
                        <button className="home-btn">Ir a tienda</button>
                      </Nav.Link>
                    </div>
                </div>
                <div className="home-card">
                  <div className="content">
                    <h2 className="title">Botines</h2>
                    <p className="copy">Botines de los mejores jugadores del mundo</p>
                    <Nav.Link href="/store" className="navLinks">
                        <button className="home-btn">Ir a tienda</button>
                    </Nav.Link>
                  </div>
                </div>
                <div className="home-card">
                  <div className="content">
                    <h2 className="title">Balones</h2>
                    <p className="copy">Balones oficiales del mundial, incluido el balon de entrenamiento!</p>
                    <Nav.Link href="/store" className="navLinks">
                        <button className="home-btn">Ir a tienda</button>
                    </Nav.Link>
                  </div>
                </div>
            </main>
            </div>
            <div className="page-content-z">
                <div className="one">
                    <h1>Mejores marcas</h1>
                    <p>Contamos con las mejores marcas y productos del mundo. Adidas, Nike, Puma confian en nosotros y vos tambien podes hacerlo. Hace tu pedido ya!</p>
                </div>
                <div className="two">
                    <img src="https://essential.vtexassets.com/arquivos/ids/543838-800-auto?v=637849500637700000&width=800&height=auto&aspect=true" alt="ea"></img>
                </div>
                <div className="three">
                    <img src="https://i1.t4s.cz/products/DB2367/adidas-nemeziz-messi-18-3-fg-j-138823-db2370-960.jpg" alt="ea" className="home-img"></img>
                </div>
                <div className="four">
                    <h1>Mejores productos</h1>
                    <p>Tenemos los mejores productos de las mejores selecciones de este mundial de Qatar 2022. </p>
                </div>
            </div>
            <div className="testimonios">
                <h1>Testimonios</h1>
                <p>proximamente</p>
            </div>
        </div>  
    )
}

export default Home
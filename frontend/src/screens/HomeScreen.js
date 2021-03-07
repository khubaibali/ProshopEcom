import React, { useState, useEffect } from "react";

import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");

      setProducts(data);
    };

    fetchProducts();
  }, []);
  return (
    <>
      <h1>Latest Product</h1>
<<<<<<< Updated upstream
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product key={product._id} product={product} />
          </Col>
        ))}
      </Row>
=======
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error} </Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product key={product._id} product={product} />
            </Col>
          ))}
        </Row>
      )}
>>>>>>> Stashed changes
    </>
  );
};

export default HomeScreen;

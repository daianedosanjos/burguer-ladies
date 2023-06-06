import { useState, useEffect } from "react";
import {
  Button,
  DivButtons,
  DivMenu,
} from "../styles/Ordered.styles";
import { getProduct } from "../services/api";
import Cards from "../Components/Cards";

const Ordered = ({ handleClick }) => {
  const [products, setProducts] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [showTypes, setShowTypes] = useState(false);

  const apiGet = async () => {
    getProduct()
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
    }).catch((error) => {
      console.log(error)
    }) 
  };
  useEffect(() => {
    apiGet();
  }, []);

  const filterType = (type) => {
    setSelectedType(type);
    setShowTypes(true);
  };

  const filteredTypes = selectedType
    ? products.filter((product) => product.type === selectedType)
    : products;

    //enviar pedidos

     return (
    <main>    
  return (
    <main>
      <DivButtons>
        <Button onClick={() => filterType("café da manhã")}>
          Café da manhã
        </Button>
        <Button onClick={() => filterType("menu principal")}>
          Menu pricipal
        </Button>
      </DivButtons>
      <DivMenu>
        {showTypes &&
          filteredTypes.map((item) => (
            <Cards item={item} key={item.id} handleClick={handleClick} />              
            //  handleclik é uma props a função está vindo do componente testeOrdered
          ))}
      </DivMenu>
    </main>
  );
};

export default Ordered;

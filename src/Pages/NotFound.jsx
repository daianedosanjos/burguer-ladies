import { Error } from "../styles/NotFound.styled";
import imgError from "../assets/error.svg";

const NotFound = () => {
  return (
    <>
      <Error>
        <img src={imgError} alt="imagem de erro" />
        <p></p>
        <h1>Ops!</h1>
        <h2>404</h2>
        <p>Page Not Found</p>
      </Error>
    </>
  );
};

export default NotFound;

import { useState, useEffect } from "react";
import { getApi, deleteApi } from "../services/api";
import {
  BtnsUsers,
  CardUsers,
  H3,
  UsersContainer,
} from "../styles/ListUsers.styled";
import Header from "../Components/Header";
import { toast } from "react-toastify";
import EditUser from "../Components/EditUser";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  const getUsers = async () => {
    getApi(`users/`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  async function deleteUsers(user) {
    deleteApi(`users/${user.id}`)
      .then((response) => {
        if (response.ok) {
          toast.success("colaborador deletado com sucesso");
        }
      })
      .then((data) => {
        // const teste = users.filter( item => item.id !== user.id)
        setUsers((prevState) =>
          prevState.filter((item) => item.id !== user.id)
        );
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(user.id);
  };

  // const edit = ()=>{
  //   console.log("edit")
  //   const navigate = useNavigate();
  //   navigate("/editUser");
  //   EditUser()

  // }

  return (
    <>
      <Header />
      <H3>Lista de colaboradores</H3>
      <UsersContainer>
        {users.map((user) => {
          return (
            <>
              <CardUsers key={user.id}>
                <strong>Nome: </strong>
                {user.name} <br />
                <strong>Email: </strong>
                {user.email} <br />
                <strong>Setor: </strong>
                {user.role} <br />
                <BtnsUsers>
                  <button onClick={() => deleteUsers(user)}>Deletar colaborador</button>
                  <button onClick={() => setShow(true)}>Editar colaborador</button>
                </BtnsUsers>
              </CardUsers>            
             
            </>
          );
        })}
         {show &&
              <EditUser /> 
              }
      </UsersContainer>
      {users.forEach((user) => show &&
        <EditUser 
          name= {user.name}
          email= {user.email}
          password= {user.password}
          role= {user.role}
        />
      )}
    </>
  );
};

export default ListUsers;

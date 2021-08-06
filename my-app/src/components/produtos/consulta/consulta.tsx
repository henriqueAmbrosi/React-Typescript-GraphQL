import React, { useEffect } from 'react';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

type Produto = {
  id: string;
  description: string;
};

const OBTER_PRODUTOS = gql`
  query obterProdutos {
    product {
      id
      description
      price
      category
    }
  }
`;

const DELETAR_PRODUTO = gql`
  mutation deletarProduto($id: uuid) {
    delete_product(where: { id: { _eq: $id } }) {
      returning {
        category
        description
        price
        id
      }
    }
  }
`;

const Consulta = () => {
  const [obterProdutos, { loading, error, data }] =
    useLazyQuery(OBTER_PRODUTOS);
  const [deletarProd, deletar_produto] = useMutation(DELETAR_PRODUTO);

  useEffect(() => {
    obterProdutos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deletarProduto(id: String) {
    await deletarProd({
      variables: {
        id,
      },
    });
    await obterProdutos();
  }

  if (loading || deletar_produto.loading) return <p>Carregando...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.product.map((product: Produto) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {product.description}
              </TableCell>
              <TableCell component="th" scope="row">
                <Link
                  to={{
                    pathname: '/produtos/form',
                    state: { id: product.id },
                  }}
                >
                  <Button>Editar</Button>
                </Link>
                <Button onClick={() => deletarProduto(product.id)}>
                  Deletar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Consulta;

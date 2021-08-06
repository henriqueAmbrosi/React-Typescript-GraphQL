import React, { useState, useEffect } from 'react';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import makeStyles from '@material-ui/styles/makeStyles';

type Produto = {
  id: string;
  description: string;
  price?: number;
  category?: string;
};

const OBTER_PRODUTO = gql`
  query obterProduto($id: uuid) {
    product(where: { id: { _eq: $id } }) {
      price
      id
      description
      category
    }
  }
`;

const SALVAR_PRODUTO = gql`
  mutation ($description: String!) {
    insert_product(objects: { description: $description }) {
      returning {
        description
      }
    }
  }
`;

const ALTERAR_PRODUTO = gql`
  mutation ($id: uuid, $description: String!) {
    update_product(
      where: { id: { _eq: $id } }
      _set: { description: $description }
    ) {
      returning {
        category
        description
        id
        price
      }
    }
  }
`;

const Form = (props: any) => {
  const classes = useStyles();

  const [obterProduto, obter_produto] = useLazyQuery(OBTER_PRODUTO);
  const [salvarProduto, salvar_produto] = useMutation(SALVAR_PRODUTO);
  const [alterarProduto, alterar_produto] = useMutation(ALTERAR_PRODUTO);
  const [produto, setProduto] = useState<Produto>({} as Produto);

  useEffect(() => {
    async function dadosEdicao() {
      if (props.location.state?.id !== undefined) {
        await obterProduto({ variables: { id: props.location.state.id } });
      }
    }
    dadosEdicao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.state]);

  useEffect(() => {
    if (obter_produto.data?.product[0]?.description) {
      setProduto({ ...obter_produto.data.product[0] });
    }
  }, [obter_produto.data]);

  async function salvar() {
    if (produto?.description) {
      if (produto?.id) {
        await alterarProduto({ variables: { ...produto } });
      } else {
        await salvarProduto({ variables: { ...produto } });
      }
      props.history.goBack();
    }
  }

  if (
    obter_produto.loading ||
    salvar_produto.loading ||
    alterar_produto.loading
  )
    return <p>Carregando...</p>;

  return (
    <>
      <h1>Produtos</h1>

      <div>
        {props.location.state?.id !== undefined ? (
          <h2>Editar Produto</h2>
        ) : (
          <h2>Criar Produto</h2>
        )}
        <TextField
          value={produto?.description || ''}
          onChange={(e) =>
            setProduto({ ...produto, description: e.target.value })
          }
        />
        <div>
          <Button
            classes={{ root: classes.botaoSalvar }}
            variant="contained"
            onClick={salvar}
          >
            Salvar
          </Button>
          <Button classes={{ root: classes.botaoVoltar }} variant="contained">
            <Link to="/" style={{ color: 'white' }}>
              Voltar
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

const useStyles = makeStyles({
  botaoSalvar: {
    margin: '10px !important',

    backgroundColor: 'green !important',
  },
  botaoVoltar: {
    margin: '10px !important',
    backgroundColor: 'red !important',
  },
});

export default Form;

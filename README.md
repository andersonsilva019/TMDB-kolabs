## O que foi implementado nesta aplicação ?

Está aplicação tem por finalidade utilizar a API [TMDB](https://www.themoviedb.org/documentation/api) para realizar a filtragem de filmes, séries e pessoas.

*  `/movies` Página com listagem dos filmes populares. Os 20 primeiros itens da lista são gerados de forma estática via server side. Ao clicar no botão "ver mais", no final da lista, os próximos 20 itens são carregados via client side. 

<div align="center">
  <img width="500px" src="https://res.cloudinary.com/drsxhihfr/image/upload/v1631885916/images/page-movies_ljheen.png" alt="Pagina movies"/>
</div>

*  `/series` Página com listagem das séries populares. Todos os itens desta lista estão sendo carregadas via client side. As informações de cada item são carregadas também via client side.

<div align="center">
  <img width="500px" src="https://res.cloudinary.com/drsxhihfr/image/upload/v1631887005/images/page-series_wb5z1i.png" alt="Pagina series"/>
</div>

*  `/persons` Página com listagem das pessoas famosas. Todos os itens desta lista estão sendo carregadas via server side e as informações específicas de cada item está sendo carregadas via client side.

<div align="center">
  <img width="500px" src="https://res.cloudinary.com/drsxhihfr/image/upload/v1631887332/images/page-persons_eghmvd.png" alt="Pagina persons"/>
</div>

## Como executar o projeto

É necessário criar um arquivo `.env.local` e preencher os seguintes as váriaveis com sua API_KEY.

```env
  TMDB_API_KEY=
  NEXT_PUBLIC_TMDB_API_KEY=
```

Instale as dependências do projeto:
```bash
  yarn 
```
ou

```bash
  npm install
```

Execute o projeto:

```bash
  yarn dev
```
ou

```bash
  npm run dev
```

A aplicação está rodando em um servidor local, porta 3000.
> http://localhost:3000/movies
## Consideração finais

Para este desafio, essa foi a minha implementação. Portanto, novas features poderiam ser implementadas, tais como:

- Evitar request para o servidor
- Componentizar mais a aplicação
- Utilizar o theme do styled-components para definir uma style-guide.
- Utilizar mais os recursos do Next em relação a geração de páginas estáticas
- Utilizar a lib [react-window](https://github.com/bvaughn/react-window) na página `/movies` para evitar adicionar muitos items no HTML final e consequentemente melhorar a performance da aplicação.
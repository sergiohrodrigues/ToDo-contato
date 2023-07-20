'use client'
import Modal from "@/components/ModalAdicionarEAtualizar"
import { useEffect, useState } from "react"
import { styled } from "styled-components"
import { contato } from "@/states/atom"
import { useRecoilValue } from 'recoil'
import ModalExcluir from "@/components/ModalExcluir"
import { IContato } from "@/interface/IContato"
import Contato from "@/components/Contato"
import { mascaraTelefone } from "@/utilidades/mascaraTelefone"

const MainContainer = styled.main<{display: string}>`
  padding: 3rem;
  h2{
    font-size: 2.4rem;
    font-weight: bold;
    color: #333333;
  }
  .modalAtivo{
    display: ${props => props.display};
    background-color: lightgray;
    position: fixed;
    inset: 0;
    opacity: 0.8;
  }
`

const HeaderContainer = styled.header`
  background-color: #002D69;
  padding: 1rem;
  span{
    font-size: 1.5rem;
    padding: 1rem;
    color: #fff;
    strong{
      font-weight: bold;
    }
  }
`

const CriarEPesquisarContainer = styled.div`
  margin-top: 2rem;
  width: 50%;
  display: flex;
  justify-content: space-between;
  select{
    padding: 0.5rem;
    outline: none;
  }
  input{
    padding: 0.5rem;
    outline: none;
  }
  button{
    padding: 0.5rem 2rem;
    background-color: #007DFE;
    border: none;
    color: #fff;
  }
  button:hover{
    cursor: pointer;
  }
`

const ListaDeContatos = styled.ul`
  margin-top: 2rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  button{
    width: 30%;
    margin: 0 auto;
    background-color: #007DFE;
    border: none;
    border-radius: 1rem;
    padding: 1rem;
    color: #fff;
    font-weight: 700;
  }
  button:hover{
    cursor: pointer;
  }
`

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [itemSelecionado, setItemSelecionado] = useState<IContato | undefined>()
  const [opcaoDePesquisa, setOpocaoDePesquisa] = useState('')
  // const [pesquisa, setPesquisa] = useState('')

  const listaDeContato = useRecoilValue<IContato[]>(contato)

  const listaDeContatos = JSON.parse(JSON.stringify(listaDeContato))
  const [contatosOrdenados, setContatosOrdenados] = useState<IContato[]>([])

  useEffect(() => {
    ordenarPorNome()
    if(contatosOrdenados.length < 5){
      setQuantidadeDeItensIniciais(4)
      ordenarPorNome()
    }
  }, [listaDeContato])

  const ordenarPorNome = () => {
    const allContatos = listaDeContatos.sort((a: IContato, b: IContato) =>
    a.nome.localeCompare(b.nome)
    );
      setContatosOrdenados([...allContatos]);
  };

  const [ quantidadeDeItensIniciais, setQuantidadeDeItensIniciais] = useState(4)
  const startItens = contatosOrdenados.slice(0, quantidadeDeItensIniciais)

  function adicionarMaisItensALista(){
    setQuantidadeDeItensIniciais(contatosOrdenados.length)
  }

  return (
    <>
      <HeaderContainer>
        <span><strong>To</strong>Do</span>
      </HeaderContainer>
      <MainContainer display={modalOpen || modalDeleteOpen ? 'flex' : 'none'}>
        <div className="modalAtivo"></div>
        <h2>Meus contatos</h2>
        <CriarEPesquisarContainer>
          <div>
            <select value={opcaoDePesquisa} onChange={evento => setOpocaoDePesquisa(evento.target.value)}>
              <option>Selecione uma opção:</option>
              <option>Nome</option>
              <option value="Telefone">Telefone</option>
            </select>
            <input type="search" placeholder="Pesquisar" onChange={(evento) => {
              const itemPesquisadoPorNome = listaDeContato.filter(itemDaLista => itemDaLista.nome.toUpperCase().includes(evento.target.value.toUpperCase()))
              const itemPesquisadoPorTelefone = listaDeContato.filter(itemDaLista => itemDaLista.telefone.includes(mascaraTelefone(evento.target.value)))
              
              if(opcaoDePesquisa === 'Nome') {
                setContatosOrdenados(itemPesquisadoPorNome)
              } if(opcaoDePesquisa === 'Telefone'){
                setContatosOrdenados(itemPesquisadoPorTelefone)
              } if(evento.target.value === ''){
                const allContatos = listaDeContatos.sort((a: IContato, b: IContato) =>
                a.nome.localeCompare(b.nome)
                );
                setContatosOrdenados([...allContatos]);
              }
            }}/>  
          </div>
          <button onClick={() => setModalOpen(true)}>+ Novo contato</button>
        </CriarEPesquisarContainer>
      <ListaDeContatos>
         {startItens.map((contatos, index) => (
            <Contato key={index} contatos={{...contatos}} setModalDeleteOpen={setModalDeleteOpen} setItemSelecionado={setItemSelecionado} setModalOpen={setModalOpen}/>
          ))}
        {contatosOrdenados.length > 4 && 
        <button 
          disabled={contatosOrdenados.length > startItens.length ? false : true} 
          style={{backgroundColor: contatosOrdenados.length > startItens.length ? '#007DFE' : 'gray', cursor: contatosOrdenados.length > startItens.length ? 'pointer' : 'default'}} 
          onClick={adicionarMaisItensALista}
        >
          Carregar mais
        </button>}
      </ListaDeContatos>
      </MainContainer>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} itemSelecionado={itemSelecionado} setItemSelecionado={setItemSelecionado}/>
      <ModalExcluir modalDeleteOpen={modalDeleteOpen} setModalDeleteOpen={setModalDeleteOpen} itemSelecionado={itemSelecionado} setItemSelecionado={setItemSelecionado} adicionarMaisItensALista={adicionarMaisItensALista} ordenarPorNome={ordenarPorNome}/>
    </>
  )
}

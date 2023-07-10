'use client'
import Modal from "@/components/ModalAdicionarEAtualizar"
import { useEffect, useState } from "react"
import { styled } from "styled-components"
import { contato } from "@/states/atom"
import { useRecoilValue, useSetRecoilState } from 'recoil'
import ModalExcluir from "@/components/ModalExcluir"
import { IContato } from "@/interface/IContato"
import { PrimeiraLetraDoNome } from "@/utilidades/PrimeiraLetraDoNome"
import Contato from "@/components/Contato"
import { Icon } from "next/dist/lib/metadata/types/metadata-types"

const MainContainer = styled.main<{display: string}>`
  padding: 3rem 0 0 3rem;
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
`

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [itemSelecionado, setItemSelecionado] = useState<IContato | undefined>()
  const [pesquisa, setPesquisa] = useState('')

  const listaDeContato = useRecoilValue<IContato[]>(contato)

  const listaDeContatos = JSON.parse(JSON.stringify(listaDeContato))
  const [contatosOrdenados, setContatosOrdenados] = useState<IContato[]>([])

  useEffect(() => {
    ordenarPorNome()
  }, [])

  const ordenarPorNome = () => {
    const Allcontatos = listaDeContatos.sort((a: IContato, b: IContato) =>
      a.nome.localeCompare(b.nome)
    );
    setContatosOrdenados([...Allcontatos]);
  };

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
            <select value={pesquisa} onChange={evento => setPesquisa(evento.target.value)}>
              <option>Selecione uma opção:</option>
              <option>Nome</option>
              <option value="Telefone">Telefone</option>
            </select>
            <input type="search" placeholder="Pesquisar" onChange={(evento) => {
              // const itemPesquisado = listaDeContato.filter(itemDaLista => itemDaLista.nome.includes(evento.target.value))

              // console.log(itemPesquisa)
              // if(itemPesquisa.length === 0){
              //   setListaDeContato(listaDeContato)
              // } else {
              //   setListaDeContato(itemPesquisa)
              // }
            }}/>  
          </div>
          <button onClick={() => setModalOpen(true)}>+ Novo contato</button>
        </CriarEPesquisarContainer>
      <ListaDeContatos>
        {contatosOrdenados.map((contato, index) => (
          <Contato key={index} contato={{...contato}} setModalDeleteOpen={setModalDeleteOpen} setItemSelecionado={setItemSelecionado} setModalOpen={setModalOpen}/>
        ))}
      </ListaDeContatos>
      </MainContainer>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} itemSelecionado={itemSelecionado} setItemSelecionado={setItemSelecionado}/>
      <ModalExcluir modalDeleteOpen={modalDeleteOpen} setModalDeleteOpen={setModalDeleteOpen} itemSelecionado={itemSelecionado} setItemSelecionado={setItemSelecionado}/>
        </>
    )
  }

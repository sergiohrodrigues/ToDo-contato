'use client'
import Modal from "@/components/ModalAdicionar"
import { useState } from "react"
import { styled } from "styled-components"
import { contato } from "@/states/atom"
import { useRecoilValue } from 'recoil'
import Image from "next/image"
import ImagemContato from '../assets/contato.png'
import { BiEdit } from 'react-icons/bi'
import { RiCloseCircleLine } from 'react-icons/ri'
import ModalExcluir from "@/components/ModalExcluir"
import { IContato } from "@/interface/IContato"

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
  li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid lightgray;
    .infos{
      display: flex;
      align-items: center;
      gap: 2rem;
      .letra{
        text-transform: uppercase;
        background-color: red;
        padding: 0.4rem;
        border-radius: 0.5rem;
        color: #fff;
      }
      div{
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        h2{
          font-size: 1.5rem;
        }
      }
    }
    .botoes{
      display: flex;
      gap: 1rem;
      svg{
        font-size: 1.5rem;
      }
      svg:hover{
        cursor: pointer;
      }
    }
  }
`

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [itemSelecionado, setItemSelecionado] = useState<IContato>()

  const listaDeContato = useRecoilValue(contato)

  const abrirModalDelete = (contato: IContato) => {
    setModalDeleteOpen(true)
    setItemSelecionado(contato)
  }
  
  const abrirModalAtualizar = (contato: IContato) => {
    // setModalOpen(true)
    // setItemSelecionado(contato)
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
            <select>
              <option value="">Nome</option>
              <option value="">Telefone</option>
            </select>
            <input type="search" placeholder="Pesquisar"/>  
          </div>
          <button onClick={() => setModalOpen(true)}>+ Novo contato</button>
        </CriarEPesquisarContainer>
      <ListaDeContatos>
        {listaDeContato.map((contato, index) => (
          <li key={index}>
            <div className="infos">
              <span className="letra">{contato.nome.substr(0,1)}</span>
              <Image src={ImagemContato} alt={contato.nome} />
              <div>
                <h2>{contato.nome}</h2>
                <span>{contato.telefone}</span>
              </div>
            </div>
            <div className="botoes">
              <BiEdit onClick={() => abrirModalAtualizar(contato)}/>
              <RiCloseCircleLine onClick={() => abrirModalDelete(contato)}/>
            </div>
          </li>
        ))}
      </ListaDeContatos>
      </MainContainer>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} itemSelecionado={itemSelecionado} setItemSelecionado={setItemSelecionado}/>
      <ModalExcluir modalDeleteOpen={modalDeleteOpen} setModalDeleteOpen={setModalDeleteOpen} itemSelecionado={itemSelecionado} setItemSelecionado={setItemSelecionado}/>
        </>
    )
  }

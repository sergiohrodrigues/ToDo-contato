import { IContato } from "@/interface/IContato";
import Image from "next/image"
import ImagemContato from '../../assets/contato.png'
import { BiEdit } from 'react-icons/bi'
import { RiCloseCircleLine } from 'react-icons/ri'
import { Dispatch, SetStateAction, memo } from 'react'
import { styled } from "styled-components";

const ContatoContainer = styled.li<{colorletra: string}>`
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
        background-color: ${props => props.colorletra};
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
`

interface Props {
    key: number,
    contatos: IContato,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    setModalDeleteOpen: Dispatch<SetStateAction<boolean>>,
    setItemSelecionado: Dispatch<SetStateAction<IContato | undefined>>
}

function Contato({contatos, setModalDeleteOpen, setItemSelecionado, setModalOpen}: Props){

    const abrirModalDelete = (contatos: IContato) => {
        setModalDeleteOpen(true)
        setItemSelecionado(contatos)
      }
      
      const abrirModalAtualizar = (contatos: IContato) => {
        setModalOpen(true)
        setItemSelecionado(contatos)
      }

    return(
        <ContatoContainer colorletra={contatos.cor}>
            <div className="infos">
            {contatos.primeiraLetra === '' ? <span style={{width:'25px'}}></span>  : <span className='letra'>{contatos.primeiraLetra?.toUpperCase()}</span> }
            <Image src={ImagemContato} alt={contatos.nome} />
            <div>
              <h2>{contatos.nome}</h2>
              <span>{contatos.telefone}</span>
            </div>
            </div>
            <div className="botoes">
            <BiEdit onClick={() => abrirModalAtualizar(contatos)}/>
            <RiCloseCircleLine onClick={() => abrirModalDelete(contatos)}/>
            </div>
        </ContatoContainer>
    )
}

export default memo(Contato)
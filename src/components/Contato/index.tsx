import { IContato } from "@/interface/IContato";
import Image from "next/image"
import ImagemContato from '../../assets/contato.png'
import { BiEdit } from 'react-icons/bi'
import { RiCloseCircleLine } from 'react-icons/ri'
import { Dispatch, SetStateAction, useState, useEffect, memo } from 'react'
import { styled } from "styled-components";
import { PrimeiraLetraDoNome } from "../../utilidades/PrimeiraLetraDoNome";

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
        text-transform: uppercase;
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
    contato: IContato,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    setModalDeleteOpen: Dispatch<SetStateAction<boolean>>,
    setItemSelecionado: Dispatch<SetStateAction<IContato | undefined>>
}

function Contato({contato, setModalDeleteOpen, setItemSelecionado, setModalOpen}: Props){

    const abrirModalDelete = (contato: IContato) => {
        setModalDeleteOpen(true)
        setItemSelecionado(contato)
      }
      
      const abrirModalAtualizar = (contato: IContato) => {
        setModalOpen(true)
        setItemSelecionado(contato)
        console.log(contato)
      }

      const [letra, setLetra] = useState('')

      function adicionarLetra(){
        const primeiraLetroDoNome = contato.nome.substr(0,1)
        setLetra(primeiraLetroDoNome)
      }

      useEffect(() => {
        adicionarLetra()
      }, [])

      // const letras: string[] = letra
      // const letrasSemRepeticao: string[] = Array.from(new Set(letras));

      // console.log(letras);

    return(
        <ContatoContainer colorletra={PrimeiraLetraDoNome()}>
            <div className="infos">
            <span className="letra">{letra}</span>
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
        </ContatoContainer>
    )
}

export default memo(Contato)
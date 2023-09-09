import { FaFacebook, FaInstagram} from 'react-icons/fa'
import "../estilos/Rodape.css"

export default function Rodape(props){
    return(
        <div>
            <footer className='Rodape footer mb-0'>
                <ul className='social_list'>
                    <li> <FaFacebook/> </li>
                    <li> <FaInstagram/> </li>
                </ul>

                <p className='copy_right mb-0' >
                    <span>Kézia Ferretti </span> 10482211613
                </p>
            </footer>
        </div>
    )
}
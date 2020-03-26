import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();

        try {
            const resp = await api.post('sessions', { id })
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', resp.data.name)
            
            history.push('/profile')
        }catch (err){
            alert('Erro ao fazer o login.')
        }
    }

    return (
        <div className='logon-container'>
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogon}>
                    <h1>Faça seu Logon</h1>

                    <input 
                        placeholder='Sua ID'
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className='button' type='submit'>Entrar</button>

                    <Link className='back-link' to='/register'>
                        <FiLogIn fontSize={16} color='#E02041' />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt='heroes' />
        </div>
    )
}
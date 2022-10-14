import React from 'react'
import logo1 from './logoFooter.png'
// import logo from './logoqatar.jpg'

function Footer() {
    return (
        <div class='container-fluid' >
            <div class='row p-5 pb-2 bg-dark text-white'>
                <div class='col-xs-12 col-md-6 col-lg-3'>
                    {/* <p class='fs-40'>Qatar Shop</p> */}
                    <img class='w-50 h-50' alt='logoqatar' src={logo1} />
                    
                </div>
                <div class='col-xs-12 col-md-6 col-lg-3'>
                    <p class='h5 mb-3'>Links</p>
                    <div class='mb-1'>
                    <a class='text-secondary text-decoration-none ' href='/terminos'>Terms and Condition</a>
                    </div>
                    <div class='mb-1'>
                    <a class='text-secondary text-decoration-none ' href='/privacy'>Privacy Policy</a>
                    </div>
                </div>
                <div class='col-xs-12 col-md-6 col-lg-3'>
                    <p class='h5 mb-3'>Githubs</p>
                    <div class='mb-1'>
                    <a class='text-secondary text-decoration-none ' href='https://github.com/bioornal'>Christian Speziali</a>
                    </div>
                    <div class='mb-1'>
                    <a class='text-secondary text-decoration-none ' href='https://github.com/Edye1230'>Edye Rojer Quisca Sicha</a>
                    </div>
                    <div class='mb-1'>
                    <a class='text-secondary text-decoration-none ' href='https://github.com/EcheCostabel'>Exequiel Costabel</a>
                    </div>
                    <div class='mb-1'>
                    <a class='text-secondary text-decoration-none ' href='https://github.com/gescobar28'>Gregorio Escobar</a>
                    </div>
                    
                    <div class='mb-1'>
                    <a class='text-secondary text-decoration-none ' href='https://github.com/ivokoby'>Ivan Kobylañsky</a>
                    </div>
                    <div class='mb-1'>
                    <a class='text-secondary text-decoration-none ' href='https://github.com/lnlindao'>Lissette Lindao</a>
                    </div>
                    <div class='mb-1'>
                    <a class='text-secondary text-decoration-none ' href='https://github.com/rjimenezg73'>Roberto Gabriel Jiménez García</a>
                    </div>
                    <div class='mb-1'>
                    <a class='text-secondary text-decoration-none ' href='https://github.com/SebastianHinestroza12'>Sebastian Mena Hinestroza</a>
                    </div>
                    
              
                </div>
                <div class='col-xs-12 col-md-6 col-lg-3'>
                    <p class='h5 mb-3'>Contacto</p>
                    <div class='mb-1'>
                    <a class='text-secondary text-decoration-none ' href='/wpp'>WhatsApp</a>
                    </div>
                    <div class='mb-1'>
                    <a class='text-secondary text-decoration-none ' href='/ins'>Instagram</a>
                    </div>
                </div>
                <div class='col-xs-12 pt-4'>
                    <p class='text-white text-center'>Copyright - All rights reserved © 2022</p>
                </div>

            </div>

        </div>
    )
}

export default Footer
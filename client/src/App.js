import './App.css';
import Instruments from './Instruments';
import AddInstrument from './AddInstrument';
import ProfilePic from './images/profile-pic.png'
import Message from './images/Message.png'
import Clock from './images/Clock.png'

function App() {

    return (
        <>
        <div class="container">

        <section class="top-row row mt-5">
            <section class="my-box col-6">
                    <div class="row">
                        <div class="col-7">
                            <h2 class="mt-3 fw-bold">Margery Moley</h2>
                            <p>"Life is a party, let's jam!"</p>
                            <div class="d-flex justify-content-between pt-3">
                                <p class="align-self-end">Bristol, UK</p>
                                <div class="last-online d-flex">
                                    <div class="align-self-center pe-2">
                                        <img src={Message} alt="Message Button" srcset="" class="pe-5"/>
                                        <img src={Clock} alt="Clock" srcset=""/>
                                    </div>
                                    <p class="fs-6 text-bottom fw-bold">Last active<br/> 1 hour ago</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-5">
                            <img src={ProfilePic} class="ms-3" alt="logo" srcset=""/>
                        </div>
                    </div>
            </section>

        </section>

        <section class="bottom-row row justify-content-between mt-5">

            <section id="profile-bio" class="col-4">
                <h3>Profile</h3>
                <div class="my-box row">
                    <h2>Bio</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero repudiandae minima provident aperiam accusamus amet, dolore ut consectetur sunt officiis!</p>
                    <h2>Gear</h2>
                    <ul class="text-dark">
                        <li>Martin Dreadnaught</li>
                        <li>Korg MiniMoog</li>
                        <li>Korg Vocoder</li>
                    </ul>
                </div>
            </section>

            <section id="instruments" class="col-3">
                <h3>Instruments</h3>
                <div class="my-box row d-flex">
                    <h3>Add New</h3>
                </div>
            </section>

            <section id="genres" class="col-3">
                <h3>Genres</h3>
                <div class="my-box row">
                    <h2>Bio</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero repudiandae minima provident aperiam accusamus amet, dolore ut consectetur sunt officiis!</p>
                    <h2>Gear</h2>
                    <ul class="text-dark">
                        <li>Martin Dreadnaught</li>
                        <li>Korg MiniMoog</li>
                        <li>Korg Vocoder</li>
                    </ul>
                </div>
            </section>



        </section>

    </div>
        <div style={{ width: '90%', margin: 'auto auto', textAlign: 'center' }}>
            <h1>Homepage</h1>
            <h2>My Instruments</h2>
            <Instruments/>
            <AddInstrument/>
        </div>
        </>
    );
}

export default App;

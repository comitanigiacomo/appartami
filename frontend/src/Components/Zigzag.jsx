import React from 'react';
import './Zigzag.css';
import image from '../images/pianta.png';

const Zigzag = () => {
    return (
        <section className="zigzag-section">
            <div className="zigzag-container">
                {/* Aggiungi qui gli altri zigzag-item con la stessa struttura */}
                <div className="zigzag-item">
                    <img src={image} alt="Descrizione" className="zigzag-image" />
                    <div className="zigzag-content">
                        <h2>Keep projects on schedule</h2>
                        <ul className="features-list">
                            <li><span role="img" aria-label="check">✅</span> Lorem ipsum dolor sit amet</li>
                            <li><span role="img" aria-label="check">✅</span> Lorem ipsum dolor sit amet</li>
                            <li><span role="img" aria-label="check">✅</span> Lorem ipsum dolor sit amet</li>
                            <li><span role="img" aria-label="check">✅</span> Lorem ipsum dolor sit amet</li>
                            {/* Aggiungi qui altri punti con lo stesso formato */}
                        </ul>
                    </div>
                </div>
                <div className="zigzag-item">
                    <div className="zigzag-content">
                        <h2>Keep projects on schedule</h2>
                        <ul className="features-list">
                            <li><span role="img" aria-label="check">✅</span> Lorem ipsum dolor sit amet</li>
                            <li><span role="img" aria-label="check">✅</span> Lorem ipsum dolor sit amet</li>
                            <li><span role="img" aria-label="check">✅</span> Lorem ipsum dolor sit amet</li>
                            <li><span role="img" aria-label="check">✅</span> Lorem ipsum dolor sit amet</li>
                            {/* Aggiungi qui altri punti con lo stesso formato */}
                        </ul>
                    </div>
                    <img src={image} alt="Descrizione" className="zigzag-image" />
                </div>
                <div className="zigzag-item">
                    <img src={image} alt="Descrizione" className="zigzag-image" />
                    <div className="zigzag-content">
                        <h2>Keep projects on schedule</h2>
                        <ul className="features-list">
                            <li><span role="img" aria-label="check">✅</span> Lorem ipsum dolor sit amet</li>
                            <li><span role="img" aria-label="check">✅</span> Lorem ipsum dolor sit amet</li>
                            <li><span role="img" aria-label="check">✅</span> Lorem ipsum dolor sit amet</li>
                            <li><span role="img" aria-label="check">✅</span> Lorem ipsum dolor sit amet</li>
                            {/* Aggiungi qui altri punti con lo stesso formato */}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Zigzag;

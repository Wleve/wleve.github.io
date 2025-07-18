import React, { useState, useRef, useEffect } from 'react'
import backIcon from '../assets/back.png';
import Analysis from '../assets/Analysis.png';
import BB from '../assets/bb.jpg';
import Ecommerce from '../assets/Ecommerce.jfif';
import Service from '../assets/Service.jpg';
import Will from '../assets/Will.jpg';
import resume from '../assets/resume.pdf';
import resumepreview from '../assets/resume-preview.png';
import skills from '../assets/skills.png';


const Home = () => {
    const [activeBox, setActiveBox] = useState(null);
    const [disappear, setDisappear] = useState(false);
    const [expandRect, setExpandRect] = useState(null); 
    const [animating, setAnimating] = useState(false);   
    const [closing, setClosing] = useState(false); 
    const containerRef = useRef(null);                   
useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    const moveCursor = e => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
}, []);
    const boxes = [
        { key: 'projects', label: 'Projects', img: Service },
        { key: 'about', label: 'About Me', img: BB },
        { key: 'skills', label: 'Skills', img: Ecommerce },
        { key: 'How I work', label: 'How I work', img: Analysis },
    ];

    const renderBoxContent = (key) => {
        switch (key) {
            case 'projects':
                return (
                  <div className="images-grid">
                    <a href='https://geared-up-jp7s.vercel.app/' target="_blank" rel="noopener noreferrer">
                      <img src={Service} alt="Service" />
                    </a>
                    <a href="https://heroic-florentine-5b49d7.netlify.app/" target="_blank" rel="noopener noreferrer">
                      <img src={BB} alt="Memory Game Website" />
                    </a>
                    <a href="https://e-commercesiteseg3125.netlify.app/" target="_blank" rel="noopener noreferrer">
                      <img src={Ecommerce} alt="Ecommerce" />
                    </a>
                    <a href="https://covidview.netlify.app/" target="_blank" rel="noopener noreferrer">
                      <img src={Analysis} alt="Analysis" />
                    </a>
                  </div>
                );
            case 'about':
                return <div className='section'><div className='textbox'><h1 className='names'>About Me</h1><p className='text'>Im William, 
                a second year software engineering student at the University of Ottawa! I particularly enjoy working 
                on algorithm problems and applications. Im a highly motivated individual looking to apply my skills in the workforce</p></div><img className="section-img" src={Will} alt="William" /></div>;
            case 'skills':
                return <div className='sectionskills'><div className='textboxskills'><h1 id='names'>Skills</h1><ul >
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>Node.js</li>
                    <li>CSS</li>
                    <li>HTML</li>
                    <li>Python</li>
                    <li>Java</li>
                    <li>Agile methodology</li>
                </ul></div><img src={skills}></img></div>;
            case 'How I work':
                return (
                  <div className='section'>
                    <a href={resume} target="_blank" rel="noopener noreferrer">
                      <img className="resume-img" src={resumepreview} alt="Resume Preview" />
                    </a>
                    <div className='textbox'>
                      <h2 className='names'>How I work</h2>
                      <p className='text'>I follow an agile methodology, focusing on iterative development and continuous feedback. This allows for an additive design approach, reworking key components as the project moves forward.</p>
                    </div>
                  </div>
                );
            default:
                return null;
        }
    };

    const handleBoxClick = (key, e) => {
        if (activeBox === key) return;
        const boxRect = e.currentTarget.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setExpandRect({
            top: boxRect.top - containerRect.top,
            left: boxRect.left - containerRect.left,
            width: boxRect.width,
            height: boxRect.height,
        });
        setActiveBox(key);
        setAnimating(true);
        setTimeout(() => setDisappear(true), 500); 
    };

    const handleBack = () => {
        setClosing(true);
        setDisappear(false);
        setTimeout(() => {
            setActiveBox(null);
            setExpandRect(null);
            setAnimating(false);
            setClosing(false);
        }, 800); 
    };

    return (
        <div className="home">
            <div className="header">
                <h1>William Levesque</h1>
                
            </div>
            {activeBox && (
                <button className="back-button" onClick={handleBack}>
                    <img src={backIcon} alt="Back" style={{ width: 32, height: 32 }} />
                </button>
            )}
            <div className="boxes-container" ref={containerRef} style={{position: 'relative'}}>
               {boxes.map(box => {
    if (
        activeBox &&
        activeBox === box.key &&
        (animating || closing)
    ) {
        return (
            <div
                key={box.key}
                className="box"
                style={{ visibility: 'hidden' }}
            />
        );
    }
    if (
        activeBox &&
        activeBox !== box.key &&
        disappear
    ) {
        return null;
    }
    return (
        <div
            key={box.key}
            className={
                "box" +
                (activeBox === box.key ? " expanded" : "") +
                (activeBox && activeBox !== box.key
                    ? " shrunk" + (disappear ? " disappear" : "")
                    : "")
            }
            onClick={e => !activeBox && handleBoxClick(box.key, e)}
        >
            {activeBox === box.key
              ? renderBoxContent(box.key)
             : <span className="box-label">{box.label}</span>}
        </div>
    );
})}
               
                {activeBox && expandRect && (
                    <AnimatedExpandedBox
                        rect={expandRect}
                        show={animating && !closing}
                        closing={closing}
                        label={boxes.find(b => b.key === activeBox)?.label}
                        onAnimationEnd={() => setAnimating(false)}
                    >
                        {renderBoxContent(activeBox)}
                    </AnimatedExpandedBox>
                )}
            </div>
        </div>
    );
    
};


function AnimatedExpandedBox({ rect, show, closing, label, children, onAnimationEnd }) {
    const ref = useRef(null);

    React.useEffect(() => {
        if (ref.current) {
            if (show && !closing) {
                requestAnimationFrame(() => {
                    ref.current.style.top = '0px';
                    ref.current.style.left = '0px';
                    ref.current.style.width = '100%';
                    ref.current.style.height = '100%';
                });
            } else if (closing) {
                ref.current.style.top = rect.top + 'px';
                ref.current.style.left = rect.left + 'px';
                ref.current.style.width = rect.width + 'px';
                ref.current.style.height = rect.height + 'px';
            }
            const handle = () => onAnimationEnd && onAnimationEnd();
            ref.current.addEventListener('transitionend', handle, { once: true });
            return () => ref.current && ref.current.removeEventListener('transitionend', handle);
        }
    }, [show, closing, rect, onAnimationEnd]);

    return (
        <div
            ref={ref}
            className="box expanded"
            style={{
                position: 'absolute',
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                margin: 0,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 30,
                pointerEvents: 'auto'
            }}
        >
            {closing ? <span className="box-label">{label}</span> : children}
        </div>
    );
}

export default Home;
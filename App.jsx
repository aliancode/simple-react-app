import React, { useState, useRef } from 'react';
import './index.css';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const usernameRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const lessons = [
    { title: "Variables", content: ["Variables store data values in JavaScript", "Three ways to declare: var, let, const", "let and const are block-scoped (ES6+)",], code: `let name = "John";\nconst age = 30;\nvar isOld = true;` },
    { title: "Loops", content: ["Loops execute code repeatedly", "for loop - when you know iterations", "while loop - until condition is false", "forEach - for arrays"], code: `for (let i = 0; i < 5; i++) {\n  console.log(i);\n}\n\n['a', 'b'].forEach(item => console.log(item));` },
    { title: "Functions", content: ["Functions are reusable code blocks", "Can take parameters and return values", "Arrow functions (ES6+) are concise"], code: `function greet(name) {\n  return 'Hello ' + name;\n}\n\nconst greet = name => 'Hello ' + name;` },
    { title: "DOM", content: ["Document Object Model represents the page", "JavaScript can manipulate DOM elements", "Select elements with querySelector/getElementById", "You can change styles, content, attributes", "Event listeners can be added"], code: `const header = document.querySelector('h1');\nheader.textContent = 'New Title';` },
    { title: "Events", content: ["Events are user interactions with the page", "Click, submit, keypress, etc.", "Add event listeners to elements"], code: `button.addEventListener('click', () => {\n  console.log('Button clicked!');\n});` }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setCurrentView('home');
    } else {
      alert('Invalid credentials. Try admin/password');
    }
  };

  

  const handleContactSubmit = (e) => {
    e.preventDefault(); 
    setFormSubmitted(true);
    nameRef.current.value = '';
    emailRef.current.value = '';
    messageRef.current.value = 
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const renderView = () => {
    switch(currentView) {
     case 'login':
        return (
          <div className="login-page">
          <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input ref={usernameRef} placeholder="Username" required />
              <input ref={passwordRef} type="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
            <p>Try admin/password</p>
          </div></div>
        );
      case 'home':
        return (
          <div className="hero">
            <h1>Master JavaScript</h1>
            <button onClick={() => setCurrentView('lessons')}>View Lessons</button>
          </div>
        );
        case 'lessons':
          return (
            <div>
              <h2>Lessons</h2>
              <div className="lessons-grid">
                {lessons.map((lesson, i) => (
                  <div
                    key={i}
                    className="lesson-card"
                    onClick={() => {
                      setCurrentLesson(lesson);
                      setCurrentView('lesson-detail');
                    }}
                  >
                    <h3>{lesson.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          );
   
          case 'lesson-detail':
            return currentLesson && (
              <div className='lesson-detail '>
                <h2>{currentLesson.title}</h2>
                {currentLesson.content.map((line, i) => <p key={i}>{line}</p>)}
                <pre>{currentLesson.code}</pre>
              </div>
            );    
      case 'about':
        return <div><h2>About</h2><p>Learn JavaScript through focused lessons.</p></div>;
      case 'contact':
        return (
          <div className='contact-page'>
            <h2>Contact Us</h2>
            {formSubmitted ? (
              <div>
                <h3>Thank You!</h3>
                <p>Your message has been sent.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                <input ref={nameRef} placeholder="Name" required /> 
                <input ref={emailRef} type="email" placeholder="Email" required />
                <textarea ref={messageRef} placeholder="Message" required></textarea>
                <button type="submit">Send</button>
              </form>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <nav>
        <h1 onClick={() => setCurrentView('home')}>JS Mastery</h1>
        <button onClick={() => setCurrentView('home')}>Home</button>
        <button onClick={() => setCurrentView('lessons')}>Lessons</button>
        <button onClick={() => setCurrentView('about')}>About</button>
        <button onClick={() => setCurrentView('contact')}>Contact</button>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => setCurrentView('login')}>Login</button>
        )}
      </nav>
      <main>{renderView()}</main>
      <footer><p>© 2023 JS Mastery</p></footer>
    </div>
  );
};

export default App;



import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [pages, setPages] = useState([]);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    axios.get('http://api.github.com/users/Hallekh?client_id=b95f3e88bef940623650&client_secret=b9e273cd5c98c6f81fb5a8331d942a50485680f3&sort=created')
    .then((res) => {
      setPages(res.data);
    })
    .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('https://api.github.com/users/Hallekh/repos')
    .then((repositories) => setRepositories(repositories.data))
    .catch((err) => console.log(err));
  }); 

  const photo = pages.avatar_url
  return (
    <div className="container">
      <div className='box1'>
        <div className='img'>
          <img src={photo} alt="photo" />
        </div>
        <div className='info'>
          <p>FullName: {pages.name}</p>
          <p>UserName: {pages.login}</p>
          <p>Location: {pages.location}</p>
          <p>email: {pages.email}</p>
        </div>
      </div>
      <div className='box2'>
        <h3>Repositories</h3>
        <ul>
          {repositories.map((item) => {
            return <li key={item.id}><a href={'https://github.com/' + item.full_name}>{item.name}</a></li>
          })}
        </ul>

      </div>
    </div>
  );
}

export default App;

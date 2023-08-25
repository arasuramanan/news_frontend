import './App.css';
import React,{useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';


function News ()
{
  let [value, setValue] = useState("Ramanan");
  const [currentTime, setCurrentTime] = useState("");

  async function ak()
  {

    
    let response = await fetch(process.env.REACT_APP_NEWS_API_URL);
    let result = await response.json();
    console.log(result);
    console.log(result.articles); 
    
    let p = result.articles.map((a) => {return  ( <div class="max-w-sm rounded 
    overflow-hidden shadow-lg">
      
        <img class="w-full" src={a.urlToImage} alt="Mountain"/>
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{a.content}</div>
          <p class="text-gray-700 text-base">{a.description}</p>
          <a class="font-bold text-l" href={a.url}>read more....</a>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        </div>
      </div>)})
    console.log(p);
    setValue(p);
  }
  useEffect(() => {
    ak();
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      setCurrentTime(formattedDateTime);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-title">
          <FontAwesomeIcon icon={faNewspaper} className="news-icon" />
          NEWS
        </div>
        <div className="navbar-time">{currentTime}</div>
      </nav>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {value}
      </div>
    </div>
  );
}

export default News;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import library from "../assets/library.jpg";

function Home({ searchInput }) {
  const [data, setData] = useState([]);
  const [booksFound, setBooksFound] = useState(true); 

  useEffect(() => {
    if (searchInput !== "") {
      axios
        .post(
          "https://reactnd-books-api.udacity.com/search",
          { query: searchInput.toLowerCase(), maxResults: 30 },
          { headers: { Authorization: "whatever-you-want" } }
        )
        .then((res) => {
          setData(res.data.books);
          setBooksFound(res.data.books.length > 0); 
          console.log(res.data.books)
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setBooksFound(false);
        });
    } else {
        axios
        .get('https://reactnd-books-api.udacity.com/books', {
            headers: {
                'Authorization': 'whatever-you-want'
            }
        })
        .then((response) => {
            const allData = response.data.books;
            setData(allData);
            setBooksFound(allData.length > 0); 
            console.log(allData)
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setBooksFound(false);
        });
    }
  }, [searchInput]);

  return (
    <div className='Home'>
      <div>
        <div>
          <img className='imgBackground' src={library} alt="" />
        </div>
        <div>
          <div className='divBooks'>
            {booksFound ? (
              data.map((item) => (
                <div key={item.id} className='booksDiv'>
                  <div onClick={() => window.location.href = item.previewLink} className='imgDiv'>
                    {item.imageLinks && (
                      <img  src={item.imageLinks.thumbnail} alt={`Cover of ${item.title}`} />
                    )}
                  </div>
                  <div className='contentDiv'>
                    <div className='titleDiv'>
                      <h5 className='title'>{item.title}</h5>
                    </div>
                    <div className='bottomDiv'>
                      <p>{item.averageRating}</p>
                      <button>Free</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No books found for the given search input.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Home;

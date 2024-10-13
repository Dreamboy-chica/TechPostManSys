import { useEffect, useState } from 'react';
import axios from 'axios';
import './All.css';

const All = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:7070/getpost");
      setData(res.data);
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='postwrapper'>
      <div className='postcon' >
        {currentItems.map((item) => (
          <div className='post' key={item.id} title={item.cat}>
            <h1>{item.title}</h1>
            <p>{item.body}</p>
            <div className='pfoot'>
              <p className='ravi'>{item.cat}</p>
              <p>{new Date(item.dop).toDateString()}</p>
              <p>{item.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='pagination'>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Pre
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
            {index + 1}
          </button>
        ))}
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default All;

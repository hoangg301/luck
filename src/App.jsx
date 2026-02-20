import { useState, useEffect } from 'react';
import './App.css';
import lixiImg from './assets/lixi.webp';
import startBg from './assets/start-bg.webp';
import startLogo from './assets/start-logo.webp';
import frameImg from './assets/frame.webp';
import caythongImg from './assets/caythong.webp';
import laughingVid from './assets/laughing.mp4';
import clappingVid from './assets/clapping.mp4';
import deadlyVid from './assets/deadly.mp4';

function App() {
  
  const validCodes = [
    'CODE01', 
    'CODE02', 
    'CODE03', 
    'CODE04', 
    'CODE05', 
    'CODE06', 
    'CODE07', 
    'CODE08', 
    'CODE09', 
    'CODE10',
    'CODE11',
    'CODE12',
    'CODE13',
    'CODE14',
    'CODE15',
    'CODE16',
    'CODE17',
    'CODE18',
    'CODE19',
    'CODE20',
    'ADMIN',
    'ADMIN1',
    'ADMIN2'
  ];

  const rewards = [
    10,
    20,
    30,
    40,
    50,
    60,
    75,
    100,
    150
  ];

  const rewardMedia = {
    10: { type: 'video', src: laughingVid },
    20: { type: 'video', src: laughingVid },
    30: { type: 'video', src: laughingVid },
    40: { type: 'video', src: clappingVid },
    50: { type: 'video', src: clappingVid },
    60: { type: 'video', src: clappingVid },
    75: { type: 'video', src: deadlyVid },
    100: { type: 'video', src: deadlyVid },
    150: { type: 'video', src: deadlyVid }
  };

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState('start');
  
  const [currUser, setCurrUser] = useState(() => {
    const savedUser = localStorage.getItem('currUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [codeRewards, setCodeRewards] = useState(() => {
    const saved = localStorage.getItem('codeRewards');
    return saved ? JSON.parse(saved) : {};
  });

  const [rewardResult, setRewardResult] = useState(null);


  const [shuffledRewards] = useState(() => {
    const saved = localStorage.getItem('shuffledRewards');
    return saved ? JSON.parse(saved) : [...rewards].sort(() => Math.random() - 0.5);
  });

  useEffect(() => {
    localStorage.setItem('shuffledRewards', JSON.stringify(shuffledRewards));
  }, [shuffledRewards]);

  useEffect(() => {
    localStorage.setItem('codeRewards', JSON.stringify(codeRewards));
  }, [codeRewards]);

  useEffect(() => {
    if (currUser && codeRewards[currUser.code]) {
      setRewardResult(codeRewards[currUser.code]);
      setPage('choosing');
    }
  }, [currUser, codeRewards]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const normalizedCode = code.trim().toUpperCase();
    
    if (!name.trim()) {
      setError('Vui lòng nhập tên của bạn!');
      return;
    }

    if (!normalizedCode) {
      setError('Vui lòng nhập mã code cá nhân!');
      return;
    }

    if (!validCodes.includes(normalizedCode)) {
      setError('Mã code không hợp lệ!');
      return;
    }

    const userData = { name, code: normalizedCode };

    setCurrUser(userData);
    localStorage.setItem('currUser', JSON.stringify(userData));
    
    if (codeRewards[normalizedCode]) {
      setRewardResult(codeRewards[normalizedCode]);
    } else {
      setRewardResult(null);
    }

    setPopup(false);
    setPage('choosing');
    setError('');
  };

  const handlePickLixi = (index) => {
    if (!currUser || rewardResult) return;

    if (codeRewards[currUser.code]) {
      setRewardResult(codeRewards[currUser.code]);
      return;
    }

    const reward = shuffledRewards[index];

    const updatedRewards = {
      ...codeRewards,
      [currUser.code]: reward
    };

    setCodeRewards(updatedRewards);
    setRewardResult(reward);
  };

  return (
    <>
      {page === 'start' && (
        <div className="start-page">
          <img src={startBg} alt="background" className="start-bg-img" />
          <img src={startLogo} alt="logo" className="start-logo-img" />
          <div className="start-page-content">
            <h1>Lộc Lá Đầu Năm</h1>
            <p>-- By Hoangg --</p>
            <button className="start-btn" onClick={() => setPopup(true)}>Bắt đầu</button>
          </div>
          
          {popup && (
            <div className="overlay">
              <div className="popup">
                  <h2>Vui lòng điền đầy đủ thông tin</h2>
                  <form onSubmit={handleSubmit}>          
                    <label htmlFor="name">Tên của bạn:</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                    />
                    <label htmlFor="code">Mã code cá nhân:</label>
                    <input 
                      type="text" 
                      id="code" 
                      value={code} 
                      onChange={(e) => setCode(e.target.value)} 
                    />
                    
                    {error && <p className="error">{error}</p>}

                    <button className="submit-btn" type="submit">Xác nhận</button>
                  </form>
              </div>
            </div>
          )}
        </div>
      )}

      {page === 'choosing' && (
        <div className="choosing-page">
          <div className="background-top"></div>
          <div className="background-bottom"></div>
          <div className="dot">
            <div className="dot-square"></div>
          </div>
          <div className="choosing-page-content">
            <h2>Chào mừng, {currUser?.name}!</h2>
            <img src={frameImg} alt='frame' loading='lazy' className='frame-img frame1' />
            <p className='p1'>9 lì xì?</p>
            <img src={frameImg} alt='frame' loading='lazy' className='frame-img frame2' />
            <p className='p2'>9 mệnh giá?</p>
            <img src={frameImg} alt='frame' loading='lazy' className='frame-img frame3' />
            <p className='p3'>100% random?</p>
            <img src={frameImg} alt='frame' loading='lazy' className='frame-img frame4' />
            <p className='p4'>Nhân phẩm?</p>
            <div className="caythong-container">
              <img src={caythongImg} alt="cây thông" loading="lazy" className="caythong" />
              <div className="caythong-content">
                <div className="white-ball">150K</div>
                <div className="blue-ball blue1">105K</div>
                <div className="yellow-ball yellow1">85</div>
                <div className="green-ball green1">70K</div>
                <div className="blue-ball blue2">60K</div>
                <div className="yellow-ball yellow2">50K</div>
                <div className="green-ball green2">20K</div>
                <div className="blue-ball blue3">30K</div>
                <div className="yellow-ball yellow3">35K</div>
              </div>
            </div>
          </div>
          <p className="quote">Hãy bốc thăm lì xì của bạn &gt;&lt;</p>
          <div className="lixi-container">
            {Array.from({ length: 9 }).map((_, index) => (
              <img 
                key={index}
                src={lixiImg}
                alt="lì xì"
                className="lixi"
                onClick={() => handlePickLixi(index)}
              />
            ))}
          </div>

          {rewardResult && (
            <div className='overlay-result'>
              <div className='popup-result'>
                <h2>🎉 Bạn đã trúng {rewardResult}K! 🎉</h2>
                <video
                  src={rewardMedia[rewardResult].src}
                  autoPlay
                  loop={false}
                  controls={false}
                  muted={false}
                  playsInline
                  onEnded={(e) => e.target.pause()}
                  className="reaction"
                />
                <p>Hãy nhắn cho Hoangg để được nhận lì xì!</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default App;

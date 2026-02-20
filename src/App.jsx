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
import whiteBall from './assets/white-ball.webp';
import blueBall from './assets/blue-ball.webp';
import yellowBall from './assets/yellow-ball.webp';
import greenBall from './assets/green-ball.webp';


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
    20,
    30,
    35,
    50,
    60,
    70,
    85,
    105,
    150
  ];

  const rewardMedia = {
    20: { type: 'video', src: laughingVid },
    30: { type: 'video', src: laughingVid },
    35: { type: 'video', src: laughingVid },
    50: { type: 'video', src: clappingVid },
    60: { type: 'video', src: clappingVid },
    70: { type: 'video', src: clappingVid },
    85: { type: 'video', src: deadlyVid },
    105: { type: 'video', src: deadlyVid },
    150: { type: 'video', src: deadlyVid }
  };

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState('start');
  
  const [currUser_v2, setCurrUser_v2] = useState(() => {
    const savedUser = localStorage.getItem('currUser_v2');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [codeRewards_v2, setCodeRewards_v2] = useState(() => {
    const saved = localStorage.getItem('codeRewards_v2');
    return saved ? JSON.parse(saved) : {};
  });

  const [rewardResult, setRewardResult] = useState(null);


  const [shuffledReward_v2] = useState(() => {
    const saved = localStorage.getItem('shuffledReward_v2');
    return saved ? JSON.parse(saved) : [...rewards].sort(() => Math.random() - 0.5);
  });

  useEffect(() => {
    localStorage.setItem('shuffledReward_v2', JSON.stringify(shuffledReward_v2));
  }, [shuffledReward_v2]);

  useEffect(() => {
    localStorage.setItem('codeRewards_v2', JSON.stringify(codeRewards_v2));
  }, [codeRewards_v2]);

  useEffect(() => {
    if (currUser_v2 && codeRewards_v2[currUser_v2.code]) {
      setRewardResult(codeRewards_v2[currUser_v2.code]);
      setPage('choosing');
    }
  }, [currUser_v2, codeRewards_v2]);
  
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

    setCurrUser_v2(userData);
    localStorage.setItem('currUser_v2', JSON.stringify(userData));
    
    if (codeRewards_v2[normalizedCode]) {
      setRewardResult(codeRewards_v2[normalizedCode]);
    } else {
      setRewardResult(null);
    }

    setPopup(false);
    setPage('choosing');
    setError('');
  };

  const handlePickLixi = (index) => {
    if (!currUser_v2 || rewardResult) return;

    if (codeRewards_v2[currUser_v2.code]) {
      setRewardResult(codeRewards_v2[currUser_v2.code]);
      return;
    }

    const reward = shuffledReward_v2[index];

    const updatedRewards = {
      ...codeRewards_v2,
      [currUser_v2.code]: reward
    };

    setCodeRewards_v2(updatedRewards);
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
            <h2>Chào mừng, {currUser_v2?.name}!</h2>
            <img src={frameImg} alt='frame' className='frame-img frame1' />
            <p className='p1'>9 lì xì?</p>
            <img src={frameImg} alt='frame' className='frame-img frame2' />
            <p className='p2'>9 mệnh giá?</p>
            <img src={frameImg} alt='frame' className='frame-img frame3' />
            <p className='p3'>100% random?</p>
            <img src={frameImg} alt='frame' className='frame-img frame4' />
            <p className='p4'>Nhân phẩm?</p>
            <div className="caythong-container">
              <img src={caythongImg} alt="cây thông" loading="lazy" className="caythong" />
              <div className="caythong-content">
                <div className="white-ball" style={{ backgroundImage: `url(${whiteBall})` }}>150K</div>
                <div className="blue-ball blue1" style={{ backgroundImage: `url(${blueBall})` }}>105K</div>
                <div className="yellow-ball yellow1" style={{ backgroundImage: `url(${yellowBall})` }}>85K</div>
                <div className="green-ball green1" style={{ backgroundImage: `url(${greenBall})` }}>70K</div>
                <div className="blue-ball blue2" style={{ backgroundImage: `url(${blueBall})` }}>60K</div>
                <div className="yellow-ball yellow2" style={{ backgroundImage: `url(${yellowBall})` }}>50K</div>
                <div className="green-ball green2" style={{ backgroundImage: `url(${greenBall})` }}>20K</div>
                <div className="blue-ball blue3" style={{ backgroundImage: `url(${blueBall})` }}>30K</div>
                <div className="yellow-ball yellow3" style={{ backgroundImage: `url(${yellowBall})` }}>35K</div>
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
import React, { useState, useRef } from 'react';
import './Home.css';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, Typography } from '@mui/material';

const Home = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const songs = [
    { title: 'Animals', src: 'songs/Animals.mp3', imgSrc: 'images/Animals.png' },
    { title: 'Dil toh bacha hai ji', src: 'songs/Dil-toh-bacha-hai-ji.mp3', imgSrc: 'images/Dil-toh-bacha-hai-ji.jpg' },
    { title: 'Kabhi kabhi aditi', src: 'songs/Kabhi-kabhi-aditi.mp3', imgSrc: 'images/kabhi-kabhi-aditi.jpg' },
    { title: 'Dekha Ek Khwab', src: 'songs/Dekha-Ek-Khwab.mp3', imgSrc: 'images/dekha-ek-khwab.jpg'}
  ];

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipSong = (forwards = true) => {
    const newIndex = forwards ? currentSongIndex + 1 : currentSongIndex - 1;
    if (newIndex >= songs.length) {
      setCurrentSongIndex(0);
    } else if (newIndex < 0) {
      setCurrentSongIndex(songs.length - 1);
    } else {
      setCurrentSongIndex(newIndex);
    }
  };

  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleTimeChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  return (
    <div className="music-player">
      <Navbar />
      <Header />
      <div className="song-cards">
        {songs.map((song, index) => (
          <Card key={index} onClick={() => setCurrentSongIndex(index)} className="song-card">
            <img src={song.imgSrc} alt={song.title} className='song-image' />
            <CardContent>
              <Typography variant="h6" component="div">
                {song.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="audio-player">
        <audio
          ref={audioRef}
          src={songs[currentSongIndex].src}
          onTimeUpdate={updateTime}
        />
        <div className="audio-controls">
          <div className="current-song">Now Playing: {songs[currentSongIndex].title}</div>
          <input
            type="range"
            value={currentTime}
            max={audioRef.current ? audioRef.current.duration : 0}
            onChange={handleTimeChange}
          />
          <button className="control-button" onClick={togglePlayPause}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button className="control-button" onClick={() => skipSong(false)}>
            Previous
          </button>
          <button className="control-button" onClick={() => skipSong()}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

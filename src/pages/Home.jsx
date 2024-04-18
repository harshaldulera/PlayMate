import React, { useState, useRef } from 'react';
import './Home.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1>PlayMate</h1>
      </div>
    </nav>
  );
};

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h2>Welcome to PlayMate</h2>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 Music App. All rights reserved.</p>
      </div>
    </footer>
  );
};

const MusicPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const songs = [
    { title: 'Animals', src: 'songs/Animals.mp3' },
    { title: 'Dil toh bacha hai ji', src: 'songs/Dil-toh-bacha-hai-ji.mp3' },
    { title: 'Kabhi kabhi aditi', src: 'songs/Kabhi-kabhi-aditi.mp3' },
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
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].src}
        onTimeUpdate={updateTime}
      />
      <div>
        <p>Now Playing: {songs[currentSongIndex].title}</p>
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
      <ul className="songs-list">
        {songs.map((song, index) => (
          <li key={index} onClick={() => setCurrentSongIndex(index)}>
            {song.title}
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default MusicPlayer;

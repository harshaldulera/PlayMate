// src/MusicPlayer.jsx
import React, { useState, useRef } from 'react';
import './Home.css'

const MusicPlayer = () => {
 const [currentSongIndex, setCurrentSongIndex] = useState(0);
 const [isPlaying, setIsPlaying] = useState(false);
 const audioRef = useRef(null);

 const songs = [
    { title: 'Animals', src: 'songs/Animals.mp3' },
    { title: 'Dil toh bacha hai ji', src: 'songs/Dil-toh-bacha-hai-ji.mp3' },
    { title: 'Kabhi kabhi aditi', src: 'songs/Kabhi-kabhi-aditi.mp3'},
    // Add more songs as needed
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

 return (
    <div className='music-player'>
      <h1>Music Player</h1>
      <audio ref={audioRef} src={songs[currentSongIndex].src} />
      <button className='control-button' onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button className='control-button' onClick={() => skipSong(false)}>Previous</button>
      <button className='control-button' onClick={() => skipSong()}>Next</button>
      <ul className='songs-list'>
        {songs.map((song, index) => (
          <li key={index} onClick={() => setCurrentSongIndex(index)}>
            {song.title}
          </li>
        ))}
      </ul>
    </div>
 );
};

export default MusicPlayer;

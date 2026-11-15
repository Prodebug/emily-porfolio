import { db, collection, getDocs, query, orderBy } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', async () => {
  const tracksList = document.getElementById('tracksList');
  const audio = document.getElementById('audioPlayer');
  const trackTitle = document.getElementById('trackTitle');
  const trackArtist = document.getElementById('trackArtist');
  const coverArt = document.getElementById('coverArt');
  const playBtn = document.getElementById('playBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const songCount = document.getElementById('songCount');

  let SONGS = [];
  let currentIndex = -1;

  // Загружаем песни из Firebase
  async function loadSongs() {
    try {
      const q = query(collection(db, 'songs'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      SONGS = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      }));
    } catch (err) {
      console.error('Ошибка загрузки песен:', err);
      SONGS = [];
    }

    if (songCount) songCount.textContent = SONGS.length;
    renderTracks();
  }

  function renderTracks() {
    if (!tracksList) return;

    if (SONGS.length === 0) {
      tracksList.innerHTML = `
        <div class="empty-state">
          <p>Пока нет загруженных песен 🎵</p>
          <p style="margin-top:12px">Зайди в <a href="admin.html">админ-панель</a>, чтобы добавить первые треки.</p>
        </div>
      `;
      return;
    }

    tracksList.innerHTML = SONGS.map((song, index) => `
      <div class="track-item ${index === currentIndex ? 'active' : ''}" data-index="${index}">
        <div class="track-num">${index + 1}</div>
        <div class="track-details">
          <h4>${escapeHtml(song.title)}</h4>
          <span>${escapeHtml(song.artist || 'Эмили')}</span>
        </div>
        <div class="track-duration">${song.duration || ''}</div>
      </div>
    `).join('');

    tracksList.querySelectorAll('.track-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.index, 10);
        playTrack(idx);
      });
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }

  function playTrack(index) {
    if (index < 0 || index >= SONGS.length) return;
    
    currentIndex = index;
    const song = SONGS[index];
    
    audio.src = song.url;
    trackTitle.textContent = song.title;
    trackArtist.textContent = song.artist || 'Эмили';
    coverArt.textContent = '♪';
    
    audio.play().catch(err => console.warn('Автоплей заблокирован:', err));
    playBtn.textContent = '⏸';
    renderTracks();
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (!audio.src) {
        if (SONGS.length > 0) playTrack(0);
        return;
      }
      if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸';
      } else {
        audio.pause();
        playBtn.textContent = '▶';
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (SONGS.length === 0) return;
      const newIndex = currentIndex <= 0 ? SONGS.length - 1 : currentIndex - 1;
      playTrack(newIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (SONGS.length === 0) return;
      const newIndex = currentIndex >= SONGS.length - 1 ? 0 : currentIndex + 1;
      playTrack(newIndex);
    });
  }

  if (audio) {
    audio.addEventListener('ended', () => {
      if (SONGS.length === 0) return;
      const newIndex = currentIndex >= SONGS.length - 1 ? 0 : currentIndex + 1;
      playTrack(newIndex);
    });
    audio.addEventListener('play', () => playBtn.textContent = '⏸');
    audio.addEventListener('pause', () => playBtn.textContent = '▶');
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  await loadSongs();
});

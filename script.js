document.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // Fetch times
  document.getElementById('get-times').addEventListener('click', async () => {
    const city = document.getElementById('city-select').value;
    if (!city) return alert('Select a city first');

    const loading = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const timesCard = document.getElementById('times-card');

    loading.classList.remove('hidden');
    errorEl.classList.add('hidden');
    timesCard.classList.add('hidden');

    try {
      const date = new Date().toISOString().split('T')[0];
      const url = `https://api.aladhan.com/v1/timingsByCity?city=\( {encodeURIComponent(city)}&country=Pakistan&method=2&date= \){date}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.code !== 200) throw new Error('Failed to fetch');

      const t = data.data.timings;
      document.getElementById('imsak').textContent = t.Imsak || '--:--';
      document.getElementById('fajr').textContent = t.Fajr || '--:--';
      document.getElementById('maghrib').textContent = t.Maghrib || '--:--';

      timesCard.classList.remove('hidden');
    } catch (err) {
      errorEl.classList.remove('hidden');
      console.error(err);
    } finally {
      loading.classList.add('hidden');
    }
  });

  // Live clock
  setInterval(() => {
    const now = new Date().toLocaleTimeString('en-US', { hour12: false });
    document.getElementById('current-time').textContent = now;
  }, 1000);
});

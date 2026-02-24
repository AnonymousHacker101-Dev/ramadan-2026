document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('nav button');
  const sections = {
    today: document.getElementById('times'),
    calendar: document.createElement('div'), // placeholder
    about: document.getElementById('about')
  };

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      Object.values(sections).forEach(s => s.classList.add('hidden'));
      const tabName = tab.dataset.tab;
      if (sections[tabName]) sections[tabName].classList.remove('hidden');
    });
  });

  // Get times button
  document.getElementById('get-times').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    if (!city) return alert('Select a city');

    try {
      const today = new Date().toISOString().split('T')[0];
      const url = `http://api.aladhan.com/v1/timingsByCity?city=\( {city}&country=Pakistan&method=2&date= \){today}`;
      
      const res = await fetch(url);
      const data = await res.json();

      if (data.code !== 200) throw new Error('API error');

      const timings = data.data.timings;
      document.getElementById('imsak').textContent = timings.Imsak;
      document.getElementById('fajr').textContent   = timings.Fajr;
      document.getElementById('maghrib').textContent = timings.Maghrib;

      document.getElementById('times').classList.remove('hidden');
    } catch (err) {
      alert('Could not load times: ' + err.message);
    }
  });

  // Simple live countdown (placeholder - expand later)
  setInterval(() => {
    document.getElementById('countdown').textContent = `Current time: ${new Date().toLocaleTimeString()}`;
  }, 1000);
});

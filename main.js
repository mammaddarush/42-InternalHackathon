import { data } from './data.js';

const Coalition = Object.freeze({
	1: 'Apollo 42',
	2: 'Area 42',
	3: 'Magrathea'
  });
  

const Location = Object.freeze({
	HEILBRONN: 'Heilbronn',
	BERLIN: 'Berlin',
	WOLFSBURG: 'Wolfsburg',
	PARIS: 'Paris'
  });
  
  function getRandomLocation() {
	const values = Object.values(Location);
	const randomIndex = Math.floor(Math.random() * values.length);
	return values[randomIndex];
  }

  const Title = Object.freeze({
	MASTERMIND: 'Mastermind',
	MASTER_OF_HELL: 'Master of Hell 👹',
	SWORD_OF_COALITION: '🗡️ Sword of $coalition_name',
	WRITERS_SOUL: "Writer's soul"
  });

  function getRandomTitle(coalitionId) {
	const titles = Object.values(Title);
	const randomIndex = Math.floor(Math.random() * titles.length);
	const title = titles[randomIndex];
	
	// Look up the coalition name from the ID
	const coalitionName = Coalition[coalitionId] || 'Unknown';
  
	// Replace $coalition_name if present
	return title.replace('$coalition_name', coalitionName);
  }
  
  

const container = document.getElementById('cardContainer');

function getCoalitionClass(coalitionId) {
  switch(coalitionId) {
    case 1: return 'coalition-apollo';
    case 2: return 'coalition-area';
    case 3: return 'coalition-magrathea';
    default: return '';
  }
}

data.forEach((student, index) => {
	const card = document.createElement('div');
	card.className = `card ${getCoalitionClass(student.coalition)}`;

	card.innerHTML = `
		<div class="card-top">
			<span class="card-number">#${String(index + 1).padStart(3, '0')}</span>
			<div class="coalition-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 104" class="coalition-svg">
					<polygon points="0,0 0,80.5 34.3,104 68,80.5 68,0" />
				</svg>
			</div>
			<img 
				class="profile-pic"
				src="${student.image && student.image.link ? student.image.link : 'https://via.placeholder.com/210'}" 
				alt="${student.login}" 
				onerror="this.onerror=null;this.src='https://via.placeholder.com/210?text=42';"
			/>
			<div class="status-badge status-cadet">Cadet</div>

		</div>

		<div class="card-middle">
			<h3 class="intra-name">${student.displayname}</h3>
			<p class="full-name"> ${student.login}</p>
			<p class="city-name"> ${getRandomLocation()}</p>
			<p class="location">${getRandomTitle(student.coalition)}</p>
		</div>

		<div class="card-bottom">
			
			<div class="stat-row">
				<span>⭐ Correction Points</span>
				<span>${student.correction_point}</span>
			</div>
			<div class="stat-row">
				<span>🏆 Coalition</span>
				<span>${Coalition[student.coalition]}</span>
			</div>
		</div>
	`;

	container.appendChild(card);
});
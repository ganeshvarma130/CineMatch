const MOVIE_DB = [
{
  id: 1,
  title: "Inception",
  genre: ["Sci-Fi", "Thriller"],
  year: 2010,
  rating: 8.8,
  poster:"posters/inception.jpg",
  description:"A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
  type:"movie"
},
{
 id:2,
 title:"Interstellar",
 genre:["Sci-Fi","Drama"],
 year:2014,
 rating:8.6,
 poster:"posters/interstellar.jpg",
 description:"A team of explorers travel through a wormhole in space.",
 type:"movie"
},
{
 id:3,
 title:"The Matrix",
 genre:["Sci-Fi","Action"],
 year:1999,
 rating:8.7,
 poster:"posters/matrix.jpg",
 description:"A hacker discovers reality is a simulation.",
 type:"movie"
},
{
 id:4,
 title:"Avengers Endgame",
 genre:["Action","Sci-Fi"],
 year:2019,
 rating:8.4,
 poster:"posters/avengersendgame.jpg",
 description:"The Avengers assemble for one final battle.",
 type:"movie"
},
{
 id:5,
 title:"The Dark Knight",
 genre:["Action","Thriller"],
 year:2008,
 rating:9.0,
 poster:"posters/thedarkknight.jpg",
 description:"Batman faces the Joker in Gotham City.",
 type:"movie"
},
{
id:6,
title:"One Punch Man",
genre:["Action","Comedy","Superhero"],
year:2015,
rating:8.4,
poster:"posters/onepunchman.jpg",
description:"A hero who can defeat any opponent with a single punch searches for a worthy challenge while dealing with the boredom of being unbeatable.",
type:"anime"
},
{
id:7,
title:"Naruto Shippuden",
genre:["Action","Adventure","Fantasy"],
year:2007,
rating:8.7,
poster:"posters/narutoshippuden.jpg",
description:"Naruto Uzumaki continues his journey as a young ninja, facing powerful enemies while protecting his friends and pursuing his dream of becoming Hokage.",
type:"anime"
},
{
  id:8,
  title:"Dune",
  genre:["Sci-Fi","Drama"],
  year:2021,
  rating:8.0,
  poster:"posters/dune.jpg",
  description:"A noble family becomes embroiled in a war for a desert planet.",
  type:"movie"
},
{
  id:9,
  title:"Everything Everywhere",
  genre:["Sci-Fi","Comedy"],
  year:2022,
  rating:7.8,
  poster:"posters/everything.jpg",
  description:"A woman discovers she must connect with parallel universe versions of herself.",
  type:"movie"
},
{
  id:11,
  title:"Spirited Away",
  genre:["Animation","Fantasy"],
  year:2001,
  rating:8.6,
  poster:"posters/miyazaki.jpg",
  description:"A girl finds herself in a strange spirit world.",
  type:"anime"
},
{
  id:13,
  title:"Your Name",
  genre:["Animation","Romance"],
  year:2016,
  rating:8.4,
  poster:"posters/yourname.jpg",
  description:"Two teenagers share a strange connection after a comet.",
  type:"anime"
},
{
  id:14,
  title:"Demon Slayer",
  genre:["Animation","Action"],
  year:2019,
  rating:8.7,
  poster:"posters/demonslayer.jpg",
  description:"A boy trains to become a demon slayer to save his sister.",
  type:"anime"
},
{
  id:15,
  title:"Attack on Titan",
  genre:["Animation","Action"],
  year:2013,
  rating:9.0,
  poster:"posters/attackontitan.jpg",
  description:"Humanity battles giant humanoid titans.",
  type:"anime"
},
{
  id:16,
  title:"My Neighbor Totoro",
  genre:["Animation","Family"],
  year:1988,
  rating:8.2,
  poster:"posters/myneighbourtotoro.jpg",
  description:"Two sisters meet friendly forest spirits.",
  type:"anime"
},
{
  id:17,
  title:"Howl's Moving Castle",
  genre:["Animation","Fantasy"],
  year:2004,
  rating:8.2,
  poster:"posters/howl'smovingcastle.jpg",
  description:"A young woman is cursed by a witch and seeks a wizard.",
  type:"anime"
},
{
  id:18,
  title:"Akira",
  genre:["Animation","Sci-Fi"],
  year:1988,
  rating:8.0,
  poster:"posters/akira.jpg",
  description:"A biker gang member discovers a child with telekinetic powers.",
  type:"anime"
},
{
  id:19,
  title:"Blade Runner 2049",
  genre:["Sci-Fi","Drama"],
  year:2017,
  rating:8.0,
  poster:"posters/bladerunner.jpg",
  description:"A young blade runner discovers a secret that could change society.",
  type:"movie"
},
{
  id:20,
  title:"Oppenheimer",
  genre:["Drama","Historical"],
  year:2023,
  rating:8.9,
  poster:"posters/oppenheimer.jpg",
  description:"The story of J. Robert Oppenheimer and the atomic bomb.",
  type:"movie"
},
{
  id:21,
  title:"Tenet",
  genre:["Action","Sci-Fi"],
  year:2020,
  rating:7.4,
  poster:"posters/tenet.jpg",
  description:"A secret agent manipulates time to prevent World War III.",
  type:"movie"
},
{
  id:23,
  title:"Joker",
  genre:["Crime","Drama"],
  year:2019,
  rating:8.4,
  poster:"posters/joker.jpg",
  description:"The origin story of the iconic DC supervillain.",
  type:"movie"
},
{
  id:25,
  title:"Neon Genesis Evangelion",
  genre:["Animation","Sci-Fi"],
  year:1995,
  rating:8.5,
  poster:"posters/evangelion.jpg",
  description:"Young pilots battle giant creatures threatening humanity.",
  type:"anime"
},
{
  id:26,
  title:"Death Note",
  genre:["Animation","Thriller"],
  year:2006,
  rating:9.0,
  poster:"posters/deathnote.jpg",
  description:"A high school student finds a notebook that can kill anyone.",
  type:"anime"
},
{
  id:27,
  title:"Fullmetal Alchemist",
  genre:["Animation","Action"],
  year:2009,
  rating:9.1,
  poster:"posters/fma.jpg",
  description:"Two brothers search for the philosopher's stone.",
  type:"anime"
},
{
  id:28,
  title:"Naruto",
  genre:["Animation","Action"],
  year:2002,
  rating:8.3,
  poster:"posters/naruto.jpg",
  description:"A young ninja dreams of becoming the hokage.",
  type:"anime"
},
{
  id: 29,
  title: "Avatar",
  genre: ["Sci-Fi", "Action"],
  year: 2009,
  rating: 7.8,
  poster:"posters/avatar.jpg",
  description: "A marine on an alien world becomes involved in a conflict between humans and the native population.",
  type: "movie"
},

{
  id: 30,
  title: "The Shawshank Redemption",
  genre: ["Drama", "Crime"],
  year: 1994,
  rating: 9.3,
  poster: "posters/shawshankredemption.jpg",
  description: "A banker sentenced to life in prison builds an unexpected friendship and keeps hope alive.",
  type: "movie"
},

{
  id: 31,
  title: "Fight Club",
  genre: ["Drama", "Thriller"],
  year: 1999,
  rating: 8.8,
  poster: "posters/fightclub.jpg",
  description: "An unhappy office worker forms an underground fight club that grows beyond his control.",
  type: "movie"
},

{
  id: 32,
  title: "The Godfather",
  genre: ["Crime", "Drama"],
  year: 1972,
  rating: 9.2,
  poster: "posters/godfather.jpg",
  description: "The aging patriarch of a powerful crime family transfers control of his empire to his reluctant son.",
  type: "movie"
},

{
  id: 33,
  title: "Jojo's bizarre adventure: Phantom Blood",
  genre: ["Action", "Adventure"],
  year: 2012,
  rating: 7.7,
  poster: "posters/phantomblood.jpg",
  description: "Jonathan Joestar's peaceful life is shattered when Dio Brando enters his family.",
  type: "anime"
},

{
  id: 34,
  title: "The Prestige",
  genre: ["Drama", "Thriller"],
  year: 2006,
  rating: 8.5,
  poster: "posters/prestige.jpg",
  description: "Two rival magicians become obsessed with creating the ultimate illusion.",
  type: "movie"
},
{
  id: 35,
  title: "One Piece",
  genre: ["Animation", "Action"],
  year: 1999,
  rating: 9.0,
  poster: "posters/one piece.jpg",
  description: "Monkey D. Luffy and his crew sail across the Grand Line searching for the legendary One Piece.",
  type: "anime"
},

{
  id: 36,
  title: "Jujutsu Kaisen",
  genre: ["Animation", "Action"],
  year: 2020,
  rating: 8.6,
  poster: "posters/jjk.jpg",
  description: "A teenager joins a secret organization of sorcerers after becoming involved with a cursed object.",
  type: "anime"
},

{
  id: 37,
  title: "My Hero Academia",
  genre: ["Animation", "Action"],
  year: 2016,
  rating: 8.0,
  poster: "posters/myheroacademia.jpg",
  description: "A boy born without superpowers dreams of becoming a hero in a world full of superhuman abilities.",
  type: "anime"
},

{
  id: 38,
  title: "Tokyo Ghoul",
  genre: ["Animation", "Horror"],
  year: 2014,
  rating: 7.7,
  poster: "posters/tokyoghoul.jpg",
  description: "A college student becomes half-ghoul and must learn to survive between two worlds.",
  type: "anime"
},

{
  id: 39,
  title: "Hunter x Hunter",
  genre: ["Animation", "Action"],
  year: 2011,
  rating: 9.0,
  poster: "posters/hunterxhunter.jpg",
  description: "A young boy becomes a Hunter while searching for his missing father.",
  type: "anime"
},

{
  id: 40,
  title: "Code Geass",
  genre: ["Animation", "Action"],
  year: 2006,
  rating: 8.7,
  poster: "posters/codegeass.jpg",
  description: "A mysterious power gives a young prince the ability to command others as he seeks to overthrow an empire.",
  type: "anime"
},

{
 id:41,
 title:"Baahubali: The Beginning",
 genre:["Action","Drama","Fantasy"],
 year:2015,
 rating:8.0,
 poster:"posters/bahubali.jpg",
 description:"A young man discovers his royal heritage and becomes involved in a struggle against the tyrant ruling the kingdom of Mahishmati.",
 type:"movie"
},

{
id:42,
title:"Baahubali: The Conclusion",
genre:["Action","Drama","Fantasy"],
year:2017,
rating:8.2,
poster:"posters/bahubali2.jpg",
description:"Amarendra Baahubali's life and relationships are threatened when his brother Bhallaladeva plots to seize the throne of Mahishmati.",
type:"movie"
},

{
id:43,
title:"Salaar",
genre:["Action","Crime","Drama"],
year:2023,
rating:6.7,
poster:"posters/salaar.jpg",
description:"A powerful warrior is drawn into a violent struggle over a contested kingdom and an old friendship.",
type:"movie"
},

{
id:44,
title:"RRR",
genre:["Action","Adventure","Drama"],
year:2022,
rating:7.8,
poster:"posters/rrr.jpg",
description:"Two legendary revolutionaries form an unexpected friendship while fighting against British rule in pre-independent India.",
type:"movie"
},

{
id:45,
title:"Irumudi",
genre:["Drama","Action"],
year:2026,
rating:7.5,
poster:"posters/irumudi.jpg",
description:"An emotional social drama centered around a father and his daughter, exploring family, relationships and important social issues.",
type:"movie"
},

{
id:46,
title:"Pushpa: The Rise",
genre:["Action","Crime","Drama"],
year:2021,
rating:7.6,
poster:"posters/pushpa.jpg",
description:"A labourer rises through the ranks of a red sandalwood smuggling syndicate and makes powerful enemies along the way.",
type:"movie"
},

{
id:47,
title:"Pushpa 2: The Rule",
genre:["Action","Crime","Drama"],
year:2024,
rating:6.1,
poster:"posters/pushpa2.jpg",
description:"Pushpa faces powerful rivals and political challenges as he expands his influence in the red sandalwood smuggling world.",
type:"movie"
},

{
id:48,
title:"Peddi",
genre:["Action","Drama","Sports"],
year:2026,
rating:0.0,
poster:"posters/peddi.jpg",
description:"A sports drama centered around a powerful rural character whose life is shaped by ambition, conflict and determination.",
type:"movie"
},

{
id:49,
title:"Rao Bahadur",
genre:["Drama","Thriller"],
year:2026,
rating:0.0,
poster:"posters/raobahadur.jpg",
description:"A psychological drama set against a fading aristocratic world, blending suspense, dark comedy and magical realism.",
type:"movie"
},

{
id:50,
title:"Kalki 2898 AD",
genre:["Sci-Fi","Action","Fantasy"],
year:2024,
rating:7.0,
poster:"posters/kalki.jpg",
description:"In a futuristic world, a pregnant woman is protected by an immortal warrior while powerful forces hunt her.",
type:"movie"
},

{
id:51,
title:"Hi Nanna",
genre:["Drama","Romance","Family"],
year:2023,
rating:8.3,
poster:"posters/hinanna.jpg",
description:"A single father begins telling his daughter the story of her missing mother, changing both of their lives.",
type:"movie"
},

{
id:52,
title:"They Call Him OG",
genre:["Action","Crime","Drama"],
year:2025,
rating:0.0,
poster:"posters/og.jpg",
description:"A retired gangster returns to Bombay after years away and confronts a powerful rival from his past.",
type:"movie"
},

{
id:53,
title:"Rangasthalam",
genre:["Drama","Action","Thriller"],
year:2018,
rating:8.2,
poster:"posters/rangasthalam.jpg",
description:"A partially deaf villager and his brother challenge a corrupt village president who has ruled their community for decades.",
type:"movie"
},

{
id:54,
title:"Saripodhaa Sanivaaram",
genre:["Action","Thriller","Drama"],
year:2024,
rating:6.8,
poster:"posters/saripodhasanivaram.jpg",
description:"A man who controls his anger throughout the week unleashes his fury on Saturdays against people who deserve it.",
type:"movie"
},

{
id:55,
title:"Eega",
genre:["Action","Comedy","Fantasy"],
year:2012,
rating:7.7,
poster:"posters/eega.jpg",
description:"After being murdered by a jealous businessman, a man is reincarnated as a housefly and sets out to avenge his death.",
type:"movie"
},

{
id:56,
title:"Little Hearts",
genre:["Comedy","Romance"],
year:2025,
rating:7.6,
poster:"posters/littlehearts.jpg",
description:"After failing his entrance exam, a young man joins a coaching centre where he meets a girl and begins a funny and heartfelt journey of love and personal growth.",
type:"movie"
},

{
id:57,
title:"Bleach",
genre:["Action","Adventure","Supernatural"],
year:2004,
rating:8.2,
poster:"posters/bleach.jpg",
description:"Ichigo Kurosaki gains the powers of a Soul Reaper and must protect the living world from dangerous supernatural creatures.",
type:"anime"
},

{
id:58,
title:"Bleach: Thousand-Year Blood War",
genre:["Action","Adventure","Supernatural"],
year:2022,
rating:9.0,
poster:"posters/tybw.jpg",
description:"Ichigo and the Soul Reapers face a devastating war against the Quincy army as an ancient enemy threatens the balance between worlds.",
type:"anime"
},

{
id:59,
title:"Black Clover",
genre:["Action","Adventure","Fantasy"],
year:2017,
rating:8.2,
poster:"posters/blackclover.jpg",
description:"Asta, a boy born without magic, trains relentlessly with his friends as he strives to become the greatest Magic Knight in the Clover Kingdom.",
type:"anime"
},

{
id:60,
title:"Dragon Ball Z",
genre:["Action","Adventure","Fantasy"],
year:1989,
rating:8.8,
poster:"posters/dragonballz.jpg",
description:"Goku and his allies defend Earth from powerful warriors and villains while discovering new levels of strength and protecting the universe.",
type:"anime"
},

{
id:61,
title:"Chainsaw Man",
genre:["Action","Horror","Supernatural"],
year:2022,
rating:8.4,
poster:"posters/chainsawman.jpg",
description:"After being betrayed and killed, a young devil hunter merges with his pet devil and becomes Chainsaw Man, gaining terrifying powers.",
type:"anime"
},

{
id:62,
title:"Solo Leveling",
genre:["Action","Fantasy","Adventure"],
year:2024,
rating:8.8,
poster:"posters/sololevelling.jpg",
description:"A weak hunter gains a mysterious ability that allows him to level up on his own and gradually become one of the world's most powerful hunters.",
type:"anime"
},

{
id:63,
title:"Steins;Gate",
genre:["Sci-Fi","Thriller","Drama"],
year:2011,
rating:9.0,
poster:"posters/steinsgate.jpg",
description:"A group of friends discovers a way to send messages into the past, triggering a dangerous chain of events that threatens their lives and reality itself.",
type:"anime"
},

{
id:64,
title:"Your Lie in April",
genre:["Drama","Romance","Music"],
year:2014,
rating:8.6,
poster:"posters/yourlieinapril.jpg",
description:"A gifted pianist who has lost his ability to hear music meets a spirited violinist who helps him rediscover his passion and confront his painful past.",
type:"anime"
},

{
id:65,
title:"Vinland Saga",
genre:["Action","Adventure","Historical"],
year:2019,
rating:8.8,
poster:"posters/vinlandsaga.jpg",
description:"A young Viking warrior joins a mercenary band while seeking revenge for his father's death, becoming caught in a brutal struggle for power.",
type:"anime"
},

{
id:67,
title:"JoJo's Bizarre Adventure: Battle Tendency",
genre:["Action","Adventure","Supernatural"],
year:2012,
rating:8.5,
poster:"posters/battletendency.jpg",
description:"Joseph Joestar uses his cleverness and unique fighting abilities to battle ancient supernatural beings and uncover the secrets of the mysterious Stone Masks.",
type:"anime"
},

{
id:70,
title:"JoJo's Bizarre Adventure: Stardust Crusaders",
genre:["Action","Adventure","Supernatural"],
year:2014,
rating:8.4,
poster:"posters/stardustcrusaders.jpg",
description:"Jotaro Kujo and a group of Stand users travel across the world to defeat Dio and save Jotaro's mother from a supernatural threat.",
type:"anime"
},

{
id:71,
title:"JoJo's Bizarre Adventure: Diamond Is Unbreakable",
genre:["Action","Adventure","Mystery"],
year:2016,
rating:8.5,
poster:"posters/diamondisunbreakable.jpg",
description:"Josuke Higashikata and his friends uncover strange Stand users and a dangerous serial killer while protecting their quiet hometown of Morioh.",
type:"anime"
},

{
id:72,
title:"JoJo's Bizarre Adventure: Golden Wind",
genre:["Action","Adventure","Crime"],
year:2018,
rating:8.5,
poster:"posters/goldenwind.jpg",
description:"Giorno Giovanna joins a powerful mafia organization with the dream of becoming its leader and transforming it into a force for good.",
type:"anime"
},

{
id:73,
title:"JoJo's Bizarre Adventure: Stone Ocean",
genre:["Action","Adventure","Supernatural"],
year:2021,
rating:8.2,
poster:"posters/stoneocean.jpg",
description:"Jolyne Cujoh discovers her Stand ability after being imprisoned for a crime she did not commit and becomes involved in a dangerous battle connected to her family's past.",
type:"anime"
},
];
const GENRES=["All","Action","Sci-Fi","Drama","Thriller","Horror","Romance","Comedy","Crime","Animation","Fantasy","Historical","Family"];
let page="home";
let favorites=JSON.parse(localStorage.getItem("cinematchFavorites")||"[]");
let profile=JSON.parse(localStorage.getItem("cinematchProfile")||'{"name":"","email":"","phone":""}');
let currentGenre="All",currentSort="rating",currentSearch="";

function initials(name){return name?name.split(" ").map(x=>x[0]).join("").toUpperCase().slice(0,2):"?";}
function fav(m){return favorites.some(x=>x.id===m.id);}
function toggleFav(m){
  favorites=fav(m)?favorites.filter(x=>x.id!==m.id):[...favorites,m];
  localStorage.setItem("cinematchFavorites",JSON.stringify(favorites)); render();
}
function similar(movie,count=8){
  return MOVIE_DB.filter(m=>m.id!==movie.id).map(m=>({...m,score:m.genre.filter(g=>movie.genre.includes(g)).length*2+(m.type===movie.type?1:0)+(Math.abs(m.year-movie.year)<5?.5:0)}))
  .sort((a,b)=>b.score-a.score||b.rating-a.rating).slice(0,count);
}
function card(m){
return `<div class="movie-card" data-open="${m.id}">
<div class="movie-poster">
<img src="${m.poster}" alt="${m.title}" class="poster-image">
<div class="poster-type-badge">${m.type==="anime"?"Anime":"Movie"}</div>
<button class="fav-btn ${fav(m)?"active":""}" data-fav="${m.id}">${fav(m)?"❤️":"🤍"}</button></div>
<div class="movie-info">
<div class="movie-title">${m.title}</div>
<div class="movie-meta">
<span class="movie-rating">★ ${m.rating}</span><span>·</span>
<span>${m.year}</span></div>
<div class="movie-genres">${m.genre.slice(0,2).map(g=>`<span class="genre-tag">${g}</span>`).join("")}</div></div></div>`;
}
function rows(a){return a.map(card).join("");}
function home(){
let featured=MOVIE_DB.filter(m=>m.rating>=8.5).slice(0,8), trending=[...MOVIE_DB].sort(()=>Math.random()-.5).slice(0,8);
return `<div class="page">
  <div class="hero">
    <div class="hero-eyebrow"></div>
<h1 class="hero-title">Find your next<br>
  <span>favorite movie</span></h1><p class="hero-sub">Search for a movie or anime and we'll find everything you'll love.</p>
<div class="hero-search">
  <input id="heroSearch" class="hero-input" placeholder="Search a movie or genre...">
  <button class="btn" id="heroBtn">Search</button></div></div>
<div class="stats-row">
  <div class="stat-card"><div class="stat-icon">🎬</div>
  <div class="stat-num">${MOVIE_DB.filter(m=>m.type==="movie").length}</div>
  <div class="stat-label">Movies</div></div>
<div class="stat-card"><div class="stat-icon">⛩️</div>
<div class="stat-num">${MOVIE_DB.filter(m=>m.type==="anime").length}</div>
<div class="stat-label">Anime</div></div>
<div class="stat-card"><div class="stat-icon">❤️</div>
<div class="stat-num">${favorites.length}</div>
<div class="stat-label">Your Favorites</div></div>
<div class="stat-card"><div class="stat-icon">✨</div>
<div class="stat-num">${GENRES.length-1}</div><div class="stat-label">Genres</div></div></div>
<div id="searchPanel"></div>
<div class="section">
    <div class="section-header">
        <div class="section-title">
            <div class="section-title-dot"></div>Top Rated
        </div>
    </div>

    <div class="movie-row-wrapper">
        <button class="scroll-btn left" onclick="scrollRow(this, -1)">‹</button>

        <div class="h-scroll">
            ${rows(featured)}
        </div>

        <button class="scroll-btn right" onclick="scrollRow(this, 1)">›</button>
    </div>
</div>
<div class="section"><div class="section-header">
  <div class="section-title"><div class="section-title-dot"></div>Discover</div></div>
  <div class="h-scroll">${rows(trending)}</div></div></div>`;
}
function listing(type){
return `<div class="page"><div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;flex-wrap:wrap">
<h2 style="font-family:var(--font-display);font-size:1.5rem;font-weight:700">${type==="movie"?"🎬 Movies":"⚡ Anime"}</h2>
<span id="countBadge" style="background:rgba(124,77,255,.15);color:var(--purple-light);padding:4px 12px;border-radius:20px;font-size:.78rem;font-weight:600"></span>
<div style="margin-left:auto">
  <select id="sortSelect" style="background:var(--bg3);border:1px solid var(--border);color:var(--text-dim);padding:8px 14px;border-radius:8px">
    <option value="rating">Top Rated</option>
    <option value="year">Newest</option></select></div></div>
<div style="position:relative;margin-bottom:20px">
  <span class="search-icon">🔍</span>
  <input id="pageSearch" class="search-input" placeholder="Search ${type==="movie"?"movies":"anime"}..." style="width:100%;max-width:400px"></div>
<div class="genre-chips" id="genreChips"></div><div class="movie-grid large" id="movieGrid"></div></div>`;
}
function favoritesPage(){
return `<div class="page"><div style="display:flex;align-items:center;gap:12px;margin-bottom:28px"><h2 style="font-family:var(--font-display);font-size:1.5rem;font-weight:700">❤️ Favorites</h2>
<span style="background:rgba(224,64,251,.15);color:var(--pink);padding:4px 12px;border-radius:20px;font-size:.78rem;font-weight:600">${favorites.length} saved</span></div>
${favorites.length?`<div class="movie-grid large">${rows(favorites)}</div>`:`<div class="empty-state">
  <div class="icon">🤍</div><h3>No favorites yet</h3>
  <p>Tap the heart on any movie or anime to save it here for later.</p></div>`}</div>`;
}
function profilePage(){
return `<div class="page">
<div class="profile-hero">
<div class="profile-avatar-big">${initials(profile.name)}</div><div>
<div class="profile-name">${profile.name||"Your Name"}</div>
<div class="profile-joined">Member since August 2026</div>
<div class="profile-stats"><div class="profile-stat">
<div class="profile-stat-num">${favorites.length}</div>
<div class="profile-stat-label">Saved</div></div>
<div class="profile-stat"><div class="profile-stat-num">${MOVIE_DB.length}</div>
<div class="profile-stat-label">Available</div>
</div><div class="profile-stat">
<div class="profile-stat-num">${GENRES.length-1}</div>
<div class="profile-stat-label">Genres</div>
</div></div></div></div>
<div class="form-card">
<div class="form-card-title">👤 Personal Information</div>
<div class="form-grid">
<div class="form-group">
<label class="form-label">Full Name</label>
<input id="nameInput" class="form-input" placeholder="Enter your name" value="${profile.name}"></div>
<div class="form-group">
<label class="form-label">Phone Number</label>
<input id="phoneInput" class="form-input" placeholder="+91 XXXXX XXXXX" value="${profile.phone}"></div>
<div class="form-group full"><label class="form-label">Email Address</label>
<input id="emailInput" class="form-input" type="email" placeholder="you@example.com" value="${profile.email}"></div></div>
<div style="margin-top:20px;display:flex;gap:12px">
<button class="btn btn-sm" id="saveProfile">Save Changes</button>
<button class="btn btn-sm btn-ghost" id="discardProfile">Discard</button></div></div>
<div class="form-card">
<div class="form-card-title">🎬 Your Taste</div>
<div style="display:flex;gap:16px;flex-wrap:wrap">${["Sci-Fi","Thriller","Animation","Drama","Action"].map(g=>
`<div style="padding:8px 16px;background:var(--bg3);border:1px solid var(--border);border-radius:8px">
<span style="font-size:.85rem;color:var(--text-dim)">${g}</span>
</div>`).join("")}</div>
<div style="margin-top:16px;color:var(--text-muted);font-size:.82rem">Based on your favorites and viewing history.</div>
</div></div>`;
}
function render(){
let c=document.getElementById("appContent");
if(page==="home")c.innerHTML=home();
if(page==="movies")c.innerHTML=listing("movie");
if(page==="anime")c.innerHTML=listing("anime");
if(page==="favorites")c.innerHTML=favoritesPage();
if(page==="profile")c.innerHTML=profilePage();
document.getElementById("topbarTitle").textContent={home:"🏠 Home",movies:"🎬 Movies",anime:"⚡ Anime",favorites:"❤️ Favorites",profile:"👤 Profile"}[page];
document.getElementById("topAvatar").textContent=initials(profile.name);
let b=document.getElementById("favBadge");b.textContent=favorites.length;b.style.display=favorites.length?"inline-block":"none";
document.querySelectorAll(".nav-item").forEach(x=>x.classList.toggle("active",x.dataset.page===page));
bind();
if(page==="movies"||page==="anime") updateList();
}
function updateList(){
let type=page==="anime"?"anime":"movie", items=MOVIE_DB.filter(m=>m.type===type);
let genres=["All",...new Set(items.flatMap(m=>m.genre))];
document.getElementById("genreChips").innerHTML=genres.map(g=>`<button class="chip ${currentGenre===g?"active":""}" data-genre="${g}">${g}</button>`).join("");
let filtered=items.filter(m=>(currentGenre==="All"||m.genre.includes(currentGenre))&&(!currentSearch||m.title.toLowerCase().includes(currentSearch.toLowerCase())));
filtered.sort((a,b)=>currentSort==="rating"?b.rating-a.rating:b.year-a.year);
document.getElementById("countBadge").textContent=filtered.length+" titles";
document.getElementById("movieGrid").innerHTML=filtered.length?rows(filtered):`<div class="empty-state"><div class="icon">🔍</div><h3>Nothing found</h3><p>Try a different search term or genre.</p></div>`;
document.querySelectorAll("[data-genre]").forEach(x=>x.onclick=()=>{currentGenre=x.dataset.genre;updateList();});
}
function openModal(id){
let m=MOVIE_DB.find(x=>x.id===Number(id));if(!m)return;
document.getElementById("modalRoot").innerHTML=`<div class="modal-overlay" id="overlay">
  <div class="modal" onclick="event.stopPropagation()">
<div class="modal-close" id="closeModal">✕</div>
<div class="modal-poster"><img src="${m.poster}"
  alt="${m.title}"class ="modal-poster-image"/></div>
  <div class="modal-title">${m.title}</div>
<div class="modal-meta"><span class="movie-rating">★ ${m.rating}</span><span>·</span><span>${m.year}</span>
  <span>·</span><span>${m.type}</span></div>
<div class="tag-row" style="justify-content:center;margin-bottom:16px">${m.genre.map(g=>`<span class="genre-tag">${g}</span>`).join("")}</div>
<div class="modal-desc">${m.description}</div>

<div class="user-rating">
  <div class="user-rating-title">⭐ Your Rating</div>

  <div class="rating-stars">
    <span>☆</span>
    <span>☆</span>
    <span>☆</span>
    <span>☆</span>
    <span>☆</span>
  </div>
</div>

<div class="rating-value"></div>

<button class="change-rating" id="changeRating">
    Change Rating
</button>

<div class="modal-actions">
  <button class="btn btn-sm btn-outline" id="modalFav">
    ${fav(m)?"❤️ Saved":"🤍 Save"}
  </button>
</div>
<div class="divider" style="margin:24px 0 16px"></div>
<div style="font-size:.8rem;font-weight:600;color:var(--text-dim);margin-bottom:12px;letter-spacing:1px;text-transform:uppercase">You might also like</div>
<div class="reco-scroll">${similar(m,6).map(x=>`<div class="reco-mini-card" data-open="${x.id}">
  <div class="reco-mini-poster"><img src="${x.poster}" alt="${x.title}"></div>
  <div class="reco-mini-title">${x.title}</div><div class="reco-mini-rating">★ ${x.rating}</div>
  </div>`).join("")}</div></div></div>`;
document.getElementById("overlay").onclick=()=>document.getElementById("modalRoot").innerHTML="";
document.getElementById("closeModal").onclick=()=>document.getElementById("modalRoot").innerHTML="";
document.getElementById("modalFav").onclick=()=>{toggleFav(m);openModal(m.id)};
document.querySelectorAll("#modalRoot [data-open]").forEach(x=>x.onclick=()=>openModal(x.dataset.open));

const stars = document.querySelectorAll('.rating-stars span');
const ratingValue = document.querySelector('.rating-value');
const savedRating = localStorage.getItem(`rating_${m.id}`);

if (savedRating) {
    stars.forEach((s, i) => {
        s.textContent = i < Number(savedRating) ? '★' : '☆';
        s.classList.toggle('active', i < Number(savedRating));
    });

    ratingValue.textContent = `You rated: ${savedRating}/5`;
}

stars.forEach((star, index) => {
    star.addEventListener('click', () => {

        const rating = index + 1;

        stars.forEach((s, i) => {
            s.textContent = i < rating ? '★' : '☆';
            s.classList.toggle('active', i < rating);
        });

        ratingValue.textContent = `You rated: ${rating}/5`;

        localStorage.setItem(`rating_${m.id}`, rating);
    });
});

const changeRating = document.getElementById('changeRating');

if (changeRating) {
    changeRating.addEventListener('click', () => {

        // Reset the stars
        stars.forEach(star => {
            star.textContent = '☆';
            star.classList.remove('active');
        });

        // Clear the rating text
        ratingValue.textContent = '';

        // Remove the saved rating for this movie
        localStorage.removeItem(`rating_${m.id}`);
    });
}
}
function homeSearch(){
let q=document.getElementById("heroSearch").value.trim().toLowerCase(),p=document.getElementById("searchPanel");if(!q){p.innerHTML="";return;}
let found=MOVIE_DB.filter(m=>m.title.toLowerCase().includes(q)||m.genre.some(g=>g.toLowerCase().includes(q)));
if(!found.length){p.innerHTML=`<div class="reco-panel"><div class="ai-response">No results found. Try a different title or genre.</div></div>`;return;}
let primary=found[0], rec=similar(primary,6);
p.innerHTML=`<div class="section"><div class="reco-panel">
  <div class="reco-panel-header"><span style="font-size:1.1rem;font-weight:600">Results for "${primary.title}"</span>
    <span class="reco-ai-badge">Recommended</span></div>
<div class="ai-response">Great choice! "${primary.title}" is a fantastic pick. Because it blends ${primary.genre.join(" and ")}, you may also enjoy these similar titles.</div>
<div style="font-size:.8rem;color:var(--text-muted);margin-bottom:14px;text-transform:uppercase;letter-spacing:1px">Search Matches</div>
<div class="h-scroll">${rows(found)}</div>
<div style="font-size:.8rem;color:var(--text-muted);margin:24px 0 14px;text-transform:uppercase;letter-spacing:1px">Because you searched for ${primary.title}</div>
<div class="h-scroll">${rows(rec)}</div></div></div>`;
bind();
}
function scrollRow(button, direction) {
    const row = button.parentElement.querySelector(".h-scroll");

    row.scrollBy({
        left: direction * 600,
        behavior: "smooth"
    });
}
function bind(){
const menuBtn = document.getElementById("mobileMenuBtn");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("sidebarOverlay");

if (menuBtn) {
  menuBtn.onclick = () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");
  };
}

if (overlay) {
  overlay.onclick = () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
  };
}

document.querySelectorAll(".nav-item").forEach(x => {
  x.onclick = () => {
    page = x.dataset.page;
    currentGenre = "All";
    currentSearch = "";

    sidebar.classList.remove("open");
    overlay.classList.remove("active");

    render();
  };
});
document.getElementById("topAvatar").onclick=()=>{page="profile";render();};
document.querySelectorAll("[data-fav]").forEach(x=>x.onclick=e=>{e.stopPropagation();toggleFav(MOVIE_DB.find(m=>m.id==x.dataset.fav));});
document.querySelectorAll("[data-open]").forEach(x=>x.onclick=()=>openModal(x.dataset.open));
let hb=document.getElementById("heroBtn"),hs=document.getElementById("heroSearch");if(hb)hb.onclick=homeSearch;if(hs)hs.onkeydown=e=>{if(e.key==="Enter")homeSearch();};
let ps=document.getElementById("pageSearch");if(ps)ps.oninput=e=>{currentSearch=e.target.value;updateList();};
let ss=document.getElementById("sortSelect");if(ss)ss.onchange=e=>{currentSort=e.target.value;updateList();};
let save=document.getElementById("saveProfile");if(save)save.onclick=()=>{profile={name:document.getElementById("nameInput").value,email:document.getElementById("emailInput").value,phone:document.getElementById("phoneInput").value};localStorage.setItem("cinematchProfile",JSON.stringify(profile));render();alert("✅ Profile saved!");};
let discard=document.getElementById("discardProfile");if(discard)discard.onclick=()=>render();
}
render();
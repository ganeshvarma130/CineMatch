let MOVIE_DB = [];
const GENRES=["All","Action","Sci-Fi","Drama","Thriller","Horror","Romance","Comedy","Crime","Animation","Fantasy","Historical","Family"];
let page="home";
let favorites = [];
let profile=JSON.parse(localStorage.getItem("cinematchProfile")||'{"name":"","email":"","phone":""}');
let currentGenre="All",currentSort="rating",currentSearch="";

function initials(name){return name?name.split(" ").map(x=>x[0]).join("").toUpperCase().slice(0,2):"?";}
function fav(m){return favorites.some(x=>x.id===m.id);}
async function toggleFav(m) {
    try {
        const isFavorite = await API.user.toggleFavorite(m);

        if (isFavorite) {
            favorites = [...favorites, m];
        } else {
            favorites = favorites.filter(x => x.id !== m.id);
        }

        render();
    } catch (error) {
        console.error("Favorite error:", error);
        alert("Unable to update favorite. Please make sure the server is running.");
    }
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
async function openModal(id){
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
const { ratings } = await API.user.getRatings();
const savedRating = ratings[m.id];

if (savedRating) {
    stars.forEach((s, i) => {
        s.textContent = i < Number(savedRating) ? '★' : '☆';
        s.classList.toggle('active', i < Number(savedRating));
    });

    ratingValue.textContent = `You rated: ${savedRating}/5`;
}

stars.forEach((star, index) => {
    star.addEventListener('click', async() => {

        const rating = index + 1;

        stars.forEach((s, i) => {
            s.textContent = i < rating ? '★' : '☆';
            s.classList.toggle('active', i < rating);
        });

        ratingValue.textContent = `You rated: ${rating}/5`;

        await API.user.setRating(m.id, rating);
    });
});

const changeRating = document.getElementById('changeRating');

if (changeRating) {
    changeRating.addEventListener('click', async() => {

        // Reset the stars
        stars.forEach(star => {
            star.textContent = '☆';
            star.classList.remove('active');
        });

        // Clear the rating text
        ratingValue.textContent = '';

        // Remove the saved rating for this movie
        await API.user.removeRating(m.id);
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
let save = document.getElementById("saveProfile");

if (save) save.onclick = async () => {
  profile = {
    name: document.getElementById("nameInput").value,
    email: document.getElementById("emailInput").value,
    phone: document.getElementById("phoneInput").value
  };

  try {
    await API.user.saveProfile(profile);

    render();
    alert("✅ Profile saved!");
  } catch (error) {
    console.error("Profile error:", error);
    alert("Unable to save profile. Please make sure the server is running.");
  }
};
let discard=document.getElementById("discardProfile");if(discard)discard.onclick=()=>render();
}
async function loadData() {
    try {
        const response = await API.movies.all();
        MOVIE_DB = response.movies;

        const favoriteResponse = await API.user.getFavorites();
        favorites = favoriteResponse.favorites;

        const userResponse = await API.user.get();
        profile = userResponse.profile;
        

        render();
    } catch (error) {
        console.error("Failed to load CineMatch data:", error);
        document.getElementById("appContent").innerHTML =
            "<p style='padding:40px'>Unable to load data from the server.</p>";
    }
}

loadData();
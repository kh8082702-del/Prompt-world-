const categories = [
  {name:"Kids", label:"Kids Prompts", icon:"🧸", desc:"Playful portraits, 3D characters and childhood memories.", count:"1,000 planned"},
  {name:"Young Men", label:"Young Men", icon:"🧑🏻", desc:"Modern looks, traditional outfits and cinematic portraits.", count:"1,000 planned"},
  {name:"Seniors", label:"Seniors & Elders", icon:"👴", desc:"Dignified portraits and meaningful family memories.", count:"1,000 planned"},
  {name:"Women", label:"Women Prompts", icon:"🌷", desc:"Elegant fashion, beauty and graceful portrait ideas.", count:"1,000 planned"},
  {name:"Photo Restoration", label:"Photo Restoration", icon:"🖼️", desc:"Restore, enhance and bring old photographs back to life.", count:"1,000 planned"},
  {name:"Islamic", label:"Islamic Prompts", icon:"☪️", desc:"Mosques, calligraphy and respectful Islamic-inspired art.", count:"Extra collection"}
];
const state = {category:"All", search:"", favoritesOnly:false, sort:"featured", visible:9};
const favorites = new Set(JSON.parse(localStorage.getItem("pw-favorites") || "[]"));
const $ = id => document.getElementById(id);
const grid = $("promptGrid");

function renderCategories(){
  $("categoryGrid").innerHTML = categories.map(c => `
    <button class="category-card ${state.category===c.name?"selected":""}" data-category="${c.name}">
      <span class="category-icon">${c.icon}</span>
      <span><h3>${c.label}</h3><p>${c.desc}</p></span>
      <span class="category-count">${c.count}</span>
    </button>`).join("");
  document.querySelectorAll(".category-card").forEach(btn => btn.addEventListener("click",()=>{
    state.category = state.category===btn.dataset.category ? "All" : btn.dataset.category;
    state.visible=9; $("favoritesFilter").classList.remove("active"); $("allFilter").classList.add("active");
    render();
    $("prompts").scrollIntoView({behavior:"smooth"});
  }));
}
function getFiltered(){
  let list = window.PROMPTS.filter(p => {
    const matchCategory = state.category==="All" || p.category===state.category;
    const q = state.search.toLowerCase();
    const matchSearch = !q || [p.title,p.category,p.tag,p.description,p.prompt].join(" ").toLowerCase().includes(q);
    const matchFav = !state.favoritesOnly || favorites.has(p.id);
    return matchCategory && matchSearch && matchFav;
  });
  if(state.sort==="az") list.sort((a,b)=>a.title.localeCompare(b.title));
  if(state.sort==="newest") list.reverse();
  return list;
}
function render(){
  renderCategories();
  const list=getFiltered();
  $("favoriteCount").textContent=favorites.size;
  $("resultCount").textContent=`Showing ${list.length} prompt${list.length===1?"":"s"}`;
  $("activeCategory").textContent=state.category==="All"?"":`Browsing: ${state.category}`;
  $("promptCount").textContent=`${window.PROMPTS.length}+`;
  const shown=list.slice(0,state.visible);
  grid.innerHTML=shown.map(p=>`
    <article class="prompt-card">
      <div class="prompt-image">
        <img src="${p.image}" alt="${p.title} example image" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
        <span class="image-fallback" style="display:none">✳</span>
        <span class="prompt-tag">${p.tag}</span>
        <button class="favorite-btn ${favorites.has(p.id)?"saved":""}" data-fav="${p.id}" aria-label="Save favorite">${favorites.has(p.id)?"♥":"♡"}</button>
      </div>
      <div class="prompt-content">
        <div class="prompt-meta">${p.category}</div>
        <h3>${p.title}</h3><p>${p.description}</p>
        <div class="prompt-bottom"><small>AI IMAGE PROMPT</small><button class="copy-btn" data-copy="${p.id}">▢ Copy prompt</button></div>
      </div>
    </article>`).join("");
  $("emptyState").hidden=list.length!==0;
  $("loadMore").style.display=list.length>state.visible?"inline-block":"none";
  document.querySelectorAll("[data-copy]").forEach(btn=>btn.addEventListener("click",async()=>{
    const p=window.PROMPTS.find(x=>x.id===btn.dataset.copy);
    try{await navigator.clipboard.writeText(p.prompt);showToast("Prompt copied to clipboard!");}
    catch(e){const t=document.createElement("textarea");t.value=p.prompt;document.body.appendChild(t);t.select();document.execCommand("copy");t.remove();showToast("Prompt copied!");}
  }));
  document.querySelectorAll("[data-fav]").forEach(btn=>btn.addEventListener("click",()=>{
    const id=btn.dataset.fav; favorites.has(id)?favorites.delete(id):favorites.add(id);
    localStorage.setItem("pw-favorites",JSON.stringify([...favorites])); render();
  }));
}
let toastTimer;
function showToast(msg){$("toast").textContent=msg;$("toast").classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("toast").classList.remove("show"),1900);}
$("searchInput").addEventListener("input",e=>{state.search=e.target.value;state.visible=9;render();});
$("sortSelect").addEventListener("change",e=>{state.sort=e.target.value;render();});
$("allFilter").addEventListener("click",()=>{state.favoritesOnly=false;state.category="All";$("allFilter").classList.add("active");$("favoritesFilter").classList.remove("active");render();});
$("favoritesFilter").addEventListener("click",()=>{state.favoritesOnly=!state.favoritesOnly;state.category="All";$("favoritesFilter").classList.toggle("active",state.favoritesOnly);$("allFilter").classList.toggle("active",!state.favoritesOnly);render();});
$("loadMore").addEventListener("click",()=>{state.visible+=9;render();});
$("resetSearch").addEventListener("click",()=>{state.search="";state.category="All";state.favoritesOnly=false;$("searchInput").value="";$("favoritesFilter").classList.remove("active");$("allFilter").classList.add("active");render();});
$("menuToggle").addEventListener("click",()=>document.querySelector(".top-nav").classList.toggle("open"));
$("year").textContent=new Date().getFullYear();
render();

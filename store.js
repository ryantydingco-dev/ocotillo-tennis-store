const PRODUCTS = [
 {id:"hoodie", name:"Ocotillo Tennis Pullover Hoodie", img:"assets/hoodie.jpg?v=2", color:"Navy", hex:"#1d2b4a", fit:"Unisex", sizes:["XS","S","M","L","XL","2XL","3XL"], youth:true, personalize:true, tag:"Best seller",
  blurb:"Midweight fleece with the Village wordmark printed center chest. The one players pull on for early-morning clinics and cool-down after evening matches.",
  bullets:["Soft 8 oz cotton-blend fleece","Kangaroo pocket, flat drawcords","Adult and youth sizing","Optional player name on the back"]},
 {id:"crew", name:"Village Crewneck Sweatshirt", img:"assets/crew.jpg?v=2", color:"Heather Grey", hex:"#b8b8b8", fit:"Unisex", sizes:["XS","S","M","L","XL","2XL","3XL"], youth:true, personalize:true,
  blurb:"Classic crew with the full Village lockup in navy. Layers over a polo on cold court mornings.", bullets:["Ribbed cuffs and hem","Pre-shrunk, holds its shape","Adult and youth sizing"]},
 {id:"qzip", name:"Ocotillo Performance Quarter-Zip", img:"assets/qzip.jpg?v=2", color:"Navy", hex:"#1d2b4a", fit:"Men's & Ladies'", sizes:["XS","S","M","L","XL","2XL","3XL"], youth:false, personalize:true, tag:"Coach favorite",
  blurb:"Smooth-face stretch pullover with the Village mark embroidered on the left chest. The polished warm-up piece for pros, coaches, and league captains.", bullets:["Moisture-wicking stretch fabric","Embroidered, not printed","Men's and ladies' cuts","Optional name or title on the right chest"]},
 {id:"polo", name:"Ocotillo Court Polo", img:"assets/polo.jpg?v=2", color:"White", hex:"#ffffff", fit:"Men's & Ladies'", sizes:["XS","S","M","L","XL","2XL","3XL"], youth:false, personalize:false,
  blurb:"Lightweight performance polo with the Village mark embroidered on the left chest. Court-ready, and clean enough for the clubhouse after.", bullets:["Snag-resistant performance knit","UPF sun protection","Men's and ladies' cuts"]},
 {id:"cap", name:"Village Structured Cap", img:"assets/cap.jpg?v=2", color:"Navy", hex:"#1d2b4a", fit:"One size", sizes:["One size"], youth:false, personalize:false,
  blurb:"Structured six-panel cap with a curved brim and the Village wordmark embroidered up front.", bullets:["Embroidered front","Adjustable closure","Sun-ready for Chandler courts"]},
 {id:"tee", name:"Ocotillo Performance Tee", img:"assets/tee.jpg?v=2", color:"Heather Grey", hex:"#b8b8b8", fit:"Adult & Youth", sizes:["XS","S","M","L","XL","2XL","3XL"], youth:true, personalize:true,
  blurb:"Lightweight tri-blend tee with the Village lockup center chest. Built for match days and junior clinics alike.", bullets:["Breathable, quick-dry blend","Retail fit, tagless","Adult and youth sizing","Optional player name on the back"]},
];
const YOUTH = ["YS","YM","YL","YXL"];
const CART_KEY = "village-ocotillo-cart";
const cart = { get(){ try{return JSON.parse(localStorage.getItem(CART_KEY)||"[]")}catch(e){return []} }, set(c){ try{localStorage.setItem(CART_KEY,JSON.stringify(c))}catch(e){} render(); },
  add(item){ const c=cart.get(); const k=JSON.stringify([item.id,item.size,item.name_on]); const ex=c.find(x=>x.key===k); if(ex) ex.qty+=item.qty; else c.push({...item,key:k}); cart.set(c); open(); },
  remove(key){ cart.set(cart.get().filter(x=>x.key!==key)); }, count(){ return cart.get().reduce((a,b)=>a+b.qty,0); }, clear(){ cart.set([]); } };
function $(s,r=document){return r.querySelector(s)}
function shell(active){
  document.body.insertAdjacentHTML("afterbegin", `
  <div class="top">Ocotillo Tennis Team Store · Round 1 closes <b>October 10</b> · Ships to your door in about two weeks</div>
  <header><a href="index.html"><img src="assets/logo-navy.png" alt="Village Health Clubs & Spas"></a>
   <nav><a href="index.html#shop" class="${active==='shop'?'active':''}">Shop All</a><a href="index.html#shop" data-f="adult">Adult</a><a href="index.html#shop" data-f="youth">Youth</a><a href="index.html#shop" data-f="headwear">Headwear</a><a href="index.html#how">How it works</a></nav>
   <div class="icons"><span>Ocotillo Village · Chandler</span><span class="cartbtn" id="cartbtn">Cart (0)</span></div></header>
  <div class="ov" id="ov"></div>
  <aside class="drawer" id="drawer"><h3>Your cart <b id="close">×</b></h3><div class="lines" id="lines"></div>
   <div class="dfoot"><div class="note" style="margin:0 0 12px">Sizes, quantities and personalization are locked when Round 1 closes. Everything ships directly to you.</div><a class="btn dark" href="checkout.html">Checkout</a></div></aside>`);
  document.body.insertAdjacentHTML("beforeend", `<footer><img src="assets/logo-white.png" alt=""><div>Ocotillo Village · Chandler, AZ &nbsp;·&nbsp; Every order supports the Ocotillo tennis program</div><div>Store built and fulfilled by Creative Alternatives · Family-run since 1999</div></footer>`);
  $("#cartbtn").onclick=open; $("#close").onclick=close; $("#ov").onclick=close; render();
}
function open(){ $("#drawer").classList.add("open"); $("#ov").classList.add("open"); } function close(){ $("#drawer").classList.remove("open"); $("#ov").classList.remove("open"); }
function render(){ const c=cart.get(); const b=$("#cartbtn"); if(b) b.textContent=`Cart (${cart.count()})`; const l=$("#lines"); if(!l) return;
  l.innerHTML = c.length? c.map(x=>`<div class="line"><img src="${x.img}"><div class="t"><b>${x.name}</b><small>${x.color} · ${x.size} · Qty ${x.qty}${x.name_on?` · Name: ${x.name_on}`:""}</small></div><span class="rm" data-k='${x.key}'>Remove</span></div>`).join("") : `<div class="empty">Your cart is empty.</div>`;
  l.querySelectorAll(".rm").forEach(e=>e.onclick=()=>cart.remove(e.dataset.k)); }
function card(p){ return `<a class="card" href="product.html?id=${p.id}"><div class="img"><img src="${p.img}" alt="${p.name}">${p.tag?`<span class="tag">${p.tag}</span>`:""}</div>
 <div class="info"><div class="name">${p.name}</div><div class="sub">${p.color} · ${p.fit}${p.youth?" · Youth sizes":""}</div><div class="sw"><i style="background:${p.hex}"></i>${p.personalize?`<small>Personalize with player name</small>`:""}</div><span class="btn dark">View & choose size</span></div></a>`; }

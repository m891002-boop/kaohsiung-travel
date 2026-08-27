let student={className:"",number:"",name:""};
let index=0,score={A:0,B:0,C:0,D:0,E:0};

function renderHome(){
document.getElementById("app").innerHTML=`<div class="card cover">
<div class="emoji">🧭</div><div class="badge">觀光地理 × 高雄探索</div>
<h1 class="title">高雄旅行探索任務</h1>
<p class="subtitle">一趟沒有固定路線的旅行。<br>你的每一次選擇，都會悄悄帶你走向一個最適合探索的地方。</p>
<div class="grid"><input id="className" placeholder="班級"><input id="number" placeholder="座號"><input id="name" placeholder="姓名"></div>
<button class="btn" onclick="start()">開始旅行 →</button>
<p class="note">請依照直覺選擇，沒有標準答案。</p></div>`}

function start(){
const n=document.getElementById("name").value.trim();
if(!n){alert("請輸入姓名");return}
student={className:document.getElementById("className").value.trim(),number:document.getElementById("number").value.trim(),name:n};
index=0;score={A:0,B:0,C:0,D:0,E:0};showQuestion();
}

function showQuestion(){
const q=QUESTIONS[index],pct=(index/QUESTIONS.length)*100;
document.getElementById("app").innerHTML=`<div class="card">
<div class="progress-wrap"><div class="progress-top"><span>🧳 探索護照</span><span>第 ${index+1} / ${QUESTIONS.length} 站</span></div><div class="progress"><div class="bar" style="width:${pct}%"></div></div></div>
<div class="station">${q.station}</div><div class="story">${q.story}</div><div class="options">${q.options.map(o=>`<button class="option" onclick="choose('${o[0]}')">${o[1]}</button>`).join("")}</div></div>`;
}

function choose(k){
score[k]++;index++;
if(index<QUESTIONS.length){showQuestion()}else{showLoading()}
}

function showLoading(){
document.getElementById("app").innerHTML=`<div class="card loading"><div class="spinner">🧭</div><h2>正在整理你的旅行足跡……</h2><div class="progress"><div class="bar" id="loadbar" style="width:0%"></div></div></div>`;
let p=0;const t=setInterval(()=>{p+=10;document.getElementById("loadbar").style.width=p+"%";if(p>=100){clearInterval(t);showResult()}},90);
}

function showResult(){
let type=Object.keys(score).reduce((a,b)=>score[a]>score[b]?a:b);
const r=RESULTS[type];
document.getElementById("app").innerHTML=`<div class="card result">
<div class="emoji">${r.icon}</div><div class="badge">你的高雄探索任務</div>
<h1>你的目的地是</h1><div class="result-place">${r.place}</div>
<p>${r.desc}</p>
<div class="scorebox">${Object.entries(score).map(([k,v])=>`<span>${k}：${v}</span>`).join("")}</div>
<div class="card"><strong>📍 課堂任務</strong><br>請記住你的探索景點，接下來將與相同景點的同學進行分組。</div>
<p id="saveStatus" class="note">正在送出你的結果……</p>
</div>`;
sendToGoogleSheet(type,r.place);
}

async function sendToGoogleSheet(type,place){
const url=window.GOOGLE_SCRIPT_URL||"";
if(!url){document.getElementById("saveStatus").textContent="目前尚未設定 Google 試算表；測驗結果仍可正常顯示。";return}
try{
await fetch(url,{method:"POST",mode:"no-cors",body:JSON.stringify({timestamp:new Date().toISOString(),...student,type,place,...score})});
document.getElementById("saveStatus").textContent="✓ 結果已送出，謝謝你的參與！";
}catch(e){document.getElementById("saveStatus").textContent="結果已完成；資料送出時發生問題，請告知老師。";}
}
renderHome();
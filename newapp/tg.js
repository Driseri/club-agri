function ready(){
  const tg = window.Telegram.WebApp;
  if(tg){ tg.ready(); tg.expand(); applyTheme(); tg.onEvent('themeChanged', applyTheme); }
}
function applyTheme(){
  const tg = window.Telegram.WebApp;
  if(tg){ document.body.style.background = tg.themeParams.bg_color || '#eee'; }
}

document.addEventListener('DOMContentLoaded', () => {
  ready();

  const screens = {
    start: document.getElementById('start-screen'),
    welcome: document.getElementById('welcome-screen'),
    form: document.getElementById('form-screen'),
    loading: document.getElementById('loading-screen'),
    results: document.getElementById('results-screen'),
    club: document.getElementById('club-screen')
  };
  function show(name){
    Object.values(screens).forEach(s=>s.hidden=true);
    screens[name].hidden=false;
  }
  document.getElementById('start-btn').onclick = () => show('welcome');
  const agree = document.getElementById('agree');
  const next = document.getElementById('welcome-next');
  agree.onchange = () => next.disabled = !agree.checked;
  next.onclick = () => startForm();

  function startForm(){
    show('form');
    let step = 0;
    const data = {};
    const container = screens.form;
    const steps = [renderAge, renderGender, renderAddress, renderTransport, renderTime, renderInterests];
    renderStep();

    function renderStep(){
      container.innerHTML='';
      steps[step](container, data, () => { step++; if(step<steps.length){renderStep();} else { finish(); } });
    }
  }

  function finish(){
    show('loading');
    setTimeout(()=>{
      showResults();
    }, 2000);
  }

  function showResults(){
    show('results');
    const c = screens.results;
    c.innerHTML = '<h2>Подходящие клубы</h2>';
    ['IT Kids','Форте','Юный атлет'].forEach((name,i)=>{
      const div = document.createElement('div');
      div.className='card';
      div.textContent=name;
      div.onclick=()=>showClub(i);
      c.appendChild(div);
    });
  }

  function showClub(id){
    show('club');
    const c = screens.club;
    c.innerHTML = '<button id="back">Назад</button><h2></h2><p></p>';
    const title = c.querySelector('h2');
    const desc = c.querySelector('p');
    switch(id){
      case 0:
        title.textContent='Клуб программирования "IT Kids"';
        desc.textContent='Занятия по разработке и робототехнике';
        break;
      case 1:
        title.textContent='Школа музыки "Форте"';
        desc.textContent='Уроки игры на разных инструментах';
        break;
      default:
        title.textContent='Спортивная секция "Юный атлет"';
        desc.textContent='Физическая подготовка и тренировки';
    }
    c.querySelector('#back').onclick=()=>showResults();
  }

  // Steps
  function renderAge(root,data,done){
    root.innerHTML='<p>Возраст ребёнка</p><input type="number" id="age" min="3" max="18" value="7"><div><button id="age-next">Далее</button></div>';
    const ageInput=root.querySelector('#age');
    root.querySelector('#age-next').onclick=()=>{
      const v=parseInt(ageInput.value,10);
      if(v>=3&&v<=18){ data.age=v; done(); }
    };
  }

  function renderGender(root,data,done){
    root.innerHTML='<p>Пол ребёнка</p>\
      <label><input type="radio" name="g" value="m">Мальчик</label>\
      <label><input type="radio" name="g" value="f">Девочка</label>\
      <label><input type="radio" name="g" value="x">Не важно</label><div><button id="g-next" disabled>Далее</button></div>';
    const btn=root.querySelector('#g-next');
    root.querySelectorAll('input[name=g]').forEach(r=>r.onchange=()=>btn.disabled=false);
    btn.onclick=()=>{ data.gender=root.querySelector('input[name=g]:checked').value; done(); };
  }

  function renderAddress(root,data,done){
    root.innerHTML='<p>Адрес проживания</p><input type="text" id="addr" placeholder="Введите адрес"><div><button id="addr-next">Далее</button></div>';
    root.querySelector('#addr-next').onclick=()=>{ data.address=root.querySelector('#addr').value; done(); };
  }

  function renderTransport(root,data,done){
    root.innerHTML='<p>Предпочтительный транспорт</p>\
      <label><input type="radio" name="t" value="walk">Пешком</label>\
      <label><input type="radio" name="t" value="car">Машина</label>\
      <label><input type="radio" name="t" value="public">Общественный</label><div><button id="t-next" disabled>Далее</button></div>';
    const btn=root.querySelector('#t-next');
    root.querySelectorAll('input[name=t]').forEach(r=>r.onchange=()=>btn.disabled=false);
    btn.onclick=()=>{ data.transport=root.querySelector('input[name=t]:checked').value; done(); };
  }

  function renderTime(root,data,done){
    root.innerHTML='<p>Максимальное время в пути</p><input type="range" min="5" max="90" step="5" value="30" id="time"> <div id="time-val">30 мин</div><div><button id="time-next">Далее</button></div>';
    const range=root.querySelector('#time');
    const val=root.querySelector('#time-val');
    range.oninput=()=>{ val.textContent=range.value+' мин'; };
    root.querySelector('#time-next').onclick=()=>{ data.time=range.value; done(); };
  }

  function renderInterests(root,data,done){
    root.innerHTML='<p>Интересы</p>';
    const opts=['Спорт','Музыка','Программирование','Языки','Творчество','Наука'];
    opts.forEach((o,i)=>{
      const id='ch'+i;
      root.innerHTML+=`<label><input type="checkbox" id="${id}" value="${o}">${o}</label>`;
    });
    root.innerHTML+='<div><button id="fin" disabled>Подобрать</button></div>';
    const btn=root.querySelector('#fin');
    root.querySelectorAll('input[type=checkbox]').forEach(c=>c.onchange=()=>{
      btn.disabled = !Array.from(root.querySelectorAll('input[type=checkbox]')).some(x=>x.checked);
    });
    btn.onclick=()=>{ data.interests=Array.from(root.querySelectorAll('input[type=checkbox]:checked')).map(c=>c.value); done(); };
  }
});

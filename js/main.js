(()=>{'use strict';
const $=id=>document.getElementById(id),SAVE='guardians_firstperson_portal_room_v3';
const gameSfx={};function playSfx(name){try{let a=gameSfx[name];if(!a){a=new Audio('assets/audio/'+name+'.wav');a.preload='none';gameSfx[name]=a;}a.currentTime=0;const p=a.play();if(p&&p.catch)p.catch(()=>{});}catch(e){}}
const eras=[
{name:'Древний Египет',icon:'𓂀',color:0xffb83f,desc:'Песчаные руины, загадки фараонов и солнечный артефакт.',artifact:'Солнечный диск',puzzles:[
{t:'Код жреца',q:'Последовательность: 2, 6, 12, 20, 30… Какое число дальше?',a:['40','42','44'],c:1,why:'Разности равны 4, 6, 8, 10; следующая разность 12, значит 30 + 12 = 42.'},
{t:'Сосуды фараона',q:'В большом сосуде 36 мерок. Сначала забрали треть, затем половину оставшегося. Сколько мерок осталось?',a:['12','18','24'],c:0,why:'36 − 12 = 24, затем забрали половину от 24 — 12. Осталось 12.'},
{t:'Тень обелиска',q:'Сейчас тень обелиска направлена на запад. В какую сторону примерно находится Солнце?',a:['На востоке','На западе','На севере'],c:0,why:'Тень всегда падает в сторону, противоположную Солнцу. Если тень на западе, Солнце на востоке.'}]},
{name:'Средневековый замок',icon:'♜',color:0x71d8ff,desc:'Забытый замок, рыцарские испытания и кристалл доблести.',artifact:'Кристалл доблести',puzzles:[
{t:'Рыцарские щиты',q:'Три щита — красный, синий и зелёный. Красный не первый. Зелёный стоит правее синего. Какой порядок возможен?',a:['Синий, зелёный, красный','Зелёный, синий, красный','Красный, синий, зелёный'],c:0,why:'Красный не первый, а зелёный правее синего: подходит порядок синий, зелёный, красный.'},
{t:'Лестница башни',q:'Рыцарь поднялся на 3/8 лестницы, затем ещё на 1/4 всей лестницы. Какую часть лестницы ему осталось пройти?',a:['3/8','1/2','5/8'],c:0,why:'3/8 + 1/4 = 3/8 + 2/8 = 5/8 пройдено. Осталось 3/8.'},
{t:'Страж и две двери',q:'Одна дверь ведёт к выходу, другая в тупик. На табличке написано: «Выход не за левой дверью». Надпись правдива. Какую дверь выбрать?',a:['Левую','Правую','Нельзя определить'],c:1,why:'Если надпись правдива, выход не слева — значит справа.'}]},
{name:'Футуристический город',icon:'⌬',color:0x9c83ff,desc:'Неоновый мегаполис, цифровые загадки и ядро будущего.',artifact:'Ядро будущего',puzzles:[
{t:'Код будущего',q:'Числовой код: 4, 9, 19, 39, 79… Какое число следующее?',a:['119','149','159'],c:2,why:'Каждый раз умножаем на 2 и прибавляем 1: 79 × 2 + 1 = 159.'},
{t:'Робот-курьер',q:'Робот смотрит на север. Он поворачивает налево, затем на 180°, затем направо. Куда он смотрит?',a:['На север','На восток','На юг'],c:2,why:'Север → после поворота налево запад → после разворота восток → после поворота направо юг.'},
{t:'Сбой матрицы',q:'В каждом ряду сумма первых двух чисел равна третьему: (3, 8, 11), (5, 7, 12). Чему равно третье число в ряду (9, 6, ?)?',a:['14','15','16'],c:1,why:'9 + 6 = 15.'}]}
,{name:'Доисторическая долина',icon:'🦕',color:0x76e36d,desc:'Дикие джунгли, древние следы и зелёный камень жизни.',artifact:'Клык времени',puzzles:[
{t:'Следы великана',q:'Следы образуют ряд: 1, 4, 9, 16, 25… Какое число дальше?',a:['30','36','49'],c:1,why:'Это квадраты чисел: 1², 2², 3², 4², 5²; дальше 6² = 36.'},
{t:'Запасы племени',q:'Племя собрало 48 ягод. Четверть съели, а оставшиеся поровну разложили в 6 корзин. Сколько ягод в каждой?',a:['4','6','8'],c:1,why:'После того как съели 12, осталось 36; 36 ÷ 6 = 6.'},
{t:'Яйца динозавра',q:'В трёх гнёздах 5, 7 и 9 яиц. Из каждого гнезда забрали по 2 яйца. Сколько осталось всего?',a:['15','17','19'],c:0,why:'Было 21 яйцо, забрали 6: осталось 15.'}]}
,{name:'Древняя Греция',icon:'🏛️',color:0xffd16b,desc:'Мраморные храмы, лабиринт Минотавра и мудрость богов.',artifact:'Лавровый венец',puzzles:[
{t:'Загадка мудреца',q:'У трёх братьев вместе 27 лет. Старший вдвое старше младшего, а средний на 3 года старше младшего. Сколько лет младшему?',a:['6','8','9'],c:0,why:'Если младшему x, то x + (x + 3) + 2x = 27, значит 4x = 24 и x = 6.'},
{t:'Амфоры на складе',q:'На 4 полках по 9 амфор. 7 амфор разбились, а 5 перенесли в храм. Сколько целых амфор осталось на полках?',a:['24','25','29'],c:0,why:'Всего 36; 36 − 7 − 5 = 24.'},
{t:'Путь героя',q:'Герой прошёл 5 км на восток, 2 км на север и 5 км на запад. Где он относительно старта?',a:['На 2 км севернее','На 2 км восточнее','В точке старта'],c:0,why:'Восток и запад взаимно компенсируются; герой остался на 2 км севернее.'}]}
,{name:'Золотой век пиратов',icon:'🏴‍☠️',color:0x46d8e8,desc:'Тропические острова, затонувшие корабли и карта сокровищ.',artifact:'Компас семи морей',puzzles:[
{t:'Карта сокровищ',q:'Капитан идёт 4 шага на север, 3 на восток, 4 на юг и 1 на запад. На сколько шагов и в какую сторону он от старта?',a:['2 шага на восток','2 шага на запад','В точке старта'],c:0,why:'Север и юг отменяются; 3 шага на восток − 1 на запад = 2 на восток.'},
{t:'Монеты капитана',q:'У капитана 42 монеты. Половину он отдал команде, затем треть оставшихся — штурману. Сколько монет осталось?',a:['7','14','21'],c:1,why:'Половина от 42 — 21. Треть от 21 — 7. Осталось 14.'},
{t:'Сигнальные флаги',q:'Флаги идут по циклу: красный, синий, белый, зелёный. Какой цвет будет 14-м, если первый — красный?',a:['Синий','Белый','Зелёный'],c:0,why:'В цикле из 4 цветов 14-я позиция совпадает со 2-й: красный, затем синий.'}]}
,{name:'Ледниковый период',icon:'❄️',color:0x9be7ff,desc:'Ледяные пещеры, северное сияние и замёрзшие тайны.',artifact:'Кристалл вечного льда',puzzles:[
{t:'Ледяная последовательность',q:'Температура меняется так: −12, −7, −1, 6, 14… На сколько градусов изменится температура на следующем шаге, если закономерность продолжается?',a:['+8°','+9°','+10°'],c:1,why:'Прибавления: 5, 6, 7, 8; следующее — 9 градусов.'},
{t:'Запасы охотников',q:'Пятеро охотников запасли по 8 сушёных рыб. За день съели 13 рыб, затем нашли ещё 9. Сколько рыб стало?',a:['34','36','40'],c:1,why:'5 × 8 = 40; 40 − 13 + 9 = 36.'},
{t:'Полярный маршрут',q:'Путник прошёл 6 км на север, 8 км на восток и 6 км на юг. Как далеко он от старта по прямой?',a:['6 км','8 км','14 км'],c:1,why:'Северный и южный участки отменяются. Осталось 8 км на восток.'}]}
,{name:'Зачарованный лес',icon:'🌳',color:0x5df0a5,desc:'Светящиеся грибы, древние деревья и магия природы.',artifact:'Сердце леса',puzzles:[
{t:'Грибы-фонарики',q:'Синие грибы удваиваются каждую ночь. В начале первой ночи их 3. Сколько будет после 4 ночей?',a:['24','36','48'],c:2,why:'3 → 6 → 12 → 24 → 48.'},
{t:'Шёпот деревьев',q:'На каждом из 6 деревьев сидят 4 совы. Треть всех сов улетела. Сколько сов осталось?',a:['8','12','16'],c:2,why:'6 × 4 = 24; улетела треть (8), осталось 16.'},
{t:'Лесной узор',q:'Узор: лист, лист, цветок; лист, лист, цветок; лист, лист… Что будет следующим?',a:['Лист','Цветок','Плод'],c:1,why:'Повторяется группа из двух листьев и цветка.'}]}
,{name:'Эпоха паровых машин',icon:'⚙️',color:0xff9a63,desc:'Викторианский город, дирижабли и механизмы шестерён.',artifact:'Заводной ключ',puzzles:[
{t:'Шестерни',q:'Шестерня A делает 3 оборота за минуту. Она сцеплена с B, у которой вдвое больше зубьев. Сколько оборотов сделает B за 4 минуты?',a:['3','6','12'],c:1,why:'У B вдвое больше зубьев, поэтому она вращается вдвое медленнее: 1,5 оборота/мин × 4 = 6.'},
{t:'Паровой поезд',q:'Поезд прошёл 120 км за 2 часа, затем 90 км за 1,5 часа. Какова средняя скорость за весь путь?',a:['50 км/ч','60 км/ч','70 км/ч'],c:1,why:'Всего 210 км за 3,5 часа: 210 ÷ 3,5 = 60 км/ч.'},
{t:'Код механика',q:'Код: 2, 5, 11, 23, 47… Каждое число получается одинаковым действием. Что дальше?',a:['93','94','95'],c:2,why:'Каждый раз умножаем на 2 и прибавляем 1: 47 × 2 + 1 = 95.'}]}
,{name:'Космическое будущее',icon:'🚀',color:0xf17cff,desc:'Орбитальные станции, звёздные карты и загадки галактики.',artifact:'Звёздное ядро',puzzles:[
{t:'Маршрут ракеты',q:'Ракета пролетела 3/5 маршрута, затем ещё 1/4 всего маршрута. Какая часть пути осталась?',a:['3/20','7/20','9/20'],c:0,why:'3/5 + 1/4 = 12/20 + 5/20 = 17/20; осталось 3/20.'},
{t:'Звёздный код',q:'Числа идут так: 1, 2, 6, 24, 120… Какое следующее число?',a:['600','720','840'],c:1,why:'Каждый раз умножаем на следующее натуральное число: ×2, ×3, ×4, ×5, затем ×6. 120 × 6 = 720.'},
{t:'Орбитальная логика',q:'На станции 8 отсеков. Два закрыты, а половина оставшихся без гравитации. Сколько отсеков одновременно доступны и с гравитацией?',a:['2','3','4'],c:1,why:'Открыты 6 отсеков; половина из них — 3.'}]}
 ];
const chapterLore=[
'Хроника I: песок хранит память о первом расколе. Жрица Нефру уверена: Солнечный диск укажет путь к началу катастрофы.',
'Хроника II: рыцари поклялись охранять не короля, а сам ход времени. В архиве замка спрятан след предателя.',
'Хроника III: городской ИИ обнаружил, что временные линии кто-то намеренно переписал. Проверь его вычисления.',
'Хроника IV: древнее племя слышало гул порталов задолго до появления первых городов. Следы ведут к источнику разлома.',
'Хроника V: греческий оракул видел десять осколков и одну тень, которая всегда шла против света.',
'Хроника VI: капитан Мара нашла карту, на которой отмечено место, не существующее ни в одной эпохе.',
'Хроника VII: лёд сохранил послание из будущего. Его автор знает имя того, кто предал Хранителей.',
'Хроника VIII: лес помнит все решения, принятые во времени. Он просит восстановить равновесие, а не изменить прошлое.',
'Хроника IX: механик Эдда собрала устройство, которое показывает следы вмешательства в историю.',
'Хроника X: звёздная станция хранит последний фрагмент. Все артефакты вместе откроют путь к Предателю Хранителю.'
];
let save={era:0,solved:Array.from({length:eras.length},()=>[]),artifacts:[],shards:Array.from({length:eras.length},()=>[]),score:0,x:0,z:5,yaw:0,pitch:0,endingSolved:false};let scene,camera,renderer,clock,raycaster,portals=[],decor=[],particles,keys={},locked=false,started=false,near=null,selectedEra=0,moveSpeed=5,inEraMap=false,mapMarkers=[],target=null,collectibles=[],touchLook=null;
// Ограничиваем частоту рендера и подбираем качество под устройство.
let lastRenderTime=0;const lowPowerDevice=()=>((navigator.hardwareConcurrency||4)<=4)||((navigator.deviceMemory||4)<=4)||isTouchDevice();
const isTouchDevice=()=>('ontouchstart' in window)||navigator.maxTouchPoints>0;
const TUTORIAL_KEY='guardians_time_tutorial_v1';
let tutorialStep=0;
const tutorialSteps=[
 {glyph:'⌖',title:'Осмотрись и найди первый портал',text:'W A S D — двигаться, мышь — смотреть вокруг. На телефоне используй стрелки и свайп по миру. Подойди к первому порталу и нажми E или кнопку взаимодействия.'},
 {glyph:'?',title:'Найди трёх жителей',text:'Внутри эпохи поговори с тремя персонажами. Подойди к жителю и нажми E, затем выбери ответ на его загадку. Если ошибёшься — можно попробовать снова.'},
 {glyph:'🔓',title:'Открой следующую эпоху',text:'Реши все 3 загадки и получи артефакт эпохи. Только после этого откроется следующий портал в Зале Времени. Осколки времени собирать полезно, но для открытия прохода они не обязательны.'}
];
function isEraUnlocked(index){if(index<=0)return true;for(let i=0;i<index;i++){if(!save.artifacts.includes(i))return false;}return true;}
function showTutorial(){if(document.pointerLockElement&&document.exitPointerLock)document.exitPointerLock();tutorialStep=0;renderTutorialStep();$('tutorialModal').classList.remove('hidden');document.body.classList.add('modal-open');}
function renderTutorialStep(){const s=tutorialSteps[tutorialStep];$('tutorialStepLabel').textContent='ШАГ '+(tutorialStep+1)+' ИЗ '+tutorialSteps.length;$('tutorialGlyph').textContent=s.glyph;$('tutorialTitle').textContent=s.title;$('tutorialText').textContent=s.text;$('tutorialProgressBar').style.width=((tutorialStep+1)/tutorialSteps.length*100)+'%';$('tutorialNext').textContent=tutorialStep===tutorialSteps.length-1?'Начать игру ✓':'Далее →';}
function finishTutorial(){try{localStorage.setItem(TUTORIAL_KEY,'1')}catch(e){}$('tutorialModal').classList.add('hidden');document.body.classList.remove('modal-open');if(renderer&&!isTouchDevice())lock();}

const achievementDefs=[
 {id:'first-step',icon:'🚪',title:'Первый шаг',desc:'Войди в первую эпоху.',test:()=>save.artifacts.length>0||save.solved.some(a=>a.length>0)},
 {id:'thinker',icon:'🧩',title:'Сила мысли',desc:'Реши 5 загадок.',test:()=>save.solved.reduce((n,a)=>n+a.length,0)>=5},
 {id:'collector',icon:'💎',title:'Охотник за осколками',desc:'Собери 5 осколков времени в одной эпохе.',test:()=>save.shards.some(a=>a.length>=5)},
 {id:'artifact',icon:'🏆',title:'Хранитель артефактов',desc:'Получи 3 артефакта.',test:()=>save.artifacts.length>=3},
 {id:'explorer',icon:'🧭',title:'Исследователь эпох',desc:'Открой 5 эпох.',test:()=>save.artifacts.length>=5},
 {id:'legend',icon:'🌌',title:'Легенда времени',desc:'Заверши все 10 эпох.',test:()=>save.artifacts.length>=eras.length}
];
function renderJournal(){
 const solvedTotal=save.solved.reduce((n,a)=>n+a.length,0);
 $('journalSummary').textContent='Эпохи: '+save.artifacts.length+' / '+eras.length+' · Загадки: '+solvedTotal+' / '+(eras.length*3)+' · Очки: '+(save.score||0);
 const list=$('journalAchievements');list.innerHTML='';
 achievementDefs.forEach(a=>{const done=!!a.test();const card=document.createElement('div');card.className='achievement'+(done?' unlocked':'');const medal=document.createElement('div');medal.className='medal';medal.textContent=done?a.icon:'🔒';const copy=document.createElement('div');const title=document.createElement('strong');title.textContent=a.title;const desc=document.createElement('small');desc.textContent=done?'Получено! '+a.desc:a.desc;copy.append(title,desc);card.append(medal,copy);list.appendChild(card)});
}
function openJournal(){if(document.pointerLockElement&&document.exitPointerLock)document.exitPointerLock();renderJournal();$('journal').classList.remove('hidden');document.body.classList.add('modal-open')}
function closeJournal(){$('journal').classList.add('hidden');document.body.classList.remove('modal-open');if(!isTouchDevice()&&started)lock()}
function updateQuest(){const solved=inEraMap?(save.solved[selectedEra]||[]).length:0;const shards=inEraMap?(save.shards[selectedEra]||[]).length:0;$('shardCount').textContent='Осколки времени: '+shards+' / 5';$('questTitle').textContent=inEraMap?(solved===3?'Глава завершена: вернись к порталу':('Глава '+(selectedEra+1)+'/10 · '+solved+'/3 испытаний')):('Сюжет: '+save.artifacts.length+'/10 артефактов · '+(save.endingSolved?'Река времени восстановлена':'найди следы Предателя'));}
function load(){try{let x=JSON.parse(localStorage.getItem(SAVE));if(x&&x.solved){save=Object.assign(save,x);save.solved=Array.from({length:eras.length},(_,i)=>Array.isArray(x.solved[i])?x.solved[i]:[]);save.artifacts=Array.isArray(x.artifacts)?x.artifacts:[];save.shards=Array.from({length:eras.length},(_,i)=>Array.isArray(x.shards?.[i])?x.shards[i]:[]);save.score=Number.isFinite(x.score)?x.score:0;save.endingSolved=!!x.endingSolved}}catch(e){}}
function persist(){try{localStorage.setItem(SAVE,JSON.stringify(save))}catch(e){}$('count').textContent=save.artifacts.length+' / '+eras.length;$('score').textContent=save.score||0;updateQuest()}
function toast(t){$('toast').textContent=t;$('toast').style.opacity=1;setTimeout(()=>$('toast').style.opacity=0,1700)}
function mat(color,rough=.65,metal=0,em=0,transparent=false,opacity=1){return new THREE.MeshStandardMaterial({color,roughness:Math.max(.32,Math.min(.96,rough)),metalness:Math.max(0,Math.min(.48,metal)),emissive:em,emissiveIntensity:em?1.1:0,transparent,opacity,side:THREE.DoubleSide,flatShading:false})}
function add(geo,m,x,y,z,parent=scene){let o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=false;o.receiveShadow=false;parent.add(o);decor.push(o);return o}
function glow(color){return new THREE.MeshBasicMaterial({color,transparent:true,opacity:.7,side:THREE.DoubleSide})}
function makePortal(x,z,eraIndex){
 const color=eras[eraIndex].color,g=new THREE.Group();g.position.set(x,0,z);scene.add(g);decor.push(g);
 // Monumental stone frame and stepped plinth
 const stone=mat(eraIndex===0?0x77634a:eraIndex===1?0x536a7e:0x343d6b,.55,.25);
 add(new THREE.BoxGeometry(3.15,.35,.85),stone,0,.18,0,g);
 add(new THREE.BoxGeometry(.38,3.6,.65),stone,-1.25,1.8,0,g);add(new THREE.BoxGeometry(.38,3.6,.65),stone,1.25,1.8,0,g);add(new THREE.BoxGeometry(2.9,.42,.72),stone,0,3.55,0,g);
 for(let side of [-1,1])for(let j=0;j<4;j++){let gem=add(new THREE.OctahedronGeometry(.105),mat(color,.2,.2,color),side*1.25, .7+j*.75,-.38,g);gem.rotation.z=j*.4}
 // layered luminous ring stack gives the portal a richer, dimensional silhouette
 for(let k=0;k<5;k++){let ring=add(new THREE.TorusGeometry(1.0-k*.075,.035+(k%2)*.018,10,64),new THREE.MeshBasicMaterial({color:[color,0xffffff,color,0x8c74ff,color][k],transparent:true,opacity:.95-k*.12}),0,1.95,-.18-k*.055,g);ring.scale.y=1.47;ring.rotation.z=(k%2?-.06:.06)}
 // Animated energy vortex: layered color bands, spiralling filaments and a bright event horizon.
 const vortexMat=new THREE.ShaderMaterial({
   uniforms:{uTime:{value:0},uColor:{value:new THREE.Color(color)},uWhite:{value:new THREE.Color(0xbdefff)}},
   vertexShader:`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
   fragmentShader:`
     varying vec2 vUv; uniform float uTime; uniform vec3 uColor; uniform vec3 uWhite;
     void main(){
       vec2 p=(vUv-0.5)*2.0; p.x*=0.70;
       float r=length(p); float a=atan(p.y,p.x);
       float spiral=sin(a*7.0-r*18.0-uTime*2.7+sin(a*3.0+uTime)*1.2);
       float bands=sin(r*32.0-uTime*4.0+sin(a*5.0)*2.0);
       float core=smoothstep(1.0,0.05,r);
       float edge=smoothstep(1.02,0.72,r)*smoothstep(0.10,0.38,r);
       float energy=(0.28+0.36*spiral+0.18*bands)*core;
       vec3 col=mix(uColor,uWhite,clamp(energy*1.5+0.12,0.0,0.78));
       col+=uColor*(0.8*edge+0.18*core);
       float alpha=(0.12+0.52*core+0.22*edge)*smoothstep(1.12,0.78,r);
       alpha*=0.82+0.18*sin(uTime*3.0+r*15.0+a*4.0);
       gl_FragColor=vec4(col,alpha);
     }`,transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending
 });
 let disk=add(new THREE.CircleGeometry(1.02,96),vortexMat,0,1.95,-.14,g);disk.scale.y=1.48;g.userData.vortex=vortexMat;
 let inner=add(new THREE.CircleGeometry(.78,64),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.09,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}),0,1.95,-.10,g);inner.scale.y=1.42;
 // A halo behind the frame creates coloured spill light, while thin runes orbit in front.
 const halo=add(new THREE.TorusGeometry(1.48,.10,10,80),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.24,blending:THREE.AdditiveBlending}),0,1.95,-.48,g);halo.scale.y=1.46;g.userData.halo=halo;
 const archLight=add(new THREE.TorusGeometry(1.13,.018,8,96),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.9,blending:THREE.AdditiveBlending}),0,1.95,.10,g);archLight.scale.y=1.48;g.userData.archLight=archLight;
 // Sculpted portal crown, side pillars and inset stone plates create a crafted landmark.
 for(const side of [-1,1]){
   const pillar=add(new THREE.BoxGeometry(.22,2.45,.78),mat(eraIndex%3===0?0xb9a17c:0x7b8799,.95),side*1.25,1.82,.035,g);
   pillar.rotation.z=side*.035;
   for(let q=0;q<3;q++){
     const plate=add(new THREE.BoxGeometry(.29,.38,.09),mat(0x35465a,.75),side*1.25,.82+q*.78,.44,g);
     plate.rotation.z=side*.04;
     const inset=add(new THREE.OctahedronGeometry(.105,0),new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.7,flatShading:true}),side*1.25,.82+q*.78,.51,g);
     inset.rotation.y=q*.6;
   }
   const finial=add(new THREE.OctahedronGeometry(.22,0),new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.8,flatShading:true}),side*1.25,3.95,.04,g);finial.rotation.z=side*.2;
 }
 const crown=add(new THREE.ConeGeometry(.32,.52,5),mat(color,.3,.1,color),0,4.02,0,g);crown.rotation.y=Math.PI/5;
 // Each era gets a recognizably different portal silhouette and material language.
 const portalAccent=mat(color,.32,.18,color);
 if(eraIndex===0){ // Egypt: obelisks and a sun disc
   for(const side of [-1,1]){const ob=add(new THREE.ConeGeometry(.16,.95,4),mat(0xd5ad65,.9),side*1.68,3.25,0,g);ob.rotation.y=Math.PI/4;add(new THREE.BoxGeometry(.28,.12,.3),mat(0x4d958e,.45,.1),side*1.68,2.95,.04,g)}
   const sunDisc=add(new THREE.TorusGeometry(.34,.065,8,32),portalAccent,0,4.32,0,g);sunDisc.userData.portalSpin=true;
 }else if(eraIndex===1){ // Castle: crenellations and shields
   for(let j=-1;j<=1;j++)add(new THREE.BoxGeometry(.22,.32,.7),mat(0x8999a7,.82),j*.72,3.87,0,g);
   for(const side of [-1,1]){const shield=add(new THREE.BoxGeometry(.32,.43,.09),mat(0x9b3947,.55,.1),side*1.25,2.1,.53,g);shield.rotation.z=side*.08;add(new THREE.OctahedronGeometry(.09),portalAccent,side*1.25,2.13,.61,g)}
 }else if(eraIndex===2||eraIndex===9){ // Future: floating tech fins and energy bars
   for(let j=0;j<5;j++){const fin=add(new THREE.BoxGeometry(.1,.28,.12),new THREE.MeshBasicMaterial({color}),-1.7+j*.85,4.35,.08,g);fin.rotation.z=(j-2)*.08;fin.userData.portalPulse=j*.6}
   for(const side of [-1,1])add(new THREE.BoxGeometry(.12,1.5,.12),new THREE.MeshBasicMaterial({color:0x9cfaff}),side*1.62,1.95,.15,g);
 }else if(eraIndex===3||eraIndex===7){ // Forest: roots and leaves
   for(const side of [-1,1]){const root=add(new THREE.ConeGeometry(.22,1.25,5),mat(0x65472f,.98),side*1.52,.62,.12,g);root.rotation.z=-side*.62;const leaf=add(new THREE.IcosahedronGeometry(.24,0),mat(eraIndex===7?0x57db86:0x57934b,.85),side*1.48,3.95,.1,g);leaf.scale.set(1.1,1.6,.7)}
 }else if(eraIndex===4){ // Greece: marble columns and laurel
   for(const side of [-1,1]){add(new THREE.CylinderGeometry(.11,.14,.8,8),mat(0xe8dfc9,.95),side*1.62,3.3,0,g);add(new THREE.CylinderGeometry(.2,.2,.12,8),mat(0xcbb77c,.75),side*1.62,3.72,0,g)}
   const laurel=add(new THREE.TorusGeometry(.35,.045,7,24),mat(0x73a75a,.85),0,4.2,.03,g);laurel.scale.y=.65;
 }else if(eraIndex===5){ // Pirates: crossed anchors / ship-like prow
   const mast=add(new THREE.CylinderGeometry(.045,.07,1.0,6),mat(0x8b6038,.9),0,4.15,.1,g);mast.rotation.z=.22;add(new THREE.BoxGeometry(.75,.07,.08),mat(0x8b6038,.9),0,4.42,.1,g);
   for(const side of [-1,1]){const hook=add(new THREE.TorusGeometry(.17,.045,6,16,Math.PI*1.45),portalAccent,side*1.58,.55,.15,g);hook.rotation.z=Math.PI}
 }else if(eraIndex===6){ // Ice: crystalline spires
   for(const side of [-1,1]){const ice=add(new THREE.ConeGeometry(.2,1.05,5),mat(0xbcefff,.22,.12,0x6ddfff),side*1.65,3.75,.04,g);ice.rotation.z=side*.12}
 }else if(eraIndex===8){ // Steampunk: gears
   for(const side of [-1,1]){const gear=add(new THREE.TorusGeometry(.25,.065,7,12),mat(0xc98b4a,.32,.55),side*1.58,3.9,.1,g);gear.userData.portalSpin=true;for(let k=0;k<8;k++){const tooth=add(new THREE.BoxGeometry(.08,.12,.09),mat(0xc98b4a,.32,.55),side*1.58+Math.cos(k*Math.PI/4)*.29,3.9+Math.sin(k*Math.PI/4)*.29,.1,g);tooth.userData.portalTooth=true}}
 }
 // A halo of tiny motes makes every gate feel alive, not like a static doorway.
 const motePositions=[];for(let m=0;m<54;m++){const a=Math.random()*Math.PI*2,r=.95+Math.random()*.62;motePositions.push(Math.cos(a)*r,Math.sin(a)*r*1.5,(Math.random()-.5)*.18)}
 const moteGeo=new THREE.BufferGeometry();moteGeo.setAttribute('position',new THREE.Float32BufferAttribute(motePositions,3));
 const motes=new THREE.Points(moteGeo,new THREE.PointsMaterial({color, size:.055, transparent:true, opacity:.8, depthWrite:false, blending:THREE.AdditiveBlending}));motes.position.set(0,1.95,.22);g.add(motes);g.userData.motes=motes;
 const threshold=add(new THREE.BoxGeometry(2.15,.08,.94),new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.5,transparent:true,opacity:.8}),0,.42,.48,g);
 // nested rotating rune circles and floating particles
 let runes=new THREE.Group();g.add(runes);runes.position.set(0,1.95,.02);g.userData.runes=runes;
 for(let j=0;j<12;j++){let a=j/12*Math.PI*2;let r=1.02;let crystal=new THREE.Mesh(new THREE.OctahedronGeometry(.085),new THREE.MeshBasicMaterial({color:j%3===0?0xffffff:color}));crystal.position.set(Math.cos(a)*r,Math.sin(a)*r*1.45,0);runes.add(crystal)}
 let orbit=new THREE.Mesh(new THREE.TorusGeometry(.72,.018,8,48),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.8}));orbit.scale.y=1.5;orbit.rotation.z=.5;g.add(orbit);g.userData.orbit=orbit;
 // distinctive floating icon
 let iconGeo=eraIndex===0?new THREE.OctahedronGeometry(.32):eraIndex===1?new THREE.IcosahedronGeometry(.32,0):new THREE.DodecahedronGeometry(.32,0);
 let icon=add(iconGeo,new THREE.MeshStandardMaterial({color:color,emissive:color,emissiveIntensity:2,metalness:.35,roughness:.2}),0,4.25,.05,g);g.userData.icon=icon;
 // ground light ring
 let base=add(new THREE.TorusGeometry(1.75,.035,8,64),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.7}),0,.05,.1,g);base.rotation.x=0;g.userData.base=base;
 const portalData={group:g,x,z: z,index:eraIndex,color};
 if(!inEraMap&&!isEraUnlocked(eraIndex)){
   const lockGroup=new THREE.Group();lockGroup.position.set(0,1.95,.28);g.add(lockGroup);g.userData.lockGroup=lockGroup;
   const lockBody=new THREE.Mesh(new THREE.BoxGeometry(.34,.29,.12),new THREE.MeshStandardMaterial({color:0x263247,metalness:.6,roughness:.28,emissive:0x101827}));lockBody.position.y=-.06;lockGroup.add(lockBody);
   const shackle=new THREE.Mesh(new THREE.TorusGeometry(.105,.035,8,20,Math.PI),new THREE.MeshStandardMaterial({color:0xaab7c9,metalness:.65,roughness:.25}));shackle.position.y=.105;shackle.rotation.z=Math.PI;lockGroup.add(shackle);
   const lockLight=new THREE.PointLight(0xffbd62,.8,2.4);lockLight.position.set(0,0,.25);lockGroup.add(lockLight);
 }
 portals.push(portalData);
}
function room(){
 decor.forEach(o=>{if(o.parent)o.parent.remove(o)});decor=[];portals=[];
 // PEAK-inspired alpine base camp: bright sky, layered low-poly mountains, grass, pines and trail.
 scene.background=new THREE.Color(0x9edcf5);scene.fog=new THREE.FogExp2(0x9edcf5,.009);
 const hemi=new THREE.HemisphereLight(0xe5f8ff,0x52734b,2.0);scene.add(hemi);decor.push(hemi);
 const sun=new THREE.DirectionalLight(0xfff0d0,2.7);sun.position.set(-9,18,7);scene.add(sun);decor.push(sun);
 const ground=add(new THREE.PlaneGeometry(100,100),mat(0x5e9a55,.98,0),0,-.12,0);ground.rotation.x=-Math.PI/2;
 // Broad soft trail leading to the portals
 const trail=add(new THREE.PlaneGeometry(8,45),mat(0xc9b68b,1,0),0,-.075,-10);trail.rotation.x=-Math.PI/2;
 for(let z=-30;z<=9;z+=5){const peb=add(new THREE.DodecahedronGeometry(.16+Math.random()*.2,0),mat(Math.random()>.5?0x8e9b82:0xb2a88d,1,0), (Math.random()-.5)*5,-.01,z);peb.rotation.set(Math.random(),Math.random(),Math.random());}
 // Distant angular alpine silhouettes
 for(let layer=0;layer<3;layer++)for(let i=0;i<11;i++){
  const x=-48+i*9+(layer%2)*3,z=-38-layer*13,y=8+Math.random()*8-layer*1.2;
  const mountain=add(new THREE.ConeGeometry(7+Math.random()*4,y,5,1),mat([0x789b9b,0x638a8b,0x547b7d][layer],1,0),x,y*.42,z);
  mountain.rotation.y=Math.random()*1.2;
  if(layer<2){const snow=add(new THREE.ConeGeometry(2.4+Math.random()*1.8,y*.32,5,1),mat(0xe6f0e9,1,0),x,y*.84,z+.1);snow.rotation.y=mountain.rotation.y;}
 }
 // Low-poly pine trees around the clearing, kept outside the walkable path
 for(let side of [-1,1])for(let i=0;i<15;i++){
  const x=side*(8+Math.random()*8),z=5-i*3.25+Math.random()*2,h=2.4+Math.random()*2.8;
  const trunk=add(new THREE.CylinderGeometry(.12,.2,h*.35,5),mat(0x76513a,1,0),x,h*.17,z);
  const crown=add(new THREE.ConeGeometry(.65+Math.random()*.45,h*.72,5,1),mat([0x2f714c,0x347d4b,0x4d9255][i%3],1,0),x,h*.62,z);crown.rotation.y=Math.random();
  if(i%3===0){const rock=add(new THREE.DodecahedronGeometry(.45+Math.random()*.4,0),mat(0x7c8980,1,0),x+side*.5,.25,z+1);rock.rotation.set(Math.random(),Math.random(),Math.random());}
 }
 // Colorful expedition markers and a campfire give the hub a lived-in adventure-game feel
 for(let i=0;i<7;i++){const x=-6+i*2,z=7+(i%2)*.5;const post=add(new THREE.CylinderGeometry(.045,.055,.9,5),mat(0x775137,1,0),x,.45,z);const flag=add(new THREE.BoxGeometry(.48,.27,.04),mat([0xf2c34e,0xe87b48,0x4ca5d6][i%3],1,0),x+.2,.72,z);flag.rotation.y=-.18;}
 const fire=new THREE.Group();fire.position.set(-5,.1,4);scene.add(fire);decor.push(fire);
 const logs=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,1.15,6),mat(0x76513a,1,0));logs.rotation.z=Math.PI/2;fire.add(logs);
 const flame=new THREE.Mesh(new THREE.ConeGeometry(.28,.85,6),new THREE.MeshStandardMaterial({color:0xffa13a,emissive:0xf45b19,emissiveIntensity:1.1,roughness:.7}));flame.position.y=.52;fire.add(flame);fire.userData.flame=flame;
 // Portals now read as expedition gates across a grassy overlook
 eras.forEach((era,i)=>{const a=(i/eras.length)*Math.PI*2-Math.PI/2;const radius=8.4,centerZ=-2.5;const x=Math.sin(a)*radius,z=centerZ+Math.cos(a)*radius;makePortal(x,z,i);const portal=portals[portals.length-1];portal.group.rotation.y=Math.atan2(-x,centerZ-z);});
 const positions=[];for(let i=0;i<180;i++)positions.push((Math.random()-.5)*34,Math.random()*5,(Math.random()-.5)*38-7);
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));particles=new THREE.Points(geo,new THREE.PointsMaterial({color:0xfff0b8,size:.045,transparent:true,opacity:.5}));scene.add(particles);decor.push(particles);
 camera.position.set(0,1.68,2);camera.rotation.order='YXZ';camera.rotation.y=0;camera.rotation.x=0;save.x=0;save.z=2;save.yaw=0;save.pitch=0;
}
function init(){if(!window.THREE){toast('Не удалось загрузить Three.js. Проверь интернет.');return}
 scene=new THREE.Scene();clock=new THREE.Clock();camera=new THREE.PerspectiveCamera(76,innerWidth/innerHeight,.1,100);scene.add(camera);renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance',stencil:false,depth:true});const maxDpr=lowPowerDevice()?1.15:1.65;renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,maxDpr));renderer.setSize(innerWidth,innerHeight);renderer.info.autoReset=true;renderer.domElement.tabIndex=0;renderer.domElement.style.outline='none';renderer.domElement.addEventListener('pointerdown',e=>{renderer.domElement.focus();if(!isTouchDevice()&&!locked)lock();else if(isTouchDevice())touchLook={x:e.clientX,y:e.clientY,id:e.pointerId}});renderer.domElement.addEventListener('pointermove',e=>{if(isTouchDevice()&&touchLook&&touchLook.id===e.pointerId){const dx=e.clientX-touchLook.x,dy=e.clientY-touchLook.y;camera.rotation.y-=dx*.006;camera.rotation.x=Math.max(-1.25,Math.min(1.25,camera.rotation.x-dy*.005));touchLook={x:e.clientX,y:e.clientY,id:e.pointerId};save.yaw=camera.rotation.y;save.pitch=camera.rotation.x}});renderer.domElement.addEventListener('pointerup',()=>touchLook=null);renderer.domElement.addEventListener('pointercancel',()=>touchLook=null);renderer.shadowMap.enabled=false;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.42;renderer.setClearColor(0x9cdef4,1);$('scene').appendChild(renderer.domElement);raycaster=new THREE.Raycaster();room();started=true;animate()}
function animate(){requestAnimationFrame(animate);if(!renderer)return;const frameNow=performance.now();if(frameNow-lastRenderTime<16.5)return;lastRenderTime=frameNow;let dt=Math.min(clock.getDelta(),.04);const forward=new THREE.Vector3(-Math.sin(camera.rotation.y),0,-Math.cos(camera.rotation.y)),right=new THREE.Vector3(Math.cos(camera.rotation.y),0,-Math.sin(camera.rotation.y));let v=new THREE.Vector3();if(keys.w||keys.arrowup)v.add(forward);if(keys.s||keys.arrowdown)v.sub(forward);if(keys.d||keys.arrowright)v.add(right);if(keys.a||keys.arrowleft)v.sub(right);if(v.lengthSq()){v.normalize().multiplyScalar(moveSpeed*((keys.shift||keys.sprint)?1.75:1)*dt);camera.position.add(v);camera.position.x=Math.max(-14.5,Math.min(14.5,camera.position.x));camera.position.z=inEraMap?Math.max(-47,Math.min(9,camera.position.z)):Math.max(-18.5,Math.min(12.5,camera.position.z));save.x=camera.position.x;save.z=camera.position.z}
 portals.forEach((p,i)=>{let g=p.group;g.userData.runes.rotation.z+=dt*(i%2?-.45:.6);g.userData.orbit.rotation.z+=dt*(i%2?.7:-.8);if(g.userData.vortex)g.userData.vortex.uniforms.uTime.value+=dt;if(g.userData.halo)g.userData.halo.rotation.z-=dt*.18;if(g.userData.archLight)g.userData.archLight.rotation.z+=dt*.24;if(g.userData.lockGroup)g.userData.lockGroup.position.y=1.95+Math.sin(performance.now()*.002+i)*.06;g.userData.icon.rotation.x+=dt*.4;g.userData.icon.rotation.y+=dt*.8;g.userData.icon.position.y=4.25+Math.sin(performance.now()*.0015+i)*.13;g.userData.base.material.opacity=.5+Math.sin(performance.now()*.002+i)*.25;if(g.userData.motes){g.userData.motes.rotation.z+=dt*(i%2?.24:-.3);const pa=g.userData.motes.geometry.attributes.position.array;for(let q=1;q<pa.length;q+=3){pa[q]+=.003*Math.sin(performance.now()*.001+q+i);if(pa[q]>2.3)pa[q]=-2.3;if(pa[q]<-2.3)pa[q]=2.3}g.userData.motes.geometry.attributes.position.needsUpdate=true;}g.children.forEach(ch=>{if(ch.userData&&ch.userData.portalSpin)ch.rotation.z+=dt*.5;if(ch.userData&&ch.userData.portalPulse!==undefined)ch.material.opacity=.6+.35*Math.sin(performance.now()*.004+ch.userData.portalPulse);});});
 decor.forEach(o=>{if(o.userData&&o.userData.cloud){o.position.x+=dt*o.userData.drift;if(o.position.x>32)o.position.x=-32;}if(o.userData&&o.userData.weather){const a=o.geometry.attributes.position.array,t=o.userData.weatherType;for(let j=0;j<a.length;j+=3){a[j]+=(t==='rain'?.04:t==='snow'?.12:.025)*Math.sin(performance.now()*.001+j);a[j+1]-=dt*(t==='rain'?8:t==='snow'?.7:t==='embers'?-.55:.22);if(a[j+1]<-.5){a[j+1]=18+Math.random()*2;a[j+2]=-Math.random()*55-2;}if(a[j+1]>20){a[j+1]=-.3;}}o.geometry.attributes.position.needsUpdate=true;}if(o.isDirectionalLight){o.position.x=-8+Math.sin(performance.now()*.00012)*2;}if(o.userData&&o.userData.flame){o.userData.flame.scale.y=.82+Math.sin(performance.now()*.009)*.15;o.userData.flame.rotation.y+=dt*.8;}if(o.userData&&o.userData.isSky&&o.material.uniforms)o.material.uniforms.time.value+=dt*.08;if(o.userData&&o.userData.ambient){o.rotation.y+=dt*.012;const a=o.geometry.attributes.position.array;for(let j=1;j<a.length;j+=3){a[j]+=dt*(inEraMap&&selectedEra===6?-.45:.18);if(a[j]>22)a[j]=-1;if(a[j]<-1)a[j]=22}o.geometry.attributes.position.needsUpdate=true;}});if(particles){particles.rotation.y+=dt*.008;let arr=particles.geometry.attributes.position.array;for(let i=1;i<arr.length;i+=3){arr[i]+=.002;if(arr[i]>7.4)arr[i]=.1}particles.geometry.attributes.position.needsUpdate=true}
 if(inEraMap){const markerTime=performance.now()*.001;mapMarkers.forEach(npc=>{const marker=npc.questMarker;if(!marker)return;const solved=(save.solved[selectedEra]||[]).includes(npc.puzzle);marker.visible=!solved;if(!solved){const pulse=1+Math.sin(markerTime*3.4+marker.userData.phase)*.055;marker.position.y=marker.userData.baseY+Math.sin(markerTime*2.7+marker.userData.phase)*.14;marker.scale.set(.9*pulse,.9*pulse,1);}});collectibles.forEach(c=>{c.mesh.rotation.y+=dt*1.4;c.mesh.position.y=1.05+Math.sin(performance.now()*.002+c.index)*.12;c.ring.rotation.z+=dt*.8;const d=c.mesh.position.distanceTo(camera.position);if(d<1.45){if(!save.shards[c.era])save.shards[c.era]=[];if(!save.shards[c.era].includes(c.index)){save.shards[c.era].push(c.index);save.score=(save.score||0)+25;if(c.mesh.parent)c.mesh.parent.remove(c.mesh);collectibles=collectibles.filter(x=>x!==c);persist();toast('Осколок времени найден! +25 очков');updateQuest();}}});}
 near=findPortal();target=findTarget();if(inEraMap){if(target&&target.isReturn){$('prompt').textContent='Портал возврата — нажми E, чтобы вернуться в Зал Времени';$('use').textContent='ВЕРНУТЬСЯ · E'}else if(target&&target.marker){$('prompt').textContent='Поговорить: '+target.name+' · загадка '+(target.puzzle+1)+' из 3 — нажми E';$('use').textContent='ЗАДАТЬ ВОПРОС · E'}else if(collectibles.some(c=>c.mesh.position.distanceTo(camera.position)<2.5)){$('prompt').textContent='Рядом осколок времени — подойди и собери его';$('use').textContent='ИССЛЕДОВАТЬ · E'}else updateMapUI()}else if(near){if(isEraUnlocked(near.index)){$('prompt').textContent='Рядом портал «'+eras[near.index].name+'» — нажми E';$('use').textContent='ВОЙТИ · E'}else{$('prompt').textContent='🔒 Портал закрыт. Сначала заверши: '+eras[near.index-1].name;$('use').textContent='ЗАКРЫТО 🔒'}}else{$('prompt').textContent='Зал Времени: выбери эпоху. Shift — бег';$('use').textContent='ВЗАИМОДЕЙСТВИЕ · E'}
 renderer.render(scene,camera)}
function findPortal(){if(!camera)return null;let best=null,bestD=99;portals.forEach(p=>{const pos=new THREE.Vector3(p.x,1.7,p.z);const d=camera.position.distanceTo(pos);if(d<=4.6&&d<bestD){best=p;bestD=d}});return best}
function findTarget(){const p=findPortal();let best=p,bestD=p?camera.position.distanceTo(new THREE.Vector3(p.x,1.7,p.z)):99;mapMarkers.forEach(m=>{const d=camera.position.distanceTo(new THREE.Vector3(m.mesh.position.x,1.3,m.mesh.position.z));if(d<4.1&&d<bestD){best=m;bestD=d}});return best}
function enterPortal(){if(!started)return;target=findTarget();if(inEraMap){if(target&&target.isReturn){returnToHall();return}if(target&&target.marker){openPuzzle(selectedEra,target.puzzle);return}toast('Подойди к светящемуся знаку испытания или к порталу возврата.');return}near=target;if(!near){toast('Подойди ближе к порталу.');return}if(!isEraUnlocked(near.index)){const required=eras[near.index-1];toast('Портал закрыт! Сначала заверши эпоху «'+required.name+'» и получи артефакт.');return}selectedEra=near.index;beginEra()}
function portalTransition(){let flash=document.getElementById('portalFlash');if(!flash){flash=document.createElement('div');flash.id='portalFlash';flash.setAttribute('aria-hidden','true');flash.style.cssText='position:fixed;inset:0;z-index:9998;pointer-events:none;background:radial-gradient(circle,rgba(210,250,255,.95),rgba(104,90,255,.35) 35%,transparent 72%);opacity:0;transition:opacity .18s ease';document.body.appendChild(flash)}flash.style.opacity='1';setTimeout(()=>{flash.style.opacity='0'},190)}
function beginEra(){playSfx('portal-enter');portalTransition();const e=selectedEra;$('portalModal').classList.add('hidden');save.era=e;buildEraMap(e);toast('Глава '+(e+1)+': '+eras[e].name+' · '+chapterLore[e]);persist()}
function clearScene(){decor.forEach(o=>{if(o.parent)o.parent.remove(o)});decor=[];portals=[];mapMarkers=[];collectibles=[];if(particles){scene.remove(particles);particles=null}}
function createQuestMarker(character){
 // Canvas-текстура позволяет нарисовать чёткий знак без внешних картинок.
 const canvas=document.createElement('canvas');canvas.width=128;canvas.height=128;
 const ctx=canvas.getContext('2d');
 // Светящийся круг-подложка
 const glow=ctx.createRadialGradient(64,64,8,64,64,61);
 glow.addColorStop(0,'rgba(255,210,55,.42)');glow.addColorStop(1,'rgba(255,170,0,0)');
 ctx.fillStyle=glow;ctx.fillRect(0,0,128,128);
 ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 104px Arial, sans-serif';
 ctx.lineJoin='round';ctx.shadowColor='#ffb000';ctx.shadowBlur=24;
 ctx.lineWidth=12;ctx.strokeStyle='#8b4100';ctx.strokeText('!',64,62);
 const grad=ctx.createLinearGradient(0,12,0,108);grad.addColorStop(0,'#fff9b0');grad.addColorStop(.45,'#ffe34d');grad.addColorStop(1,'#ff9f1c');
 ctx.fillStyle=grad;ctx.fillText('!',64,62);
 ctx.shadowBlur=0;ctx.fillStyle='rgba(255,255,255,.9)';ctx.beginPath();ctx.arc(47,25,4,0,Math.PI*2);ctx.fill();
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
 const material=new THREE.SpriteMaterial({map:texture,transparent:true,depthTest:false,depthWrite:false, toneMapped:false});
 const marker=new THREE.Sprite(material);marker.position.set(0,2.9,0);marker.scale.set(.9,.9,1);marker.renderOrder=999;
 character.add(marker);
 marker.userData.baseY=2.9;marker.userData.phase=Math.random()*Math.PI*2;marker.userData.isQuestMarker=true;
 return marker;
}
function addEraPerson(x,z,e,variant=0){
 // More natural, semi-realistic stylized adventurers built from layered low-poly meshes.
 const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);decor.push(g);
 const skinTones=[0xf0c6a0,0xc58d68,0x9b674b,0xe0ad83,0x754a37];
 const skin=mat(skinTones[variant%skinTones.length],.78),skinShade=mat([0xc99470,0x9a6748,0x754b38,0xb77e5b,0x5d392b][variant%5],.88);
 const dark=mat(0x292a2c,.86),hairColors=[0x392b24,0x17191d,0x765038,0xaaa09a,0x4a3028];
 const hair=mat(hairColors[variant%hairColors.length],.92),cloths=[0xc79a46,0x536b83,0x333b67,0x4e7148,0xe4dfce,0x87553c,0x64899a,0x3d6545,0x555e67,0x465bc0];
 const cloth=mat(cloths[e]||0x56667a,.88),clothShade=mat(cloths[e]||0x56667a,.9),trim=mat(eras[e].color,.48,.12);
 const pants=mat([0x55483b,0x343943,0x252a42,0x40523a,0x77776f,0x514039,0x52636a,0x344538,0x333941,0x303b67][e]||0x44464a,.94);
 const boots=mat(e===0?0x65452d:e===1?0x34363b:e===5?0x563722:0x353a40,.86);
 const mesh=(geo,material,px,py,pz,rx=0,ry=0,rz=0)=>{const o=new THREE.Mesh(geo,material);o.position.set(px,py,pz);o.rotation.set(rx,ry,rz);o.castShadow=true;o.receiveShadow=true;g.add(o);return o};
 const limb=(top,bottom,length,material,px,py,pz,rx=0,rz=0)=>mesh(new THREE.CylinderGeometry(bottom,top,length,9,1),material,px,py,pz,rx,0,rz);
 // Boots, tapered trousers and articulated knees.
 for(const side of [-1,1]){
   mesh(new THREE.BoxGeometry(.25,.14,.37),boots,side*.17,.13,.055,-.04,0,0);
   mesh(new THREE.SphereGeometry(.12,9,7),boots,side*.17,.18,.16);
   limb(.095,.075,.43,pants,side*.17,.47,0,0,side*.025);
   mesh(new THREE.SphereGeometry(.083,9,7),pants,side*.17,.68,0);
   mesh(new THREE.CylinderGeometry(.075,.105,.18,9),pants,side*.17,.79,0);
 }
 // Torso uses a tapered chest, waist and layered clothing instead of a single box.
 mesh(new THREE.CylinderGeometry(.235,.19,.25,10),cloth,0,1.02,0);
 mesh(new THREE.CylinderGeometry(.31,.205,.53,10,2),cloth,0,1.37,0);
 mesh(new THREE.SphereGeometry(.285,10,8),cloth,0,1.51,0);
 mesh(new THREE.CylinderGeometry(.205,.19,.13,10),dark,0,1.055,0);
 mesh(new THREE.BoxGeometry(.42,.065,.34),trim,0,1.07,.015);
 // Collar, jacket lapels and front seams add a tailored silhouette.
 mesh(new THREE.CylinderGeometry(.105,.12,.14,9),skin,0,1.72,0);
 mesh(new THREE.ConeGeometry(.14,.19,4),trim,-.095,1.62,.135,0,0,.28);
 mesh(new THREE.ConeGeometry(.14,.19,4),trim,.095,1.62,.135,0,0,-.28);
 mesh(new THREE.BoxGeometry(.025,.42,.025),dark,0,1.35,.197);
 for(let i=0;i<3;i++)mesh(new THREE.SphereGeometry(.022,6,5),trim,.045,1.43-i*.105,.22);
 // Shoulder caps and arms are separated into upper arm, elbow, forearm and hands.
 for(const side of [-1,1]){
   mesh(new THREE.SphereGeometry(.135,9,7),cloth,side*.315,1.56,0,0,0,side*.1);
   limb(.095,.075,.30,cloth,side*.38,1.36,.005,0,side*-.16);
   mesh(new THREE.SphereGeometry(.082,8,7),cloth,side*.405,1.19,.015);
   limb(.074,.055,.29,cloth,side*.43,1.02,.025,0,side*.06);
   mesh(new THREE.SphereGeometry(.065,8,7),skin,side*.44,.84,.055);
   // Thumb gives hands a readable human shape.
   mesh(new THREE.CapsuleGeometry(.025,.07,3,5),skin,side*.475,.82,.095,0,0,side*-.5);
 }
 // Head, jaw and ears with soft, rounded proportions.
 mesh(new THREE.SphereGeometry(.19,12,10),skin,0,1.94,.015);
 mesh(new THREE.SphereGeometry(.165,12,9),skin,0,2.035,.025);
 mesh(new THREE.SphereGeometry(.115,10,8),skin,0,1.89,.07);
 for(const side of [-1,1]){
   mesh(new THREE.SphereGeometry(.045,8,7),skinShade,side*.174,1.99,.018);
   mesh(new THREE.SphereGeometry(.027,8,6),skin,side*.181,1.99,.04);
 }
 // Hair cap and side locks vary slightly by resident.
 mesh(new THREE.SphereGeometry(.178,12,8,0,Math.PI*2,0,Math.PI*.58),hair,0,2.085,-.005);
 mesh(new THREE.SphereGeometry(.075,8,7),hair,-.13,2.035,.035);
 mesh(new THREE.SphereGeometry(.07,8,7),hair,.13,2.035,.035);
 // Eyes sit forward on the face; add iris, brows and a subtle nose.
 const eyeWhite=new THREE.MeshStandardMaterial({color:0xf9f5e9,roughness:.48});
 const irisColors=[0x527c91,0x49382a,0x4d6d45,0x665044,0x394b6b];
 const iris=new THREE.MeshStandardMaterial({color:irisColors[variant%5],roughness:.42});
 const pupil=new THREE.MeshStandardMaterial({color:0x171b20,roughness:.35});
 for(const side of [-1,1]){
   mesh(new THREE.SphereGeometry(.035,9,7),eyeWhite,side*.068,2.015,.169);
   mesh(new THREE.SphereGeometry(.019,8,6),iris,side*.068,2.014,.198);
   mesh(new THREE.SphereGeometry(.010,7,5),pupil,side*.068,2.014,.211);
   mesh(new THREE.CapsuleGeometry(.012,.052,3,5),hair,side*.069,2.067,.168,0,0,side*-.12);
   mesh(new THREE.SphereGeometry(.025,7,6),skinShade,side*.04,1.975,.177);
 }
 mesh(new THREE.ConeGeometry(.035,.075,7),skinShade,0,1.99,.197,Math.PI/2,0,0);
 // Distinct costume silhouettes for every portal/era (not just recoloured outfits).
 // Each outfit adds its own layers, materials and recognizable period accessories.
 const leather=mat(e===5?0x59351f:e===8?0x5c3824:0x765033,.96);
 const linen=mat(e===0?0xf0dca8:e===4?0xf1e7ce:0xd9d1b8,.98);
 const metal=mat(e===1?0x9eabb7:e===8?0x8c9299:0x6d7b89,.42,.62);
 const fur=mat(e===6?0xf1f5f3:e===3?0x745036:0xb9a078,1);
 const accent=mat(eras[e].color,.52,.18);
 if(e===0){ // Ancient Egypt: linen kilt, broad collar and gold arm cuffs
   mesh(new THREE.CylinderGeometry(.28,.34,.28,10),linen,0,.83,.015);
   mesh(new THREE.BoxGeometry(.43,.08,.035),mat(0xd5a42f,.45,.55),0,1.59,.19);
   for(let j=0;j<5;j++)mesh(new THREE.BoxGeometry(.055,.12,.025),mat(j%2?0x278b91:0xe1b43b,.48,.4),-.13+j*.065,1.59,.215);
   for(const side of [-1,1])mesh(new THREE.TorusGeometry(.085,.025,6,10),mat(0xd6a737,.4,.6),side*.42,1.02,.03,Math.PI/2,0,0);
 } else if(e===1){ // Medieval knight: breastplate, pauldrons, gauntlets and hanging tabard
   mesh(new THREE.SphereGeometry(.29,10,8),metal,0,1.38,.11);
   mesh(new THREE.BoxGeometry(.31,.48,.045),mat(0x354b70,.8),0,1.28,.205);
   for(const side of [-1,1]){mesh(new THREE.SphereGeometry(.16,8,6),metal,side*.33,1.56,.01);mesh(new THREE.CylinderGeometry(.08,.09,.13,8),metal,side*.43,.94,.035);}
   mesh(new THREE.BoxGeometry(.26,.48,.055),mat(0x9b3035,.8),0,1.19,.225);
 } else if(e===2){ // Future city: segmented tech suit, chest display and luminous seams
   mesh(new THREE.BoxGeometry(.39,.34,.055),mat(0x202943,.4,.6),0,1.37,.225);
   mesh(new THREE.BoxGeometry(.19,.11,.025),new THREE.MeshStandardMaterial({color:0x57f4ff,emissive:0x1a9cff,emissiveIntensity:1.4,metalness:.25,roughness:.25}),0,1.43,.26);
   for(const side of [-1,1]){mesh(new THREE.BoxGeometry(.045,.39,.035),accent,side*.22,1.34,.22);mesh(new THREE.CylinderGeometry(.105,.09,.18,8),mat(0x313b55,.45,.45),side*.39,1.34,0);}
   mesh(new THREE.BoxGeometry(.29,.07,.05),mat(0x49536a,.45,.4),0,1.12,.225);
 } else if(e===3){ // Prehistoric valley: fur mantle, hide tunic and bone necklace
   mesh(new THREE.SphereGeometry(.34,8,6),fur,0,1.48,-.015,0,0,.1);
   mesh(new THREE.CylinderGeometry(.24,.3,.34,8),leather,0,1.03,.02);
   for(let j=0;j<5;j++)mesh(new THREE.ConeGeometry(.055,.17,5),fur,-.2+j*.1,1.59,.15,Math.PI*.85,0,(j-2)*.08);
   for(let j=0;j<3;j++)mesh(new THREE.ConeGeometry(.025,.08,5),linen,-.07+j*.07,1.62,.23,Math.PI/2,0,0);
 } else if(e===4){ // Ancient Greece: draped chiton, shoulder clasp and leather sandals
   mesh(new THREE.CylinderGeometry(.24,.31,.53,10),linen,0,1.31,.025);
   mesh(new THREE.BoxGeometry(.48,.065,.035),mat(0x9c6b32,.8),0,1.08,.2);
   mesh(new THREE.ConeGeometry(.22,.48,4),linen,-.12,1.36,.14,0,0,.08);
   mesh(new THREE.TorusGeometry(.12,.022,6,12),mat(0xc99a42,.45,.6),0,1.65,.2,0,0,0);
   for(const side of [-1,1])mesh(new THREE.BoxGeometry(.08,.3,.035),leather,side*.17,.29,.14,0,0,side*.12);
 } else if(e===5){ // Pirate: open waistcoat, sash, cross-body belt and bandolier
   mesh(new THREE.BoxGeometry(.17,.48,.055),leather,-.105,1.34,.22,0,0,.08);
   mesh(new THREE.BoxGeometry(.17,.48,.055),leather,.105,1.34,.22,0,0,-.08);
   mesh(new THREE.BoxGeometry(.45,.075,.045),mat(0x9e302b,.8),0,1.13,.245,0,0,.06);
   mesh(new THREE.BoxGeometry(.055,.53,.035),mat(0xd0b16c,.7),.09,1.36,.25,0,0,-.42);
   mesh(new THREE.TorusGeometry(.13,.028,6,12),mat(0x27201d,.9),0,2.1,.02);
 } else if(e===6){ // Ice age: thick fur parka, padded sleeves and scarf
   mesh(new THREE.SphereGeometry(.32,9,7),fur,0,1.43,-.015);
   mesh(new THREE.CylinderGeometry(.25,.29,.28,9),mat(0x557d91,.95),0,1.08,.01);
   mesh(new THREE.TorusGeometry(.17,.065,7,12),fur,0,1.72,.005,Math.PI/2,0,0);
   for(const side of [-1,1]){mesh(new THREE.SphereGeometry(.11,7,6),fur,side*.39,1.36,.015);mesh(new THREE.BoxGeometry(.16,.1,.16),mat(0x7da4b7,.9),side*.17,.75,.02);}
 } else if(e===7){ // Enchanted forest: hooded green cloak, leaf shoulders and wooden charms
   mesh(new THREE.ConeGeometry(.38,.7,8),mat(0x244b32,.98),0,1.28,-.12,0,0,Math.PI);
   mesh(new THREE.SphereGeometry(.24,9,7),mat(0x315f3b,.95),0,1.57,-.015);
   for(let j=0;j<5;j++)mesh(new THREE.SphereGeometry(.07,7,5),mat(j%2?0x5f9b49:0x91bd54,.9),-.2+j*.1,1.59,.15);
   mesh(new THREE.OctahedronGeometry(.075),mat(0x6ee69b,.4,.3),0,1.17,.25);
 } else if(e===8){ // Steampunk: long coat, brass buttons, utility belt and goggles
   mesh(new THREE.BoxGeometry(.22,.66,.055),mat(0x55402d,.9),-.12,1.2,.22,0,0,.035);
   mesh(new THREE.BoxGeometry(.22,.66,.055),mat(0x55402d,.9),.12,1.2,.22,0,0,-.035);
   mesh(new THREE.BoxGeometry(.47,.075,.05),mat(0xb7833d,.55,.65),0,1.02,.245);
   for(let j=0;j<4;j++)mesh(new THREE.SphereGeometry(.025,6,5),mat(0xd5a34e,.45,.65),.04,1.49-j*.12,.255);
   for(const side of [-1,1])mesh(new THREE.TorusGeometry(.052,.014,6,10),mat(0xd9b36b,.35,.7),side*.067,2.04,.19,0,0,0);
 } else { // Space explorer: pressure suit, chest module, shoulder plates and helmet rim
   mesh(new THREE.CylinderGeometry(.27,.24,.48,10),mat(0xe0e5ed,.42,.25),0,1.35,.01);
   mesh(new THREE.BoxGeometry(.22,.24,.055),mat(0x36475f,.42,.5),0,1.38,.22);
   mesh(new THREE.BoxGeometry(.13,.09,.025),new THREE.MeshStandardMaterial({color:0x7cf5ff,emissive:0x2bc8ff,emissiveIntensity:1.1,roughness:.3}),0,1.41,.255);
   for(const side of [-1,1]){mesh(new THREE.SphereGeometry(.15,8,6),mat(0xc3d0df,.4,.3),side*.33,1.55,0);mesh(new THREE.TorusGeometry(.09,.025,6,10),accent,side*.42,1.01,.03,Math.PI/2,0,0);}
   mesh(new THREE.TorusGeometry(.2,.025,7,14),mat(0x71879b,.35,.5),0,2.13,0);
 }
 // Era-specific headwear is fitted over the new head shape.
 if(e===0){mesh(new THREE.CylinderGeometry(.2,.22,.08,10),mat(0xd9bd78,.85),0,2.19,0);mesh(new THREE.BoxGeometry(.36,.07,.26),mat(0xe8d59a,.85),0,2.145,.01);}
 else if(e===1){mesh(new THREE.SphereGeometry(.19,10,7,0,Math.PI*2,0,Math.PI*.5),mat(0x8497aa,.5,.35),0,2.13,0);mesh(new THREE.BoxGeometry(.36,.07,.12),trim,0,2.09,.105);}
 else if(e===2||e===9){mesh(new THREE.CylinderGeometry(.18,.19,.09,10),mat(0x252d49,.5,.4),0,2.16,0);mesh(new THREE.BoxGeometry(.32,.06,.28),trim,0,2.12,.01);}
 else if(e===3){mesh(new THREE.ConeGeometry(.19,.22,7),mat(0x6a4b2d,.9),0,2.22,0);}
 else if(e===4){mesh(new THREE.CylinderGeometry(.2,.22,.07,12),mat(0xe2d4b3,.9),0,2.17,0);}
 else if(e===5){mesh(new THREE.CylinderGeometry(.19,.2,.08,10),mat(0x3b2b21,.9),0,2.17,0);}
 else if(e===6){mesh(new THREE.SphereGeometry(.19,10,7,0,Math.PI*2,0,Math.PI*.45),mat(0xd7eefa,.72),0,2.14,0);}
 else if(e===7){mesh(new THREE.ConeGeometry(.19,.25,8),mat(0x2b5632,.9),0,2.2,0);}
 else if(e===8){mesh(new THREE.CylinderGeometry(.19,.2,.08,12),mat(0x252a30,.45,.45),0,2.16,0);mesh(new THREE.BoxGeometry(.3,.045,.25),trim,0,2.12,.015);}
 // Backpack, straps, buckles and small attached gear.
 const packColor=[0x8b5b2b,0x4b5969,0x29365d,0x315c32,0x9b8b6e,0x6b3f2a,0x87b5c7,0x214c34,0x333c4d,0x3738a2][e]||0x4b5969;
 const pack=mat(packColor,.94);mesh(new THREE.BoxGeometry(.31,.4,.17),pack,0,1.36,-.225);mesh(new THREE.SphereGeometry(.1,8,6),pack,0,1.59,-.22);
 for(const side of [-1,1])mesh(new THREE.BoxGeometry(.045,.43,.045),trim,side*.145,1.37,-.135);
 mesh(new THREE.BoxGeometry(.22,.13,.04),dark,.17,1.23,-.11);
 mesh(new THREE.BoxGeometry(.09,.12,.04),trim,.17,1.23,-.08);
 // Era scarf/cape and badge remain subtle so the body silhouette reads clearly.
 const scarf=mesh(new THREE.BoxGeometry(.29,.1,.24),trim,0,1.65,-.12,-.18,0,0);
 mesh(new THREE.OctahedronGeometry(.065),new THREE.MeshStandardMaterial({color:eras[e].color,emissive:eras[e].color,emissiveIntensity:.22,roughness:.4}),-.19,1.42,.19);
 // Mild variation in posture and scale prevents the crowd looking cloned.
 g.rotation.y=variant*1.73;g.scale.setScalar(variant%3===0?1:variant%3===1?.97:1.035);
 g.userData.isResident=true;g.userData.residentName=['Хранитель эпохи','Местный исследователь','Старый наставник','Путешественник','Мастер загадок'][variant%5];return g;
}
function buildEraMap(e){clearScene();inEraMap=true;const era=eras[e];scene.background=new THREE.Color(e===0?0xe6b96b:e===1?0x9bb7cf:e===2?0x111e4d:e===3?0x244d35:e===4?0x7ab7d8:e===5?0x43a9b7:e===6?0xa8dff4:e===7?0x143e30:e===8?0x27324b:0x1d3450);scene.fog=new THREE.FogExp2(scene.background,0.0065);const hemi=new THREE.HemisphereLight(0xeaf8ff,era.color,1.85);scene.add(hemi);decor.push(hemi);const sun=new THREE.DirectionalLight(0xfff0d9,2.7);sun.position.set(-8,14,6);sun.castShadow=false;scene.add(sun);decor.push(sun);
 const floorMat=mat(e===0?0xc6a36b:e===1?0x607b8a:e===2?0x202d55:e===3?0x3d6a3e:e===4?0xb9c6ce:e===5?0x1b7882:e===6?0xc9eefb:e===7?0x275b3e:e===8?0x626b75:0x394b65,1,0);add(new THREE.PlaneGeometry(100,100),floorMat,0,-.08,0).rotation.x=-Math.PI/2;
 // Atmospheric sky dome, layered distant silhouettes and a glowing expedition path.
 const skyColors=[0xffd18a,0x9db9dc,0x19164f,0x286b46,0x9ac6e7,0x087d91,0xc8f2ff,0x0b2e2c,0x30394f,0x172c55];
 const skyMat=new THREE.ShaderMaterial({uniforms:{top:{value:new THREE.Color(skyColors[e])},bottom:{value:new THREE.Color(scene.background)},time:{value:0}},vertexShader:`varying vec3 vPos; void main(){vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,fragmentShader:`varying vec3 vPos;uniform vec3 top;uniform vec3 bottom;uniform float time;void main(){float h=clamp(normalize(vPos).y*0.5+0.5,0.0,1.0);vec3 c=mix(bottom,top,pow(h,0.72));float glow=exp(-abs(vPos.y-4.0)*0.12)*(0.025+0.02*sin(time+vPos.x*0.03));c+=vec3(0.15,0.22,0.32)*glow;gl_FragColor=vec4(c,1.0);}`,side:THREE.BackSide,depthWrite:false});
 const sky=add(new THREE.SphereGeometry(95,32,20),skyMat,0,0,0);sky.renderOrder=-10;sky.frustumCulled=false;sky.userData.isSky=true;
 // A long stone/glass trail gives the player a clear visual route through the world.
 const pathColors=[0xffd37a,0x8ddaff,0x8d7cff,0x7df3a6,0xf5e5b8,0x51e9ff,0xbaf6ff,0x66d99b,0xffa36b,0x879cff];
 const pathMat=new THREE.MeshStandardMaterial({color:e===0?0xb28a4b:e===1?0x526b80:e===2?0x22244f:e===3?0x365b36:e===4?0xc6c5bb:e===5?0x23616c:e===6?0xd7f3ff:e===7?0x2d563b:e===8?0x626873:0x354a7d,roughness:.36,metalness:.25});
 const path=add(new THREE.PlaneGeometry(5.5,55),pathMat,0,-.025,-23);path.rotation.x=-Math.PI/2;
 for(const side of [-1,1]){const edge=add(new THREE.BoxGeometry(.055,.045,54),new THREE.MeshBasicMaterial({color:pathColors[e],transparent:true,opacity:.78}),side*2.72,.025,-23);edge.userData.pathGlow=true;}
 // Ambient particles: fireflies in the forest, snow in the ice age, stars in the future.
 const ambientPositions=[];for(let i=0;i<420;i++){ambientPositions.push((Math.random()-.5)*72,Math.random()*22-1,-Math.random()*62-3)}
 const ambientGeo=new THREE.BufferGeometry();ambientGeo.setAttribute('position',new THREE.Float32BufferAttribute(ambientPositions,3));
 const ambientColor=e===6?0xd9f8ff:e===7?0xa8ffac:e===2||e===9?0xb6caff:0xffe4a6;
 const ambient=new THREE.Points(ambientGeo,new THREE.PointsMaterial({color:ambientColor,size:e===2||e===9?.09:.055,transparent:true,opacity:.8,depthWrite:false,blending:THREE.AdditiveBlending}));scene.add(ambient);decor.push(ambient);ambient.userData.ambient=true;
 // Era-specific weather particles: snow, rain, embers, pollen or starlight.
 const weatherType = e===6 ? 'snow' : (e===2||e===9) ? 'stars' : (e===0||e===5||e===8) ? 'embers' : e===7||e===3 ? 'pollen' : 'rain';
 const weatherPositions=[];const weatherCount=lowPowerDevice()?180:360;
 for(let i=0;i<weatherCount;i++)weatherPositions.push((Math.random()-.5)*52,Math.random()*19,-Math.random()*55-2);
 const weatherGeo=new THREE.BufferGeometry();weatherGeo.setAttribute('position',new THREE.Float32BufferAttribute(weatherPositions,3));
 const weatherColors={snow:0xdaf6ff,stars:0xb6caff,embers:0xffb05c,pollen:0xc9ff9b,rain:0xa9dfff};
 const weather=new THREE.Points(weatherGeo,new THREE.PointsMaterial({color:weatherColors[weatherType],size:weatherType==='snow'?.095:weatherType==='rain'?.045:.065,transparent:true,opacity:weatherType==='rain'?.48:.72,depthWrite:false,blending:weatherType==='embers'||weatherType==='stars'?THREE.AdditiveBlending:THREE.NormalBlending}));
 scene.add(weather);decor.push(weather);weather.userData.weather=true;weather.userData.weatherType=weatherType;
 // Slow drifting cloud banks give the sky depth; their motion is deliberately subtle.
 const cloudMat=new THREE.MeshStandardMaterial({color:e===6?0xeaf7ff:e===2||e===9?0x5a679a:0xf3f7f1,roughness:1,transparent:true,opacity:.72,flatShading:true});
 for(let c=0;c<7;c++){const cloud=new THREE.Group();cloud.position.set((Math.random()-.5)*52,10+Math.random()*8,-12-Math.random()*43);scene.add(cloud);decor.push(cloud);for(let b=0;b<4;b++){const puff=new THREE.Mesh(new THREE.IcosahedronGeometry(1.2+Math.random()*1.3,1),cloudMat);puff.position.set((b-1.5)*1.25,Math.random()*.45,(Math.random()-.5)*.9);puff.scale.y=.45+Math.random()*.25;cloud.add(puff)}cloud.userData.cloud=true;cloud.userData.drift=.12+Math.random()*.18;}
 // More ground-level detail: clumps of grass, flowers and angular rocks, kept away from the main path.
 for(let i=0;i<100;i++){const x=(Math.random()-.5)*38,z=-4-Math.random()*44;if(Math.abs(x)<3.3)continue;
   if(e===6){const rock=add(new THREE.IcosahedronGeometry(.22+Math.random()*.4,0),mat(i%2?0xb7dce8:0xe5f7ff,.9),x,.18,z);rock.scale.y=.6+Math.random()*.6;}
   else if(e===0||e===5){const stone=add(new THREE.DodecahedronGeometry(.18+Math.random()*.34,0),mat(e===0?0xa68b61:0x75634f,1),x,.16,z);stone.rotation.set(Math.random(),Math.random(),Math.random());}
   else {const blades=new THREE.Group();blades.position.set(x,0,z);scene.add(blades);decor.push(blades);for(let b=0;b<3;b++){const blade=new THREE.Mesh(new THREE.ConeGeometry(.055,.35+Math.random()*.3,3),mat(e===7?0x47a86a:e===3?0x4c813b:0x659a51,1),);blade.position.set((b-1)*.09,.16,(Math.random()-.5)*.12);blade.rotation.z=(b-1)*.22;blades.add(blade)}}
   if(i%5===0){const rock=add(new THREE.IcosahedronGeometry(.28+Math.random()*.38,0),mat(e===6?0xa7d4e1:0x7c8980,1),x,.18,z);rock.rotation.set(Math.random(),Math.random(),Math.random());}
 }
 // A distant atmospheric sun/moon with a soft corona, tuned per dimension.
 const orbColor=e===6?0xc9f5ff:e===2||e===9?0xa6a4ff:e===3||e===7?0xb6ff9b:0xffdf9b;
 const orb=add(new THREE.SphereGeometry(e===2||e===9?2.2:2.8,24,18),new THREE.MeshBasicMaterial({color:orbColor}),-18,17,-48);orb.userData.skyOrb=true;
 const corona=add(new THREE.SphereGeometry(e===2||e===9?3.2:4,24,18),new THREE.MeshBasicMaterial({color:orbColor,transparent:true,opacity:.13,depthWrite:false,blending:THREE.AdditiveBlending}),-18,17,-48);corona.userData.skyOrb=true;
 // Wide open landscape with hills and landmarks unique to each epoch.
 for(let i=0;i<18;i++){const x=(Math.random()-.5)*65,z=-12-Math.random()*50;const geo=e===0?new THREE.ConeGeometry(2+Math.random()*3,4+Math.random()*7,4):e===1?new THREE.ConeGeometry(2.4,6+Math.random()*5,4):e===2?new THREE.BoxGeometry(2+Math.random()*3,4+Math.random()*10,2+Math.random()*3):e===3?new THREE.ConeGeometry(2+Math.random()*3,3+Math.random()*4,7):e===4?new THREE.CylinderGeometry(2,2.8,5,8):e===5?new THREE.ConeGeometry(2,4,6):e===6?new THREE.IcosahedronGeometry(2+Math.random()*3):e===7?new THREE.ConeGeometry(2.5,8,7):new THREE.CylinderGeometry(1.5,2,6,10);const ob=add(geo,mat(e===0?0xb98945:e===1?0x536477:e===2?0x354c89:e===3?0x28552b:e===4?0xe1d7c4:e===5?0x815d3d:e===6?0x87d8f2:e===7?0x175c3e:e===8?0x626b75:0x394b65,.7,.1),x,geo.parameters?.height?geo.parameters.height/2:2,z);if(e===0&&i%4===0){ob.scale.set(1.6,2.4,1.6)} }
 // Epoch signature landmark at the far end
 if(e===0){for(let x of [-7,0,7]){const py=add(new THREE.ConeGeometry(2.4,8,4),mat(0xd5a34d),x,4,-27);py.rotation.y=Math.PI/4}add(new THREE.BoxGeometry(13,.6,1),mat(0xf0d18b),0,8,-27)}
 else if(e===1){for(let x of [-7,0,7]){add(new THREE.BoxGeometry(3,7,3),mat(0x7d8995),x,3.5,-27);add(new THREE.ConeGeometry(2.5,2,4),mat(0x38485e),x,8,-27)}}
 else if(e===2){for(let i=0;i<7;i++){let h=5+(i%3)*3;add(new THREE.BoxGeometry(2.5,h,2.5),mat(0x3943a0,.35,.4,0x342aff),-9+i*3,h/2,-27)}}
 else if(e===4){for(let x of [-6,0,6]){add(new THREE.CylinderGeometry(2,2.5,5,8),mat(0xe4dfd1),x,2.5,-27);add(new THREE.ConeGeometry(2.8,1.5,8),mat(0xd9b76b),x,5.8,-27)}}
 else if(e===7){for(let x of [-8,-3,3,8]){add(new THREE.CylinderGeometry(.5,.8,6,8),mat(0x62452c),x,3,-26);add(new THREE.SphereGeometry(3.1,10,8),mat(0x22734b),x,7,-26)}}
 else if(e===8){for(let i=0;i<5;i++){const h=3+(i%2)*2;add(new THREE.CylinderGeometry(.3,.45,h,10),mat(0x6b7786,.3,.7),-8+i*4,h/2,-25);add(new THREE.TorusGeometry(.65,.13,8,20),mat(0xffa35c,.3,.5,0xff7b2b),-8+i*4,h*.65,-25)}}
 else if(e===9){for(let i=0;i<6;i++){const x=-10+i*4;add(new THREE.CylinderGeometry(.35,.7,4,8),mat(0x5c6ee8,.3,.5,0x4237ff),x,2,-27);add(new THREE.SphereGeometry(.7,12,8),mat(0xc7b8ff,.25,.3,0x8d7bff),x,4.5,-27)}}
 // Era residents in recognizable period clothing, placed beside the route and landmarks.
 const people=[[-4,-2],[4,-5],[-8,-13],[8,-18],[0,-23]];
 people.forEach((pos,i)=>{const person=addEraPerson(pos[0],pos[1],e,i);if(i<3){const questMarker=createQuestMarker(person);questMarker.visible=!(save.solved[e]||[]).includes(i);mapMarkers.push({marker:true,puzzle:i,mesh:person,questMarker,name:person.userData.residentName});}});
 // Five collectible time shards reward exploration beyond the puzzle NPCs.
 const shardSpots=[[-7,-10],[7,-16],[-6,-25],[6,-34],[0,-42]];
 const already=save.shards[e]||[];
 shardSpots.forEach((pos,i)=>{if(already.includes(i))return;const group=new THREE.Group();group.position.set(pos[0],1.05,pos[1]);scene.add(group);decor.push(group);
   const crystal=new THREE.Mesh(new THREE.OctahedronGeometry(.32,0),new THREE.MeshStandardMaterial({color:0x8cf8ff,emissive:0x29cfff,emissiveIntensity:2.3,metalness:.25,roughness:.18}));crystal.scale.y=1.35;group.add(crystal);
   const ring=new THREE.Mesh(new THREE.TorusGeometry(.48,.035,8,32),new THREE.MeshBasicMaterial({color:0x8cf8ff,transparent:true,opacity:.85}));ring.rotation.x=Math.PI/2;group.add(ring);
   const light=new THREE.PointLight(0x36dfff,1.4,4);group.add(light);collectibles.push({era:e,index:i,mesh:group,crystal,ring});
 });
 // Return portal. Questions are now asked directly by the first three residents.
 makePortal(0,-8,e);portals[portals.length-1].isReturn=true;portals[portals.length-1].index=-1;
 // Add epoch-specific decorative props around the path to make the map feel inhabited.
 for(let i=0;i<14;i++){const x=(Math.random()-.5)*34,z=-5-Math.random()*32;let prop;
   if(e===0){prop=add(new THREE.ConeGeometry(.35,.8,4),mat(i%2?0x9d7844:0xc8a15c),x,.38,z);prop.rotation.y=Math.PI/4;}
   else if(e===1){prop=add(new THREE.CylinderGeometry(.22,.28,.8,7),mat(i%2?0x52664b:0x6f8d59),x,.4,z);add(new THREE.IcosahedronGeometry(.45),mat(0x447b4b),x,.95,z);}
   else if(e===2||e===9){prop=add(new THREE.BoxGeometry(.45,1.4,.45),mat(0x303e80,.3,.4,era.color),x,.7,z);add(new THREE.BoxGeometry(.55,.08,.55),new THREE.MeshBasicMaterial({color:era.color}),x,1.1,z);}
   else if(e===4){prop=add(new THREE.CylinderGeometry(.3,.3,.75,10),mat(0xd6c9ad),x,.38,z);add(new THREE.CylinderGeometry(.34,.34,.08,10),mat(0xc69d5a),x,.78,z);}
   else if(e===6){prop=add(new THREE.IcosahedronGeometry(.35),mat(0xc9f4ff,.25,.15,0x75ddff),x,.4,z);prop.scale.y=1.5;}
   else if(e===7||e===3){prop=add(new THREE.CylinderGeometry(.12,.22,1.6,7),mat(0x65452c),x,.8,z);add(new THREE.SphereGeometry(.85,9,7),mat(e===7?0x2d7847:0x4a7a37),x,1.8,z);}
   else {prop=add(new THREE.CylinderGeometry(.15,.2,.7,8),mat(0x8b8d94),x,.35,z);add(new THREE.TorusGeometry(.35,.07,7,16),mat(era.color,.3,.4,era.color),x,.7,z);}
   // Secondary details turn repeated props into small handcrafted set pieces.
   if(e===1||e===3||e===7){
     const bush=add(new THREE.IcosahedronGeometry(.42+(i%3)*.1,0),mat(e===1?0x4f8448:e===3?0x3d7438:0x246342),x+.28,.55,z+.12);bush.scale.set(1.15,.8,1);
     if(i%3===0){const berry=add(new THREE.SphereGeometry(.09,7,6),mat(0xe1a34b,.5,0,0x9d5420),x-.12,.85,z+.18);berry.scale.set(1,.75,1);}
   }else if(e===0||e===4){
     const etch=add(new THREE.BoxGeometry(.12,.42,.035),mat(e===0?0x7b5a35:0x8d9a9d),x+.1,.43,z+.2);etch.rotation.z=.18;
     if(i%2===0)add(new THREE.OctahedronGeometry(.12),mat(e===0?0x3d9b9a:0xc5a85b,.3,.1),x,.93,z+.15);
   }else if(e===2||e===8||e===9){
     const light=add(new THREE.SphereGeometry(.11,8,6),new THREE.MeshBasicMaterial({color:era.color}),x,.95,z+.22);
     light.userData.pulsePhase=i*.7;
   }
 }
 camera.position.set(0,1.68,7);camera.rotation.set(0,0,0,'YXZ');save.x=0;save.z=7;save.yaw=0;save.pitch=0;updateMapUI();}
function updateMapUI(){const era=eras[selectedEra];$('prompt').textContent='Глава '+(selectedEra+1)+': '+era.name+' — поговори с тремя жителями, собери улики и восстанови фрагмент истории. Портал у входа — обратно.';$('use').textContent='ИССЛЕДОВАТЬ · E';document.querySelector('#top .sub').textContent=era.icon+' Карта эпохи: '+era.name;$('count').textContent=save.artifacts.length+' / '+eras.length;$('score').textContent=save.score||0;updateQuest()}
function returnToHall(){inEraMap=false;room();camera.position.set(0,1.68,5);camera.rotation.set(0,0,0,'YXZ');save.x=0;save.z=5;save.yaw=0;save.pitch=0;persist();$('prompt').textContent='Зал Времени — выбери любой портал';document.querySelector('#top .sub').textContent='Зал межвременных порталов';$('use').textContent='ВОЙТИ · E';toast('Ты вернулся в Зал Времени')}
let activePuzzle=null;
function getHint(d){
 if(d.hint)return d.hint;
 const q=d.q.toLowerCase();
 if(/последователь|ряд:|код:|числа идут|узор:|каждое число/.test(q))return 'Посмотри на разницу между соседними числами или на повторяющийся шаг. Запиши правило и проверь его на последней паре.';
 if(/сколько|осталось|съели|забрали|отдал|перенесли|разбились/.test(q))return 'Решай по порядку: сначала найди исходное количество, затем выполни каждое действие отдельно.';
 if(/север|юг|восток|запад|поворач|маршрут|прошёл|пролетела/.test(q))return 'Нарисуй маленькую схему пути. Противоположные направления могут взаимно сократиться.';
 if(/двер|порядок|правдив|таблич|стоит правее|логик/.test(q))return 'Проверь каждое условие по очереди и исключи варианты, которые нарушают хотя бы одно из них.';
 if(/часть|доля|треть|половин|четверт|\//.test(q))return 'Переведи дроби к общему знаменателю. Внимательно смотри, берётся ли часть от целого или от остатка.';
 return 'Не спеши выбирать ответ. Выдели известные факты, найди связь между ними и проверь результат.';
}
function openPuzzle(e,i){
 if(document.pointerLockElement&&document.exitPointerLock)document.exitPointerLock();
 if(save.solved[e].includes(i)){toast('Это испытание уже пройдено. Найди другой светящийся знак.');return}
 const d=eras[e].puzzles[i];activePuzzle={e,i,d,hintShown:false};
 $('puzzleEra').textContent='ГЛАВА '+(e+1)+' / 10 · '+eras[e].name+' · ИСПЫТАНИЕ '+(i+1)+' / 3';
 $('puzzleTitle').textContent=d.t;$('puzzleStory').textContent=chapterLore[e];$('puzzleQuestion').textContent=d.q;$('puzzleFeedback').textContent='Выбери ответ. За правильное решение: +50 очков.';$('puzzleHint').textContent='💡 Подсказка';$('puzzleAnswers').innerHTML='';
 d.a.forEach((a,j)=>{let b=document.createElement('button');b.textContent=String.fromCharCode(65+j)+'. '+a;b.onclick=()=>{
  if(!activePuzzle||save.solved[e].includes(i))return;
  if(j===d.c){playSfx('puzzle-solved');b.style.borderColor='#7cf0b2';b.style.background='#123c36';[...$('puzzleAnswers').children].forEach(x=>x.disabled=true);$('puzzleFeedback').textContent='Верно! '+d.why;save.solved[e].push(i);save.score=(save.score||0)+50;
   if(save.solved[e].length===3&&!save.artifacts.includes(e)){save.artifacts.push(e);save.score+=100;toast('Артефакт получен: '+eras[e].artifact+' · +100 очков');}
   persist();updateQuest();
   setTimeout(()=>{$('puzzleModal').classList.add('hidden');document.body.classList.remove('modal-open');activePuzzle=null;if(save.artifacts.length===eras.length&&!save.endingSolved)openFinale()},1700);
  }else{playSfx('wrong-answer');$('puzzleFeedback').textContent='Ответ не подходит. Проверь условие или воспользуйся подсказкой.';b.style.borderColor='#ff7373';setTimeout(()=>b.style.borderColor='',500)}
 };$('puzzleAnswers').appendChild(b)});
 $('puzzleModal').classList.remove('hidden');document.body.classList.add('modal-open');
}
$('puzzleHint').addEventListener('click',()=>{if(!activePuzzle)return;$('puzzleFeedback').textContent='Подсказка: '+getHint(activePuzzle.d);$('puzzleHint').textContent='💡 Подсказка показана';activePuzzle.hintShown=true;});
function openFinale(){
 if(save.endingSolved)return;
 $('endingText').textContent='Ты собрал все десять артефактов. Но у реки времени появился хранитель-тень: он хочет стереть ошибки, изменив каждую эпоху. Чтобы остановить его, нужно выбрать принцип, который сохранит историю.';
 const options=[{label:'Стереть все события, которые принесли боль',ok:false,why:'Так исчезнут и уроки, благодаря которым миры стали сильнее.'},{label:'Сохранить выбор людей и восстановить связь между эпохами',ok:true,why:'Верно. Время нельзя сделать идеальным — нужно вернуть эпохам их собственную историю.'},{label:'Оставить один артефакт и уничтожить остальные',ok:false,why:'Без всех десяти эпох река времени останется разорванной.'}];
 const box=$('endingChoices');box.innerHTML='';$('endingFeedback').textContent='Выбери решение Хранителя.';
 options.forEach(o=>{const b=document.createElement('button');b.textContent=o.label;b.onclick=()=>{if(o.ok){save.endingSolved=true;save.score=(save.score||0)+500;persist();$('endingFeedback').textContent='Печать восстановлена! '+o.why+' Финал пройден: +500 очков.';[...box.children].forEach(x=>x.disabled=true);b.style.borderColor='#70bd91';b.style.background='#e3f4df';$('endingClose').textContent='Завершить путешествие ✓';}else{$('endingFeedback').textContent=o.why;b.style.borderColor='#e7a08e';setTimeout(()=>b.style.borderColor='',600)}};box.appendChild(b)});
 $('endingModal').classList.remove('hidden');document.body.classList.add('modal-open');
}
$('endingClose').addEventListener('click',()=>{$('endingModal').classList.add('hidden');document.body.classList.remove('modal-open');if(!isTouchDevice()&&started)lock();toast(save.endingSolved?'Река времени восстановлена. Ты — Хранитель легенды.':'Возвращайся, когда будешь готов завершить испытание.')});
function lock(){if(!isTouchDevice()&&renderer&&renderer.domElement.requestPointerLock)renderer.domElement.requestPointerLock()}
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===renderer?.domElement});
document.addEventListener('mousemove',e=>{if(!locked||!camera)return;camera.rotation.y-=e.movementX*.0022;camera.rotation.x-=e.movementY*.0018;camera.rotation.x=Math.max(-1.35,Math.min(1.35,camera.rotation.x));save.yaw=camera.rotation.y;save.pitch=camera.rotation.x});
window.addEventListener('keydown',e=>{const k=String(e.key).toLowerCase();const codeMap={KeyW:'w',KeyA:'a',KeyS:'s',KeyD:'d',ArrowUp:'arrowup',ArrowDown:'arrowdown',ArrowLeft:'arrowleft',ArrowRight:'arrowright'};const moveKey=codeMap[e.code]||k;keys[moveKey]=true;if(e.key==='Shift')keys.shift=true;if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(moveKey))e.preventDefault();if(k==='e'||e.code==='KeyE')enterPortal()});window.addEventListener('keyup',e=>{const k=String(e.key).toLowerCase();const codeMap={KeyW:'w',KeyA:'a',KeyS:'s',KeyD:'d',ArrowUp:'arrowup',ArrowDown:'arrowdown',ArrowLeft:'arrowleft',ArrowRight:'arrowright'};keys[codeMap[e.code]||k]=false;if(e.key==='Shift')keys.shift=false});window.addEventListener('blur',()=>{keys={}});document.addEventListener('visibilitychange',()=>{if(document.hidden)keys={}});
function startGame(){if(!started)init();$('start').classList.add('hidden');if(!renderer)return;renderer.domElement.focus();let seen=false;try{seen=localStorage.getItem(TUTORIAL_KEY)==='1'}catch(e){}if(!seen)showTutorial();else if(!isTouchDevice())lock();}
$('startBtn').onclick=$('resumeBtn').onclick=startGame;
$('tutorialNext').onclick=()=>{if(tutorialStep<tutorialSteps.length-1){tutorialStep++;renderTutorialStep()}else finishTutorial()};
$('tutorialSkip').onclick=finishTutorial;
document.querySelectorAll('[data-move]').forEach(btn=>{const k=btn.dataset.move;const down=e=>{e.preventDefault();keys[k]=true};const up=e=>{e.preventDefault();keys[k]=false};btn.addEventListener('pointerdown',down);['pointerup','pointercancel','pointerleave'].forEach(ev=>btn.addEventListener(ev,up));});$('sprintTouch').addEventListener('pointerdown',e=>{e.preventDefault();keys.sprint=true});['pointerup','pointercancel','pointerleave'].forEach(ev=>$('sprintTouch').addEventListener(ev,()=>keys.sprint=false));$('use').onclick=enterPortal;$('enterBtn').onclick=beginEra;$('cancelBtn').onclick=()=>$('portalModal').classList.add('hidden');$('puzzleClose').onclick=()=>{$('puzzleModal').classList.add('hidden');document.body.classList.remove('modal-open');if(!isTouchDevice())lock()};
$('helpBtn').onclick=()=>{if(document.pointerLockElement&&document.exitPointerLock)document.exitPointerLock();$('help').classList.remove('hidden');document.body.classList.add('modal-open')};$('helpClose').onclick=()=>{$('help').classList.add('hidden');document.body.classList.remove('modal-open');if(!isTouchDevice())lock()};
$('resetBtn').onclick=()=>{if(confirm('Сбросить весь прогресс и вернуться в центр комнаты?')){localStorage.removeItem(SAVE);save={era:0,solved:Array.from({length:eras.length},()=>[]),artifacts:[],shards:Array.from({length:eras.length},()=>[]),score:0,x:0,z:5,yaw:0,pitch:0,endingSolved:false};inEraMap=false;persist();if(started)room();toast('Прогресс сброшен.')}};
$('journalBtn').onclick=openJournal;$('journalClose').onclick=closeJournal;
rendererSafe();function rendererSafe(){load();$('count').textContent=save.artifacts.length+' / '+eras.length;$('score').textContent=save.score||0;updateQuest()}
window.addEventListener('resize',()=>{if(camera&&renderer){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,lowPowerDevice()?1.15:1.65));renderer.setSize(innerWidth,innerHeight)}});
})();
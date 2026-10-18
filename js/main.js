(()=>{'use strict';
const $=id=>document.getElementById(id),SAVE='guardians_firstperson_portal_room_v3';
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
let save={era:0,solved:Array.from({length:eras.length},()=>[]),artifacts:[],shards:Array.from({length:eras.length},()=>[]),score:0,x:0,z:5,yaw:0,pitch:0};let scene,camera,renderer,clock,raycaster,portals=[],decor=[],particles,keys={},locked=false,started=false,near=null,selectedEra=0,moveSpeed=5,inEraMap=false,mapMarkers=[],target=null,collectibles=[],touchLook=null;
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

function updateQuest(){const solved=inEraMap?(save.solved[selectedEra]||[]).length:0;const shards=inEraMap?(save.shards[selectedEra]||[]).length:0;$('shardCount').textContent='Осколки времени: '+shards+' / 5';$('questTitle').textContent=inEraMap?('Задание: '+(solved===3?'эпоха очищена — вернись к порталу':'реши загадки: '+solved+' / 3')):'Задание: исследуй 10 эпох и собери артефакты';}
function load(){try{let x=JSON.parse(localStorage.getItem(SAVE));if(x&&x.solved){save=Object.assign(save,x);save.solved=Array.from({length:eras.length},(_,i)=>Array.isArray(x.solved[i])?x.solved[i]:[]);save.artifacts=Array.isArray(x.artifacts)?x.artifacts:[];save.shards=Array.from({length:eras.length},(_,i)=>Array.isArray(x.shards?.[i])?x.shards[i]:[]);save.score=Number.isFinite(x.score)?x.score:0}}catch(e){}}
function persist(){try{localStorage.setItem(SAVE,JSON.stringify(save))}catch(e){}$('count').textContent=save.artifacts.length+' / '+eras.length;$('score').textContent=save.score||0;updateQuest()}
function toast(t){$('toast').textContent=t;$('toast').style.opacity=1;setTimeout(()=>$('toast').style.opacity=0,1700)}
function mat(color,rough=.65,metal=0,em=0,transparent=false,opacity=1){return new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal,emissive:em,emissiveIntensity:em?1.5:0,transparent,opacity,side:THREE.DoubleSide})}
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
 scene.background=new THREE.Color(0x070c1d);scene.fog=new THREE.FogExp2(0x070c1d,.018);
 const hemiRoom=new THREE.HemisphereLight(0x9ac8ff,0x171022,1.45);scene.add(hemiRoom);decor.push(hemiRoom);
 const amb=new THREE.PointLight(0x627eff,14,30);amb.position.set(0,5,1);scene.add(amb);decor.push(amb);
 const key=new THREE.DirectionalLight(0xdbe8ff,2.3);key.position.set(-4,9,6);key.castShadow=false;scene.add(key);decor.push(key);
 const floor=add(new THREE.PlaneGeometry(32,34),mat(0x131d32,.42,.5),0,0,0);floor.rotation.x=-Math.PI/2;floor.position.z=-3;
 // floor in room spans z from -20 to +14
 const ceiling=add(new THREE.PlaneGeometry(32,34),mat(0x11182b,.5,.25),0,8, -3);ceiling.rotation.x=Math.PI/2;
 // walls
 add(new THREE.BoxGeometry(32,8,.8),mat(0x202c45,.55,.25),0,4,-20);
 add(new THREE.BoxGeometry(.8,8,34),mat(0x1c2942,.6,.2),-16,4,-3);
 add(new THREE.BoxGeometry(.8,8,34),mat(0x1c2942,.6,.2),16,4,-3);
 add(new THREE.BoxGeometry(32,8,.8),mat(0x17223a,.6,.2),0,4,14);
 // architectural ribs and inset wall panels
 for(let x=-14;x<=14;x+=4){add(new THREE.BoxGeometry(.15,7.5,.2),mat(0x35435f,.35,.5),x,4,-19.45);add(new THREE.BoxGeometry(.1,7.5,.18),new THREE.MeshBasicMaterial({color:0x31466e}),x+.18,4,-19.35)}
 // ceiling luminous rails
 for(let x of [-11,-6,0,6,11]){let rail=add(new THREE.BoxGeometry(.06,.06,27),new THREE.MeshBasicMaterial({color:0x64bfff}),x,7.65,-3);let glowbar=add(new THREE.BoxGeometry(.28,.04,24),new THREE.MeshBasicMaterial({color:0x243e70}),x,7.58,-3)}
 // floor tile grid, thin illuminated lines
 for(let x=-14;x<=14;x+=2){let line=add(new THREE.BoxGeometry(.025,.012,32),new THREE.MeshBasicMaterial({color:0x31405d}),x,.015,-3)}
 for(let z=-18;z<=12;z+=2){add(new THREE.BoxGeometry(30,.012,.025),new THREE.MeshBasicMaterial({color:0x31405d}),0,.016,z)}
 // side pillars with luminous strips and crystal lamps
 for(let side of [-1,1])for(let z of [-14,-7,0,7]){add(new THREE.BoxGeometry(1.15,6.8,1.15),mat(0x273652,.4,.45),side*14.5,3.4,z);add(new THREE.BoxGeometry(.08,5.6,.08),new THREE.MeshBasicMaterial({color:0x557fbd}),side*13.88,3.6,z);let lamp=add(new THREE.OctahedronGeometry(.28),new THREE.MeshStandardMaterial({color:0x7beaff,emissive:0x45bfff,emissiveIntensity:2}),side*13.8,5.9,z);/* Светильник использует emissive-материал, чтобы не создавать дорогой динамический источник света. */}
 // central circular floor sigil
 let sig=add(new THREE.TorusGeometry(3.1,.035,8,100),new THREE.MeshBasicMaterial({color:0x5a8bca,transparent:true,opacity:.8}),0,.035,2);sig.rotation.x=0;
 let sig2=add(new THREE.TorusGeometry(2.45,.025,8,100),new THREE.MeshBasicMaterial({color:0x8b71ff,transparent:true,opacity:.65}),0,.04,2);
 for(let i=0;i<16;i++){let a=i/16*Math.PI*2;let gem=add(new THREE.OctahedronGeometry(.13),new THREE.MeshStandardMaterial({color:0x8bdcff,emissive:0x377fff,emissiveIntensity:1.5}),Math.cos(a)*2.8,.12,2+Math.sin(a)*2.8)}
 // portal row at far wall, dramatic pedestals and light pools
 eras.forEach((era,i)=>{const a=(i/eras.length)*Math.PI*2-Math.PI/2;const radius=8.4,centerZ=1.2;const x=Math.sin(a)*radius,z=centerZ+Math.cos(a)*radius;makePortal(x,z,i);const portal=portals[portals.length-1];portal.group.rotation.y=Math.atan2(-x,centerZ-z);/* Цветное свечение портала создаётся emissive-материалами без отдельного PointLight. */});
 // floating dust
 const positions=[];for(let i=0;i<260;i++)positions.push((Math.random()-.5)*30,Math.random()*7.3,(Math.random()-.5)*31-3);
 let geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));particles=new THREE.Points(geo,new THREE.PointsMaterial({color:0xa7dfff,size:.035,transparent:true,opacity:.65}));scene.add(particles);decor.push(particles);
 camera.position.set(0,1.68,2);camera.rotation.order='YXZ';camera.rotation.y=0;camera.rotation.x=0;save.x=0;save.z=2;save.yaw=0;save.pitch=0;
}
function init(){if(!window.THREE){toast('Не удалось загрузить Three.js. Проверь интернет.');return}
 scene=new THREE.Scene();clock=new THREE.Clock();camera=new THREE.PerspectiveCamera(76,innerWidth/innerHeight,.1,100);scene.add(camera);renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance',stencil:false,depth:true});const maxDpr=lowPowerDevice()?1.15:1.65;renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,maxDpr));renderer.setSize(innerWidth,innerHeight);renderer.info.autoReset=true;renderer.domElement.tabIndex=0;renderer.domElement.style.outline='none';renderer.domElement.addEventListener('pointerdown',e=>{renderer.domElement.focus();if(!isTouchDevice()&&!locked)lock();else if(isTouchDevice())touchLook={x:e.clientX,y:e.clientY,id:e.pointerId}});renderer.domElement.addEventListener('pointermove',e=>{if(isTouchDevice()&&touchLook&&touchLook.id===e.pointerId){const dx=e.clientX-touchLook.x,dy=e.clientY-touchLook.y;camera.rotation.y-=dx*.006;camera.rotation.x=Math.max(-1.25,Math.min(1.25,camera.rotation.x-dy*.005));touchLook={x:e.clientX,y:e.clientY,id:e.pointerId};save.yaw=camera.rotation.y;save.pitch=camera.rotation.x}});renderer.domElement.addEventListener('pointerup',()=>touchLook=null);renderer.domElement.addEventListener('pointercancel',()=>touchLook=null);renderer.shadowMap.enabled=false;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;$('scene').appendChild(renderer.domElement);raycaster=new THREE.Raycaster();room();started=true;animate()}
function animate(){requestAnimationFrame(animate);if(!renderer)return;const frameNow=performance.now();if(frameNow-lastRenderTime<16.5)return;lastRenderTime=frameNow;let dt=Math.min(clock.getDelta(),.04);const forward=new THREE.Vector3(-Math.sin(camera.rotation.y),0,-Math.cos(camera.rotation.y)),right=new THREE.Vector3(Math.cos(camera.rotation.y),0,-Math.sin(camera.rotation.y));let v=new THREE.Vector3();if(keys.w||keys.arrowup)v.add(forward);if(keys.s||keys.arrowdown)v.sub(forward);if(keys.d||keys.arrowright)v.add(right);if(keys.a||keys.arrowleft)v.sub(right);if(v.lengthSq()){v.normalize().multiplyScalar(moveSpeed*((keys.shift||keys.sprint)?1.75:1)*dt);camera.position.add(v);camera.position.x=Math.max(-14.5,Math.min(14.5,camera.position.x));camera.position.z=inEraMap?Math.max(-47,Math.min(9,camera.position.z)):Math.max(-18.5,Math.min(12.5,camera.position.z));save.x=camera.position.x;save.z=camera.position.z}
 portals.forEach((p,i)=>{let g=p.group;g.userData.runes.rotation.z+=dt*(i%2?-.45:.6);g.userData.orbit.rotation.z+=dt*(i%2?.7:-.8);if(g.userData.vortex)g.userData.vortex.uniforms.uTime.value+=dt;if(g.userData.halo)g.userData.halo.rotation.z-=dt*.18;if(g.userData.archLight)g.userData.archLight.rotation.z+=dt*.24;if(g.userData.lockGroup)g.userData.lockGroup.position.y=1.95+Math.sin(performance.now()*.002+i)*.06;g.userData.icon.rotation.x+=dt*.4;g.userData.icon.rotation.y+=dt*.8;g.userData.icon.position.y=4.25+Math.sin(performance.now()*.0015+i)*.13;g.userData.base.material.opacity=.5+Math.sin(performance.now()*.002+i)*.25});
 decor.forEach(o=>{if(o.userData&&o.userData.isSky&&o.material.uniforms)o.material.uniforms.time.value+=dt*.08;if(o.userData&&o.userData.ambient){o.rotation.y+=dt*.012;const a=o.geometry.attributes.position.array;for(let j=1;j<a.length;j+=3){a[j]+=dt*(inEraMap&&selectedEra===6?-.45:.18);if(a[j]>22)a[j]=-1;if(a[j]<-1)a[j]=22}o.geometry.attributes.position.needsUpdate=true;}});if(particles){particles.rotation.y+=dt*.008;let arr=particles.geometry.attributes.position.array;for(let i=1;i<arr.length;i+=3){arr[i]+=.002;if(arr[i]>7.4)arr[i]=.1}particles.geometry.attributes.position.needsUpdate=true}
 if(inEraMap){const markerTime=performance.now()*.001;mapMarkers.forEach(npc=>{const marker=npc.questMarker;if(!marker)return;const solved=(save.solved[selectedEra]||[]).includes(npc.puzzle);marker.visible=!solved;if(!solved){const pulse=1+Math.sin(markerTime*3.4+marker.userData.phase)*.055;marker.position.y=marker.userData.baseY+Math.sin(markerTime*2.7+marker.userData.phase)*.14;marker.scale.set(.9*pulse,.9*pulse,1);}});collectibles.forEach(c=>{c.mesh.rotation.y+=dt*1.4;c.mesh.position.y=1.05+Math.sin(performance.now()*.002+c.index)*.12;c.ring.rotation.z+=dt*.8;const d=c.mesh.position.distanceTo(camera.position);if(d<1.45){if(!save.shards[c.era])save.shards[c.era]=[];if(!save.shards[c.era].includes(c.index)){save.shards[c.era].push(c.index);save.score=(save.score||0)+25;if(c.mesh.parent)c.mesh.parent.remove(c.mesh);collectibles=collectibles.filter(x=>x!==c);persist();toast('Осколок времени найден! +25 очков');updateQuest();}}});}
 near=findPortal();target=findTarget();if(inEraMap){if(target&&target.isReturn){$('prompt').textContent='Портал возврата — нажми E, чтобы вернуться в Зал Времени';$('use').textContent='ВЕРНУТЬСЯ · E'}else if(target&&target.marker){$('prompt').textContent='Поговорить: '+target.name+' · загадка '+(target.puzzle+1)+' из 3 — нажми E';$('use').textContent='ЗАДАТЬ ВОПРОС · E'}else if(collectibles.some(c=>c.mesh.position.distanceTo(camera.position)<2.5)){$('prompt').textContent='Рядом осколок времени — подойди и собери его';$('use').textContent='ИССЛЕДОВАТЬ · E'}else updateMapUI()}else if(near){if(isEraUnlocked(near.index)){$('prompt').textContent='Рядом портал «'+eras[near.index].name+'» — нажми E';$('use').textContent='ВОЙТИ · E'}else{$('prompt').textContent='🔒 Портал закрыт. Сначала заверши: '+eras[near.index-1].name;$('use').textContent='ЗАКРЫТО 🔒'}}else{$('prompt').textContent='Зал Времени: выбери эпоху. Shift — бег';$('use').textContent='ВЗАИМОДЕЙСТВИЕ · E'}
 renderer.render(scene,camera)}
function findPortal(){if(!camera)return null;let best=null,bestD=99;portals.forEach(p=>{const pos=new THREE.Vector3(p.x,1.7,p.z);const d=camera.position.distanceTo(pos);if(d<=4.6&&d<bestD){best=p;bestD=d}});return best}
function findTarget(){const p=findPortal();let best=p,bestD=p?camera.position.distanceTo(new THREE.Vector3(p.x,1.7,p.z)):99;mapMarkers.forEach(m=>{const d=camera.position.distanceTo(new THREE.Vector3(m.mesh.position.x,1.3,m.mesh.position.z));if(d<4.1&&d<bestD){best=m;bestD=d}});return best}
function enterPortal(){if(!started)return;target=findTarget();if(inEraMap){if(target&&target.isReturn){returnToHall();return}if(target&&target.marker){openPuzzle(selectedEra,target.puzzle);return}toast('Подойди к светящемуся знаку испытания или к порталу возврата.');return}near=target;if(!near){toast('Подойди ближе к порталу.');return}if(!isEraUnlocked(near.index)){const required=eras[near.index-1];toast('Портал закрыт! Сначала заверши эпоху «'+required.name+'» и получи артефакт.');return}selectedEra=near.index;beginEra()}
function beginEra(){const e=selectedEra;$('portalModal').classList.add('hidden');save.era=e;buildEraMap(e);toast('Эпоха открыта: '+eras[e].name);persist()}
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
 const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);decor.push(g);
 const skin=mat(variant%2?0x9a6748:0xd6a078,.9),dark=mat(0x292b35,.8),cloths=[0xd8a43d,0x3c526e,0x252b59,0x547b3e,0xf0eee2,0x8b5734,0x5c7184,0x346348,0x454b54,0x4259b7];
 const cloth=mat(cloths[e]||0x56667a,.8),trim=mat(eras[e].color,.45,.2),boots=mat(e===0?0x593e28:e===1?0x292b35:e===5?0x4a3021:0x303744,.9);
 // legs, boots, torso, arms and a head make a recognizable little traveler.
 for(const side of [-1,1]){add(new THREE.BoxGeometry(.19,.58,.2),dark,side*.16,.56,0,g);add(new THREE.BoxGeometry(.23,.13,.31),boots,side*.16,.14,.035,g);}
 add(new THREE.BoxGeometry(.62,.76,.34),cloth,0,1.28,0,g);
 add(new THREE.BoxGeometry(.68,.12,.37),trim,0,1.55,0,g);
 for(const side of [-1,1]){const arm=add(new THREE.BoxGeometry(.18,.66,.2),cloth,side*.42,1.28,0,g);arm.rotation.z=side*-.12;add(new THREE.BoxGeometry(.17,.16,.18),skin,side*.43,.91,0,g);}
 add(new THREE.CylinderGeometry(.16,.17,.18,10),skin,0,1.72,0,g);
 add(new THREE.SphereGeometry(.22,12,10),skin,0,2.02,0,g);
 // Epoch-specific headwear and accessories.
 if(e===0){add(new THREE.BoxGeometry(.53,.12,.4),mat(0xe0c66b),0,2.22,0,g);add(new THREE.BoxGeometry(.12,.36,.13),mat(0x287d91),0,2.03,-.17,g)}
 else if(e===1){add(new THREE.BoxGeometry(.48,.25,.43),mat(0x8497aa,.4,.5),0,2.22,0,g);add(new THREE.BoxGeometry(.16,.25,.13),trim,0,2.34,.03,g)}
 else if(e===2||e===9){add(new THREE.BoxGeometry(.48,.12,.44),mat(0x252d49,.3,.5,eras[e].color),0,2.22,0,g);add(new THREE.BoxGeometry(.08,.28,.08),trim,0,2.03,.21,g)}
 else if(e===3){add(new THREE.ConeGeometry(.24,.28,5),mat(0x6a4b2d),0,2.27,0,g)}
 else if(e===4){add(new THREE.CylinderGeometry(.25,.27,.13,12),mat(0xe2d4b3),0,2.22,0,g);add(new THREE.BoxGeometry(.08,.25,.08),trim,0,2.05,.2,g)}
 else if(e===5){add(new THREE.CylinderGeometry(.24,.25,.12,10),mat(0x3b2b21),0,2.23,0,g);add(new THREE.BoxGeometry(.12,.24,.13),mat(0xf0e0c2),0,2.05,.18,g)}
 else if(e===6){add(new THREE.ConeGeometry(.26,.22,8),mat(0xd7eefa),0,2.24,0,g);}
 else if(e===7){add(new THREE.ConeGeometry(.23,.32,7),mat(0x2b5632),0,2.25,0,g)}
 else if(e===8){add(new THREE.CylinderGeometry(.25,.26,.12,12),mat(0x252a30,.4,.4),0,2.22,0,g);add(new THREE.BoxGeometry(.42,.07,.38),trim,0,2.15,0,g)}
 // Slightly different height and facing make the crowd feel less duplicated.
 g.rotation.y=variant*1.73;g.scale.setScalar(variant%3===0?1:variant%3===1?.94:1.05);g.userData.isResident=true;g.userData.residentName=['Хранитель эпохи','Местный исследователь','Старый наставник','Путешественник','Мастер загадок'][variant%5];return g;
}
function buildEraMap(e){clearScene();inEraMap=true;const era=eras[e];scene.background=new THREE.Color(e===0?0xe6b96b:e===1?0x9bb7cf:e===2?0x111e4d:e===3?0x244d35:e===4?0x7ab7d8:e===5?0x43a9b7:e===6?0xa8dff4:e===7?0x143e30:e===8?0x27324b:0x1d3450);scene.fog=new THREE.FogExp2(scene.background,0.008);const hemi=new THREE.HemisphereLight(0xffffff,era.color,1.65);scene.add(hemi);decor.push(hemi);const sun=new THREE.DirectionalLight(0xffffff,2.4);sun.position.set(-8,14,6);sun.castShadow=false;scene.add(sun);decor.push(sun);
 const floorMat=mat(e===0?0xc6a36b:e===1?0x607b8a:e===2?0x202d55:e===3?0x3d6a3e:e===4?0xb9c6ce:e===5?0x1b7882:e===6?0xc9eefb:e===7?0x275b3e:e===8?0x626b75:0x394b65,.9,0);add(new THREE.PlaneGeometry(100,100),floorMat,0,-.08,0).rotation.x=-Math.PI/2;
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
 }
 camera.position.set(0,1.68,7);camera.rotation.set(0,0,0,'YXZ');save.x=0;save.z=7;save.yaw=0;save.pitch=0;updateMapUI();}
function updateMapUI(){const era=eras[selectedEra];$('prompt').textContent='Карта эпохи: '+era.name+' — поговори с местными жителями, чтобы получить 3 загадки. Портал у входа — обратно.';$('use').textContent='ИССЛЕДОВАТЬ · E';document.querySelector('#top .sub').textContent=era.icon+' Карта эпохи: '+era.name;$('count').textContent=save.artifacts.length+' / '+eras.length;$('score').textContent=save.score||0;updateQuest()}
function returnToHall(){inEraMap=false;room();camera.position.set(0,1.68,5);camera.rotation.set(0,0,0,'YXZ');save.x=0;save.z=5;save.yaw=0;save.pitch=0;persist();$('prompt').textContent='Зал Времени — выбери любой портал';document.querySelector('#top .sub').textContent='Зал межвременных порталов';$('use').textContent='ВОЙТИ · E';toast('Ты вернулся в Зал Времени')}
function openPuzzle(e,i){if(document.pointerLockElement&&document.exitPointerLock)document.exitPointerLock();if(save.solved[e].includes(i)){toast('Это испытание уже пройдено. Найди другой светящийся знак.');return}let d=eras[e].puzzles[i];$('puzzleEra').textContent=eras[e].name+' • загадка '+(i+1)+' / 3';$('puzzleTitle').textContent=d.t;$('puzzleQuestion').textContent=d.q;$('puzzleFeedback').textContent='Выбери правильный ответ.';$('puzzleAnswers').innerHTML='';d.a.forEach((a,j)=>{let b=document.createElement('button');b.textContent=String.fromCharCode(65+j)+'. '+a;b.onclick=()=>{if(j===d.c){b.style.borderColor='#7cf0b2';b.style.background='#123c36';[...$('puzzleAnswers').children].forEach(x=>x.disabled=true);$('puzzleFeedback').textContent='Верно! '+d.why;save.solved[e].push(i);save.score=(save.score||0)+50;if(save.solved[e].length===3&&!save.artifacts.includes(e)){save.artifacts.push(e);save.score+=100;toast('Получен артефакт: '+eras[e].artifact+'! +100 очков')}persist();updateQuest();setTimeout(()=>{$('puzzleModal').classList.add('hidden');document.body.classList.remove('modal-open')},1400)}else{$('puzzleFeedback').textContent='Не совсем. Попробуй ещё раз!';b.style.borderColor='#ff7373';setTimeout(()=>b.style.borderColor='',500)}};$('puzzleAnswers').appendChild(b)});$('puzzleModal').classList.remove('hidden');document.body.classList.add('modal-open')}
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
$('resetBtn').onclick=()=>{if(confirm('Сбросить весь прогресс и вернуться в центр комнаты?')){localStorage.removeItem(SAVE);save={era:0,solved:Array.from({length:eras.length},()=>[]),artifacts:[],shards:Array.from({length:eras.length},()=>[]),score:0,x:0,z:5,yaw:0,pitch:0};inEraMap=false;persist();if(started)room();toast('Прогресс сброшен.')}};
rendererSafe();function rendererSafe(){load();$('count').textContent=save.artifacts.length+' / '+eras.length;$('score').textContent=save.score||0;updateQuest()}
window.addEventListener('resize',()=>{if(camera&&renderer){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,lowPowerDevice()?1.15:1.65));renderer.setSize(innerWidth,innerHeight)}});
})();

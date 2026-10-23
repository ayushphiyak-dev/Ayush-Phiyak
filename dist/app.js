const today=new Date();today.setHours(0,0,0,0);
let calendarMonth=new Date(today.getFullYear(),today.getMonth(),1),selectedDate=null,requestText='';
const form=document.querySelector('#meeting-form'),status=document.querySelector('#form-status');
const timezone=document.querySelector('#timezone');
const localZone=Intl.DateTimeFormat().resolvedOptions().timeZone;
if(![...timezone.options].some(option=>option.value===localZone)){timezone.add(new Option(localZone.replaceAll('_',' '),localZone))}timezone.value=localZone;
function formatDate(date){return date.toLocaleDateString('en',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}
function renderCalendar(){
 document.querySelector('#calendar-month').textContent=calendarMonth.toLocaleDateString('en',{month:'long',year:'numeric'});
 const calendar=document.querySelector('#calendar');calendar.replaceChildren();
 for(let i=0;i<calendarMonth.getDay();i++){const spacer=document.createElement('span');spacer.setAttribute('aria-hidden','true');calendar.append(spacer)}
 const days=new Date(calendarMonth.getFullYear(),calendarMonth.getMonth()+1,0).getDate();
 for(let day=1;day<=days;day++){const date=new Date(calendarMonth.getFullYear(),calendarMonth.getMonth(),day),button=document.createElement('button');button.type='button';button.textContent=day;button.disabled=date<today;button.setAttribute('aria-label',formatDate(date));button.setAttribute('aria-pressed',String(selectedDate?.getTime()===date.getTime()));if(date.getTime()===today.getTime())button.classList.add('today');button.addEventListener('click',()=>{selectedDate=date;document.querySelector('#selected-date').textContent=formatDate(date);status.textContent='';renderCalendar();const selected=calendar.querySelector('[aria-pressed="true"]');selected?.focus({preventScroll:true})});calendar.append(button)}
 document.querySelector('#prev-month').disabled=calendarMonth.getFullYear()===today.getFullYear()&&calendarMonth.getMonth()===today.getMonth();
}
document.querySelector('#prev-month').addEventListener('click',()=>{calendarMonth.setMonth(calendarMonth.getMonth()-1);renderCalendar()});
document.querySelector('#next-month').addEventListener('click',()=>{calendarMonth.setMonth(calendarMonth.getMonth()+1);renderCalendar()});
renderCalendar();
const slots=document.createElement('div');slots.className='time-slots';slots.setAttribute('role','group');slots.setAttribute('aria-label','Suggested meeting times, subject to confirmation');
['10:00','11:00','14:00','15:00','16:00','17:00'].forEach(time=>{const button=document.createElement('button');button.type='button';button.textContent=time;button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>{form.elements.time.value=time;slots.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)))});slots.append(button)});
document.querySelector('#selected-date').after(slots);
form.elements.time.addEventListener('input',()=>slots.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===form.elements.time.value))));
form.addEventListener('submit',event=>{event.preventDefault();if(!selectedDate){status.textContent='Please select a meeting date first.';document.querySelector('#calendar button:not(:disabled)').focus();return}const data=new FormData(form);
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:data.get('timezone'),year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());const part=type=>parts.find(p=>p.type===type).value;
 const nowKey=`${part('year')}-${part('month')}-${part('day')}T${part('hour')}:${part('minute')}`;
 const chosenKey=`${selectedDate.getFullYear()}-${String(selectedDate.getMonth()+1).padStart(2,'0')}-${String(selectedDate.getDate()).padStart(2,'0')}T${data.get('time')}`;
 if(chosenKey<=nowKey){status.textContent='Please choose a future date and time in your selected timezone.';form.elements.time.focus();return}
 requestText=`Hi Ayush,\n\nI’d like to request a 30-minute meeting.\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nPreferred date: ${formatDate(selectedDate)}\nPreferred time: ${data.get('time')}\nTimezone: ${data.get('timezone')}\n\nProject details:\n${data.get('notes')||'To discuss on the call.'}\n\nPlease let me know if this time works for you.\n\nThank you,\n${data.get('name')}`;const subject=`Meeting request — ${formatDate(selectedDate)}`;const gmailUrl='https://mail.google.com/mail/?'+new URLSearchParams({view:'cm',fs:'1',to:'ayushphiyakwork@gmail.com',su:subject,body:requestText});
 document.querySelector('#gmail-request').href=gmailUrl;
 document.querySelector('#email-app-request').href=`mailto:ayushphiyakwork@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(requestText)}`;
 document.querySelector('#email-options').hidden=false;
 window.open(gmailUrl,'_blank','noopener,noreferrer');
 status.textContent='Your request is ready. If Gmail didn’t open, use a link below. Review and send the email to request your meeting; it is not booked yet.';
 document.querySelector('#copy-request').hidden=false});
document.querySelector('#copy-request').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(requestText);status.textContent='Request details copied. Email them to ayushphiyakwork@gmail.com.'}catch{status.textContent='Clipboard access is unavailable. Please use the email button or contact Ayush directly.'}});

// Tactile, keyboard-accessible theme key with a small, locally generated click.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const fidget=document.querySelector('#fidget');
function playKeyClick(){
 try{
  const AudioContextClass=window.AudioContext||window.webkitAudioContext;
  if(!AudioContextClass)return;
  const context=new AudioContextClass();
  const start=context.currentTime;
  const master=context.createGain();
  master.gain.setValueAtTime(.0001,start);
  master.gain.exponentialRampToValueAtTime(.055,start+.003);
  master.gain.exponentialRampToValueAtTime(.0001,start+.055);
  master.connect(context.destination);
  const tone=context.createOscillator();
  tone.type='triangle';
  tone.frequency.setValueAtTime(1450,start);
  tone.frequency.exponentialRampToValueAtTime(520,start+.045);
  tone.connect(master);
  tone.start(start);
  tone.stop(start+.06);
  tone.addEventListener('ended',()=>context.close(),{once:true});
 }catch{/* Sound is a small enhancement; the theme switch always works. */}
}
for(const eventName of ['selectstart','dragstart']){fidget.addEventListener(eventName,event=>event.preventDefault())}
function applyTheme(theme){
 document.documentElement.dataset.theme=theme;
 const dark=theme==='dark';
 document.querySelector('#theme-hint-text').textContent=dark?'Too much Dark??':'Too much Bright??';
 fidget.setAttribute('aria-pressed',String(dark));
 fidget.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
 fidget.title=dark?'Switch to light mode':'Switch to dark mode';
 document.querySelector('meta[name="theme-color"]').content=dark?'#292929':'#1d7af1';
 try{localStorage.setItem('portfolio-theme',theme)}catch{}
}
applyTheme(document.documentElement.dataset.theme||'light');
let themeTransitionRunning=false;
async function switchTheme(){
 if(themeTransitionRunning)return;
 const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';
 if(reducedMotion.matches){applyTheme(theme);return}
 if(!document.startViewTransition){
  document.documentElement.classList.remove('theme-fallback');
  void document.documentElement.offsetWidth;
  applyTheme(theme);document.documentElement.classList.add('theme-fallback');
  return;
 }
 themeTransitionRunning=true;
 const bounds=fidget.getBoundingClientRect(),x=bounds.left+bounds.width/2,y=bounds.top+bounds.height/2;
 const radius=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
 const transition=document.startViewTransition(()=>applyTheme(theme));
 try{
  await transition.ready;
  await document.documentElement.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${radius}px at ${x}px ${y}px)`]},
   {duration:850,easing:'cubic-bezier(.22,.65,.2,1)',pseudoElement:'::view-transition-new(root)'}).finished;
 }catch{ /* A skipped browser transition still applies the selected theme. */ }
 finally{await transition.finished.catch(()=>{});themeTransitionRunning=false}
}
let keyActivation=0;
fidget.addEventListener('click',async()=>{
 playKeyClick();
 const activation=++keyActivation;
 const assembly=fidget.querySelector('.key-assembly');
 assembly.getAnimations().forEach(animation=>animation.cancel());
 if(!reducedMotion.matches){
  // Release the complete blue key before the browser captures the theme transition.
  const release=assembly.animate([
   {transform:'translateY(8%)'},
   {transform:'translateY(0)',offset:.72},
   {transform:'translateY(0)'}
  ],{duration:340,easing:'cubic-bezier(.2,.65,.3,1)'});
  try{await release.finished}catch{return}
 }
 if(activation===keyActivation)switchTheme();
});
const scene=document.querySelector('.hero-scene');
document.querySelector('.hero').addEventListener('pointermove',event=>{if(reducedMotion.matches||event.pointerType==='touch')return;const r=event.currentTarget.getBoundingClientRect();scene.style.setProperty('--scene-x',`${(event.clientX/r.width-.5)*12}px`);scene.style.setProperty('--scene-y',`${((event.clientY-r.top)/r.height-.5)*10}px`)});
document.querySelector('.hero').addEventListener('pointerleave',()=>{scene.style.setProperty('--scene-x','0px');scene.style.setProperty('--scene-y','0px')});
const header=document.querySelector('.topbar');const updateHeader=()=>header.classList.toggle('scrolled',scrollY>70);window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();
document.querySelectorAll('.display,.campaign-intro,.case-art,.footer-top,.footer-signature,.booking-calendar,.booking-details').forEach(el=>{el.classList.add('reveal');observer.observe(el)});
document.querySelectorAll('.skills span,.campaign-grid .art-button').forEach((el,i)=>{el.style.setProperty('--reveal-delay',`${i%3*80}ms`);el.classList.add('reveal');observer.observe(el)});
function updateRequestSummary(){const summary=document.querySelector('#request-summary');const text=summary.querySelector('span:last-child');const time=form.elements.time.value;text.textContent=selectedDate?`${selectedDate.toLocaleDateString('en',{month:'short',day:'numeric'})}${time?' · '+time:''} · ${timezone.options[timezone.selectedIndex].text}`:'Choose a date to get started';summary.classList.toggle('ready',!!selectedDate)}
form.addEventListener('input',updateRequestSummary);form.addEventListener('change',updateRequestSummary);document.querySelector('#calendar').addEventListener('click',updateRequestSummary);slots.addEventListener('click',updateRequestSummary);

form.addEventListener('input',()=>{document.querySelector('#email-options').hidden=true;document.querySelector('#copy-request').hidden=true;status.textContent=''});

function invalidatePreparedRequest(){document.querySelector('#email-options').hidden=true;document.querySelector('#copy-request').hidden=true;}
form.addEventListener('change',invalidatePreparedRequest);document.querySelector('#calendar').addEventListener('click',invalidatePreparedRequest);slots.addEventListener('click',invalidatePreparedRequest);

const imageSizes={"assets/avatar.webp":[1024,1024],"assets/campaign-1.webp":[1100,1556],"assets/campaign-2.webp":[1100,1568],"assets/campaign-3.webp":[633,861],"assets/campaign-4.webp":[1100,1467],"assets/campaign-5.webp":[595,842],"assets/campaign-6.webp":[1044,1350],"assets/campaign-7.webp":[1100,1556],"assets/campaign-8.webp":[1080,1350],"assets/campaign-9.webp":[811,1082],"assets/cipherfort-identity.webp":[1800,1333],"assets/cipherfort-poster-1.webp":[442,626],"assets/cipherfort-poster-2.webp":[445,626],"assets/cipherfort-poster-3.webp":[442,626],"assets/ember-identity.webp":[1800,1388],"assets/ember-poster-1.webp":[520,626],"assets/ember-poster-2.webp":[443,626],"assets/ember-poster-3.webp":[442,626],"assets/hero-art.webp":[1800,1163],"assets/logo-adamacaw.webp":[459,410],"assets/logo-cipherfort.webp":[493,208],"assets/logo-ember.webp":[514,514],"assets/logo-klay.webp":[486,333],"assets/logo-remis.webp":[486,244],"assets/logo-velora.webp":[459,278],"assets/velora-identity.webp":[1800,1332],"assets/velora-poster-1.webp":[443,626],"assets/velora-poster-2.webp":[444,626],"assets/velora-poster-3.webp":[442,626]};
const sections=[['about','About me'],['logofolio','Logofolio'],['branding','Branding'],['web-design','Web design / UX/UI'],['campaigns','Campaigns (social media)']];
document.querySelectorAll('.index').forEach(nav=>{nav.innerHTML=sections.map(([id,title],i)=>`<a href="#${id}" ${id===nav.dataset.active?'class="active" aria-current="location"':''}><span>${title}</span><span>0${i+1}</span></a>`).join('')});
const logos=[
 [{id:'adamacaw',name:'ADAMACAW',category:'Hospitality & travel',country:'Costa Rica',tall:true},{id:'velora',name:'VELORA',category:'Luxury jewellery',country:'Italy'}],
 [{id:'remis',name:'Remis',category:'Finance',country:'Argentina'},{id:'ember',name:'EMBER & BEAN',category:'Café & Bakehouse',country:'Australia',tall:true}],
 [{id:'cipherfort',name:'CIPHERFORT',category:'Technology / cybersecurity',country:'Estonia',tall:true},{id:'klay',name:'KLAY',category:'Kid daycare',country:'India'}]
];
function artwork(src,alt,classes=''){return `<button type="button" class="art-button ${classes}" data-art="${src}" data-caption="${alt}" aria-label="Enlarge ${alt}"><img loading="lazy" width="${imageSizes[src][0]}" height="${imageSizes[src][1]}" src="${src}" alt="${alt}"></button>`}
document.querySelector('#logo-grid').innerHTML=logos.map(col=>`<div class="logo-column">${col.map(logo=>`<article class="logo-card ${logo.tall?'tall':''}"><p>${logo.category}</p><div class="logo-art"><img loading="lazy" src="assets/logo-${logo.id}.webp" alt="${logo.name} logo"></div><p class="country">${logo.country}</p></article>`).join('')}</div>`).join('');
const cases=[
 {id:'velora',name:'VELORA',category:'Luxury jewellery',brief:"VELORA is a contemporary luxury jewellery brand shaped by sculptural forms and quiet elegance. The identity brings artistry and refinement together, giving the brand a distinctive look across its packaging, communications, and digital platforms.",solution:"The logo combines a flowing, swan-inspired symbol with a high-contrast serif wordmark. Its tapered curves echo the sculptural quality of the jewellery, while the refined lettering gives the brand a timeless and confident feel. A simple black-and-white palette keeps the focus on the form, details, and quiet elegance that define VELORA."},
 {id:'cipherfort',name:'CIPHERFORT',category:'Technology / Cybersecurity',brief:"CIPHERFORT is a cybersecurity company built on protection, trust, and technical expertise. The identity combines a strong, reliable visual language with a clear digital presence, helping the brand feel secure and consistent across its products, corporate communications, and security reports.",solution:"The logo combines the initials C and F into an angular, folded shape that suggests protection and strength. The same geometric style continues through the wordmark, where clipped corners create a precise, technical feel. A white-on-charcoal palette adds strong contrast and a confident, controlled look, reflecting CIPHERFORT’s focus on security, structure, and reliability."},
 {id:'ember',name:'EMBER & BEAN',category:'Café & Bakehouse',brief:"EMBER & BEAN is a warm, adventurous café serving specialty coffee and fresh bakes. The identity combines an energetic and friendly personality with memorable visual elements, creating a consistent presence across packaging, café signage, menus, and social media.",solution:"The identity combines an ember-inspired flame with a coffee-bean character to create a playful mascot with a confident café personality. Angular lettering and bold geometric shapes give the logo a distinctive, contemporary edge, while the burnt orange, cream, and charcoal palette reflects warmth, roasted coffee, and fire. The expressive character makes EMBER & BEAN feel friendly, energetic, and easy to remember."}
];
document.querySelector('#case-studies').innerHTML=cases.map(c=>`<article class="case-study" id="${c.id}"><div class="case-intro"><p class="case-kicker">${c.category}</p><h3>${c.name}</h3><div class="case-columns"><div><h4>BRIEF</h4><p>${c.brief}</p></div><div><h4>SCOPE OF WORK</h4><p>Logo design<br>Visual identity<br>Brand guidelines</p></div><div><h4>SOLUTION</h4><p>${c.solution}</p></div></div></div>${artwork(`assets/${c.id}-identity.webp`,`${c.name} visual identity, colour palette and brand applications`,'case-art')}<div class="poster-row">${[1,2,3].map(n=>artwork(`assets/${c.id}-poster-${n}.webp`,`${c.name} campaign poster ${n}`)).join('')}</div></article>`).join('');
const campaignNames=['Mr. Bean automotive collage','Deadpool & Wolverine movie poster','Save Tree environmental poster','Plastic Lisa editorial poster','Touch film poster','Ankan — Avaahan 2026','Robotics in primary healthcare information poster','College Minecraft server poster','Tania — Virtux lead'];
document.querySelector('#campaign-grid').innerHTML=campaignNames.map((name,i)=>artwork(`assets/campaign-${i+1}.webp`,name)).join('');
const lightbox=document.querySelector('#lightbox');
document.addEventListener('click',event=>{const button=event.target.closest('[data-art]');if(!button)return;document.querySelector('#lightbox-image').src=button.dataset.art;document.querySelector('#lightbox-image').alt=button.dataset.caption;document.querySelector('#lightbox-caption').textContent=button.dataset.caption;lightbox.showModal();document.body.style.overflow='hidden'});
document.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox){const r=lightbox.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)lightbox.close()}});
lightbox.addEventListener('close',()=>document.body.style.overflow='');
document.querySelector('#year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.06});
document.querySelectorAll('.about-copy,.skills,.case-intro,.poster-row,.campaign-grid,.contact-heading').forEach(el=>{el.classList.add('reveal');observer.observe(el)});

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

// Tactile, keyboard-accessible fidget key. No sound or external side effects.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const fidget=document.querySelector('#fidget');let fidgetClicks=0;
for(const eventName of ['selectstart','dragstart']){fidget.addEventListener(eventName,event=>event.preventDefault())}
function applyTheme(theme){
 document.documentElement.dataset.theme=theme;
 const dark=theme==='dark';
 document.querySelector('#theme-hint-text').textContent=dark?'Too much Dark??':'too much bright??';
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
fidget.addEventListener('click',()=>{
 switchTheme();
 fidgetClicks++;
 const face=fidget.querySelector('.key-face');
 face.getAnimations().forEach(animation=>animation.cancel());
 face.animate(reducedMotion.matches?[{background:'#80b9ff'},{background:'#1c79ea'}]:[{transform:'translateY(9px) scale(.94)'},{transform:'translateY(-3px)',offset:.42},{transform:'translateY(1px)',offset:.7},{transform:'translateY(0)'}],{duration:reducedMotion.matches?120:560,easing:'cubic-bezier(.2,.7,.2,1)'});
 if(reducedMotion.matches)return;
 for(let i=0;i<8;i++){const particle=document.createElement('span');particle.className='fidget-particle';particle.setAttribute('aria-hidden','true');const angle=(i/8)*Math.PI*2+fidgetClicks*.35;const distance=60+(i%3)*12;particle.style.background=i%2?'#8fc5ff':'#1c79ea';fidget.append(particle);const motion=particle.animate([{transform:'translate(-50%,-50%) scale(0)',opacity:1},{transform:`translate(${Math.cos(angle)*distance}px,${Math.sin(angle)*distance}px) rotate(${i*60}deg) scale(1)`,opacity:.9,offset:.55},{transform:`translate(${Math.cos(angle)*distance*1.3}px,${Math.sin(angle)*distance*1.3+20}px) rotate(${i*80}deg) scale(.2)`,opacity:0}],{duration:650,easing:'cubic-bezier(.15,.65,.3,1)'});motion.onfinish=()=>particle.remove()}
 const ring=document.createElement('span');ring.className='fidget-ring';ring.setAttribute('aria-hidden','true');fidget.append(ring);const pulse=ring.animate([{opacity:.5,transform:'scale(.8)'},{opacity:0,transform:'scale(1.6)'}],{duration:450,easing:'ease-out'});pulse.onfinish=()=>ring.remove();
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

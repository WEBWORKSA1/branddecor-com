/* BrandDecor.com — site script (no dependencies) */
(function(){
  'use strict';
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  var BD=window.BD||{};

  /* ---------- Private inbox routing (address is never written in the page) ---------- */
  var _k=[106,104,100,41,107,110,102,106,96,71,54,102,116,108,117,104,112,101,98,112];
  function inbox(){return String.fromCharCode.apply(null,_k.map(function(c){return c^7})).split('').reverse().join('')}
  function ENDPOINT(){return 'https://formsubmit.co/ajax/'+inbox()}
  $$('[data-mail]').forEach(function(a){
    a.addEventListener('click',function(e){
      e.preventDefault();
      window.location.href='mailto:'+inbox()+'?subject='+encodeURIComponent(a.getAttribute('data-mail')||'Inquiry from BrandDecor.com');
    });
  });

  /* ---------- Theme ---------- */
  var root=document.documentElement,tbtn=$('#themeBtn');
  if(tbtn)tbtn.addEventListener('click',function(){var cur=root.getAttribute('data-theme')==='dark'?'light':'dark';root.setAttribute('data-theme',cur);store('bd-theme',cur)});

  /* ---------- Nav ---------- */
  var here=location.pathname.replace(/index\.html$/,'');
  $$('#menu a').forEach(function(a){var h=a.getAttribute('href').replace(/index\.html$/,'');if(h===here||(h.length>1&&h.slice(-1)==='/'&&here.indexOf(h)===0)){a.classList.add('active');a.setAttribute('aria-current','page')}});
  var bg=$('#burger'),menu=$('#menu');
  if(bg&&menu)bg.addEventListener('click',function(){var o=menu.classList.toggle('open');bg.setAttribute('aria-expanded',o)});

  /* ---------- Reveal ---------- */
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.1});
    $$('.reveal').forEach(function(el){io.observe(el)});
  }else $$('.reveal').forEach(function(el){el.classList.add('in')});

  /* ---------- Cookie notice ---------- */
  var ck=$('#cookie');
  if(ck&&!store('bd-cookie'))ck.classList.add('show');
  $$('[data-cookie]').forEach(function(b){b.addEventListener('click',function(){store('bd-cookie',b.getAttribute('data-cookie'));ck.classList.remove('show')})});

  $$('.year').forEach(function(el){el.textContent=new Date().getFullYear()});

  /* ---------- Forms (FormSubmit AJAX) ---------- */
  $$('form.js-form').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=$('.form-msg',f);
      var hp=f.querySelector('[name=_honey]');if(hp&&hp.value)return;
      if(!f.checkValidity()){f.reportValidity();return}
      var btn=$('button[type=submit]',f),old=btn?btn.textContent:'';
      if(btn){btn.disabled=true;btn.textContent='Sending…'}
      var data={};
      new FormData(f).forEach(function(v,k){if(k!=='_honey')data[k]=data[k]?data[k]+', '+v:v});
      data._subject=(f.getAttribute('data-subject')||'BrandDecor.com form')+' — '+(data.company||data.name||data.email||'');
      data._template='table';data._captcha='false';data.page=location.pathname;data.submitted=new Date().toISOString();
      fetch(ENDPOINT(),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
        .then(function(r){return r.json().catch(function(){return {}})})
        .then(function(){
          if(msg){msg.className='form-msg ok';msg.textContent=f.getAttribute('data-ok')||'Received. We reply within 1 business day.'}
          f.reset();resetSteps(f);
          if(f.id==='quoteForm')store('bd-viz','');
        })
        .catch(function(){if(msg){msg.className='form-msg err';msg.textContent='Network error — please try again in a minute.'}})
        .then(function(){if(btn){btn.disabled=false;btn.textContent=old}});
    });
  });

  /* ---------- Multi-step forms ---------- */
  function resetSteps(f){
    var st=$$('.step',f);if(!st.length)return;
    st.forEach(function(s,i){s.classList.toggle('active',i===0)});
    $$('.steps-ind span',f).forEach(function(s,i){s.classList.toggle('on',i===0)});
    f._go&&f._go(0,true);
  }
  $$('form.multistep').forEach(function(f){
    var steps=$$('.step',f),ind=$$('.steps-ind span',f),i=0,lab=$('.step-count',f);
    function go(n,force){
      if(!force&&n>i){var bad=$$('input,select,textarea',steps[i]).filter(function(x){return !x.checkValidity()});if(bad.length){bad[0].reportValidity();return}}
      i=Math.max(0,Math.min(steps.length-1,n));
      steps.forEach(function(s,k){s.classList.toggle('active',k===i)});
      ind.forEach(function(s,k){s.classList.toggle('on',k<=i)});
      if(lab)lab.textContent='Step '+(i+1)+' of '+steps.length;
    }
    f._go=go;
    $$('[data-next]',f).forEach(function(b){b.addEventListener('click',function(){go(i+1)})});
    $$('[data-prev]',f).forEach(function(b){b.addEventListener('click',function(){go(i-1)})});
    go(0,true);
  });

  /* ---------- Quote form prefill from URL / visualizer ---------- */
  var qf=$('#quoteForm');
  if(qf){
    var qs=new URLSearchParams(location.search);
    var sp=qs.get('space');if(sp){var r=qf.querySelector('input[name=space][value="'+sp+'"]');if(r)r.checked=true}
    var pj=qs.get('project');if(pj){var c=qf.querySelector('input[name=project][value="'+pj+'"]');if(c)c.checked=true}
    var spec=store('bd-viz');
    if(spec&&qs.get('from')==='visualizer'){var t=$('#q-spec');if(t){t.value=spec;$('#specNote').hidden=false}}
  }

  /* ---------- YouTube facades ---------- */
  $$('.video[data-yt]').forEach(function(v){
    var id=v.getAttribute('data-yt');
    v.innerHTML='<img loading="lazy" alt="" src="https://i.ytimg.com/vi/'+id+'/hqdefault.jpg"><div class="play"><span>▶</span></div>';
    function play(){v.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0" title="'+esc(v.getAttribute('aria-label')||'YouTube video')+'" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>'}
    v.addEventListener('click',play,{once:true});
    v.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();play()}});
  });

  function money(n){return '$'+Math.round(n).toLocaleString()}
  function num(id){var el=document.getElementById(id);return el?parseFloat(el.value)||0:0}
  function bind(ids,fn){ids.forEach(function(id){var el=document.getElementById(id);if(el){el.addEventListener('input',fn);el.addEventListener('change',fn)}});fn()}

  /* ---------- Brand Wall Visualizer ---------- */
  var viz=$('#viz');
  if(viz){
    var walls={
      paint:function(c){return c},
      brick:function(c){return 'repeating-linear-gradient(0deg,rgba(0,0,0,.18) 0 2px,transparent 2px 26px),repeating-linear-gradient(90deg,rgba(0,0,0,.14) 0 2px,transparent 2px 60px),'+c},
      slats:function(c){return 'repeating-linear-gradient(90deg,rgba(0,0,0,.22) 0 3px,rgba(255,255,255,.04) 3px 22px),'+c},
      concrete:function(c){return 'radial-gradient(circle at 20% 30%,rgba(255,255,255,.12),transparent 40%),radial-gradient(circle at 70% 60%,rgba(0,0,0,.12),transparent 45%),'+c},
      marble:function(c){return 'linear-gradient(115deg,transparent 40%,rgba(255,255,255,.35) 42%,transparent 46%),linear-gradient(60deg,transparent 60%,rgba(0,0,0,.08) 62%,transparent 65%),'+c},
      moss:function(c){return 'radial-gradient(circle,rgba(0,0,0,.18) 1px,transparent 2px) 0 0/9px 9px,'+c}
    };
    /* finish: css look + planning cost per sq ft of sign area [low, high] */
    var finishes={
      acrylic:{n:'3D acrylic letters',r:[45,80],css:function(col){return {color:col,textShadow:'0 2px 0 rgba(0,0,0,.18),0 6px 10px rgba(0,0,0,.25)'}}},
      metal:{n:'Brushed metal letters',r:[70,130],css:function(){return {color:'transparent',backgroundImage:'linear-gradient(180deg,#f2f2f2,#9a9a9a 45%,#e6e6e6 55%,#7d7d7d)',WebkitBackgroundClip:'text',backgroundClip:'text',textShadow:'none',filter:'drop-shadow(0 4px 6px rgba(0,0,0,.35))'}}},
      gold:{n:'Brushed brass / gold letters',r:[80,150],css:function(){return {color:'transparent',backgroundImage:'linear-gradient(180deg,#f7e3a1,#b98b3e 50%,#f2d48a 58%,#8a6424)',WebkitBackgroundClip:'text',backgroundClip:'text',textShadow:'none',filter:'drop-shadow(0 4px 6px rgba(0,0,0,.35))'}}},
      halo:{n:'Halo-lit stainless letters',r:[150,260],css:function(col){return {color:'#1a1a1a',textShadow:'0 0 18px '+col+',0 0 38px '+col}}},
      neon:{n:'LED neon flex',r:[90,160],css:function(col){return {color:'#fff',textShadow:'0 0 4px #fff,0 0 10px '+col+',0 0 22px '+col+',0 0 42px '+col}}},
      wood:{n:'Laser-cut wood',r:[40,75],css:function(){return {color:'transparent',backgroundImage:'repeating-linear-gradient(90deg,#a5733f 0 6px,#8a5a2b 6px 9px,#b88350 9px 14px)',WebkitBackgroundClip:'text',backgroundClip:'text',textShadow:'none',filter:'drop-shadow(0 3px 4px rgba(0,0,0,.3))'}}},
      vinyl:{n:'Cut vinyl lettering',r:[8,15],css:function(col){return {color:col,textShadow:'none'}}}
    };
    var stage=$('#vizStage'),wall=$('#vizWall'),sign=$('#vizSign'),nm=$('#vizName'),sb=$('#vizSub');
    var state={wall:'paint',wc:'#e9e2d6'};
    $$('#wallSw button').forEach(function(b){b.style.background=b.getAttribute('data-c');b.addEventListener('click',function(){$$('#wallSw button').forEach(function(x){x.classList.remove('on')});b.classList.add('on');state.wc=b.getAttribute('data-c');draw()})});
    function draw(){
      var name=($('#v-name').value||'Your Brand').slice(0,28),sub=($('#v-sub').value||'').slice(0,40);
      var font=$('#v-font').value,fin=finishes[$('#v-finish').value],col=$('#v-color').value;
      state.wall=$('#v-wall').value;
      wall.style.background=walls[state.wall](state.wc);
      nm.textContent=name;sb.textContent=sub;sb.style.display=sub?'':'none';
      nm.style.fontFamily=font;sb.style.fontFamily='Inter,sans-serif';
      ['color','backgroundImage','WebkitBackgroundClip','backgroundClip','textShadow','filter'].forEach(function(p){nm.style[p]=''});
      var css=fin.css(col);for(var p in css)nm.style[p]=css[p];
      sb.style.color=($('#v-finish').value==='neon'||$('#v-finish').value==='halo')?col:'';
      var light=$('#v-light').value;
      stage.style.boxShadow=light==='spot'?'inset 0 -140px 120px -60px rgba(0,0,0,.35)':light==='dim'?'inset 0 0 0 2000px rgba(0,0,0,.38)':'none';
      var w=num('v-width');$('#v-width-out').textContent=w+' ft';
      nm.style.fontSize=Math.max(1.2,Math.min(4.2,w/2.2))+'rem';
      /* sizing + estimate */
      var chars=Math.max(3,name.replace(/\s/g,'').length);
      var capIn=Math.min(48,(w*12)/(chars*0.68));
      var areaSq=(w*(capIn/12)*1.25)+(sub?w*0.15:0);
      var inst=w<=6?[250,600]:w<=12?[450,1100]:[900,2200];
      var lo=areaSq*fin.r[0]+inst[0],hi=areaSq*fin.r[1]+inst[1];
      var readFt=Math.round(capIn*10);
      $('#v-est').textContent=money(lo)+' – '+money(hi);
      $('#v-cap').textContent=capIn.toFixed(1)+'″ letters · reads best within ~'+readFt+' ft';
      var spec='Visualizer spec — Text: "'+name+'"'+(sub?' / "'+sub+'"':'')+' | Finish: '+fin.n+' | Width: '+w+' ft | Est. cap height: '+capIn.toFixed(1)+' in | Wall: '+state.wall+' '+state.wc+' | Colour: '+col+' | Lighting: '+light+' | Planning estimate: '+money(lo)+'–'+money(hi);
      store('bd-viz',spec);
    }
    bind(['v-name','v-sub','v-font','v-finish','v-color','v-wall','v-light','v-width'],draw);
    var sh=$('#vizShuffle');if(sh)sh.addEventListener('click',function(){
      var fs=Object.keys(finishes),ws=Object.keys(walls),sw=$$('#wallSw button'),fo=$$('#v-font option');
      $('#v-finish').value=fs[Math.floor(Math.random()*fs.length)];$('#v-wall').value=ws[Math.floor(Math.random()*ws.length)];
      $('#v-font').selectedIndex=Math.floor(Math.random()*fo.length);sw[Math.floor(Math.random()*sw.length)].click();
      $('#v-color').value='#'+('00000'+Math.floor(Math.random()*16777215).toString(16)).slice(-6);draw();
    });
  }

  /* ---------- Tool tabs ---------- */
  $$('.tool-tabs button').forEach(function(b){
    b.addEventListener('click',function(){
      $$('.tool-tabs button').forEach(function(x){x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b)});
      $$('.tool').forEach(function(t){t.classList.toggle('on',t.id===b.getAttribute('data-tool'))});
      history.replaceState(null,'','#'+b.getAttribute('data-tool'));
    });
  });
  if(location.hash){var hb=$('.tool-tabs button[data-tool="'+location.hash.slice(1)+'"]');if(hb)hb.click()}

  /* Letter height: optimal = 1 in per 10 ft; max legible = 1 in per 30 ft (USSC legibility index) */
  if($('#t-letter')){
    bind(['l-dist','l-unit','l-cond'],function(){
      var d=num('l-dist'),u=$('#l-unit').value,ft=u==='m'?d*3.28084:d;
      var f=parseFloat($('#l-cond').value)||1;
      var opt=ft/10*f,min=ft/30*f;
      var fmt=function(i){return u==='m'?(i*2.54).toFixed(1)+' cm':i.toFixed(1)+' in'};
      $('#lh-opt').textContent=fmt(opt);$('#lh-min').textContent=fmt(min);
      $('#lh-sign').textContent=u==='m'?(opt*2.54*2.2/100).toFixed(2)+' m tall':(opt*2.2/12).toFixed(1)+' ft tall';
      $('#lh-note').textContent=ft<15?'Close range: interior door and desk signs — prioritise contrast and accessibility.':ft<100?'Interior lobby / storefront range. Dimensional letters with good contrast work well.':'Long range: road-facing or pylon. Go bold, short copy, illuminated.';
    });
  }
  /* Mural / wall graphic cost */
  if($('#t-mural')){
    bind(['m-w','m-h','m-type','m-design','m-install','m-qty'],function(){
      var area=num('m-w')*num('m-h'),rate=parseFloat($('#m-type').value),q=Math.max(1,num('m-qty'));
      var design=parseFloat($('#m-design').value),inst=parseFloat($('#m-install').value);
      var prod=area*rate*q,instC=area*inst*q,total=prod+instC+design;
      $('#mu-total').textContent=money(total*0.85)+' – '+money(total*1.2);
      $('#mu-area').textContent=(area*q).toLocaleString()+' sq ft';$('#mu-prod').textContent=money(prod);$('#mu-inst').textContent=money(instC);$('#mu-design').textContent=money(design);
      $('#mu-sqft').textContent=area?money(total/(area*q))+'/sq ft':'—';
    });
  }
  /* Trade show budget: space x multiplier rule */
  if($('#t-booth')){
    bind(['b-size','b-rate','b-type','b-shows','b-staff','b-leads','b-deal','b-close'],function(){
      var s=$('#b-size').value.split('x'),sq=(+s[0])*(+s[1]),space=sq*num('b-rate');
      var build=sq*parseFloat($('#b-type').value),shows=Math.max(1,num('b-shows'));
      var services=space*0.6,staff=num('b-staff')*3*450,graphics=sq*12;
      var perShow=space+services+staff+graphics+build/Math.min(shows,3);
      var leads=num('b-leads'),rev=leads*num('b-close')/100*num('b-deal');
      $('#bo-total').textContent=money(perShow);
      $('#bo-space').textContent=money(space);$('#bo-build').textContent=money(build/Math.min(shows,3));$('#bo-serv').textContent=money(services);$('#bo-staff').textContent=money(staff);$('#bo-gfx').textContent=money(graphics);
      $('#bo-cpl').textContent=leads?money(perShow/leads):'—';$('#bo-roi').textContent=perShow?Math.round((rev-perShow)/perShow*100)+'%':'—';
      $('#bo-year').textContent=money(perShow*shows);
    });
  }
  /* Palette generator + WCAG contrast */
  function hexToHsl(h){h=h.replace('#','');var r=parseInt(h.substr(0,2),16)/255,g=parseInt(h.substr(2,2),16)/255,b=parseInt(h.substr(4,2),16)/255;var mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,s=0,hu=0;if(mx!==mn){var d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);hu=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;hu*=60}return [hu,s*100,l*100]}
  function hsl(h,s,l){h=((h%360)+360)%360;s=Math.max(0,Math.min(100,s))/100;l=Math.max(0,Math.min(100,l))/100;var k=function(n){return (n+h/30)%12},a=s*Math.min(l,1-l),f=function(n){return l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)))};return '#'+[f(0),f(8),f(4)].map(function(x){return ('0'+Math.round(x*255).toString(16)).slice(-2)}).join('')}
  function lum(h){h=h.replace('#','');return [0,2,4].map(function(i){var c=parseInt(h.substr(i,2),16)/255;return c<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4)}).reduce(function(a,c,i){return a+c*[.2126,.7152,.0722][i]},0)}
  function contrast(a,b){var x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
  if($('#t-palette')){
    bind(['p-base','p-mode'],function(){
      var b=$('#p-base').value,m=$('#p-mode').value,c=hexToHsl(b),h=c[0],s=c[1],l=c[2],out;
      if(m==='complement')out=[hsl(h,s*.3,95),hsl(h,s,l),hsl(h,s*.8,Math.max(15,l-25)),hsl(h+180,s*.9,l),hsl(h,s*.25,14)];
      else if(m==='analogous')out=[hsl(h-30,s*.35,94),hsl(h-30,s,l),b,hsl(h+30,s,l),hsl(h,s*.3,14)];
      else if(m==='triad')out=[hsl(h,s*.2,96),b,hsl(h+120,s*.85,l),hsl(h+240,s*.85,l),hsl(h,s*.25,13)];
      else out=[hsl(h,s*.25,96),hsl(h,s*.6,80),b,hsl(h,s,Math.max(12,l-22)),hsl(h,s*.3,10)];
      out[2]=out[2]||b;
      $('#pal').innerHTML=out.map(function(x){return '<div style="background:'+x+';color:'+(lum(x)>.4?'#111':'#fff')+'" title="Click to copy">'+x.toUpperCase()+'</div>'}).join('');
      $$('#pal div').forEach(function(d){d.addEventListener('click',function(){try{navigator.clipboard.writeText(d.textContent)}catch(e){}var o=d.textContent;d.textContent='Copied';setTimeout(function(){d.textContent=o},900)})});
      var cr=contrast(out[4],out[0]),cb=contrast(b,'#ffffff'),cd=contrast(b,out[4]);
      $('#pa-text').textContent=cr.toFixed(1)+':1 '+(cr>=7?'AAA':cr>=4.5?'AA':'Fail');
      $('#pa-white').textContent=cb.toFixed(1)+':1 '+(cb>=4.5?'AA':cb>=3?'AA Large':'Fail');
      $('#pa-dark').textContent=cd.toFixed(1)+':1 '+(cd>=4.5?'AA':cd>=3?'AA Large':'Fail');
      $('#pa-css').textContent=':root{'+['--bg','--soft','--brand','--deep','--ink'].map(function(n,i){return n+':'+out[i]}).join(';')+'}';
    });
  }
  /* Window film */
  if($('#t-film')){
    bind(['f-panes','f-w','f-h','f-type','f-cov'],function(){
      var a=num('f-panes')*num('f-w')*num('f-h')/144*(num('f-cov')/100),r=parseFloat($('#f-type').value);
      $('#fi-area').textContent=a.toFixed(0)+' sq ft';$('#fi-total').textContent=money(a*r*0.85+150)+' – '+money(a*r*1.2+350);
      $('#fi-rolls').textContent=Math.ceil(a*1.15/50)+' × 60″×10′ rolls (DIY, incl. 15% waste)';
    });
  }
  /* Office branding budget */
  if($('#t-office')){
    bind(['o-sqft','o-level','o-rooms','o-recep','o-emp'],function(){
      var sq=num('o-sqft'),lvl=parseFloat($('#o-level').value),rooms=num('o-rooms'),rec=parseFloat($('#o-recep').value);
      var base=sq*lvl,roomC=rooms*650,tot=base+roomC+rec;
      $('#of-total').textContent=money(tot*0.85)+' – '+money(tot*1.25);
      $('#of-recep').textContent=money(rec);$('#of-rooms').textContent=money(roomC);$('#of-walls').textContent=money(base);$('#of-emp').textContent=num('o-emp')?money(tot/num('o-emp'))+' / employee':'—';
    });
  }

  /* ---------- Style Lab ---------- */
  var lab=$('#styleGrid');
  if(lab&&BD.styles){
    function render(f){
      lab.innerHTML=BD.styles.filter(function(s){return f==='all'||s.t.indexOf(f)>-1}).map(function(s){
        return '<article class="card style-card reveal in"><div class="swatch-row">'+s.p.map(function(c){return '<span style="background:'+c+'" title="'+c+'"></span>'}).join('')+'</div><h3>'+esc(s.n)+' <span class="tag" style="float:right">'+s.c+'</span></h3><p><b>Materials:</b> '+esc(s.m)+'</p><p style="margin-top:6px"><b>Best for:</b> '+esc(s.b)+'</p><div style="margin-top:12px">'+s.t.map(function(t){return '<span class="tag">'+t+'</span>'}).join('')+'</div><a class="more" href="/get-quotes.html?style='+encodeURIComponent(s.n)+'">Get quotes for this look →</a></article>';
      }).join('');
      var c=$('#styleCount');if(c)c.textContent=lab.children.length+' looks';
    }
    $$('.filters button').forEach(function(b){b.addEventListener('click',function(){$$('.filters button').forEach(function(x){x.classList.toggle('on',x===b)});render(b.getAttribute('data-f'))})});
    render('all');
  }
  var qsStyle=new URLSearchParams(location.search).get('style');
  if(qsStyle&&$('#q-spec')){$('#q-spec').value='Style Lab look: '+qsStyle;}

  /* ---------- Idea of the day + seasonal planner (auto-update by date) ---------- */
  var today=new Date(),doy=Math.floor((today-new Date(today.getFullYear(),0,0))/864e5);
  var iod=$('#ideaDay');if(iod&&BD.ideas){iod.textContent=BD.ideas[doy%BD.ideas.length];var idn=$('#ideaNum');if(idn)idn.textContent='#'+((doy%BD.ideas.length)+1)}
  var iDate=$('#ideaDate');if(iDate)iDate.textContent=today.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});
  var sea=$('#seasonNow');
  if(sea&&BD.seasons){
    var m=today.getMonth(),a=BD.seasons[m],b=BD.seasons[(m+1)%12];
    sea.innerHTML='<div class="card"><span class="tag">Now · '+a.m+'</span><h3>'+a.c+'</h3><p>'+a.i+'</p></div><div class="card"><span class="tag">Plan next · '+b.m+'</span><h3>'+b.c+'</h3><p>'+b.i+'</p><p style="margin-top:10px"><b>Order by:</b> '+new Date(today.getFullYear(),m,24).toLocaleDateString(undefined,{month:'short',day:'numeric'})+' for typical 2–3 week production.</p></div>';
  }
  var seaAll=$('#seasonAll');
  if(seaAll&&BD.seasons){seaAll.innerHTML=BD.seasons.map(function(s,i){return '<div class="card'+(i===today.getMonth()?'" style="border-color:var(--brand)':'')+'"><span class="tag">'+s.m+'</span><h3>'+s.c+'</h3><p>'+s.i+'</p></div>'}).join('')}

  /* ---------- Directory ---------- */
  var dir=$('#proGrid');
  if(dir&&BD.pros){
    dir.innerHTML=BD.pros.map(function(p){return '<div class="card"><h3>'+esc(p.n)+'</h3><p>'+esc(p.d)+'</p><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px"><a class="btn btn-primary btn-sm" href="/get-quotes.html?project='+p.k+'">Get matched</a><a class="btn btn-ghost btn-sm" href="#list" data-cat="'+esc(p.n)+'">List here</a></div></div>'}).join('');
    $$('[data-cat]',dir).forEach(function(a){a.addEventListener('click',function(){var s=$('#ls-cat');if(s)s.value=a.getAttribute('data-cat')})});
  }

  /* ---------- Contest countdown (last day of each month 23:59 UTC; rolls automatically) ---------- */
  var cd=$('#contestCountdown');
  if(cd){
    var now=new Date(),end=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth()+1,0,23,59,59));
    var mn=$('#contestMonth');if(mn)mn.textContent=end.toLocaleDateString(undefined,{month:'long',year:'numeric',timeZone:'UTC'});
    var de=$('#contestEnd');if(de)de.textContent=end.toUTCString().replace(' GMT',' UTC');
    var th=$('#contestTheme');
    if(th){var themes=['Best reception wall','Best storefront window','Best small-office makeover','Best café or restaurant branding','Best trade-show booth','Best creator studio backdrop','Best wayfinding fix','Best low-budget glow-up','Best sustainable branded space','Best mural with a message','Best pop-up shop','Best holiday window'];th.textContent=themes[now.getUTCMonth()]}
    (function tick(){var ms=Math.max(0,end-new Date()),d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5),mi=Math.floor(ms%36e5/6e4),s=Math.floor(ms%6e4/1e3);cd.textContent=d+'d '+('0'+h).slice(-2)+'h '+('0'+mi).slice(-2)+'m '+('0'+s).slice(-2)+'s';setTimeout(tick,1000)})();
  }

  /* ---------- Guide search ---------- */
  var gs=$('#guideSearch');
  if(gs)gs.addEventListener('input',function(){var q=gs.value.toLowerCase();$$('[data-guide]').forEach(function(c){c.style.display=c.textContent.toLowerCase().indexOf(q)>-1?'':'none'})});

  /* ---------- Donation amount chips -> custom ---------- */
  var oth=$('#d-other');if(oth)oth.addEventListener('input',function(){if(oth.value)$$('input[name=amount]').forEach(function(r){r.checked=false;r.required=false});else $$('input[name=amount]').forEach(function(r){r.required=true})});
})();

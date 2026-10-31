const btn=document.querySelector(".menu-toggle");const nav=document.querySelector(".nav-links");btn?.addEventListener("click",()=>{const open=nav.classList.toggle("open");btn.setAttribute("aria-expanded",open)});document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>(nav.classList.remove("open"),btn?.setAttribute("aria-expanded","false"))));
// Quiz TB Anak

const tbQuiz=[
 {q:'Apa itu TB (Tuberkulosis) pada anak?',a:['Penyakit yang hanya menyerang kulit','Penyakit menular yang dapat menyerang paru-paru dan organ lain','Alergi biasa','Penyakit karena kekurangan vitamin'],c:1},
 {q:'Bagaimana kuman TB dapat menyebar?',a:['Melalui udara saat penderita TB batuk atau bersin','Melalui warna pakaian','Karena terlalu sering bermain','Karena makan buah'],c:0},
 {q:'Gejala apa yang perlu diperhatikan pada anak?',a:['Berat badan sulit naik atau menurun','Rambut tumbuh lebih cepat','Kuku menjadi panjang','Anak sering tertawa'],c:0},
 {q:'Apa yang sebaiknya dilakukan selama pengobatan TB?',a:['Berhenti minum obat saat terlihat sehat','Minum obat sesuai jadwal dan kontrol sesuai anjuran','Mengubah dosis sendiri','Minum obat hanya saat demam'],c:1},
 {q:'Apa salah satu cara membantu mencegah penularan TB di rumah?',a:['Menutup semua jendela','Membiarkan rumah pengap','Membuka jendela agar udara berganti','Menghentikan pengobatan lebih cepat'],c:2}
];
let quizIndex=0,quizScoreValue=0,quizAnswered=false;
const qN=document.getElementById('quizNumber'),qS=document.getElementById('quizScore'),qQ=document.getElementById('quizQuestion'),qA=document.getElementById('quizAnswers'),qF=document.getElementById('quizFeedback'),qNext=document.getElementById('quizNext');
function drawQuiz(){
 if(!qQ)return;
 if(quizIndex>=tbQuiz.length){document.getElementById('quizProgress').style.width='100%';qN.textContent='Selesai';qQ.textContent=`Quiz selesai! Skor kamu ${quizScoreValue} dari ${tbQuiz.length}.`;qA.innerHTML='<div class="note">Terima kasih sudah belajar tentang TB pada anak. Tekan tombol di bawah untuk mengulang quiz.</div>';qF.textContent='';qNext.textContent='Ulangi Quiz';qNext.disabled=false;return;}
 document.getElementById('quizProgress').style.width=((quizIndex+1)/tbQuiz.length*100)+'%';
 const x=tbQuiz[quizIndex];quizAnswered=false;qN.textContent=`${quizIndex+1} / ${tbQuiz.length}`;qS.textContent=`Skor: ${quizScoreValue}`;qQ.textContent=x.q;qF.textContent='';qNext.disabled=true;qNext.textContent=quizIndex===tbQuiz.length-1?'Lihat Hasil':'Selanjutnya ›';
 qA.innerHTML=x.a.map((t,i)=>`<button class="quiz-answer" data-i="${i}">${String.fromCharCode(65+i)}. ${t}</button>`).join('');
 document.querySelectorAll('.quiz-answer').forEach(btn=>btn.addEventListener('click',()=>{if(quizAnswered)return;quizAnswered=true;const pick=Number(btn.dataset.i);document.querySelectorAll('.quiz-answer').forEach((b,i)=>{if(i===x.c)b.classList.add('correct');else if(i===pick)b.classList.add('wrong')});if(pick===x.c){quizScoreValue++;qF.textContent='Benar! 👍'}else qF.textContent='Belum tepat. Jawaban yang benar sudah ditandai.';qS.textContent=`Skor: ${quizScoreValue}`;qNext.disabled=false;}));
}
qNext?.addEventListener('click',()=>{if(quizIndex>=tbQuiz.length){quizIndex=0;quizScoreValue=0}else quizIndex++;drawQuiz()});
drawQuiz();

// Website navigation & subtle entrance animations
const goTop=document.querySelector('.back-to-top');
window.addEventListener('scroll',()=>goTop?.classList.toggle('visible',window.scrollY>500),{passive:true});
const links=[...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections=[...document.querySelectorAll('main section[id]')];
if('IntersectionObserver' in window){
  const sectionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}});
  },{rootMargin:'-25% 0px -62% 0px'});
  sections.forEach(el=>sectionObserver.observe(el));
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const targets=document.querySelectorAll('.learning-card,.section-heading,.card,.symptom,.timeline-item,.faq details');
    targets.forEach(el=>el.classList.add('reveal'));
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');revealObserver.unobserve(e.target)}}),{threshold:.08});
    targets.forEach(el=>revealObserver.observe(el));
  }
}


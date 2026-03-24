document.addEventListener('DOMContentLoaded', () => {

    // ================= КАРУСЕЛЬ =================
    const images = ["1.jpg","2.jpg","3.jpg","4.jpg"];
    let currentIndex = 0;
    const img = document.getElementById("carouselImage");
    function showImage(){ img.src = images[currentIndex]; }
    window.nextImage = function(){ currentIndex = (currentIndex + 1) % images.length; showImage(); }
    window.prevImage = function(){ currentIndex = (currentIndex - 1 + images.length) % images.length; showImage(); }
    showImage();

    // ================= КВІЗ =================
    window.checkQuiz = function(){
        let score = 0, total = 6;
        for(let i=1;i<=total;i++){
            const answer = document.querySelector(`input[name="q${i}"]:checked`);
            if(!answer){ alert("Будь ласка, відповіді на всі питання!"); return; }
            if(answer.value==="1") score++;
        }
        document.getElementById("quizResult").innerText = `Ваш результат: ${score} з ${total} правильних відповідей`;
    }

    // ================= ГОДИННИК =================
    function updateClock(){
        const now = new Date();
        let h=now.getHours(), m=now.getMinutes(), s=now.getSeconds();
        h=h<10?"0"+h:h; m=m<10?"0"+m:m; s=s<10?"0"+s:s;
        document.getElementById("clock").innerText = `${h}:${m}:${s}`;
    }
    setInterval(updateClock,1000);
    updateClock();

    // ================= ЛАЙФХАКИ =================
    const hacks = [
    "🧠 Формулюй prompt максимально конкретно (стиль, колір, фон).",
    "🎨 Додавай стиль художника або напрям (oil painting, cyberpunk).",
    "📐 Вказуй пропорції зображення (square, wide, portrait).",
    "🔄 Генеруй кілька варіантів одного prompt.",
    "✏️ Починай з простого опису, потім ускладнюй.",
    "🚫 Уникай суперечливих слів у prompt."
];
    let currentHack = 0;
    function showHack(){ 
        document.getElementById("hackText").textContent = hacks[currentHack];
        document.getElementById("hackCounter").textContent = `Лайфхак ${currentHack+1} з ${hacks.length}`;
    }
    window.nextHack = function(){ currentHack = (currentHack + 1) % hacks.length; showHack(); }
    window.prevHack = function(){ currentHack = (currentHack - 1 + hacks.length) % hacks.length; showHack(); }
    showHack();

    // ================= ТЕМА =================
    const btn = document.getElementById("themeToggle");
    if(localStorage.getItem("theme")==="dark"){ document.body.classList.add("dark"); btn.innerText="☀️ Світла тема"; }
    btn.onclick = ()=>{
        document.body.classList.toggle("dark");
        if(document.body.classList.contains("dark")){
            localStorage.setItem("theme","dark");
            btn.innerText="☀️ Світла тема";
        } else {
            localStorage.setItem("theme","light");
            btn.innerText="🌙 Темна тема";
        }
    }

    // ================= ПОПАП =================
    const popup=document.getElementById('popup');
    const closeBtn=document.getElementById('closePopup');
    const openBtn=document.getElementById('openPopup');
    if(openBtn && popup && closeBtn){
        openBtn.onclick = ()=> popup.classList.add('show');
        closeBtn.onclick = ()=> popup.classList.remove('show');
        window.onclick = (e)=> { if(e.target===popup) popup.classList.remove('show'); }
    }

    // ================= РЕЙТИНГ ЗІРОК =================
    const stars=document.querySelectorAll('.star-rating span');
    const ratingValue=document.getElementById('rating-value');
    let selectedRating=0;
    stars.forEach(star=>{
        const val=parseInt(star.dataset.value);
        star.addEventListener('mouseover',()=>highlightStars(val,'hover'));
        star.addEventListener('mouseout',()=>highlightStars(selectedRating,'selected'));
        star.addEventListener('click',()=>{
            selectedRating=val;
            ratingValue.innerText = selectedRating;
            highlightStars(selectedRating,'selected');
        });
    });
    function highlightStars(rating,cls){
        stars.forEach(star=>{
            const val=parseInt(star.dataset.value);
            if(val<=rating) star.classList.add(cls);
            else star.classList.remove(cls);
        });
    }

});
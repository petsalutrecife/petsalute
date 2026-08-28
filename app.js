/* ==========================================================================
   PET SALUTE - INTERATIVIDADE (ESTILO PET SAUDÁVEL)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. CALCULADORA NUTRICIONAL INTERATIVA
  const speciesBtns = document.querySelectorAll('.pet-species-btn');
  const ageBtns = document.querySelectorAll('.pet-age-btn');
  const activityBtns = document.querySelectorAll('.pet-act-btn');
  const weightRange = document.getElementById('pet-weight-range');
  const weightDisplayVal = document.getElementById('weight-display-val');

  const gramsResult = document.getElementById('calc-grams-result');
  const mealsSplit = document.getElementById('calc-meals-split');
  const whatsappCta = document.getElementById('calc-whatsapp-btn');

  let calcState = {
    species: 'dog',
    age: 'adult',
    weight: 10,
    activity: 'moderate'
  };

  const ageLabels = {
    puppy: 'Filhote',
    adult: 'Adulto',
    senior: 'Idoso'
  };

  const activityLabels = {
    low: 'Calmo',
    moderate: 'Moderado',
    high: 'Atleta'
  };

  function updateCalculation() {
    let basePercent = 0.035; // 3.5% para cão adulto padrão

    if (calcState.species === 'cat') {
      basePercent = 0.05; // 5% para felinos
    }

    // Fator de Idade
    let ageFactor = 1.0;
    if (calcState.age === 'puppy') ageFactor = 1.40; // Maior demanda energética para crescimento
    if (calcState.age === 'senior') ageFactor = 0.88; // Menor gasto basal sênior

    // Fator de Atividade
    let activityFactor = 1.0;
    if (calcState.activity === 'low') activityFactor = 0.88;
    if (calcState.activity === 'high') activityFactor = 1.22;

    const gramsPerDay = Math.round(calcState.weight * basePercent * ageFactor * activityFactor * 1000);

    // Divisão de Refeições
    let mealCount = 2;
    if (calcState.age === 'puppy') {
      mealCount = calcState.species === 'cat' ? 4 : 3;
    } else if (calcState.species === 'cat') {
      mealCount = 3;
    }

    const gramsPerMeal = Math.round(gramsPerDay / mealCount);

    if (gramsResult) {
      gramsResult.innerHTML = `${gramsPerDay} <span>g / dia</span>`;
    }

    if (mealsSplit) {
      mealsSplit.textContent = `Dividir em ${mealCount} refeições diárias de aprox. ${gramsPerMeal}g cada.`;
    }

    if (whatsappCta) {
      const petType = calcState.species === 'dog' ? 'Cão' : 'Gato';
      const ageText = ageLabels[calcState.age] || 'Adulto';
      const actText = activityLabels[calcState.activity] || 'Moderado';
      const msg = `Olá Pet Salute! Calculei a porção no site para meu ${petType} (${ageText}, ${calcState.weight}kg, nível de atividade: ${actText}). A porção recomendada foi de ${gramsPerDay}g/dia (${mealCount}x de ${gramsPerMeal}g). Gostaria de receber mais informações e montar o cardápio natural!`;
      whatsappCta.href = `https://wa.me/5581971000611?text=${encodeURIComponent(msg)}`;
    }
  }

  // Event Listeners Espécie
  speciesBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      speciesBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calcState.species = btn.getAttribute('data-sp');

      if (calcState.species === 'cat' && calcState.weight > 15) {
        calcState.weight = 5;
        weightRange.max = "15";
        weightRange.value = "5";
        if (weightDisplayVal) weightDisplayVal.textContent = "5 kg";
      } else if (calcState.species === 'dog') {
        weightRange.max = "60";
      }

      updateCalculation();
    });
  });

  // Event Listeners Idade
  ageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      ageBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calcState.age = btn.getAttribute('data-age');
      updateCalculation();
    });
  });

  // Event Listeners Atividade
  activityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activityBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calcState.activity = btn.getAttribute('data-act');
      updateCalculation();
    });
  });

  // Slider de Peso
  weightRange?.addEventListener('input', (e) => {
    calcState.weight = parseFloat(e.target.value);
    if (weightDisplayVal) weightDisplayVal.textContent = `${calcState.weight} kg`;
    updateCalculation();
  });

  // Executa cálculo inicial
  updateCalculation();

  // 2. FAQ ACORDEÃO
  const faqItems = document.querySelectorAll('.faq-card-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-card-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // 3. MENU MOBILE DRAWER
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const navLinks = document.querySelector('.nav-links');

  mobileToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('mobile-open');
    const icon = mobileToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  });

  // Fechar menu mobile ao clicar em um link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('mobile-open');
      const icon = mobileToggle?.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    });
  });
});

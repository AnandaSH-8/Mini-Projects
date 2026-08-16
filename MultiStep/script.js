let currentStep = 1;

let billingPeriod = "monthly";

let selectedPlan = null;

let selectedAddons = [];

const stepContents = document.querySelectorAll(".step-content");

const stepItems = document.querySelectorAll(".step-item");

const thankYou = document.getElementById("thank-you");

const nextButton = document.getElementById("next-button");

const backButton = document.getElementById("back-button");

function showStep(step) {
  currentStep = step;

  stepContents.forEach((content) => {
    content.classList.remove("active");
  });

  const selectedStep = document.getElementById(`step-${step}`);

  if (selectedStep) {
    selectedStep.classList.add("active");
  }

  stepItems.forEach((item) => {
    const itemStep = Number(item.dataset.step);

    item.classList.toggle("active", itemStep === step);
  });

    if (step > 1)
      document.getElementsByClassName("navigation")[0].style.flexDirection =
        "row-reverse";
    else
      document.getElementsByClassName("navigation")[0].style.flexDirection =
        "row";

  if (step === 4) {
    updateSummary();

    nextButton.style.display = "block";
    nextButton.textContent = "Confirm";

    backButton.style.display = "block";
  } else {
    nextButton.style.display = "block";
    nextButton.textContent = "Next step";

    backButton.style.display = step === 1 ? "none" : "block";
  }
}

function validatePersonalInfo() {
  const userName = document.getElementById("userName");

  const email = document.getElementById("email");

  const phone = document.getElementById("phone");

  let valid = true;

  if (!userName.value.trim()) {
    userName.closest(".form-group").classList.add("has-error");

    valid = false;
  } else {
    userName.closest(".form-group").classList.remove("has-error");
  }

  const emailValue = email.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValue || !emailRegex.test(emailValue)) {
    email.closest(".form-group").classList.add("has-error");

    valid = false;
  } else {
    email.closest(".form-group").classList.remove("has-error");
  }

  if (!phone.value.trim() || isNaN(Number(phone.value))) {
    phone.closest(".form-group").classList.add("has-error");

    valid = false;
  } else {
    phone.closest(".form-group").classList.remove("has-error");
  }

  return valid;
}

document.getElementById("userName").addEventListener("input", function () {
  if (this.value.trim()) {
    this.closest(".form-group").classList.remove("has-error");
  }
});

document.getElementById("email").addEventListener("input", function () {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(this.value.trim())) {
    this.closest(".form-group").classList.remove("has-error");
  }
});

document.getElementById("phone").addEventListener("input", function () {
  if (this.value.trim()) {
    this.closest(".form-group").classList.remove("has-error");
  }
});

nextButton.addEventListener("click", function () {
  if (currentStep === 1) {
    if (!validatePersonalInfo()) {
      return;
    }

    showStep(2);

    return;
  }

  if (currentStep === 2) {
    if (!selectedPlan) {
      document.getElementById("plan-error").classList.add("show");

      return;
    }

    showStep(3);

    return;
  }

  if (currentStep === 3) {
    showStep(4);

    return;
  }

  if (currentStep === 4) {
    document.getElementById("step-4").classList.remove("active");

    document.querySelector(".form-container").classList.add("completed");

    document.querySelector(".sidebar").style.display = "block";

    document.querySelector(".navigation").style.display = "none";

    thankYou.classList.add("active");

    return;
  }
});

const planCards = document.querySelectorAll(".plan_card");

planCards.forEach((card) => {
  card.addEventListener("click", function () {
    planCards.forEach((item) => {
      item.classList.remove("selected");
    });

    this.classList.add("selected");

    selectedPlan = {
      name: this.dataset.plan,

      monthly: Number(this.dataset.monthly),

      yearly: Number(this.dataset.yearly),
    };

    document.getElementById("plan-error").classList.remove("show");
  });
});

const billingToggle = document.getElementById("billing-toggle-button");

billingToggle.addEventListener("click", function () {
  if (billingPeriod === "monthly") {
    billingPeriod = "yearly";

    this.classList.add("yearly");
  } else {
    billingPeriod = "monthly";

    this.classList.remove("yearly");
  }

  updatePlanPrices();

  updateAddonPrices();
});

function updatePlanPrices() {
  planCards.forEach((card) => {
    const price =
      billingPeriod === "monthly" ? card.dataset.monthly : card.dataset.yearly;

    const suffix = billingPeriod === "monthly" ? "/mo" : "/yr";

    card.querySelector(".plan-price").textContent = `$${price}${suffix}`;
  });
}

function updateAddonPrices() {
  const addonCards = document.querySelectorAll(".addon_card");

  addonCards.forEach((card) => {
    const price =
      billingPeriod === "monthly" ? card.dataset.monthly : card.dataset.yearly;

    const suffix = billingPeriod === "monthly" ? "/mo" : "/yr";

    card.querySelector(".addon-price").textContent = `+$${price}${suffix}`;
  });
}

const addonCards = document.querySelectorAll(".addon_card");

addonCards.forEach((card) => {
  const checkbox = card.querySelector('input[type="checkbox"]');

  checkbox.addEventListener("change", function () {
    const addonName = card.dataset.addon;

    const existingIndex = selectedAddons.findIndex(
      (addon) => addon.name === addonName,
    );

    if (this.checked) {
      if (existingIndex === -1) {
        selectedAddons.push({
          name: addonName,

          monthly: Number(card.dataset.monthly),

          yearly: Number(card.dataset.yearly),
        });
      }

      card.classList.add("selected");
    } else {
      if (existingIndex !== -1) {
        selectedAddons.splice(existingIndex, 1);
      }

      card.classList.remove("selected");
    }
  });
});

backButton.addEventListener("click", function () {
  if (currentStep > 1) {
    showStep(currentStep - 1);
  }
});

document.getElementById("change-plan").addEventListener("click", function () {
  showStep(2);
});

function updateSummary() {
  if (!selectedPlan) {
    return;
  }

  const billingText = billingPeriod === "monthly" ? "Monthly" : "Yearly";

  document.getElementById("summary-plan-name").textContent =
    `${selectedPlan.name} (${billingText})`;

  const planPrice =
    billingPeriod === "monthly" ? selectedPlan.monthly : selectedPlan.yearly;

  const suffix = billingPeriod === "monthly" ? "/mo" : "/yr";

  document.getElementById("summary-plan-price").textContent =
    `$${planPrice}${suffix}`;

  const summaryAddons = document.getElementById("summary-addons");

  summaryAddons.innerHTML = "";

  let addonTotal = 0;

  selectedAddons.forEach((addon) => {
    const price = billingPeriod === "monthly" ? addon.monthly : addon.yearly;

    addonTotal += price;

    const addonElement = document.createElement("div");

    addonElement.className = "summary-addon";

    addonElement.innerHTML = `
      <span>${addon.name}</span>
      <span>+$${price}${suffix}</span>
    `;

    summaryAddons.appendChild(addonElement);
  });

  const total = planPrice + addonTotal;

  document.getElementById("summary-total-price").textContent =
    `$${total}${suffix}`;

  document.getElementById("summary-total-label").textContent =
    billingPeriod === "monthly" ? "Total (per month)" : "Total (per year)";
}

showStep(1);

updatePlanPrices();

updateAddonPrices();

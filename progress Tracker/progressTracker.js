let CurrentStep = 1;
const TotalStep = 4;

// display next form
function nextStep() {
  if (CurrentStep < TotalStep) {
    document.getElementById(`step-${CurrentStep}`).classList.add("d-none");
    CurrentStep++;
    document.getElementById(`step-${CurrentStep}`).classList.remove("d-none");
  }
}

// display previous form
function prevStep() {
  // display previous form
  if (CurrentStep > 1) {
    document.getElementById(`step-${CurrentStep}`).classList.add("d-none");
    CurrentStep--;
    document.getElementById(`step-${CurrentStep}`).classList.remove("d-none");
  }
}

// creating dynamic forms
document.getElementById("no_of_people").addEventListener("input", function () {
  const no_of_fields = document.getElementById("no_of_people");
  const container = document.getElementById("detailForms");
  container.innerHTML = "";

  for (let i = 0; i < no_of_fields.value; i++) {
    const inputDiv = document.createElement("input");
    inputDiv.classList.add(
      "form-control",
      "mt-2",
      "col-12",
      "col-md-6",
      "step"
    );
    inputDiv.type = "text";
    inputDiv.id = `companion-${i + 1}`;
    inputDiv.name = `companion-${i + 1}`;
    inputDiv.placeholder = `Name of companion ${i + 1}`;

    container.appendChild(inputDiv);
  }
});

// progress bar
const steps = document.querySelectorAll(".step");
let totalSteps = steps.length;
let completedSteps = 0;

steps.forEach((step, index) => {
  const CheckList = document.createElement("li");
  CheckList.classList.add("list-group-item", "mt-1");
  CheckList.textContent = `Step ${index + 1}: ${step.placeholder || step.id}`;
  document.getElementById("checklist").appendChild(CheckList);

  step.addEventListener("input", () => {
    completedSteps = [...steps].filter((input) => input.value !== "").length;
    updateProgress();
  });
});

function updateProgress() {
  // update the progress bar
  const progress = Math.round((completedSteps / totalSteps) * 100);
  document.getElementById("progress-bar").style.width = `${progress}%`;
  document
    .getElementById("progress-bar")
    .setAttribute("aria-valuenow", progress);
  //update the checklist
  const checkListItem = document.querySelectorAll("#checklist.list-group-item");
  checkListItem.forEach((Item, index) => {
    if (index < completedSteps) {
      Item.classList.add("list-group-item-success");
    } else {
      Item.classList.remove("list-group-item-success");
    }
  });
}
// initialize the update progress bar
updateProgress();

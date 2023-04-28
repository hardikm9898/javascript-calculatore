const button = document.querySelectorAll(".btn");
const display = document.querySelector(".display");
const trigno = document.querySelectorAll(".trigno");
const display2 = document.querySelector(".display2");
const memoryElement = document.querySelectorAll(".memory");

const operator = ["+", "-", "*", "/"];



// calculation function
const calculatFactorial = (n) => {
  let answer = 1;
  if (n > 1) {
    for (let i = n; i >= 1; i -= 1) {
      answer *= i;
    }
  } else if (n === 0 || n === 1) {
    answer = 1;
  } else {
    return "please pass posotive Number in factorial";
  }
  return answer;
};


let memoryArray = [];
// select button

button.forEach((btn) =>
  btn.addEventListener("click", () => {
    const buttonValue = btn.value;


    let displayText = display.innerHTML;

    const factorialIndex = displayText.indexOf("!");
    const rightIndex = displayText.slice(0, factorialIndex + 1);
    switch (buttonValue) {
      case "=":
        displayText = displayText.replaceAll("sin(", "Math.sin(Math.PI/180*");
        displayText = displayText.replaceAll("cos(", "Math.cos(Math.PI/180*");
        displayText = displayText.replaceAll("tan(", "Math.tan(Math.PI/180*");
        displayText = displayText.replaceAll("sin<sup>-1</sup>", "Math.asin");
        displayText = displayText.replaceAll("cos<sup>-1</sup>", "Math.acos");
        displayText = displayText.replaceAll("tan<sup>-1</sup>", "Math.atan");
        displayText = displayText.replaceAll("<sup>-1</sup>", "**-1");
        displayText = displayText.replaceAll("log<sub>10</sub>", "Math.log10");
        displayText = displayText.replaceAll("log<sub>e</sub>", "Math.log");
        displayText = displayText.replaceAll("e", "Math.E");
        displayText = displayText.replaceAll("^", "**");
        displayText = displayText.replaceAll("fact(", `calculatFactorial(`);

        displayText = displayText.replaceAll("π", `Math.PI`);

        displayText = displayText.replaceAll("√", "Math.sqrt");

        for (let i = rightIndex.length - 1; i >= 0; i -= 1) {
          if (operator.includes(rightIndex.charAt(i))) {
            const indexLeft = rightIndex.indexOf(rightIndex.charAt(i));
            const answerValue = rightIndex.slice(
              indexLeft + 1,
              rightIndex.length + 1
            );
            const value = rightIndex.slice(
              indexLeft + 1,
              rightIndex.length - 1
            );
          
  
            displayText = displayText.replaceAll(
              answerValue,
              `${calculatFactorial(value)}`
            );

          }
        }


        display2.innerHTML = display.innerHTML;
        try {
          display.textContent = `=${this.eval(displayText).toFixed(2)}`;
        } catch (error) {
       
          display.textContent = "error";
        }

        break;

      case "backspace":
        display.textContent = display.textContent.slice(
          0,
          display.textContent.length - 1
        );

        break;

      case "AC":
        display2.textContent = "";
        display.innerHTML = "";
        break;
      case "2nd":
        if (trigno[0].textContent === "sin") {
          const converArray = [
            "sin<sup>-1</sup>",
            "cos<sup>-1</sup>",
            "tan<sup>-1</sup>",
          ];
          const signValue = [
            "sin<sup>-1</sup>(",
            "cos<sup>-1</sup>(",
            "tan<sup>-1</sup>(",
          ];
          for (let index = 0; index < trigno.length; index += 1) {
            trigno[index].innerHTML = converArray[index];
            trigno[index].value = signValue[index];
          }
        } else {
          const converArray = ["sin", "cos", "tan"];
          const signValue = ["sin(", "cos(", "tan("];
          for (let index = 0; index < trigno.length; index += 1) {
            trigno[index].textContent = converArray[index];
            trigno[index].value = signValue[index];
          }
        }
        break;
      case "m":
        if (memoryElement[0].textContent === "xy") {
          const converArray = ["MS", "MC", "MR", "M+", "M-"];
          for (let index = 0; index < memoryElement.length; index += 1) {
            memoryElement[index].textContent = converArray[index];
            memoryElement[index].value = converArray[index];
          }
        } else {
          const converArray = ["x<sup>y</sup>", "√x", "x!", "1/x", "π"];
          const signValue = ["^", "√(", "fact(", "<sup>-1</sup>", "π"];
          for (let index = 0; index < memoryElement.length; index += 1) {
            memoryElement[index].innerHTML = converArray[index];
            memoryElement[index].value = signValue[index];
          }
        }

        break;
      case "MR":
        {
          const recallMemory = memoryArray.reduce((acc, x) => {
            let memoryHandel = acc;
            memoryHandel += Number(x);
            return memoryHandel;
          }, 0);
          if (
            display.textContent.includes(operator) ||
            display.textContent.includes("=")
          ) {
            if (display.textContent.indexOf("=") !== -1) {
              const NotPresentEqual = display.textContent.slice(
                1,
                display.textContent.length - 1
              );
              display.textContent = `${NotPresentEqual}+${recallMemory}`;
            } else {
              display.textContent += recallMemory;
            }
          } else {
            display.textContent += `${recallMemory}`;
          }
        }
        break;
      case "M+":
        if (display.textContent.includes("=")) {
          memoryArray.push(
            this.eval(
              `+${display.textContent.slice(1, display.textContent.length - 1)}`
            )
          );
        } else {
          memoryArray.push(this.eval(display.textContent));
        }

        break;
      case "M-":
        if (display.textContent.includes("=")) {
          memoryArray.push(
            `-${display.textContent.slice(1, display.textContent.length - 1)}`
          );
        } else {
          memoryArray.push(this.eval(display.textContent));
        }

        break;

      case "MC":
        memoryArray = [];

        break;
      default:
        if (display.textContent.includes("=")) {
          if (operator.includes(buttonValue)) {
            display.textContent = display.textContent.replaceAll("=", "");
            display2.innerHTML = display.textContent;
          } else {
            display2.innerHTML = display.textContent.replace("=", "");
            display.textContent = "";
          }
        }
        display.innerHTML += btn.value;
    }
  })
);

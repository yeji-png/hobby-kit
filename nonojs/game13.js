const container = document.querySelector(".container");
const thumbnail = document.querySelector(".thumbnail");
let size = 30;
const color = document.querySelector(".color");

let draw = false;

const settingButton = document.querySelector(".setting-btn");
const brushBoard = document.querySelector(".brush-board");

const brushButton = document.querySelector(".brush-btn");
const xButton = document.querySelector(".x-btn");

let curBrush = "O";

settingButton.addEventListener("click", function () {
  // brushBoard 요소가 보이는지 여부를 확인하여 클래스를 토글합니다.
  brushBoard.classList.toggle("visible");
});

xButton.addEventListener("click", function () {
  curBrush = "X";
});

brushButton.addEventListener("click", function () {
  curBrush = "O";
});
// 가로줄(-) 개수
const ROW_SIZE = 48;

// 세로줄(|) 개수
const COL_SIZE = 30;

// 비어있으면 0 , 칠해져있으면 1, X면 -1
const pixelMap = new Array(ROW_SIZE).fill(1).map((_) => {
  return new Array(COL_SIZE).fill(0);
});

/*************************************** */

const col_clues = [
  [21, 17],
  [20, 18],
  [19, 5, 2, 2],
  [18, 2, 3, 1, 2],
  [17, 2, 4, 1, 2],
  [2, 2, 2, 1, 1, 2],
  [2, 2, 4, 1, 1, 2],
  [2, 5, 3, 8],
  [13, 4, 1, 3, 8],
  [12, 3, 1, 3, 1, 2],
  [2, 1, 3, 1, 2],
  [4, 2, 6, 3],
  [6, 2, 2, 4, 4],
  [23, 1, 5, 4],
  [13, 3, 2, 2],
  [6, 7, 2, 2],
  [10, 6, 11, 2],
  [1, 6, 2, 2, 4, 2],
  [1, 6, 4, 4, 9],
  [1, 6, 3, 17],
  [1, 6, 3, 1, 17],
  [1, 3, 1, 1, 6, 2, 1, 3, 1, 1],
  [1, 1, 1, 11, 3, 3, 2, 1],
  [1, 1, 1, 1, 11, 1, 3, 7],
  [4, 1, 1, 6, 1, 1, 3, 9],
  [1, 1, 1, 4, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 1],
  [1, 3, 1, 1, 18],
  [1, 18],
  [10, 1],
];

const row_clues = [
  [5, 2, 1, 1, 1, 3, 1, 1],
  [5, 2, 1, 1, 1, 1, 1, 1],
  [5, 2, 1, 1, 1, 2, 1, 1],
  [5, 2, 1, 1, 1, 1, 1, 1],
  [5, 2, 1, 1, 1, 1, 1],

  [5, 2, 1, 1, 1, 1, 1],
  [5, 2, 1, 1, 1, 3, 1, 1],
  [5, 2, 1, 1, 1],
  [5, 2, 1, 1, 1],
  [5, 2, 1, 14],

  [5, 2, 1],
  [5, 2, 13],
  [5, 2, 15],
  [5, 2, 15],
  [7, 15],

  [6, 15],
  [5, 13],
  [4, 2, 2],
  [3, 2, 2],
  [2, 2, 2],

  [1, 2, 2],
  [21],
  [15, 2],
  [4, 3, 3, 1, 1, 2],
  [4, 2, 4, 2, 3],

  [2, 1, 1, 3, 1, 1, 3],
  [2, 6, 3, 1, 3, 2],
  [2, 2, 1, 4, 1, 3, 2],
  [2, 3, 4, 3, 3, 3],
  [5, 8, 7, 2, 2],

  [5, 15, 1, 2],
  [21, 3, 2],
  [2, 2, 3, 2],
  [3, 4, 2, 2],
  [21, 2, 2],

  [2, 2, 19],
  [2, 2, 4, 3, 2, 2],
  [2, 4, 2, 3, 2, 2],
  [2, 3, 3, 2],
  [2, 3, 3],

  [2, 4, 3],
  [2, 2, 2, 3],
  [2, 2, 2],
  [4, 2],
  [3, 2],
  [2, 2],
  [],
  [],
];

const solution = [
  [
    1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1,
    1, -1, 1, 1, 1, -1, 1, -1, 1,
  ],
  [
    1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1,
    -1, 1, -1, 1, -1, 1, -1, -1, 1,
  ],
  [
    1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1,
    1, -1, 1, 1, -1, -1, 1, -1, 1,
  ],
  [
    1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1,
    1, -1, -1, 1, -1, -1, 1, -1, 1,
  ],
  [
    1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1,
    1, -1, -1, -1, -1, -1, 1, -1, 1,
  ],
  [
    1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1,
    -1, 1, -1, -1, -1, 1, -1, -1, 1,
  ],
  [
    1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1,
    1, -1, 1, 1, 1, -1, 1, -1, 1,
  ],
  [
    1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, 1,
  ],
  [
    1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, 1,
  ],
  [
    1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1,
  ],
  [
    1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, -1, -1, -1, -1, -1,
  ],
  [
    1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, -1, -1, -1, -1,
  ],
  [
    1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, -1, -1, -1, -1,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, -1, -1, -1, -1,
  ],
  [
    1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, -1, -1, -1, -1,
  ],
  [
    1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, -1, -1, -1, -1, -1,
  ],
  [
    1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, 1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, 1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, 1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, 1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1,
    -1, -1, -1, -1, 1, 1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, -1, 1, 1, 1,
    -1, 1, -1, 1, -1, -1, 1, 1, -1,
  ],
  [
    -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, -1,
    -1, 1, 1, -1, -1, 1, 1, 1, -1,
  ],
  [
    -1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1, 1, -1, -1, -1,
    -1, 1, -1, 1, -1, 1, 1, 1, -1,
  ],
  [
    -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1, -1, 1,
    -1, 1, 1, 1, -1, 1, 1, -1,
  ],
  [
    -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, -1, 1, -1, 1, 1, 1, 1, -1, -1, -1, 1,
    -1, 1, 1, 1, -1, -1, 1, 1, -1,
  ],
  [
    -1, 1, 1, -1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1, -1, 1, 1, 1, -1, -1, 1,
    1, 1, -1, -1, 1, 1, 1, -1,
  ],
  [
    1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,
    1, 1, -1, 1, 1, -1,
  ],
  [
    1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1,
    1, -1, -1, 1, 1, -1,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1,
    -1, -1, 1, 1, -1,
  ],
  [
    1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1,
    1, -1, 1, 1, 1, -1, -1, 1, 1, -1,
  ],
  [
    1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1,
    1, 1, -1, 1, 1, -1, -1, 1, 1, -1,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1,
    -1, -1, 1, 1, -1,
  ],
  [
    1, 1, -1, -1, -1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1,
  ],
  [
    1, 1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, -1,
    -1, 1, 1, -1, -1, 1, 1, -1,
  ],
  [
    1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, -1, 1, 1, 1, -1,
    -1, 1, 1, -1, -1, 1, 1, -1,
  ],
  [
    1, 1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1, 1, 1, -1,
  ],
  [
    1, 1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    1, 1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    1, 1, -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    1, 1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1,
    1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1,
    1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1,
    1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1,
    1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
];

// 완료 처리
function handleSolve() {
  // 이미지가 완료되었음을 나타내는 팝업 표시
  showPopupWithImage(
    "night self-study",
    '<img src="../nonogram/13.PNG" alt="Completed Image" class="popup-image" />'
  );
}

// 팝업을 표시하는 함수 (이미지와 함께)
function showPopupWithImage(title, imageHTML) {
  var overlaysolve = document.getElementById("overlaysolve");
  var popupsolve = document.getElementById("popupsolve");
  var popupTitlesolve = document.querySelector(".popupcontentsolve");
  var popupContentsolve = document.querySelector(".popupcontentsolve");

  // 제목과 이미지를 설정
  popupTitlesolve.innerHTML = "<h1>" + title + "</h1>";
  popupContentsolve.innerHTML = popupTitlesolve.innerHTML + imageHTML;

  // 팝업과 오버레이를 보이게 함
  overlaysolve.style.display = "block";
  popupsolve.style.display = "block";

  // 팝업 닫기 이벤트 설정
  var closePopupsolve = document.getElementById("popupclosesolve");
  closePopupsolve.onclick = function () {
    overlaysolve.style.display = "none";
    popupsolve.style.display = "none";
  };
}

/*************************************** */

function applyHint() {
  function fixWrong(rows, cols, solution) {
    for (let i = 0; i < rows.length; ++i) {
      let wrongs = [];
      for (let j = 0; j < rows[i].length; ++j) {
        if (
          (rows[i][j] === 1 && solution[i][j] === -1) ||
          (rows[i][j] === -1 && solution[i][j] === 1)
        )
          wrongs.push(j);
      }
      if (wrongs.length > 0) {
        wrongs.forEach((j) => {
          rows[i][j] = solution[i][j];
        });
        return "row";
      }
    }

    for (let i = 0; i < cols.length; ++i) {
      let wrongs = [];
      for (let j = 0; j < cols[i].length; ++j) {
        if (
          (cols[i][j] === 1 && solution[j][i] === -1) ||
          (cols[i][j] === -1 && solution[j][i] === 1)
        )
          wrongs.push(j);
      }
      if (wrongs.length > 0) {
        wrongs.forEach((j) => {
          cols[i][j] = solution[j][i];
        });
        return "col";
      }
    }
    return false;
  }

  function simpleBox(rows, cols, clueRow, clueCol) {
    if (rows.length >= 20) return false;
    function simpleBoxForLine(line, clueLine) {
      const candidates = [];
      function checkPossibility(length, start) {
        for (let i = start; i < start + length; ++i) {
          if (i >= line.length) return false;
          if (line[i] === -1) return false;
        }
        return true;
      }
      function simpleBoxRecursion(start, clueIndex, curCandidate) {
        if (clueIndex === clueLine.length) {
          candidates.push(curCandidate);
          return;
        }

        const clue = clueLine[clueIndex];

        for (let i = start; i < line.length; ++i) {
          const possibility = checkPossibility(clue, i);

          if (possibility) {
            const candidate = curCandidate.slice();
            for (let j = i; j < i + clue; ++j) candidate[j] = clueIndex + 1;
            simpleBoxRecursion(i + clue, clueIndex + 1, candidate);
          }
        }
      }
      const clueSum = clueLine.reduce((acc, cur) => acc + cur, 0);
      for (let i = 0; i <= line.length - (clueSum + clueLine.length - 1); ++i) {
        const arr = new Array(line.length).fill(0);
        simpleBoxRecursion(i, 0, arr);
      }
      const lineWithSimpleBoxes = candidates[0];

      for (let i = 1; i < candidates.length; ++i) {
        const candidate = candidates[i];
        for (let j = 0; j < candidate.length; ++j) {
          if (candidate[j] != lineWithSimpleBoxes[j])
            lineWithSimpleBoxes[j] = 0;
        }
      }
      console.log("candidate", candidates);
      // 칠할 수 있는 부분들 return
      const result = lineWithSimpleBoxes.map((l) => (l != 0 ? 1 : 0));
      let flag = false;

      for (let i = 0; i < result.length; ++i)
        if (result[i] == 1 && line[i] != 1) flag = true;

      if (flag) return result;
      else return result.map(() => 0);
    }

    for (let i = 0; i < rows.length; ++i) {
      const result = simpleBoxForLine(rows[i], clueRow[i]);
      let flag = false;
      for (let j = 0; j < result.length; ++j) {
        if (result[j] == 1 && pixelMap[i][j] != 1) {
          flag = true;
          rows[i][j] = result[j];
        }
      }
      if (flag) return "row";
    }

    for (let i = 0; i < cols.length; ++i) {
      const result = simpleBoxForLine(cols[i], clueCol[i]);
      let flag = false;
      for (let j = 0; j < result.length; ++j) {
        if (result[j] == 1) {
          flag = true;
          cols[i][j] = result[j];
        }
      }
      if (flag) return "col";
    }

    return false;
  }

  function getDirectHint(solution, rows, cols) {
    let flag = false;

    for (let i = 0; i < rows.length; ++i) {
      for (let j = 0; j < rows[i].length; ++j) {
        if (solution[i][j] == 1 && rows[i][j] == 0) {
          flag = true;
          for (
            let k = 0;
            j + k < solution[i].length && solution[i][j + k] == 1;
            ++k
          ) {
            rows[i][j + k] = 1;
          }
        }
        if (flag) break;
      }
      if (flag) break;
    }
    if (flag) return "row";

    for (let i = 0; i < cols.length; ++i) {
      for (let j = 0; j < cols[i].length; ++j) {
        if (solution[j][i] == 1 && cols[i][j] == 0) {
          flag = true;
          for (
            let k = 0;
            j + k < solution.length && solution[j + k][i] == 1;
            ++k
          ) {
            cols[i][j + k] = 1;
          }
        }
        if (flag) break;
      }
      if (flag) break;
    }
    if (flag) return "col";
    return false;
  }

  const rows = pixelMap.map((row) => row.slice());
  const cols = [];
  for (let i = 0; i < pixelMap[0].length; ++i) {
    cols.push(new Array());
    for (let j = 0; j < pixelMap.length; ++j) {
      cols[i].push(pixelMap[j][i]);
    }
  }

  const wrongFlag = fixWrong(rows, cols, solution);
  if (wrongFlag) {
    if (wrongFlag == "row") {
      for (let i = 0; i < ROW_SIZE; ++i) {
        for (let j = 0; j < COL_SIZE; ++j) {
          if (pixelMap[i][j] == rows[i][j]) continue;

          pixelMap[i][j] = rows[i][j];
          const div = document.querySelector(".row" + i + "col" + j);
          const thumbnailDiv = document.querySelector(
            ".thumbnail-row" + i + "col" + j
          );

          if (pixelMap[i][j] == 1) {
            div.classList.remove("x");
            div.classList.add("active");
            div.classList.add("transparent");

            div.style.backgroundColor = "black";
            let currentOpacity = Math.random() / 2;
            div.style.opacity = Math.min(currentOpacity, 1);

            thumbnailDiv.classList.add("active");
            thumbnailDiv.classList.add("transparent");
            thumbnailDiv.style.backgroundColor = "black";
            currentOpacity = Math.random() / 2;

            thumbnailDiv.style.opacity = Math.min(currentOpacity, 1);
          } else if (pixelMap[i][j] == -1) {
            div.classList.remove("active");
            div.classList.remove("transparent");
            div.style.backgroundColor = "white";
            div.style.opacity = 1;
            div.classList.add("x");

            thumbnailDiv.style.backgroundColor = "white";
            thumbnailDiv.style.opacity = 1;
            thumbnailDiv.classList.remove("active");
            thumbnail.classList.remove("transparent");
          }
        }
      }
    } else if (wrongFlag == "col") {
      for (let i = 0; i < COL_SIZE; ++i) {
        for (let j = 0; j < ROW_SIZE; ++j) {
          if (pixelMap[j][i] == cols[i][j]) continue;

          pixelMap[j][i] = cols[i][j];
          const div = document.querySelector(".row" + j + "col" + i);
          const thumbnailDiv = document.querySelector(
            ".thumbnail-row" + j + "col" + i
          );

          if (pixelMap[j][i] == 1) {
            div.classList.remove("x");
            div.classList.add("active");
            div.classList.add("transparent");

            div.style.backgroundColor = "black";
            let currentOpacity = Math.random() / 2;
            div.style.opacity = Math.min(currentOpacity, 1);

            thumbnailDiv.classList.add("active");
            thumbnailDiv.classList.add("transparent");
            thumbnailDiv.style.backgroundColor = "black";
            currentOpacity = Math.random() / 2;
            thumbnailDiv.style.opacity = Math.min(currentOpacity, 1);
          } else if (pixelMap[j][i] == -1) {
            div.classList.remove("active");
            div.classList.remove("transparent");
            div.style.backgroundColor = "white";
            div.style.opacity = 1;
            div.classList.add("x");

            thumbnailDiv.style.backgroundColor = "white";
            thumbnailDiv.style.opacity = 1;
            thumbnailDiv.classList.remove("active");
            thumbnail.classList.remove("transparent");
          }
        }
      }
    }

    return;
  }

  const simpleBoxFlag = simpleBox(rows, cols, row_clues, col_clues);
  console.log(simpleBoxFlag);
  console.log(simpleBoxFlag == "row" ? rows : cols);
  console.log(pixelMap);
  if (simpleBoxFlag) {
    if (simpleBoxFlag == "row") {
      for (let i = 0; i < ROW_SIZE; ++i) {
        for (let j = 0; j < COL_SIZE; ++j) {
          if (pixelMap[i][j] == rows[i][j]) continue;
          pixelMap[i][j] = rows[i][j];
          const div = document.querySelector(".row" + i + "col" + j);
          const thumbnailDiv = document.querySelector(
            ".thumbnail-row" + i + "col" + j
          );

          if (pixelMap[i][j] == 1) {
            div.classList.remove("x");
            div.classList.add("active");
            div.classList.add("transparent");

            div.style.backgroundColor = "black";
            let currentOpacity = Math.random() / 2;
            div.style.opacity = Math.min(currentOpacity, 1);

            thumbnailDiv.classList.add("active");
            thumbnailDiv.classList.add("transparent");
            thumbnailDiv.style.backgroundColor = "black";
            currentOpacity = Math.random() / 2;
            thumbnailDiv.style.opacity = Math.min(currentOpacity, 1);
          } else if (pixelMap[i][j] == -1) {
            div.classList.remove("active");
            div.classList.remove("transparent");
            div.style.backgroundColor = "white";
            div.style.opacity = 1;
            div.classList.add("x");

            thumbnailDiv.style.backgroundColor = "white";
            thumbnailDiv.style.opacity = 1;
            thumbnailDiv.classList.remove("active");
            thumbnail.classList.remove("transparent");
          }
        }
      }
    } else if (simpleBoxFlag == "col") {
      for (let i = 0; i < COL_SIZE; ++i) {
        for (let j = 0; j < ROW_SIZE; ++j) {
          if (pixelMap[j][i] == cols[i][j]) continue;

          pixelMap[j][i] = cols[i][j];
          const div = document.querySelector(".row" + j + "col" + i);
          const thumbnailDiv = document.querySelector(
            ".thumbnail-row" + j + "col" + i
          );

          if (pixelMap[j][i] == 1) {
            div.classList.remove("x");
            div.classList.add("active");
            div.classList.add("transparent");

            div.style.backgroundColor = "black";
            let currentOpacity = Math.random() / 2;
            div.style.opacity = Math.min(currentOpacity, 1);

            thumbnailDiv.classList.add("active");
            thumbnailDiv.classList.add("transparent");
            thumbnailDiv.style.backgroundColor = "black";
            currentOpacity = Math.random() / 2;
            thumbnailDiv.style.opacity = Math.min(currentOpacity, 1);
          } else if (pixelMap[j][i] == -1) {
            div.classList.remove("active");
            div.classList.remove("transparent");
            div.style.backgroundColor = "white";
            div.style.opacity = 1;
            div.classList.add("x");

            thumbnailDiv.style.backgroundColor = "white";
            thumbnailDiv.style.opacity = 1;
            thumbnailDiv.classList.remove("active");
            thumbnail.classList.remove("transparent");
          }
        }
      }
    }

    return;
  }

  const hint = getDirectHint(solution, rows, cols);
  if (hint == "row") {
    for (let i = 0; i < ROW_SIZE; ++i) {
      for (let j = 0; j < COL_SIZE; ++j) {
        if (pixelMap[i][j] == rows[i][j]) continue;

        pixelMap[i][j] = rows[i][j];
        const div = document.querySelector(".row" + i + "col" + j);
        const thumbnailDiv = document.querySelector(
          ".thumbnail-row" + i + "col" + j
        );

        if (pixelMap[i][j] == 1) {
          div.classList.remove("x");
          div.classList.add("active");
          div.classList.add("transparent");

          div.style.backgroundColor = "black";
          let currentOpacity = Math.random() / 2;
          div.style.opacity = Math.min(currentOpacity, 1);

          thumbnailDiv.classList.add("active");
          thumbnailDiv.classList.add("transparent");
          thumbnailDiv.style.backgroundColor = "black";
          currentOpacity = Math.random() / 2;
          thumbnailDiv.style.opacity = Math.min(currentOpacity, 1);
        } else if (pixelMap[i][j] == -1) {
          div.classList.remove("active");
          div.classList.remove("transparent");
          div.style.backgroundColor = "white";
          div.style.opacity = 1;
          div.classList.add("x");

          thumbnailDiv.style.backgroundColor = "white";
          thumbnailDiv.style.opacity = 1;
          thumbnailDiv.classList.remove("active");
          thumbnail.classList.remove("transparent");
        }
      }
    }
  } else if (hint == "col") {
    for (let i = 0; i < COL_SIZE; ++i) {
      for (let j = 0; j < ROW_SIZE; ++j) {
        if (pixelMap[j][i] == cols[i][j]) continue;

        pixelMap[j][i] = cols[i][j];
        const div = document.querySelector(".row" + j + "col" + i);
        const thumbnailDiv = document.querySelector(
          ".thumbnail-row" + i + "col" + j
        );

        if (pixelMap[j][i] == 1) {
          div.classList.remove("x");
          div.classList.add("active");
          div.classList.add("transparent");

          div.style.backgroundColor = "black";
          let currentOpacity = Math.random() / 2;
          div.style.opacity = Math.min(currentOpacity, 1);

          thumbnailDiv.classList.add("active");
          thumbnailDiv.classList.add("transparent");
          thumbnailDiv.style.backgroundColor = "black";
          currentOpacity = Math.random() / 2;
          thumbnailDiv.style.opacity = Math.min(currentOpacity, 1);
        } else if (pixelMap[j][i] == -1) {
          div.classList.remove("active");
          div.classList.remove("transparent");
          div.style.backgroundColor = "white";
          div.style.opacity = 1;
          div.classList.add("x");

          thumbnailDiv.style.backgroundColor = "white";
          thumbnailDiv.style.opacity = 1;
          thumbnailDiv.classList.remove("active");
          thumbnail.classList.remove("transparent");
        }
      }
    }
  }
}

const hintButton = document.querySelector(".hint-btn");
function hintButtonHandler() {
  applyHint();
  const sol = checkSolved();
  if (sol) handleSolve();
}
hintButton.addEventListener("click", hintButtonHandler);

function checkSolved() {
  for (let i = 0; i < ROW_SIZE; ++i)
    for (let j = 0; j < COL_SIZE; ++j)
      if (
        (pixelMap[i][j] != 1 && solution[i][j] == 1) ||
        (pixelMap[i][j] == 1 && solution[i][j] == -1)
      )
        return false;

  return true;
}

function populate() {
  let isSolved = false;
  container.style.setProperty("--col_size", COL_SIZE);
  container.style.setProperty("--row_size", ROW_SIZE);

  thumbnail.style.setProperty("--col_size", COL_SIZE);
  thumbnail.style.setProperty("--row_size", ROW_SIZE);

  const colClues = document.querySelector(".col-clues");
  const rowClues = document.querySelector(".row-clues");
  colClues.style.setProperty("--font_size", "3vh");
  rowClues.style.setProperty("--font_size", "3vw");
  for (let i = 0; i < ROW_SIZE; i++) {
    for (let j = 0; j < COL_SIZE; ++j) {
      const div = document.createElement("div");
      div.classList.add("pixel");
      div.classList.add("row" + i + "col" + j);
      const thumbnailDiv = document.createElement("div");
      thumbnailDiv.classList.add("thumbnail-pixel");
      thumbnailDiv.classList.add("thumbnail-row" + i + "col" + j);
      div.addEventListener("click", function () {
        if (!draw || isSolved) return;

        if (curBrush == "O") {
          div.classList.remove("x");
          div.classList.add("active");
          div.classList.add("transparent");

          pixelMap[i][j] = 1;

          div.style.backgroundColor = "black";
          let currentOpacity = parseFloat(div.style.opacity) || 0;
          div.style.opacity = Math.min(currentOpacity + 0.3, 1);
        } else {
          pixelMap[i][j] = -1;

          div.classList.remove("active");
          div.classList.remove("transparent");
          div.style.opacity = 1;
          div.classList.add("x");
        }

        if (curBrush == "O") {
          thumbnailDiv.classList.add("active");
          thumbnailDiv.classList.add("transparent");
          thumbnailDiv.style.backgroundColor = "black";
          let currentOpacity = parseFloat(thumbnailDiv.style.opacity) || 0;
          thumbnailDiv.style.opacity = Math.min(currentOpacity + 0.3, 1);
        } else {
          thumbnaildiv.style.backgroundColor = "#a9c2f9";
          thumbnailDiv.style.opacity = 1;
          thumbnailDiv.classList.remove("active");
          thumbnail.classList.remove("transparent");
        }
        isSolved = checkSolved();
        if (isSolved) {
          handleSolve();
        }
      });
      div.addEventListener("mouseover", function () {
        if (!draw || isSolved) return;

        if (curBrush == "O") {
          div.classList.remove("x");
          div.classList.add("active");
          div.classList.add("transparent");

          pixelMap[i][j] = 1;

          div.style.backgroundColor = "black";
          let currentOpacity = parseFloat(div.style.opacity) || 0;
          div.style.opacity = Math.min(currentOpacity + 0.3, 1);
        } else {
          pixelMap[i][j] = -1;

          div.classList.remove("active");
          div.classList.remove("transparent");
          div.style.opacity = 1;
          div.classList.add("x");
        }

        if (curBrush == "O") {
          thumbnailDiv.classList.add("active");
          thumbnailDiv.classList.add("transparent");
          thumbnailDiv.style.backgroundColor = "black";
          let currentOpacity = parseFloat(thumbnailDiv.style.opacity) || 0;
          thumbnailDiv.style.opacity = Math.min(currentOpacity + 0.3, 1);
        } else {
          thumbnaildiv.style.backgroundColor = "#a9c2f9";
          thumbnailDiv.style.opacity = 1;
          thumbnailDiv.classList.remove("active");
          thumbnail.classList.remove("transparent");
        }
        isSolved = checkSolved();
        if (isSolved) {
          handleSolve();
        }
      });

      div.addEventListener("mousedown", function () {
        if (isSolved) return;
        if (curBrush == "O") {
          pixelMap[i][j] = 1;

          div.classList.remove("x");
          div.classList.add("active");
          div.classList.add("transparent");

          div.style.backgroundColor = "black";
          let currentOpacity = parseFloat(div.style.opacity) || 0;
          div.style.opacity = Math.min(currentOpacity + 0.3, 1);
        } else {
          pixelMap[i][j] = -1;

          div.style.backgroundColor = "#a9c2f9";
          div.style.opacity = 1;
          div.classList.remove("active");
          div.classList.remove("transparent");
          div.classList.add("x");
        }

        if (curBrush == "O") {
          thumbnailDiv.classList.add("active");
          thumbnailDiv.classList.add("transparent");
          let currentOpacity = parseFloat(thumbnailDiv.style.opacity) || 0;
          thumbnailDiv.style.opacity = Math.min(currentOpacity + 0.3, 1);
        } else {
          thumbnaildiv.style.backgroundColor = "#a9c2f9";
          thumbnailDiv.style.opacity = 1;
          thumbnailDiv.classList.remove("active");
          thumbnail.classList.remove("transparent");
        }
        isSolved = checkSolved();
        if (isSolved) {
          handleSolve();
        }
      });

      container.appendChild(div);
      thumbnail.appendChild(thumbnailDiv);
    }
  }
  for (let i = 0; i < ROW_SIZE; ++i) {
    const rowClue = document.createElement("div");
    rowClue.classList.add("row-clue");
    rowClue.innerHTML =
      "<span>" + row_clues[i].join("</span><span>") + "</span>";
    rowClues.appendChild(rowClue);
  }
  for (let i = 0; i < COL_SIZE; ++i) {
    const colClue = document.createElement("div");
    colClue.classList.add("col-clue");
    colClue.innerHTML = "<div>" + col_clues[i].join("</div><div>") + "</div>";
    colClues.appendChild(colClue);
  }
  const pixel = document.querySelector(".pixel");
  const font_size = pixel.offsetHeight / 2 + "px";
  console.log(font_size);
  colClues.style.setProperty("--font_size", font_size);
  rowClues.style.setProperty("--font_size", font_size);
  window.addEventListener("resize", () => {
    const pixel = document.querySelector(".pixel");
    const font_size = pixel.offsetHeight / 2 + "px";

    colClues.style.setProperty("--font_size", font_size);
    rowClues.style.setProperty("--font_size", font_size);
  });
}

window.addEventListener("mousedown", function () {
  draw = true;
});
window.addEventListener("mouseup", function () {
  draw = false;
});

populate(size);

const zoomableGame = document.getElementById("zoomableGame");
let startTouches,
  currentTouches,
  isDragging = false;
let startX,
  startY,
  startDistance,
  currentScale = 1.0;

zoomableGame.addEventListener("mousedown", startDrag);
zoomableGame.addEventListener("touchstart", startDrag);

function startDrag(event) {
  if (event.touches && event.touches.length === 2) {
    startDistance = getTouchDistance(event.touches);
  } else {
    isDragging = true;
    startX = event.clientX || event.touches[0].clientX;
    startY = event.clientY || event.touches[0].clientY;
  }

  document.addEventListener("mousemove", dragMove);
  document.addEventListener("touchmove", dragMove);

  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchend", stopDrag);
}

function dragMove(event) {
  if (isDragging) {
    const mouseX = event.clientX || event.touches[0].clientX;
    const mouseY = event.clientY || event.touches[0].clientY;

    zoomableGame.style.left = mouseX - startX + "px";
    zoomableGame.style.top = mouseY - startY + "px";
  } else if (event.touches && event.touches.length === 2) {
    // 두 손가락을 사용하는 터치 이벤트 처리 (확대/축소)
    const distance = getTouchDistance(event.touches);

    if (startDistance) {
      const distanceDelta = distance - startDistance;

      if (distanceDelta > 0) {
        currentScale *= 1.01;
      } else {
        currentScale /= 1.01;
      }

      zoomableGame.style.transform = "scale(" + currentScale + ")";
    }

    startDistance = distance;
  }
}

function stopDrag() {
  isDragging = false;
  startDistance = null;
  document.removeEventListener("mousemove", dragMove);
  document.removeEventListener("touchmove", dragMove);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchend", stopDrag);
}

function getTouchDistance(touches) {
  const dx = touches[1].clientX - touches[0].clientX;
  const dy = touches[1].clientY - touches[0].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}
document.addEventListener("DOMContentLoaded", function () {
  const gameElement = document.querySelector(".game");
  let currentScale = 1.0;

  document.querySelector(".zoom-in-btn").addEventListener("click", function () {
    currentScale *= 1.1;
    applyScale();
  });

  document
    .querySelector(".zoom-out-btn")
    .addEventListener("click", function () {
      currentScale /= 1.1;
      applyScale();
    });

  function applyScale() {
    gameElement.style.transform = `scale(${currentScale})`;
  }
});

const tutorialScreen = document.querySelector(".tutorial-screen");

// Initialize Variables
var closePopuptutorial = document.getElementById("popupclosetutorial");
var overlaytutorial = document.getElementById("overlaytutorial");
var popuptutorial = document.getElementById("popuptutorial");
var buttontutorial = document.getElementById("buttontutorial");
// Close Popup Event
closePopuptutorial.onclick = function () {
  overlaytutorial.style.display = "none";
  popuptutorial.style.display = "none";
};
// Show Overlay and Popup
buttontutorial.onclick = function () {
  console.log("Button Clicked");
  overlaytutorial.style.display = "block";
  popuptutorial.style.display = "block";
};

// JavaScript로 이미지 변경 함수 정의
function changeImage(btnClassName, imageNumber) {
  const button = document.querySelector("." + btnClassName + " img");
  button.src =
    "../nonographic/" + btnClassName.slice(0, -4) + imageNumber + ".png";
}

function resetImage(btnClassName) {
  const button = document.querySelector("." + btnClassName + " img");
  button.src = "../nonographic/" + btnClassName.slice(0, -4) + "01.png";
}

// 마우스가 tutorial-btn 위로 올라갈 때 이미지 변경
document
  .querySelector(".tutorial-btn")
  .addEventListener("mouseover", function () {
    changeImage("tutorial-btn", "02");
  });

// 마우스가 tutorial-btn에서 나갈 때 이미지 리셋
document
  .querySelector(".tutorial-btn")
  .addEventListener("mouseout", function () {
    resetImage("tutorial-btn");
  });

// 마우스가 back-to-start-btn 위로 올라갈 때 이미지 변경
document
  .querySelector(".back-to-start-btn")
  .addEventListener("mouseover", function () {
    changeImage("back-to-start-btn", "02");
  });

// 마우스가 back-to-start-btn에서 나갈 때 이미지 리셋
document
  .querySelector(".back-to-start-btn")
  .addEventListener("mouseout", function () {
    resetImage("back-to-start-btn");
  });

// 마우스가 hint-btn 위로 올라갈 때 이미지 변경
document.querySelector(".hint-btn").addEventListener("mouseover", function () {
  changeImage("hint-btn", "02");
});

// 마우스가 hint-btn에서 나갈 때 이미지 리셋
document.querySelector(".hint-btn").addEventListener("mouseout", function () {
  resetImage("hint-btn");
});
//마우스가 back btn 위로 올라갈 때 이미지 변경
document.querySelector(".prev-btn").addEventListener("mouseover", function () {
  changeImage("prev-btn", "02");
});

// 마우스가 back btn에서 나갈 때 이미지 리셋
document.querySelector(".prev-btn").addEventListener("mouseout", function () {
  resetImage("prev-btn");
});
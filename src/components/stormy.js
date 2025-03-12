export function loadStyling() {
  const targetRows = document.querySelectorAll("tbody > tr:nth-child(odd)");
  const themeColor = "rgba(0,0,0,0.3)";
  targetRows.forEach((row) => {
    row.style.backgroundColor = themeColor;
  });
  document.body.style.backgroundImage =
    "linear-gradient(45deg, transparent, transparent, transparent, transparent, transparent, black), linear-gradient(315deg, transparent, transparent, transparent, transparent, transparent, black)";
}

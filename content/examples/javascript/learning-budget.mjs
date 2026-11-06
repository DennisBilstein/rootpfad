const learnerName = 'Mira';
const dailyMinutes = 20;
let completedMinutes = 0;

for (let session = 1; session <= 3; session += 1) {
  completedMinutes += dailyMinutes;
}

if (completedMinutes >= 60) {
  console.log(`${learnerName}: weekly goal reached (${completedMinutes} minutes).`);
} else {
  console.log(`${learnerName}: keep learning (${completedMinutes} minutes).`);
}

console.log('20' + 5); // '205': string concatenation
console.log(Number('20') + 5); // 25: numeric addition
console.log('20' === 20); // false: different types

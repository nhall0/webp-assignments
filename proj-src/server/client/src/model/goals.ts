import goals from '@/data/goals.json';
import * as cronParser from 'cron-parser';

export interface Goal {
  id: string;
  owner: string;
  name: string;
  privacy: number;
  repetition: string;
  workout: string;
}

export function getGoalById(id: string) {
  return getGoals().find(goal => goal.id === id);
}

export function getGoalByIds(ids: string[]) {
  return getGoals().filter(goal => ids.includes(goal.id));
}

export function getGoals() {
  return Object.entries(goals).map(([id, goalData]) => ({ id, ...goalData }));
}

export function getMonthsDatesFromCron(cron: string, month: number) {
  const interval = cronParser.parseExpression(cron);

  const dates = [];

  while (true) {
    const next = interval.next();

    if (next.toDate().getMonth() === month) {
      dates.push(next.toDate().toLocaleDateString());
    }
    else {
      break;
    }
  }

  interval.reset();

  while (true) {
    const prev = interval.prev();

    if (prev.toDate().getMonth() === month) {
      dates.unshift(prev.toDate().toLocaleDateString());
    }
    else {
      break;
    }
  }

  return dates;
}

export function getGoalCronByDays(time: number, days: string[]) {
  const dayMap = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  var cronDays = "";

  if (days.length === 0) {
    cronDays = "*";
  }
  else {
    days.forEach(day => {
      cronDays += dayMap.indexOf(day);
      cronDays += ",";
    });
    cronDays = cronDays.slice(0, -1);
  }

  return (`0 0 ${time} ? * ${cronDays} *`);
}


export function getNextDateFromCron(cron: string) {
  const interval = cronParser.parseExpression(cron);

  const next = interval.next();

  return next.toDate().toLocaleString();
}
import goalsData from '@/data/goals.json';
import * as cronParser from 'cron-parser';
import { v4 as uuidv4 } from 'uuid';
import { addGoal } from './users';

export let goals: { [key: string]: Goal } = goalsData as unknown as { [key: string]: Goal };

export interface Goal {
  id: string;
  owner: string;
  name: string;
  privacy: number;
  repetition: string;
  workout: string;
}

export function postNewGoal(goal: Goal, userId: string) {
  if(goal.id == ''){
    const id = uuidv4();
    goal.id = id;
  }
  goals[goal.id] = goal;
  addGoal(userId, goal.id);
}

export function getGoalById(id: string) {
  return getGoals().find(goal => goal.id === id);
}

export function getGoalByIds(ids: string[]) {
  return getGoals().filter(goal => ids.includes(goal.id));
}

export function getGoals() {
  return Object.keys(goals).map((key) => {
    const goal = goals[key];
    goal.id = key;
    return goal;
  });
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

export function getWeekdaysFromCron(cron: string) {
 var days = cron.split(" ")[5];
 var weekdays = [] as string[];

 if(days != null){
  weekdays = days.split(",");
 }

 if(weekdays[0] === "*") {
   return [];
 }
 else {
  return weekdays;
 }
}

export function getTimeFromCron(cron: string) {
  return(cron.split(" ")[2]);
}

export function getOccurrenceFromCron(cron: string) {
  if(cron.split(" ")[5] === "*") {
    return "Daily";
  }
  else {
    return "Weekly";
  }
}
import * as cronParser from 'cron-parser';

import {api} from "./session";

export interface Goal {
  _id: string;
  name: string;
  privacy: number;
  repetition: string;
  workout: string;
  user_id: string;
}

export async function postNewGoal(goal: Goal) {
  await api("goals", goal   , "POST");
}

export async function updateGoal(goal: Goal) {
  await api("goals/" + goal._id, goal, "PATCH");
}

export async function removeGoal(id: string) {
  await api("goals/" + id, null, "DELETE");
}

export async function getGoalById(id: string) {
  return await api("goals/" + id);
}

export async function getGoalByIds(ids: string[]) {
  return await api("goals/ids/" + ids);
}

export async function getGoalsByUser(user: string) {
  return await api("goals/user/" + user);
}

export async function getGoals() {
  return await api("goals");
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

export function getCalendarDaysFromCron(cron: string) {
  var days = cron.split(" ")[3];
  var calendarDays = [] as string[];

  if(days != null){
    calendarDays = days.split(",");
  }

  if(calendarDays[0] === "*") {
    return [];
  }
  else {
    return calendarDays;
  }
}
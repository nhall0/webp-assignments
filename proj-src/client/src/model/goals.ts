import * as cronParser from 'cron-parser';

import {api} from "./session";

export interface Goal {
  id: string;
  owner: string;
  name: string;
  privacy: number;
  repetition: string;
  workout: string;
}

export function postNewGoal(goal: Goal) {
  api("goals", {
    method: "POST",
    body: JSON.stringify(goal)
  });
}

export function removeGoal(id: string) {
  api("goals/" + id, {
    method: "DELETE"
  });
}

export function getGoalById(id: string) {
  return api("goals/" + id);
}

export function getGoalByIds(ids: string[]) {
  return api("goals/ids/" + ids);
}

export function getGoalsByUser(user: string) {
  return api("goals/user/" + user);
}

export function getGoals() {
  return api("goals");
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
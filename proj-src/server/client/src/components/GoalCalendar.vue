<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getMonthsDatesFromCron } from '@/model/goals';
import { getSession } from '@/model/session';
import { getGoalByIds } from '@/model/goals';
import { getPostsByDate } from '@/model/posts';
import { getWorkoutById } from '@/model/workouts';

interface CalendarDay {
    date: Date;
    label: string;
    goals: string[];
    posts: string[];
}

const getGoalBackgroundClass = (goal: string, posts: string[]) => {
    // Check if the goal corresponds to a workout in posts
    if (posts.includes(goal)) {
        return 'rounded-box green-bg';
    } else {
        return 'rounded-box red-bg';
    }
};

export default defineComponent({
    setup() {
        const currentMonth = ref(new Date());
        const calendarDays = ref<CalendarDay[]>([]);
        const session = getSession().user;

        if (!session) {
            throw new Error('Session not found');
        }

        const userGoals = getGoalByIds(session.goals);
        const monthDates: Record<string, string[]> = {};

        for (let goal of userGoals) {
            const dates = getMonthsDatesFromCron(goal.repetition, currentMonth.value.getMonth());
            for (let date of dates) {
                if (!monthDates[date]) {
                    monthDates[date] = [];
                }
                monthDates[date].push(getWorkoutById(goal.workout)?.name || 'Workout not found');
            }
        }

        const previousMonth = () => {
            currentMonth.value.setMonth(currentMonth.value.getMonth() - 1);
            calculateCalendarDays();
        };

        const nextMonth = () => {
            currentMonth.value.setMonth(currentMonth.value.getMonth() + 1);
            calculateCalendarDays();
        };

        const calculateCalendarDays = () => {
            const daysInMonth: CalendarDay[] = [];
            const currentYear = currentMonth.value.getFullYear();
            const currentMonthValue = currentMonth.value.getMonth();
            const firstDay = new Date(currentYear, currentMonthValue, 1);
            const lastDay = new Date(currentYear, currentMonthValue + 1, 0);

            for (let date = new Date(firstDay); date <= lastDay; date.setDate(date.getDate() + 1)) {
                const posts = getPostsByDate(date.toLocaleDateString(), session.id).map(post => getWorkoutById(post.workout)?.name || 'Workout not found');
                const goals = monthDates[date.toLocaleDateString()] || [];

                daysInMonth.push({
                    date: new Date(date),
                    label: date.getDate().toString(),
                    goals: goals,
                    posts: posts,
                });
            }

            calendarDays.value = daysInMonth;
        };

        calculateCalendarDays();

        return {
            currentMonth,
            calendarDays,
            previousMonth,
            nextMonth,
            getGoalBackgroundClass
        };
    },
});
</script>

<template>
    <div class="calendar">
        <div class="calendar-header">
            <button @click="previousMonth" class="button is-info">Previous</button>
            <h2>{{ currentMonth.toLocaleDateString() }}</h2>
            <button @click="nextMonth" class="button is-info">Next</button>
        </div>
        <div class="calendar-grid">
            <div class="calendar-day" v-for="day in calendarDays" :key="day.label">
                <div class="day-label">{{ day.label }}</div>
                <div class="day-content">
                    <div class="section-title">
                        Goals
                    </div>
                    <div v-for="goal in day.goals" :key="goal" :class="getGoalBackgroundClass(goal, day.posts)">
                        {{ goal }}
                    </div>
                    <div class="section-title">
                        Workouts
                    </div>
                    <div v-for="post in day.posts" :key="post" class="rounded-box blue-bg">
                        {{ post }}
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>
  

<style scoped>
.rounded-box {
    background-color: #3273dc;
    color: white;
    padding: 5px;
    border-radius: 10px;
    margin: 5px;
}

.green-bg {
    background-color: green;
}

.blue-bg {
    background-color: blue;
}

.calendar {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.calendar-header button {
    background: transparent;
    border: none;
    cursor: pointer;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
}

.calendar-day {
    background-color: #f5f5f5;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.day-label {
    font-weight: bold;
    margin-bottom: 5px;
}

.day-content {
    display: flex;
    flex-direction: column;
}

.goals,
.posts {
    margin-top: 5px;
}

/* Add additional styling for goals and posts here */
</style>
  
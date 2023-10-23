<script lang="ts">
import { defineComponent, ref} from 'vue';

import { getMonthsDatesFromCron, type Goal} from '@/model/goals';
import { getSession } from '@/model/session';
import { getPostsByDate } from '@/model/posts';
import { getWorkoutById } from '@/model/workouts';

interface CalendarDay {
    date: Date;
    label: string;
    goals: string[];
    posts: string[];
}

const getGoalBackgroundClass = (goal: string, posts: string[]) => {
    if (posts.includes(goal)) {
        return 'rounded-box green-bg';
    } else {
        return 'rounded-box red-bg';
    }
};

export default defineComponent({
    props: {
        userGoals: {
            type: Array as () => Array<Goal>,
            required: true,
        },
    },
    data(props) {
        const session = getSession().user;

        if (!session) {
            throw new Error('Session not found');
        }

        const currentMonth = ref(new Date());
        const calendarDays = ref<CalendarDay[]>([]);

        const previousMonth = () => {
            currentMonth.value.setMonth(currentMonth.value.getMonth() - 1);
            calculateCalendarDays();
        };

        const nextMonth = () => {
            currentMonth.value.setMonth(currentMonth.value.getMonth() + 1);
            calculateCalendarDays();
        };

        const calculateCalendarDays = () => {
            const monthDates: Record<string, string[]> = {};

            for (let goal of props.userGoals) {
                const dates = getMonthsDatesFromCron(goal.repetition, currentMonth.value.getMonth());
                for (let date of dates) {
                    if (!monthDates[date]) {
                        monthDates[date] = [];
                    }
                    monthDates[date].push(getWorkoutById(goal.workout)?.name || 'Workout not found');
                }
            }

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
            <button @click="previousMonth" class="button">Previous</button>
            <h2>{{ currentMonth.toLocaleDateString() }}</h2>
            <button @click="nextMonth" class="button">Next</button>
        </div>
        <div class="calendar-grid">
            <div class="calendar-day" v-for="day in calendarDays" :key="day.label">
                <div class="day-label">{{ day.label }}</div>
                <div class="day-content">
                    <div v-for="goal in day.goals" :key="goal" :class="getGoalBackgroundClass(goal, day.posts)">
                        {{ goal }}
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<style scoped>
.rounded-box {
    background-color: #dc3232;
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
    border: none;
    cursor: pointer;
    margin: 0 5px;
    background-color: #3273dc;
    color: white;
}

.calendar-header button:hover {
    background-color: #2769c4;
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
</style>
  